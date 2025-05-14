import { publicApi } from "./Axios.service"

export  const loginUser=(data)=>{
    return publicApi.post("/auth/login",data);
}
export const registerUser=(data)=>{
    return publicApi.post("/auth/register",data)
}