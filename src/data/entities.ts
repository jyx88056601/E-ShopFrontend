export interface UserSignupDTO {
    username : string;
    email: string;
    phoneNumber: string;
    password: string;
    role: Role,
}

export interface UserLoginDTO {
    username : string;
    password: string;
}

export enum Role {
    ROLE_BUYER,
    ROLE_SELLER
}


export type ProductDTO = {
    name : string;
    price :  number;
    stock : number;
    category : string;
    description : string;
    images: File[];
}


export type ProductDetailDTO = {
    id : string;
    name: string;
    price: string;
    stock: string;
    category: string;
    createdTime: string;
    updatedTime: string;
    awsUrls: string[];
    mainPictureUrl: string;
    description:string;
}

export type  CartItemRequestDTO = {
     product_id : string;
     quantity : string;
}