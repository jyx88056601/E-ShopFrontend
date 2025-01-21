import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserSignupDTO, UserLoginDTO } from '../data/entities'; 
  
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

  public logout() : Promise<AxiosResponse> {
    return this.axiosInstance.post(this.endpoint)
  }
}

export default DefaultAPIClient;
