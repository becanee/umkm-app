import Cookies from "js-cookie";


export const getUserProfile = () => {
    const ck: any = Cookies.get('_USER');
    return JSON.parse(ck);
};

export const getActiveMerchantProfile = () => {
    const ck: any = Cookies.get('_MRC');
    return JSON.parse(ck);
};