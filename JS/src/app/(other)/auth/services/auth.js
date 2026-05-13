const EMAIL_KEY= "emailLogin";
const TOKEN_KEY = "authToken";
const ROLE_KEY = "role";

export const setLoginEmail = (email) => { 
  sessionStorage.setItem(EMAIL_KEY, email);
};


export const getLoginEmail = () => { 
  return sessionStorage.getItem(EMAIL_KEY);
};


export const clearLoginEmail = () => { 
  sessionStorage.removeItem(EMAIL_KEY);
};



export const setToken = (token) => { 
  sessionStorage.setItem(TOKEN_KEY, token);
};


export const getToken = () => { 
  return sessionStorage.getItem(TOKEN_KEY);
};


export const clearToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};


export const setUserRole = (role) => {
  sessionStorage.setItem(ROLE_KEY, role);
};


export const getUserRole = () => {
  return sessionStorage.getItem(ROLE_KEY);
};


export const clearUserRole = () => {
  sessionStorage.removeItem(ROLE_KEY);
};

export const isAuthenticated = () => { 
  return !!getToken();
};


export const logout = () => {
  clearToken();
  clearLoginEmail();
  clearUserRole();
};
