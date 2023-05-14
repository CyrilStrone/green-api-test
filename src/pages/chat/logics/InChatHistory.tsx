import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInChatHistory {
    idInstance: string
    apiTokenInstance: string
    chatId: string
}
export const InChatHistory = async (params: IInChatHistory) => {
    return axiosInstance.post(
        `/waInstance${params.idInstance}/GetChatHistory/${params.apiTokenInstance}`, {
        "chatId": params.chatId + "@c.us"
    })
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
