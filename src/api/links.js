import request from "./request";


export default async function(url){
    return request.get(`https://chegg88.com:8080/get_body?url=${url}`);
}