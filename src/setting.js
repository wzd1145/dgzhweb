// 请求接口地址 如果没有配置自动获取当前网址路径

// const Url = 'http://tess.ynsqjr.com/'
// const Url = 'http://106.58.185.29:12601/'
// const Url = 'https://jzdc.ynsqjr.com/'
// const Url = 'http://192.168.1.2/'
// const Url = 'http://3ifn3i.leestore.xyz/'
const Url = '/oph'

let Status = {//状态 -1 分配拒绝  -2 尽调拒绝  -3 审核拒绝  -4 完成拒绝 0 待分配 1 待尽调 2 待审核 3 审核通过 4 审核打回 
    //分配拒绝
    status_1_1: -1,
    //尽调拒绝
    status_1_2: -2,
    //审核拒绝
    status_1_3: -3,
    //人行已撤销
    status_1_4: -4,
    //待分配
    status0: 0,
    //待尽调
    status1: 1,
    //待审核
    status2: 2,
    //审核通过
    status3: 3,
    //审核不通过
    status4: 4,
    //走线下
    status9: 5,
    //全部
    status5: '',
    //待处理
    status6: '',
    //已处理
    status7: '',
    //已完成
    status8: ''
}
Status.status5 = Status.status_1_1 + ',' + Status.status_1_2 + ',' + Status.status_1_3 + ',' + Status.status_1_4 + ',' + Status.status0 + ',' + Status.status1 + ',' + Status.status2 + ',' + Status.status3 + ',' + Status.status4
Status.status6 = Status.status1 + ',' + Status.status4
Status.status7 = Status.status2
Status.status8 = Status.status_1_1 + ',' + Status.status_1_2 + ',' + Status.status_1_3 + ',' + Status.status_1_4 + ',' + Status.status3 + ',' + Status.status9

const UserType = {
    Verif: 2,
    Assign: 1,
    shenhe: 3
}

const CCBSDK = {
    cappid: '2008129229_app_20220929141847',
    Acs_Stm_ID: '22',
    AcsStm_EcrptKey_Cntnt: '440470513'
}

const Setting = {
    // 接口请求地址
    apiBaseURL: Url,
    Status,
    UserType,
    hasWatermark: true,
    CCBSDK
}

export default Setting
