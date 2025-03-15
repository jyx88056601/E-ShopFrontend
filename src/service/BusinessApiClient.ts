 
import { TrackNumberDTO } from "@/components/Business/BusinessOrderManagementTable";
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

     public deleteProductById(username : string, token : string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
              } 
         })
         return axiosInstance.delete(
            this.endpoint,
            { 
                params: {
                  username: username,
                }
            }
         )
     }
 

     public fetchOrdersByMerchantId(username : string, token : string, page: string, size: string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL: this.baseUrl,
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
                   page: page,
                   size:size
                }
            }
         )
     }

     public fetchOrderDetail(username : string, token : string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL: this.baseUrl,
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
                }
            }
         )
     }



     public updateShipment(username : string, token : string, trackNumber : TrackNumberDTO ) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json', 
              } 
         })
         return axiosInstance.put(
            this.endpoint,    
            trackNumber,
            { 
                params: {
                   username: username,
                }
            }
         )
     }

     public fetchShipment(username : string, token : string) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance = axios.create({
            baseURL: this.baseUrl,
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
                }
            }
         )
     }

}

export default BusinessAPIClient;