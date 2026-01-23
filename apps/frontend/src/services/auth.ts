import { api } from "./api";
import { setAccessToken, clearAccessToken } from "./auth-token";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
}

export const login = async (data: LoginData): Promise<void> => {
    const response = await api.post('/auth/login', data);
    setAccessToken(response.data.accessToken);
};

export const register = async (data: RegisterData): Promise<void> => {
    const response = await api.post('/auth/register', data);
    setAccessToken(response.data.accessToken);
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
    clearAccessToken();
};

export const fetchUserProfile = async () => {
    const response = await api.get('/auth/me');
    return response.data.user;
};
