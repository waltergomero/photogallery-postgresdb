import getConfig from "next/config";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/category`;

export const categoryService = {
  add,
  getAll,
  getById,
  getDDList,
  update,
  delete: _delete,
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

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function getDDList() {
  return fetchWrapper.get(`${baseUrl}/ddlist`);
}
