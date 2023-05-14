import axios, { AxiosError } from "axios";
import { setAccessToken } from "./accessToken";

export const accessTokenName = "greenApiTestToken"

export const axiosInstance = axios.create({
    baseURL: "https://api.green-api.com",
    headers: {
		authorization: `Bearer ${localStorage.getItem(accessTokenName)}`
	},
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log("error",error)
    if (error?.response?.status === 401) {
      console.log("401")
      setAccessToken("")
    }
  }
);


