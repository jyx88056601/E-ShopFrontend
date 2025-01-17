export interface UserSignupDTO {
    username : string;
    email: string;
    password: string;
    phoneNumber: string;
    role: Role,
}

export enum Role {
    ROLE_BUYER,
    ROLE_SELLER
}
 