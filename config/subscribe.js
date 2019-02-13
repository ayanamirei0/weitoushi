/**
 * @description 消息透视
 * @author dhhuang1
 * date: 2018-01-16
 */

const subscribe = {
    apiSubscribeGetSubscribes: {
        url: ' /wechatapi/subscribe/get/subscribes',
        method: 'POST'
    },
    apiSubscribeSave: {
        url: '/wechatapi/subscribe/save',
        method: 'POST'
    },
    apiSubscribeDel:{
        url:' /wechatapi/subscribe/del',
        method:'GET'
    },
    // 置顶 取消置顶
    ApiSubToTopOrNotTop: {
        url: '/wechatapi/subscribe/top',
        method: 'POST'
    },
    // 取消订阅
    ApiCancelSubscribe: {
        url: '/wechatapi/subscribe/del',
        method: 'POST'
    },
    // 修改订阅的内容
    ApiSubscribeUpdate: {
        url: '/wechatapi/subscribe/update',
        method: 'POST'
    },
}


export default subscribe