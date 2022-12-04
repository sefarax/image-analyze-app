import { postReq } from "../request";
import { RequestParams } from "../types";
import { DescribeResponse } from "./api.types";
import { API as API_HOST, API_KEY } from "@env";
import path from "./paths";


class API {
    constructor() {
        console.debug('created Microsoft Computer Vision API class instance');
    }

    readonly url = (path: string) => `https://${API_HOST}/${path}`;

    readonly headers = {
        'Content-Type': 'application/json',
        'X-RapidApi-Key': API_KEY,
        'X-RapidApi-Host': API_HOST
    }

    async analyzeImageUrl(imageUrl: string) {
        const url = this.url(path.analyze)
        const options: RequestParams = {
            params: { language: 'en' },
            data: { url: imageUrl },
            headers: this.headers
        };

        let res = await postReq(url, options);
        console.debug('Received image analysis');
        return res.data;
    }

    async describeImageUrl(imageUrl: string): Promise<DescribeResponse> {
        console.log("describe image url", imageUrl);
        
        const url = this.url(path.describe)
        const options: RequestParams = {
            params: { language: 'en', maxCandidates: '1' },
            data: { url: imageUrl },
            headers: this.headers
        };
        
        let res = await postReq(url, options);
        console.debug('Received image description');        
        return res.data;
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  