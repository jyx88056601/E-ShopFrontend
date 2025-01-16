// import axios, { AxiosRequestConfig } from 'axios';
import axios from 'axios'
;
export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  params: {
    // 可以在此处配置全局参数，或通过 config 参数传递
  }
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // 获取数据
  // getData = (config?: AxiosRequestConfig) => {
  //   return axiosInstance
  //     .get<FetchResponse<T>>(this.endpoint, config)
  //     .then((res) => res.data);
  // };

  // 根据 ID 获取单个数据
  // get = (id: number | string) => {
  //   return axiosInstance.get<T>(`${this.endpoint}/${id}`).then((res) => res.data);
  // };

  getIndex = async () => {
    const res = await axiosInstance.get<FetchResponse<T>>(this.endpoint);
    return res.data;
  }
}

export default APIClient;
