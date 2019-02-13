/**
 * @description weixin接口
 * @author dhhuang1
 * date: 2018-01-19
 */

const weichat = {
    ApiSyncWechatLogin: {
        url: '/wechatapi/sync/wechat/login',
        method: 'POST'
    },
    // 获取已绑定的微信账户
    ApiSyncWechatGetBindedWechats: {
        url: '/wechatapi/sync/wechat/get/binded/wechats',
        method: 'GET'
    },
    // 获取微信群
    ApiSyncWechatGetWechatGroups: {
        url: '/wechatapi/sync/wechat/get/wechat/groups',
        method: 'POST'
    },
    // 保存群信息
    ApiSyncWechatSaveWechatGroups: {
        url: '/wechatapi/sync/wechat/save/wechat/groups',
        method: 'POST'
    },
    // 解除同步
    WechatapiSyncWechatRemoveSync: {
        url: '/wechatapi/sync/wechat/remove/sync',
        method: 'POST'
    },
    // 保存群信息
    WechatapiSyncWechatSaveWechatGroups:{
        url: '/wechatapi/sync/wechat/save/wechat/groups',
        method: 'POST'
    }
}


export default weichat