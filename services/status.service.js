import getConfig from 'next/config';
import { fetchWrapper } from '@/helpers/fetch-wrapper'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/status`;


export const statusService = {
    add,
    getAll,
    getById,
    getDDList,
    update,
    delete: _delete
};

function add(category) {
    return fetchWrapper.post(`${baseUrl}/add`, category);
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getDDList() {
 
    return fetchWrapper.get(`${baseUrl}/ddlist`);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {
            return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
