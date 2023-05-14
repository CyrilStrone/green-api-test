import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInDeleteNotification {
    idInstance: string
    apiTokenInstance: string
    receiptId: string
}
export const InDeleteNotification = async (params: IInDeleteNotification) => {
    return axiosInstance.delete(
        `/waInstance${params.idInstance}/DeleteNotification/${params.apiTokenInstance}/${params.receiptId}`)
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
