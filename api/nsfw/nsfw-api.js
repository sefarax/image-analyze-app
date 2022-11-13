import { API_KEY } from "@env";
import Path  from "./paths";
import Axios from 'axios'



class API {
    api_host = 'nsfw3.p.rapidapi.com'
    api_ver = 'v1'
    api_addr = `https://${this.api_host}/${this.api_ver}/`;

    url = (path) => this.api_addr + path;

    constructor() {
     console.debug('created NSFW API instance');
    }
  
    async getVersion() {
        const options = {
            method: 'GET',
            url: this.url(Path.version),
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': this.api_host
            }
        };
        let res = await Axios(options);
        return res.data
    }

    /**
     * Checks NSFW value of given image url
     * @param {string} url of image
     * @returns Promise of @result for each given url
     * @result { 
     *  code: Status code of image processing: ok or failure.
     *  message: Human readable explanation for status of image processing.
     *  relatedTo: Original image name passed in request (e.g. my_image.jpg or its url).
     *  md5: Sum of original image passed in request.
     *  nsfw: Confidence for nsfw class (in range from 0.0 to 1.0).
     *  sfw: Confidence for sfw class (in range from 0.0 to 1.0).
     * }
     */
    async checkImageUrl(url) {
        const encodedParams = new URLSearchParams();
        encodedParams.append("url", 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg');

        const options = {
            method: 'POST',
            url: this.url(Path.results),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': this.api_host
            },
            data: {
                url: 'https://zooart.com.pl/blog/wp-content/uploads/2020/06/kapibara.jpeg'
            }
        };
        let res = await Axios(options);

        return res.data.results.map(val => ({
            code: val.status.code,
            message: val.status.message,
            relatedTo: val.name,
            md5: val.md5,
            nsfw: val.entities[0].classes.nsfw,
            sfw: val.entities[0].classes.sfw,
        }))
    }
}

const instance = new API();

Object.freeze(instance);

export default instance
  