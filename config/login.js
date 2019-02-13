/**
 * @description 登录接口
 * @author dhhuang1
 * date: 2018-01-15
 */

const LoginAPI = {
    //    邮箱登录
    ApiAccountLogin: {
        url: '/wechatapi/account/login',
        method: 'POST'
    },
    // 邮箱注册
    ApiAccountRegister: {
        url: '/wechatapi/account/register',
        method: 'POST'
    },
    // 邮箱注册-激活接口
    ApiAccountRegisterActivate: {
        url: '/wechatapi/account/register/activate',
        method: 'POST'
    },
    // 获取微信登录用户信息
    getWeChartLoginInfoByCode: {
        url: '/wechatapi/account/login/wechat',
        method: 'POST'
    },
    // 重置密码-发送邮件
    sendResetPwdEmail: {
        url: '/wechatapi/account/passwd/reset/confirm',
        method: 'POST'
    },
    // 重置密码-发送邮件
    ResetPassword: {
        url: '/wechatapi/account/passwd/reset/modify',
        method: 'POST'
    },
    // 重置密码-发送邮件
    ApiReSendPasswordRegisterEmail: {
        url: '/wechatapi/account/register/send-mail',
        method: 'POST'
    },
    // 微信绑定已有邮箱
    wxBindOldAccount: {
        url: '/wechatapi/account/bind/activate',
        method: 'POST'
    },
    // 检查激活邮件链接是否失效
    ApiCheckActiveUrlState: {
        url: '/wechatapi/account/register/activate/token',
        method: 'POST'
    },
    // 检查重置密码邮件链接是否失效
    ApiCheckResetPwdUrlState: {
        url: '/wechatapi/account/passwd/reset/modify/token',
        method: 'POST'
    },
    // 退出登陆
    WechatapiAccountLogout: {
        url: '/wechatapi/account/logout',
        method: 'POST'
    },
    //个人信息
    WechatapiAccountGetUserinfo:{
        url: '/wechatapi/account/get/userinfo',
        method: 'GET'
    }
}


export default LoginAPI