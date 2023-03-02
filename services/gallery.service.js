import getConfig from "next/config";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/gallery`;

export const galleryService = {
  add,
  getAll,
  getImagesByCategory,
  getImageInfoById,
  getCategoriesByUserId,
  getImagesByUserId,
  update,
  delete: _delete,
};

function add(data) {
  return fetchWrapper.post(`${baseUrl}/add`, data);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getCategoriesByUserId(user_id) {
  return fetchWrapper.get(`${baseUrl}/category/${user_id}`);
}

function getImagesByCategory() {
  return fetchWrapper.get(`${baseUrl}/category/`);
}

function getImageInfoById(id) {
  return fetchWrapper.get(`${baseUrl}/editdelete/${id}`);
}

function getImagesByUserId(userid, categoryid) {
  return fetchWrapper.get(
    `${baseUrl}?userid=${userid}&categoryid=${categoryid}`
  );
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
