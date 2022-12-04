import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export type RequestParams =  Partial<{ 
    params: {};
    data: {};
    headers: {};
    timeout: number;
}>

export async function request(url: string, method: Method = 'GET', params: RequestParams = {}): Promise<AxiosResponse<any>> {
    const options: AxiosRequestConfig = {
        method: method,
        url: url,
        params: params.params ?? null,
        data: params.data ?? null,
        headers: params.headers ?? {},
        timeout: params.timeout ?? undefined
    }
    return new Promise((resolve, reject) => {
        axios(options)
            .then(resolve)
            .catch(err => {
                console.error(`Request ${method} ${url} rejected`);
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
