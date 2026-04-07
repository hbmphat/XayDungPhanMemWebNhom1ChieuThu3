import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from 'sonner';

interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);


apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 422) {
            return Promise.reject(data || error);
        }

        if (typeof window !== 'undefined') {
            switch (status) {
                case 401:
                    localStorage.removeItem('access_token');
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    break;
                case 403:
                    toast.error('Bạn không có quyền truy cập');
                    break;
                case 500:
                    toast.error('Lỗi hệ thống (500)');
                    break;
                default:
                    toast.error(data?.message || 'Đã xảy ra lỗi không xác định');
            }
        }

        return Promise.reject(data || error);
    }
);

declare module "axios" {
    export interface AxiosInstance {
        request<T = unknown, R = T, D = unknown>(config: AxiosRequestConfig<D>): Promise<R>;
        get<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        delete<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        head<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        options<T = unknown, R = T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        post<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
        put<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
        patch<T = unknown, R = T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    }
}

export default apiClient;