//import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from '@/helpers/fetch-wrapper'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/front`;

export const frontService = {
    getImagesByCategoryId,
    getRandomImages,
};

function getImagesByCategoryId(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getRandomImages() {
    return fetchWrapper.get(baseUrl);
}