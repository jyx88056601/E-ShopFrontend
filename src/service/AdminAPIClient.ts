import { UserUpdateDTO } from "@/components/Admin/UserInfo";
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
            'Content-Type': 'application/json',  
      
          } 
      });
    }
  
    // get
    public findUserById() : Promise<AxiosResponse>  {
      return this.axiosInstance.get(this.endpoint, {
          params: {
            username:  this.username,
          }
        });
   }

    public getUsers(): Promise<AxiosResponse> {
        return this.axiosInstance.get(this.endpoint, {
            params: {
              username:  this.username,
            }
          });
     }

     // put
     public toggleUser() : Promise<AxiosResponse>  {
        return this.axiosInstance.put(this.endpoint, {
            params: {
              username:  this.username,
            }
          });
     }

     public updateUser(userUpdateDTO : UserUpdateDTO) : Promise<AxiosResponse>  { 
        return this.axiosInstance.put(this.endpoint, userUpdateDTO, {
          params: {
            username: this.username
          }
        });
     }

     // delete
     public deleteUserByUsername() :Promise<AxiosResponse>  {
        return this.axiosInstance.delete(this.endpoint, {
            params: {
              username:  this.username,
            }
          });
     }


     
    
 
  }
  
  export default AdminAPIClient;
  