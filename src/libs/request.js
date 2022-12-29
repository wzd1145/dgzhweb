import axios from 'axios'
import Setting from '@/setting'
import swal from 'sweetalert2'

axios.defaults.withCredentials = true// 携带cookie

const service = axios.create({
    baseURL: Setting.apiBaseURL,
    timeout: 300000 // 请求超时时间
})


// 请求拦截器
service.interceptors.request.use(
    (config) => {
        //是否需要设置 token
        const isToken = (config.headers || {}).isToken === false;
        //console.log("isToken:" + isToken);
        /* let token = sessionStorage.getItem("toKen");
        if (token && !isToken) {
            config.headers["Authorization"] = "Bearer " + token; // 让每个请求携带自定义token 请根据实际情况自行修改
        } */

        return config;
    },
    (error) => {
        // do something with request error
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        const code = response.data.code || 200;
        //console.log(code)
        switch (code) {
            case 200:
                //console.log(response.data.result==0)
                if(response.data.result==undefined||parseInt(response.data.result)===0)
                {
                    response.data.result = ''
                }
                //console.log(response.data.result)
                return response.data.result
            case 401:
                swal({ text: "登录已过期，请重新进入！" });
                return false;
            case 505:
                if(response.data.msg.includes('invalid code'))
                {
                    location.href = location.href.split('?')[0]
                }
                else
                {
                    swal({ text: response.data.msg });
                }
                return false;
            default:
                swal({ text: response.data.msg });
                return false;
        }
    },
    (error) => {
        //Message.error(error.msg);
        console.log((error+'').includes('401'))
        if((error+'').includes('401'))
        {
            swal(
                {
                    text: "登录已过期，请重新进入！",
                }).then(
                function (dismiss) {
                    location.href = location.href.split('?')[0]
                }
            );

        }
        return Promise.reject(error);
    }
);

export default service
