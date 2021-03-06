import React from 'react';
import { logoutRequest } from '../utils/requests'

var defaultUser = {
  id: -1,
  username: "test",
  roleId: "ROLE_CUSTOMER",
  email: "",
  nickName: "test",
  avatar: "https://oss.fd.shimonzhan.com/user/user0.png",
  token: "",
};

const key = "fdUser"

const UserContext = React.createContext(defaultUser, ()=>{return 1;}, ()=>{return 1;}, ()=>{return 1;});
export const useUserContext = () => React.useContext(UserContext);

const setUserToLocalstorage = (user) => {
  window.localStorage.setItem(
    key,
    JSON.stringify(user)
  );
};

export const removeUserFromLocalstorage = () => {
  window.localStorage.removeItem(key)
}

export const getUserFromLocalstorage = () => {
  let storageUser = window.localStorage.getItem(key);
  if (storageUser) return JSON.parse(storageUser);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(getUserFromLocalstorage() || defaultUser);

  const login = (userdata) => {
    setUser(userdata);
    setUserToLocalstorage(userdata);
  };
  
  const register = () => {
  };
  
  const logout = () => {
    removeUserFromLocalstorage();
    setUser(defaultUser);
    logoutRequest();
  };

  return (
    <UserContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const UseUser = () => {
  const context = React.useContext(UserContext);
  if (!context) throw new Error("UseUser error");
  return context;
};

