import Cookies from 'js-cookie';

export const setCookie = (token: string) => {
    Cookies.set('token', token, {expires: 999});
};

export const getCookie = () => {
    return Cookies.get('token');
};

export const delCookie = () => {
    Cookies.remove('token');
};