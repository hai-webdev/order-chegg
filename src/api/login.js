import request from "./request";
import qs from "qs";


export default async function(){
    const data = qs.stringify({user:"admin",pass:"admin123"});
    return request.post("/api.php?c=login",data);
}