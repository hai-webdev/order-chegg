import request from "./request";

export default async function(){
    return request.get("/api.php?c=logout");
}