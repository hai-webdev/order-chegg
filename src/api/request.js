import Axios from "axios";

const request = Axios.create();

request.interceptors.response.use(req => {
    if(req.data){
        if(req.data.info){
            return req.data.info;
        }
        return req.data;
    }
    return req;
})

export default request;