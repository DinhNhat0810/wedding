import * as httpRequest from '../utils/httpRequest';

export const register = async (payload, callback) => {
    try {
        const res = await httpRequest.post('register-user', payload);
        return res.data;
    } catch (error) {
        callback(error);
    }
};

export const partnerRegister = async (payload, callback) => {
    try {
        const res = await httpRequest.post('register-partner', payload);
        return res.data;
    } catch (error) {
        callback(error);
    }
};

export const activeAccount = async (payload, callback) => {
    try {
        const res = await httpRequest.post('active-account', payload);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const login = async (payload, callback) => {
    try {
        const res = await httpRequest.post('login', payload);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const resetPassword = async (payload, callback) => {
    try {
        const res = await httpRequest.post(`forgot-password?username=${payload}`);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const changePassword = async (payload, callback, config) => {
    try {
        const res = await httpRequest.post('all/change-password', payload, config);
        return res;
    } catch (error) {
        callback(error);
    }
};
