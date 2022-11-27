import { API, API_KEY } from "@env";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

const getUrl = (path) => 'https://' + API + '/' + path;

const getHeaders = () => { 
    return {
        'content-type': 'application/json',
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API
    }
}

export type RequestParams =  Partial<{ params: {}, data: {} }>
export async function request(path: string, method: Method = 'GET', params: RequestParams = {}): Promise<AxiosResponse<any>> {
    const url = getUrl(path);
    const headers = getHeaders();
    const options: AxiosRequestConfig = {
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
                if (err.response) {
                    console.error('Request made but the server responded with an error');
                    console.error(err.response.data);
                    console.error(err.response.status);
                    console.error(err.response.headers);
                } else if (err.request) {
                    console.error('Request made but no response is received from the server');
                    console.error(err.request);
                } else {
                    console.error(`Error occured while setting up the request`);
                    console.error('Error', err.message);
                }
                reject(err)
            })
    });
}

export async function postReq(path: string, params: RequestParams = {}) {
    return await request(path, 'POST', params);
}

export async function putReq(path: string, params: RequestParams = {}) {
    return await request(path, 'PUT', params);
}

export async function deleteReq(path: string, params: RequestParams = {}) {
    return await request(path, 'DELETE', params);
}

export default request;
