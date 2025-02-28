import { CartItemRequestDTO, OrderRequestDTO} from "@/data/entities";
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

    public findCartById() : Promise<AxiosResponse> {
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
                    username: this.username,
                }
            }
        )
    }

    public addCartItemsToCart(cartItemRequestDTOList :  CartItemRequestDTO[]) : Promise<AxiosResponse> {
        const axiosInstance : AxiosInstance =  axios.create({
            baseURL : this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json', 
              } 
        })
        return axiosInstance.post(
            this.endpoint,
            cartItemRequestDTOList,
            {
                params: {
                    username: this.username,
                }
            }
        )
    }

    public deleteCartItems(ids : Set<string>) : Promise<AxiosResponse>{
        const axiosInstance : AxiosInstance =  axios.create({
            baseURL : this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json', 
              } 
        })
        return axiosInstance.delete(
            this.endpoint,
            {
                params: {
                    username: this.username,
                },
                data: Array.from(ids),   
            }
        )
    }

    public placeOrder(orderRequestDTO:OrderRequestDTO) : Promise<AxiosResponse>{ 
        const axiosInstance : AxiosInstance =  axios.create({
            baseURL : this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json', 
              } 
        })
        return axiosInstance.post(
            this.endpoint,
            orderRequestDTO,
            {
                params: {
                   
                    username: this.username,
                   
                } 
            }
        )
    }

    public fetchOrders(page: string, size:string) : Promise<AxiosResponse> {
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
                    username: this.username,
                    page: page,
                    size:size
                } 
            }
        )
    }

}

export default PersonalAPIClient;