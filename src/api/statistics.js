import request from '@/libs/request'

/**
 * @description 分享注册参数
 * @param {Object} param data {Object} 传值参数
 */
 export function getShareConfig (data) {
    return request({
        url: '/mobile/agent/share/config',
        method: 'post',
        data: data
    })
}