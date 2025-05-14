import { useEffect, useState } from "react"
import { doLoginStorage, doLogoutStorage, isUserLoggedIn } from "../helper/Auth"
import AuthContest from "./AuthContext";
import { useNavigate } from "react-router";

const AuthProvider=({children})=>{
    const [isLogin,setLogin]=useState(false)
    const redirect=useNavigate()
    useEffect(()=>{
        setLogin(isUserLoggedIn())
    },[]);
    const login=(token)=>{
        doLoginStorage(token);
        
        setLogin(true);
    }
    const logout=()=>{
        doLogoutStorage();
        setLogin(false);
        redirect("/")
    }
    return(
        <AuthContest.Provider
        value={
            {
                isLogin:isLogin,
                login:login,
                logout:logout
            }
        }
        >

            {children}
        </AuthContest.Provider>
    )
}
export default AuthProvider;