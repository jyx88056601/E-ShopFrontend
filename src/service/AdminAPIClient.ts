import axios, { AxiosInstance, AxiosResponse } from "axios";

 
class AdminAPIClient {
    endpoint: string;
    axiosInstance: AxiosInstance;
    username : string | null;
  
    constructor(endpoint: string, token : string | null, username : string | null) {
      this.endpoint = endpoint;
      this.username = username;
      this.axiosInstance = axios.create({
        baseURL: 'http://localhost:8080/admin', 
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
          } 
      });
    }
  
    // get
    public getUsers(): Promise<AxiosResponse> {
        return this.axiosInstance.get(this.endpoint, {
            params: {
              username:  this.username,
            }
          });
     }

     public toggleUser() :Promise<AxiosResponse>  {
        return this.axiosInstance.put(this.endpoint, {
            params: {
              username:  this.username,
            }
          });
     }
  
 
  }
  
  export default AdminAPIClient;
  