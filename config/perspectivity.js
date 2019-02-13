/**
 * @description 消息透视
 * @author dhhuang1
 * date: 2018-01-16
 */

const perspectivity = {
    apiMeetHotRank: {
        url: '/wechatapi/meet/hot/rank',
        method: 'POST'
    },
    // 查询某一个热门的数据
    apiMeetHotDetail: {
        url: '/wechatapi/meet/hot/detail',
        method: 'POST'
    },
    queryTimeSection: {
        url: '/wechatapi/index/query/time',
        method: 'GET',
    },
    // 查看上下文
    WechatapiSubscribeLocationContext: {
        url: '/wechatapi/subscribe/location/context',
        method: 'POST'
    }
}


export default perspectivity