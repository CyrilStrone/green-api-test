import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInLogout {
    idInstance: string
    apiTokenInstance: string
}
export const InLogout = async (params: IInLogout) => {
    return axiosInstance.get(
        `/waInstance${params.idInstance}/Logout/${params.apiTokenInstance}`)
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
