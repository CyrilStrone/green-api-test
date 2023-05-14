import { axiosInstance } from "../../../common/function/axiosInstance";

export interface IInCheckNumber {
    idInstance: string
    apiTokenInstance: string
    phone:string
}
export const InCheckNumber = async (params: IInCheckNumber) => {
    return axiosInstance.post(
        `/waInstance${params.idInstance}/CheckWhatsapp/${params.apiTokenInstance}`,{
            "phoneNumber": params.phone
        })
        .then((res: any) => {
            return res.data
        })
        .catch((error: any) => {
            throw new Error(error.response.data.message);
        })
}
