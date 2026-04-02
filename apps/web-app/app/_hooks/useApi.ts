import { useState, useCallback } from "react";

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null);

    const request = useCallback(async (
        apiCall: () => Promise<any>
    ) => {
        setLoading(true);
        setErrors(null);
        try {
            const response = await apiCall();
            setData(response.data);
            return { success: true, data: response.data };
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, errors, request, setErrors };
}