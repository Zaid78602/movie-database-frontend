export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginDto {
    email: string;
    password?: string;
}

export interface RegisterDto extends LoginDto {
    name: string;
}
