/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import { expiredToken } from '@app-config';
import cookies from 'js-cookie';

export const setLogin = (expired, isLogin = 0) => {
    cookies.set('isLogin', isLogin, { expires: expired || expiredToken });
    return 0;
};

export const setLoginSessionToken = (token, expired) => {
    cookies.set('loginToken', token, { expires: expired || expiredToken });
};

export const getLoginInfo = () => {
    const isLogin = cookies.get('isLogin');
    return parseInt(isLogin) || 0;
};

export const removeIsLoginFlagging = () => {
    cookies.remove('isLogin');
    document.cookie = 'foo=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};
