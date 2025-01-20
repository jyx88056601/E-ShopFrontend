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
 