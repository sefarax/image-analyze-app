import { postReq } from "../request";
import { ImageInfo } from "../../components/ImagePicker";
import { IMAGE_HOST } from "@env";
import { Image } from 'react-native-compressor';


class API {
    constructor() {
        console.debug('created Image Hosting Server API class instance');
    }

    async uploadImage(imageData: ImageInfo) {
        console.log("uploading image to server...");
        
        const result = await Image.compress(imageData.uri, {
            compressionMethod: 'auto',
        });

        imageData.uri = result

        console.log("image compressed", imageData);
        

        let formData = new FormData();
        formData.append("file", {
            uri: imageData.uri,
            name: imageData.name,
            type: imageData.type
        } as any);

        let res = await postReq(`http://${IMAGE_HOST}/image`, {
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
            timeout: 5000
        })
        let fileName = res.data.replace('./storage/', '');
        let url = `http://${IMAGE_HOST}/image/${fileName}`
        return url;        
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  