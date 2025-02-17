import axios, { AxiosInstance, AxiosResponse } from "axios";


class BusinessAPIClient {
    endpoint: string;
    baseUrl : string;
   
    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.baseUrl = 'http://localhost:8080/business';
    }

    public uploadProduct(username: string, token : string, formData : FormData) : Promise<AxiosResponse> {
            const axiosInstance : AxiosInstance = axios.create({
                baseURL:  this.baseUrl,
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data', 
                  } 
             })
            return axiosInstance.post(
                this.endpoint,
                formData,
                { 
                    params: {
                      username: username
                    }
                }
            )
    }

    public displayAllProducts(username: string, token : string, page: string, size : string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL:  this.baseUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
              } 
         })
        return axiosInstance.get(
            this.endpoint,
            { 
                params: {
                  username: username,
                  page : page,
                  size : size
                }
            }
        )
     }

}

export default BusinessAPIClient;