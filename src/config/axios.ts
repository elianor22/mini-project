import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const createAxiosInstance = () => {
  // got referance from google how to check client or server side
  const isServer = typeof window === "undefined";
  const baseUrl: string | undefined = isServer
    ? process.env.NEXT_PUBLIC_BASE_URL_API
    : process.env.NEXT_PUBLIC_BASE_URL;

  return axios.create({
    baseURL: baseUrl,
    timeout: 5000, // Set timeout for requests (optional)
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig) => {
    //implement token
    //example storing token in local storage
    // const token = localStorage.getItem("token");
    // if (token && config.headers) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("General error:", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
