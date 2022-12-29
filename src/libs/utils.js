export function getUrlKey(name) {
    let url = window.location.href
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export function getTime(str) {
    let unixtime = js_strto_time(str);
    let nowtime = Date.parse(new Date())/1000;
    let res = ''

    if(nowtime-unixtime>86400*3)//前天之前
    {
        res = getDateTime(unixtime)
    }
    else if(nowtime-unixtime>86400*2)//前天
    {
        res = '前天 ' + getDateTime1(unixtime)
    }
    else if(nowtime-unixtime>86400)//昨天
    {
        res = '昨天 ' + getDateTime1(unixtime)
    }
    else if(nowtime-unixtime>=3600)//24小时内1小时以上
    {
        res = getTimeStr(nowtime-unixtime)
    }
    else if(nowtime-unixtime<3600)
    {
        res = getTimeStr1(nowtime-unixtime)
    }
    return res
}

export function js_strto_time(str_time){
    var new_str = str_time.replace(/:/g,'-');
    new_str = new_str.replace(/ /g,'-');
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));
    return datum.getTime()/1000;
}

export function getDateTime(unixstr)
{
    var myDate = new Date(parseInt(unixstr))//*1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    month = month<10?('0'+month):month;
    day = day<10?('0'+day):day;
    hour = hour<10?('0'+hour):hour;
    minute = minute<10?('0'+minute):minute;
    return year+'-'+month+'-'+day;
}

export function getDateTime11(unixstr)
{
    var myDate = new Date(parseInt(unixstr)*1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    month = month<10?('0'+month):month;
    day = day<10?('0'+day):day;
    hour = hour<10?('0'+hour):hour;
    minute = minute<10?('0'+minute):minute;
    return month+'/'+day+' '+hour+':'+minute;
}

export function getNowDateTime()
{
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    month = month<10?('0'+month):month;
    day = day<10?('0'+day):day;
    hour = hour<10?('0'+hour):hour;
    minute = minute<10?('0'+minute):minute;
    return year+'-'+month+'-'+day+'T'+hour+':'+minute+':00';
}

export function getDateTime1(unixstr)
{
    var myDate = new Date(parseInt(unixstr)*1000);
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    month = month<10?('0'+month):month;
    day = day<10?('0'+day):day;
    hour = hour<10?('0'+hour):hour;
    minute = minute<10?('0'+minute):minute;
    return hour+':'+minute;
}

export function getTimeStr(unix)
{
    return parseInt(unix/3600) + '小时前'
}

export function getTimeStr1(unix)
{
    return parseInt(unix/60) + '分钟前'
}

//	计算两点之间直线距离
export function algorithm(point1, point2) {
    function rad(d) {
        return d * Math.PI / 180.00;
    }

	let [x1, y1] = point1;
	let [x2, y2] = point2;
    let Lat1 = rad(x1); // 纬度
    let Lat2 = rad(x2);
    let a = Lat1 - Lat2;//	两点纬度之差
    let b = rad(y1) - rad(y2); //	经度之差
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) 
        	+ Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(b / 2), 2)));
        //	计算两点距离的公式
    s = s * 6378137.0;//	弧长等于弧度乘地球半径（半径为米）
    s = Math.round(s * 10000) / 10000;//	精确距离的数值
    return s;

}

export function distanceFormat(jl)
{
    if(jl<1000)
    {
        return jl.toFixed(0)+'米'
    }
    else
    {
        jl = jl / 1000;
        return jl.toFixed(2)+'公里'
    }
}