import { privateApi } from "./Axios.service"

export const createExpense=(data)=>{
    return privateApi.post("/expenses/",data)
}
export const getUserExpanse=()=>{
    return privateApi.get("/expenses/")
}
export const getAIResponse=()=>{
    return privateApi.get("/expenses/analysis")
}