export function compress(imgFile,toSize) {
    let reader = new FileReader();
    let img = new Image();

    reader.readAsDataURL(imgFile);

    reader.onload = function (e) {
        img.src = e.target.result;
    };
    var imgP = new Promise((resolve, reject) => {
        img.onload = () => {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            //    瓦片canvas
            var tCanvas = document.createElement("canvas");
            var tctx = tCanvas.getContext("2d");
            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;
            //图片像素大于400万像素，计算压缩到400万以下
            var ratio;
            if ((ratio = (width * height) / toSize) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片太大则使用瓦片绘制
            var count;
            if ((count = (width * height) / 1000000 > 1)) {
                count = ~~(Math.sqrt(count) + 1); //计算分成的瓦片数
                var nw = ~~(width / count);
                var nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(
                            img,
                            i * nw * ratio,
                            j * nh * ratio,
                            nw * ratio,
                            nh * ratio,
                            0,
                            0,
                            nw,
                            nh
                        );
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            //进行最小压缩
            var ndata = canvas.toDataURL("image/jpeg", 0.3);
            tCanvas.width =
                tCanvas.height =
                canvas.width =
                canvas.height =
                0;
            //resolve(ndata);
            //console.log(ndata);
            let files = blobToFile(base64ToBlob(ndata, 'image/jpeg'), 'aaa.jpeg');
            resolve({files,ndata});
            
        };
    });

    return Promise.all([imgP])
}

export function base64ToBlob(urlData, type) {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1] || type;
    // 去掉url的头，并转化为byte
    let bytes = window.atob(arr[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
        type: mime
    });
}

export function blobToFile(newBlob, fileName) {
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    return newBlob;
}