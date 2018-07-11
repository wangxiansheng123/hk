/**
 * 获取userId的
 */

import $ from 'zepto';
import store from 'store';

//获取user
let getUser = () => {
    let userId = $.fn.cookie('userId');
    if (userId) {
        let user = {
            userId: userId,
        };
        return user;
    }

    let users = store.get("userId");
    if (users) {
        let user = {
            userId: users,
        };
        return user;
    }
};


export {getUser}

