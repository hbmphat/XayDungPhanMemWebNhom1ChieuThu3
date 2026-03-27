export interface BaseResponse<T> {
    success: boolean;
    message: string | null;
    data: T;
    errors: any;
    links?: any;
    meta?: any;
}
export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    path?: string;
    from?: number;
    to?: number;
}