export interface UserLogin {
    username: string,
    password: string,
}

export interface UserInfo {
    access_token: string,
    tokenType: string,
    user: Username
}

export interface Username {
    userId: string,
    username: string
}

export interface User {
    username: string,
    email: string,
    password: string,
    category: any[],//usar otra interface 
}