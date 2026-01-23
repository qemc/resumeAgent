import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAccessToken, setAccessToken, clearAccessToken } from '../services/auth-token';
import { api } from '../services/api';

interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on mount (silent refresh)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to refresh the token using the HttpOnly cookie
                const response = await api.post('/auth/refresh', {}, { skipAuthRefresh: true });
                setAccessToken(response.data.accessToken);

                // Fetch user profile
                const profileResponse = await api.get('/auth/me');
                setUser(profileResponse.data.user);
            } catch {
                // Not authenticated - that's okay
                clearAccessToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        setAccessToken(response.data.accessToken);

        const profileResponse = await api.get('/auth/me');
        setUser(profileResponse.data.user);
    };

    const register = async (email: string, password: string) => {
        const response = await api.post('/auth/register', { email, password });
        setAccessToken(response.data.accessToken);

        const profileResponse = await api.get('/auth/me');
        setUser(profileResponse.data.user);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            clearAccessToken();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
