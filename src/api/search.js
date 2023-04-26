import request from "./request";
export default function(keywords){
    return request.get("/api.php?c=search",{params:{keywords}});
}