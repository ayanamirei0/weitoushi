/**
 * 接口对外
 * author: dhhuang1
 * date: 2017-01-15
 */

import homeAPI from './home'
import perspectivity from './perspectivity'
import weichat from './weichat'
import LoginApi from './login'
import subscribe from './subscribe'
import KeySearch from './keysearch'
import Subscribe from './subscribe'
import UserInfo from './userInfo'
import search_report from './search_report'
import search_report_link from './search_report_link'
export default Object.assign({}, 
    homeAPI, 
    perspectivity, 
    weichat, 
    LoginApi,
    KeySearch,
    Subscribe,
    UserInfo,
    search_report,
    search_report_link
);
