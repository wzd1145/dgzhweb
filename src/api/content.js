import request from '@/libs/request'

/* export function getClass (data) {
    return request({
        url: 'getClass',
        method: 'get',
        params: data
    })
} */

/**
 * @description 登录
 * @param {Object} param data {Object} 传值参数
 */
export function login(code) {
    console.log(code)
    return request({
        url: '/oph/login/cp',
        method: 'post',
        params: {cpCode:code}
    })
}

/**
 * @description 获取当前用户信息
 * @param {Object} param data {Object} 传值参数
 */
export function getUserInfo(data) {
    return request({
        url: '/oph/mobile/current/user',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取尽调列表
 * @param {Object} param data {Object} 传值参数
 */
export function getLists(data) {
    return request({
        url: '/oph/mobile/jd/cust/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取审核列表
 * @param {Object} param data {Object} 传值参数
 */
export function getListsSh(data) {
    return request({
        url: '/oph/mobile/sh/cust/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取分配列表
 * @param {Object} param data {Object} 传值参数
 */
export function getListsFp(data) {
    return request({
        url: '/oph/mobile/cust/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取尽调员列表
 * @param {Object} param data {Object} 传值参数
 */
export function getJdUser(data) {
    return request({
        url: '/oph/mobile/jdUser/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 分配尽调员
 * @param {Object} param data {Object} 传值参数
 */
export function allocate(data) {
    return request({
        url: '/oph/mobile/allocate',
        method: 'post',
        data: data
    })
}

/**
 * @description 复用尽调信息
 * @param {Object} param data {Object} 传值参数
 */
export function jdcopy(data) {
    return request({
        url: '/oph/mobile/jd/copy',
        method: 'post',
        data: data
    })
}

/**
 * @description 转线下
 * @param {Object} param data {Object} 传值参数
 */
export function offline(data) {
    return request({
        url: '/oph/mobile/offline',
        method: 'post',
        data: data
    })
}

/**
 * @description 获取审核员列表
 * @param {Object} param data {Object} 传值参数
 */
export function getShUser(data) {
    return request({
        url: '/oph/mobile/auditor/list',
        method: 'get',
        params: data
    })
}

/**
 * @description 绑定审核员
 * @param {Object} param data {Object} 传值参数
 */
export function allocatesh(data) {
    return request({
        url: '/oph/mobile/auditor/allocate',
        method: 'post',
        data: data
    })
}

/**
 * @description 获取详情
 * @param {Object} param data {Object} 传值参数
 */
export function getDetails(data) {
    return request({
        url: '/oph/mobile/cust/jd/detail',
        method: 'get',
        params: data
    })
}

/**
 * @description 修改预约信息（身份证号）
 * @param {Object} param data {Object} 传值参数
 */
export function edityy(data) {
    return request({
        url: '/oph/mobile/cust/edit',
        method: 'post',
        data: data
    })
}

/**
 * @description 接洽
 * @param {Object} param data {Object} 传值参数
 */
export function concat(data) {
    return request({
        url: '/oph/mobile/concat',
        method: 'post',
        data: data
    })
}

/**
 * @description 保存
 * @param {Object} param data {Object} 传值参数
 */
export function save(data) {
    return request({
        url: '/oph/mobile/save',
        method: 'post',
        data: data
    })
}

/**
 * @description 审核保存
 * @param {Object} param data {Object} 传值参数
 */
export function savesh(data) {
    return request({
        url: '/oph/mobile/audit/save',
        method: 'post',
        data: data
    })
}

/**
 * @description 拒绝
 * @param {Object} param data {Object} 传值参数
 */
export function refused(data) {
    return request({
        url: '/oph/mobile/refused',
        method: 'post',
        data: data
    })
}

/**
 * @description jssdk签名
 * @param {Object} param data {Object} 传值参数
 */
export function wxConfig(data) {
    return request({
        url: '/oph/mobile/wxConfig',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取审核数量
 * @param {Object} param data {Object} 传值参数
 */
 export function getTotalSh(data) {
    return request({
        url: '/oph/mobile/sh/total',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取分配数量
 * @param {Object} param data {Object} 传值参数
 */
 export function getTotalFp(data) {
    return request({
        url: '/oph/mobile/fp/total',
        method: 'get',
        params: data
    })
}

/**
 * @description 获取尽调数量
 * @param {Object} param data {Object} 传值参数
 */
 export function getTotalJd(data) {
    return request({
        url: '/oph/mobile/jd/total',
        method: 'get',
        params: data
    })
}

/**
 * @description 上传图片
 * @param {Object} param data {Object} 传值参数
 */
 export function uploadImg(data) {
    return request({
        url: '/oph/mobile/upload/base64',
        method: 'post',
        data: data
    })
}

/**
 * @description 上传视频
 * @param {Object} param data {Object} 传值参数
 */
 export function uploadVideo(data) {
    return request({
        url: '/oph/mobile/upload',
        method: 'post',
        data: data
    })
}

/**
 * @description 提交
 * @param {Object} param data {Object} 传值参数
 */
 export function submit(data) {
    return request({
        url: '/oph/mobile/submit',
        method: 'post',
        data: data
    })
}

/**
 * @description 审核
 * @param {Object} param data {Object} 传值参数
 */
 export function audit(data) {
    return request({
        url: '/oph/mobile/audit',
        method: 'post',
        data: data
    })
}

/**
 * @description 根据经纬度获取位置
 * @param {Object} param data {Object} 传值参数
 */
 export function address(appid,data) {
    return request({
        url: '/oph/mobile/location/address',
        method: 'post',
        data: data
    })
}

/**
 * @description 根据位置获取经纬度
 * @param {Object} param data {Object} 传值参数
 */
 export function coding(appid,data) {
    return request({
        url: '/oph/mobile/location/coding',
        method: 'post',
        data: data
    })
}

/**
 * @description /oph/mobile/icr/business
 * @param {Object} param data {Object} 传值参数
 */
 export function business(data) {
    return request({
        url: '/oph/mobile/icr/business',
        method: 'post',
        data: data
    })
}

/**
 * @description ICR身份证背面识别
 * @param {Object} param data {Object} 传值参数
 */
 export function cardidBack(data) {
    return request({
        url: '/oph/mobile/icr/id/back',
        method: 'post',
        data: data
    })
}

/**
 * @description /oph/mobile/icr/id/front
 * @param {Object} param data {Object} 传值参数
 */
 export function cardidFront(data) {
    return request({
        url: '/oph/mobile/icr/id/front',
        method: 'post',
        data: data
    })
}

