export type ValidationRuleFn = (value: unknown) => true | string;

export const Rules = {
    required: () => (value: unknown): true | string => {
        const isValid = value !== undefined && value !== null && String(value).trim() !== "";
        return isValid || "This field is required.";
    },

    minLength: (min: number) => (value: unknown): true | string => {
        if (!value) return true;
        const str = String(value); // Đảm bảo luôn là string để check length
        return str.length >= min || `Must be at least ${min} characters.`;
    },

    maxLength: (max: number) => (value: unknown): true | string => {
        if (!value) return true;
        const str = String(value);
        return str.length <= max || `Maximum ${max} characters allowed.`;
    },

    regex: (pattern: RegExp, message: string) => (value: unknown): true | string => {
        const str = String(value || "");
        return (!value || pattern.test(str)) || message;
    },

    notFutureDate: () => (value: unknown): true | string => {
        if (!value) return true;
        const inputDate = new Date(value as string);
        if (isNaN(inputDate.getTime())) return "Invalid date format.";

        inputDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return (inputDate <= today) || "Date cannot be in the future.";
    }
};

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