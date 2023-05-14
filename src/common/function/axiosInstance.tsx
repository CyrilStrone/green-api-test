import axios, { AxiosError } from "axios";

export const accessTokenName = "greenApiTestToken"

export const axiosInstance = axios.create({
    baseURL: "https://api.green-api.com"
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.log("401")
    }
  }
);


