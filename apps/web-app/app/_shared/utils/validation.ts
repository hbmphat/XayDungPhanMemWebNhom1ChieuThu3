import { UserInput } from "@app/_types/users/user-types";

export type ValidationErrors = Record<string, string[]>;

export const validateUser = (data: UserInput): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {};

    // 1. Validate User Name
    if (!data.user_name || data.user_name.trim().length < 4) {
        errors.user_name = ["Tên đăng nhập phải có ít nhất 4 ký tự."];
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = ["Email không đúng định dạng."];
    }

    // 3. Validate Password (Chỉ check khi tạo mới hoặc nếu có nhập)
    if (data.password !== undefined && data.password.length < 8) {
        errors.password = ["Mật khẩu phải có ít nhất 8 ký tự."];
    }

    // 4. Validate Date of Birth
    if (data.date_of_birth) {
        const selectedDate = new Date(data.date_of_birth);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            errors.date_of_birth = ["Ngày sinh không hợp lệ."];
        }
    }

    // 5. Validate Phone
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (data.phone && !phoneRegex.test(data.phone)) {
        errors.phone = ["Số điện thoại không đúng định dạng."];
    }

    // 6. Validate First Name & Last Name
    if (!data.first_name?.trim()) {
        errors.first_name = ["Vui lòng nhập họ"];
    }
    if (!data.last_name?.trim()) {
        errors.last_name = ["Vui lòng nhập tên"];
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};