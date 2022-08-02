export interface UserLogin {
    username: string,
    password: string,
}

export interface UserInfo {
    user: Username
    access_token: string,
    tokenType: string,

}
export interface Username {
    username: string,
    userId: string

}

export interface User {
    username: string,
    email: string,
    password: string,
    category: any[],//usar otra interface
}
