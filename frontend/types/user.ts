export interface User {
    username: string;
    points: number;
    token?: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}
