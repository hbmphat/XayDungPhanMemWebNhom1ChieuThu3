import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from 'sonner';
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        const data: any = error.response?.data;
        if (status === 422) {
            return Promise.reject(data);
        }
        switch (status) {
            case 401:
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                break;
            case 403:
                toast.error('Unauthorized access');
                break;
            case 500:
                toast.error('Server error');
                break;
            default:
                toast.error(data?.message || 'An error occurred');
        }

        return Promise.reject(data);
    }
);
export default apiClient;