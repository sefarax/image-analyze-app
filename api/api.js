import path from "./paths";
import { postReq } from './request';


class API {
    constructor() {
        console.debug('created API class instance');
    }

    async analyzeImageUrl(imageUrl = 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg') {
        const options = {
            params: { language: 'en' },
            data: { url: imageUrl }
        };

        let res = await postReq(path.analyze, options)
        console.log(res)
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  