import { DescribeResponse } from "./api.types";
import path from "./paths";
import { postReq } from './request';


class API {
    constructor() {
        console.debug('created API class instance');
    }

    async analyzeImageUrl(imageUrl: string) {
        const options = {
            params: { language: 'en' },
            data: { url: imageUrl }
        };

        let res = await postReq(path.analyze, options);
        console.log(res);
    }

    async describeImageUrl(imageUrl: string): Promise<DescribeResponse> {
        const options = {
            params: { language: 'en', maxCandidates: '1' },
            data: { url: imageUrl }
        };
        
        let res = await postReq(path.describe, options);
        console.debug('Received image description');        
        return res.data;
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  