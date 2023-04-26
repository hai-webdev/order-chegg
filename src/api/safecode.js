import request from "./request";

export default function(data){
    return request.get(`/api.php?c=index&f=safecode&data=${data}`);
}