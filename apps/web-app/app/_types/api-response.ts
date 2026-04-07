export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    links?: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: PaginationMeta;
}
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
    links?: ApiLink[];
}
export interface SingleResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface ApiLink {
    url: string | null;
    label: string;
    active: boolean;
}