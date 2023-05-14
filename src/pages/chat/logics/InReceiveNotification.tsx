import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInReceiveNotification {
    idInstance: string
    apiTokenInstance: string
}
export const InReceiveNotification = async (params: IInReceiveNotification) => {
    return axiosInstance.get(
        `/waInstance${params.idInstance}/ReceiveNotification/${params.apiTokenInstance}`)
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
