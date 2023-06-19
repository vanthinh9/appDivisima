import Cookies from 'js-cookie';
export const setCookie = (cname, cvalue) => {
    Cookies.set(cname, cvalue, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
        path: '/',
    });
};
export const getCookie = (cname) => {
    return Cookies.get(cname);
};
export const removeCookie = (cname) => {
    Cookies.remove(cname);
};
