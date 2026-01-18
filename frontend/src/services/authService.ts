import api from './api';
import { useAuthStore } from '../store/useAuthStore';

// Assuming these types based on AuthenticationController
export interface AuthResponse {
    token: string;
    // backend might return more info, but token is key
}

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role?: string; // ADMIN, MANAGER
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const authService = {
    async register(data: RegisterRequest) {
        const response = await api.post<AuthResponse>('/auth/register', data);
        if (response.data.token) {
            useAuthStore.getState().setAuth({ email: data.email }, response.data.token);
        }
        return response.data;
    },

    async login(data: LoginRequest) {
        const response = await api.post<AuthResponse>('/auth/login', data);
        // Assuming backend returns token. 
        // If backend returns just token string or object, adjust here.
        // Based on AuthenticationController: ResponseEntity.ok(service.authenticate(request));
        // AuthenticationResponse usually contains token.

        if (response.data.token) {
            useAuthStore.getState().setAuth({ email: data.email }, response.data.token);
        }
        return response.data;
    },

    logout() {
        useAuthStore.getState().logout();
    }
};
