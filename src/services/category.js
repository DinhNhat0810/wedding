import * as httpRequest from '../utils/httpRequest';

export const getCategoriesByAdminOrManager = async (callback = () => {}, config) => {
    try {
        const res = await httpRequest.get('admin/category-by-adminOrManager', {}, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const addCategoryByAdmin = async (payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.post('admin/add-category', payload, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const updateCategoryByAdmin = async (id, payload, callback = () => {}, config) => {
    try {
        const res = await httpRequest.post('admin/update-category/' + id, payload, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const deleteCategoryByAdmin = async (id, callback = () => {}, config) => {
    try {
        const res = await httpRequest.remove('admin/delete-category?id=' + id, config);
        return res;
    } catch (error) {
        callback(error);
    }
};

export const getAllCategories = async (callback = () => {}, config) => {
    try {
        const res = await httpRequest.get('public/category-by-user', {}, config);
        return res;
    } catch (error) {
        callback(error);
    }
};
