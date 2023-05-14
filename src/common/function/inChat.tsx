import { axiosInstance } from "./axiosInstance";

export const inChat = async () => {
    return axiosInstance.get(
        `/profile`)
        .then((res: any) => {
                return (res.data)
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        })
}
