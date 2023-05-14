import { createEvent, createStore } from "effector";

export const $chatStore= createStore<any | null>(null)  
export const setChatStore = createEvent<any | null>()
$chatStore.on(setChatStore, (_,val)=> val);

export const $apiTokenInstance= createStore<string>("")  
export const setApiTokenInstance = createEvent<string>()
$apiTokenInstance.on(setApiTokenInstance, (_,val)=> val);

export const $idInstance = createStore<string>("")  
export const setIdInstance = createEvent<string>()
$idInstance.on(setIdInstance, (_,val)=> val);

export const $check = createStore<boolean>(false)  
export const setCheck = createEvent<boolean>()
$check.on(setCheck, (_,val)=> val);

export const $authorization = createStore<boolean>(false)  
export const setAuthorization = createEvent<boolean>()
$authorization.on(setAuthorization, (_,val)=> val);

