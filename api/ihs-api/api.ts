import { postReq } from "../request";
import { ImageInfo } from "../../components/ImagePicker";



class API {
    constructor() {
        console.debug('created Image Hosting Server API class instance');
    }

    async uploadImage(imageData: ImageInfo) {
        console.log("imageData", imageData);        

        let formData = new FormData();
        formData.append("file", {
            uri: imageData.uri,
            name: imageData.name,
            type: imageData.type
        } as any);

        let res = await postReq('http://localhost:8080/image', {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
        })
        
        return res.data;        
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  