// Định nghĩa các quy tắc validation
export const Rules = {
    required: () => (value: any) => {
        const isValid = value !== undefined && value !== null && value.toString().trim() !== "";
        return isValid || "Trường này không được để trống.";
    },

    minLength: (min: number) => (value: string) => {
        return (value && value.length >= min) || `Phải có ít nhất ${min} ký tự.`;
    },
    maxLength: (max: number) => (value: string) => {
        return (value && value.length <= max) || `Tối đa ${max} ký tự.`;
    },

    regex: (pattern: RegExp, message: string) => (value: string) => {
        return (!value || pattern.test(value)) || message;
    },

    notFutureDate: () => (value: string) => {
        if (!value) return true;
        return (new Date(value) <= new Date()) || "Ngày không được lớn hơn hiện tại.";
    }
};
// Kiểu cho một hàm Rule
export type ValidationRuleFn = (value: any) => true | string;
// Hàm chạy validation
export const validateRunner = <T>(schema: Partial<Record<keyof T, ValidationRuleFn[]>>, data: T) => {
    const errors: Record<string, string[]> = {};

    Object.entries(schema).forEach(([field, rules]) => {
        const value = data[field as keyof T];

        if (value !== undefined) {
            (rules as ValidationRuleFn[]).forEach((ruleFn) => {
                const result = ruleFn(value);
                if (result !== true) {
                    if (!errors[field]) errors[field] = [];
                    if (!errors[field].includes(result)) {
                        errors[field].push(result);
                    }
                }
            });
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};