import * as httpRequest from '../utils/httpRequest';

export const uploadFile = async (payload, callback = () => {}) => {
    try {
        const res = await httpRequest.upload('/public/upload-file', payload);
        return res.data;
    } catch (error) {
        callback(error);
    }
};

export const uploadMultiFile = async (payload, callback = () => {}) => {
    try {
        const res = await httpRequest.upload('/public/upload-multiple-file', payload);
        return res.data;
    } catch (error) {
        callback(error);
    }
};
