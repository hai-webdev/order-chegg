import request from "./request";
import qs from "qs";


export default async function({tid,title,first_date,PHPSESSION}){
    const data = qs.stringify({id:"extraction_code",tid,title,first_date,PHPSESSION});
    return request.post("/api.php?c=post&f=ok",data);
}