import * as httpRequest from '../utils/httpRequest';

export const getAllComboServices = async (config) => {
    try {
        const res = await httpRequest.get('public/all-combo', {}, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getComboByComboId = async (id, config) => {
    try {
        const res = await httpRequest.get('public/comboservice-by-comboId?comboId=' + id, {}, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
