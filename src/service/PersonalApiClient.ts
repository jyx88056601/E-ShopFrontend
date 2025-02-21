import axios, { AxiosInstance, AxiosResponse } from "axios";

class PersonalAPIClient {
    endpoint: string;
    baseUrl : string;
    username : string;
    token : string;

     constructor(endpoint: string, username:string, token:string) {
        this.endpoint = endpoint;
        this.username = username;
        this.token = token;
        this.baseUrl = 'http://localhost:8080/personal';
    }

    public displayProducts(page : string, size : string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance =  axios.create({
            baseURL : this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json', 
              } 
        })
        return axiosInstance.get(
            this.endpoint,
            {
                params: {
                    username:this.username ,
                    page:page,
                    size:size
                }
            }
        )
    }

    public findProductById() : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance =  axios.create({
            baseURL : this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json', 
              } 
        })
        return axiosInstance.get(
            this.endpoint,
            {
                params: {
                    username:this.username ,
                }
            }
        )
    }

}

export default PersonalAPIClient;