import request from "./request";
import qs from "qs";
import safecode from "./safecode";


export default async function(id){
    const _safecode = await safecode("c,id,pageid,psize");
    const data = qs.stringify({pageid:1,psize:10000000,id,_safecode});
    return request.post("/api.php?c=project",data);
}