export interface User {
    id?: string;
    username?: string | null | undefined;
    email?: string;
    accessToken?: string;
    isAdmin?: boolean;
}

export interface newUserRequest {
    password: string;
    email: string;
    username: string;
}
