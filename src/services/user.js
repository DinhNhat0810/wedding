import * as httpRequest from '../utils/httpRequest';

export const updateUser = async (id, payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.put('all/update-user-infor/' + id, payload, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const createUserByAdmin = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.post('admin/create-account', payload, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const getUserByRole = async (params, callback = () => {}, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('admin/get-user-by-role?' + queryString, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const changeStatusAccount = async (params, callback = () => {}, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.post('admin/lockOrUnlockAccount?' + queryString, config);
        return res;
    } catch (error) {
        callback(error);
    }
};
