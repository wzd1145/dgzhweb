import { getUserInfo, login } from '@/api/content'
import swal from 'sweetalert2'
import Setting from "@/setting";

function getUrlKey(name) {
    let url = window.location.href
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null
}

export function checkUser(store, corpid, id) {
    console.log("进入checkUser")
    return new Promise((resolve, reject) => {

        if (getUrlKey('code') == null) {
            //console.log(location.href)
            location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + corpid + '&redirect_uri=' + encodeURIComponent(location.href) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
        }
        else
        {
            let code = getUrlKey('code')//'123456'//
            login(code).then(res => {
                let params = {

                }
                getUserInfo(params).then(res => {
                    if(res.roleKey==undefined||res.roleKey==null||res.roleKey.length<=0)
                    {
                        swal(
                        {
                            text: "您没有权限查看！"
                        }).then(
                            function (dismiss) {
                                WeixinJSBridge.call('closeWindow');
                            }
                        );
                        return;
                    }
                    if(res.roleKey.join(',').includes('DISPATCHER'))
                    {
                        res.usertype = Setting.UserType.Assign;
                    }
                    if(res.roleKey.join(',').includes('EXAM'))
                    {
                        res.usertype = Setting.UserType.Verif;
                    }
                    store.commit('setUserinfo',res)
                    resolve(res)
                }).catch(res => {
                    reject(res)
                })
            }).catch(res => {
                reject(res)
            })
            
        }
    });
}