import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, setAccessToken, clearAccessToken } from "./auth-token";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const refreshAuthLogic = async (failedRequest: any) => {
    try {
        const response = await api.post('/auth/refresh', {}, { skipAuthRefresh: true })
        const newToken = response.data.accessToken;

        setAccessToken(newToken);

        failedRequest.response.config.headers['Authorization'] = `Bearer ${newToken}`
        return Promise.resolve();
    } catch (err) {
        clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(err)
    }
}

createAuthRefreshInterceptor(api, refreshAuthLogic);