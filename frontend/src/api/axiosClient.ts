import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_URL_BACK_END,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => config, (error) => Promise.reject(error));

// Add a response interceptor
axiosClient.interceptors.response.use((response: AxiosResponse) => response.data, (error) => Promise.reject(error));

export default axiosClient
