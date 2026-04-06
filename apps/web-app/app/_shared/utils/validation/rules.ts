// Định nghĩa các quy tắc validation
export const Rules = {
    required: () => (value: any) => {
        const isValid = value !== undefined && value !== null && value.toString().trim() !== "";
        return isValid || "This field is required.";
    },

    minLength: (min: number) => (value: string) => {
        if (!value) return true;
        return value.length >= min || `Must be at least ${min} characters.`;
    },
    maxLength: (max: number) => (value: string) => {
        if (!value) return true;
        return value.length <= max || `Maximum ${max} characters allowed.`;
    },

    regex: (pattern: RegExp, message: string) => (value: string) => {
        return (!value || pattern.test(value)) || message;
    },

    notFutureDate: () => (value: string) => {
        if (!value) return true;
        const inputDate = new Date(value);
        inputDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return (inputDate <= today) || "Date cannot be in the future.";
    }
};
// Kiểu cho một hàm Rule
export type ValidationRuleFn = (value: any) => true | string;
// Hàm chạy validation
export const validateRunner = <T>(schema: Partial<Record<keyof T, ValidationRuleFn[]>>, data: T) => {
    const errors: Record<string, string[]> = {};

    Object.entries(schema).forEach(([field, rules]) => {
        const value = data[field as keyof T];
        const ruleList = rules as ValidationRuleFn[];

        ruleList.forEach((ruleFn) => {
            const result = ruleFn(value);
            if (result !== true) {
                if (!errors[field]) errors[field] = [];
                if (!errors[field].includes(result)) {
                    errors[field].push(result);
                }
            }
        });
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};