import { createEvent, createStore } from "effector";

export const $chatStore= createStore<any | null>(null)  
export const setChatStore = createEvent<any | null>()
$chatStore.on(setChatStore, (_,val)=> val);

export const $apiTokenInstance= createStore<any | null>(null)  
export const setApiTokenInstance = createEvent<any | null>()
$apiTokenInstance.on(setApiTokenInstance, (_,val)=> val);

export const $idInstance = createStore<any | null>(null)  
export const setIdInstance = createEvent<any | null>()
$idInstance.on(setIdInstance, (_,val)=> val);

export const $check = createStore<boolean>(false)  
export const setCheck = createEvent<boolean>()
$check.on(setCheck, (_,val)=> val);

