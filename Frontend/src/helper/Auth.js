export const doLoginStorage = (token) => {
    localStorage.setItem("token", JSON.stringify(token)); 
};
export const getToken = () => {
   const token= localStorage.getItem("token")
    return JSON.parse(token); 
};
export const doLogoutStorage=()=>{
    localStorage.removeItem("token");
}
export const isUserLoggedIn = () => {
    return getToken() !== null;
};

export const getAccessToken = () => {
    const token = getToken();
    return token ? token.access_token ?? null : null;
};

export const getRefreshToken = () => {
    const token = getToken();
    return token ? token.refresh_token ?? null : null;
};

export const getTokenType = () => {
    const token = getToken();
    return token ? token.token_type ?? null : null;
};

