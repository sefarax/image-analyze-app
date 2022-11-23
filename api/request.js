import { API, API_KEY } from "@env";
import axios from 'axios'

const getUrl = (path) => API + path;

const getHeaders = () => { 
    return {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API
    }
}

export async function request(path, method = 'GET', params = {}) {
    const url = getUrl(path);
    const headers = getHeaders();
    const options = {
        method: method,
        url: url,
        headers: headers,
        params: params.params ?? null,
        data: params.data ?? null
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(resolve)
            .catch(err => {
                console.error(`Request ${method}/${path} rejected`);
                console.error(err);
                reject(err)
            })
    });
}

export async function postReq(path, params = {}) {
    return await request(path, 'POST', params);
}

export async function putReq(path, params = {}) {
    return await request(path, 'PUT', params);
}

export async function deleteReq(path, params = {}) {
    return await request(path, 'DELETE', params);
}

export default request;
