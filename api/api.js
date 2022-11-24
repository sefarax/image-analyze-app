import path from "./paths";
import { postReq } from './request';


class API {
    constructor() {
        console.debug('created API class instance');
    }

    async analyzeImageUrl(imageUrl) {
        const options = {
            params: { language: 'en' },
            data: { url: imageUrl }
        };

        let res = await postReq(path.analyze, options);
        console.log(res);
    }

    async describeImageUrl(imageUrl, maxDescribes = '1') {
        const options = {
            params: { language: 'en', maxCandidates: maxDescribes },
            data: { url: imageUrl }
        };
        let res = await postReq(path.describe, options);
        console.log(res);
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  