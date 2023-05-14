import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInSendMessage {
    idInstance: string
    apiTokenInstance: string
    chatId:string
    message:string
}
export const InSendMessage = async (params: IInSendMessage) => {
    return axiosInstance.post(
        `/waInstance${params.idInstance}/SendMessage/${params.apiTokenInstance}`,{
            "chatId": params.chatId + "@c.us",
            "message":params.message
        })
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
