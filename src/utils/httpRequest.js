import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_URL,
});

const token = JSON.parse(localStorage.getItem('user'))?.token;

httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const get = async (path, options = {}, config) => {
    const response = await httpRequest.get(path, options, config);
    return response.data;
};

export const post = async (path, options = {}, config) => {
    const response = await httpRequest.post(path, options, config);
    return response;
};

export const put = async (path, options = {}, config) => {
    const response = await httpRequest.put(path, options, config);
    return response;
};

export const upload = async (path, file) => {
    const response = await httpRequest.post(path, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export const remove = async (path, options = {}, config) => {
    const response = await httpRequest.delete(path, options, config);
    return response;
};

export default httpRequest;
