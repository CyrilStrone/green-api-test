import { createEvent, createStore } from "effector";
import { accessTokenName, axiosInstance } from "./axiosInstance";
import { setChatStore } from "./stores";
import { inChat } from "./inChat";

export const $accessToken = createStore<string>("")
export const setAccessToken = createEvent<string>()
$accessToken.on(setAccessToken, (_, val) => val)

$accessToken.updates.watch(async (token) => {
    localStorage.setItem(accessTokenName, (token));
    axiosInstance.defaults.headers.authorization = `Bearer ${token}`
    if(token){
        setChatStore(await inChat())
    }
});
  
export const UserLogout =()=>{
    setAccessToken("")
}