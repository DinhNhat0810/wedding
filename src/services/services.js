import * as httpRequest from '../utils/httpRequest';

export const getAllServicesByManager = async (params, callback, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('manager/get-all-service?' + queryString, {}, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const getServiceForUser = async (params, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('public/search-service-for-user?' + queryString, {}, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getServiceById = async (params, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('public/service-by-id?' + queryString, {}, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addServiceByManager = async (payload, config) => {
    try {
        const res = await httpRequest.post('manager/add-service-by-manager', payload, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateServiceByManager = async (id, payload, config) => {
    try {
        const res = await httpRequest.put('manager/update-service-by-manager/' + id, payload, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const searchService = async (params, config) => {
    try {
        const searchParams = new URLSearchParams(params);
        const queryString = searchParams?.toString();
        const res = await httpRequest.get('public/search-service-by-param?' + queryString, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteServiceByManager = async (id, config) => {
    try {
        const res = await httpRequest.remove('manager/delete-service-by-manager?id=' + id, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
