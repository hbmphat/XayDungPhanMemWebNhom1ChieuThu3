import { UserInput } from "@admin.features/users/types/user-types";
import { Rules, validateRunner, ValidationRuleFn } from "@shared/utils/validation/rules";
// Regex patterns
const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^(0|84)(3|5|7|8|9)[0-9]{8}$/,
};
// Rules chung cho create và update
const commonRules: Partial<Record<keyof UserInput, ValidationRuleFn[]>> = {
    user_name: [Rules.minLength(4), Rules.maxLength(50)],
    first_name: [Rules.minLength(4), Rules.maxLength(50)],
    last_name: [Rules.minLength(4), Rules.maxLength(50)],
    address: [Rules.minLength(2), Rules.maxLength(100)],
    email: [Rules.regex(REGEX.EMAIL, "Email sai định dạng.")],
    phone: [Rules.regex(REGEX.PHONE, "Số điện thoại không hợp lệ.")],
    date_of_birth: [Rules.notFutureDate()]
};
// Hàm gộp rules chung và riêng
const combine = (field: keyof UserInput, extraRules: ValidationRuleFn[]) => {
    return [...extraRules, ...(commonRules[field] || [])];
};
export const validateUserCreate = (data: UserInput) => {
    // Schema validation cho create
    const schema: Partial<Record<keyof UserInput, ValidationRuleFn[]>> = {
        user_name: combine("user_name", [Rules.required()]),
        first_name: combine("first_name", [Rules.required()]),
        last_name: combine("last_name", [Rules.required()]),
        email: combine("email", [Rules.required()]),
        address: combine("address", [Rules.required()]),
        phone: combine("phone", [Rules.required()]),
        date_of_birth: combine("date_of_birth", [Rules.required()]),
        password: [Rules.required(), Rules.minLength(8), Rules.maxLength(50)],
        status: [Rules.required()],
        role: [Rules.required()],
    };

    return validateRunner(schema, data);
};
export const validateUserUpdate = (data: UserInput) => {
    const updateSchema: Partial<Record<keyof UserInput, ValidationRuleFn[]>> = {
        ...commonRules,
        password: [Rules.minLength(8), Rules.maxLength(50)],
    };
    return validateRunner(updateSchema, data);
};