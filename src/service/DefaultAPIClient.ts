import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserSignupDTO, UserLoginDTO } from '@/data/entities';  // 假设你已经定义了这个类型

// 定义通用的 FetchResponse 类型，适用于返回分页数据的接口
// export interface FetchResponse<T> {
//   count: number;
//   next: string | null;
//   results: T[];
// }

class DefaultAPIClient {
  endpoint: string;
  axiosInstance: AxiosInstance;


  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8080', 
    });
  }

  // post 
  public signup(userSignupDTO: UserSignupDTO): Promise<AxiosResponse> {
      return this.axiosInstance.post(this.endpoint, userSignupDTO);
   }

  public signin(userLoginDTO:UserLoginDTO): Promise<AxiosResponse> {
    return this.axiosInstance.post(
      this.endpoint,
      userLoginDTO,
      {
        params: {
          username: userLoginDTO.username,
          password: userLoginDTO.password
        }
      }
    );
  }
}

export default DefaultAPIClient;
