import { describe, it, expect } from "vitest";
import { validateUserCreate, validateUserUpdate } from "./user.validation";
import { UserInput } from "@admin.features/users/types/user-types";

describe("User Validation Service", () => {
    const validUser: UserInput = {
        user_name: "admin123",
        first_name: "Nguyen",
        last_name: "Van A",
        email: "admin@example.com",
        phone: "0987654321",
        address: "123 Street, HCM",
        date_of_birth: "2000-01-01",
        password: "password123",
        status: "active",
        role: "admin"
    };

    describe("validateUserCreate", () => {
        it("nên trả về isValid = true nếu dữ liệu hợp lệ", () => {
            const result = validateUserCreate(validUser);
            expect(result.isValid).toBe(true);
            expect(Object.keys(result.errors).length).toBe(0);
        });

        it("nên báo lỗi nếu thiếu các trường bắt buộc", () => {
            const emptyData = {} as UserInput;
            const { errors, isValid } = validateUserCreate(emptyData);

            expect(isValid).toBe(false);
            expect(errors.user_name).toBeDefined();
            expect(errors.email).toBeDefined();
            expect(errors.password).toBeDefined();
        });

        it("nên báo lỗi nếu email sai định dạng", () => {
            const invalidEmail = { ...validUser, email: "invalid-email" };
            const { errors } = validateUserCreate(invalidEmail);
            expect(errors.email[0]).toContain("Email sai định dạng.");
        });

        it("nên báo lỗi nếu số điện thoại không hợp lệ", () => {
            const invalidPhone = { ...validUser, phone: "123456" };
            const { errors } = validateUserCreate(invalidPhone);
            expect(errors.phone).toBeDefined();
        });

        it("nên báo lỗi nếu ngày sinh ở tương lai", () => {
            const futureDate = { ...validUser, date_of_birth: "2099-01-01" };
            const { errors } = validateUserCreate(futureDate);
            expect(errors.date_of_birth).toBeDefined();
        });
    });

    describe("validateUserUpdate", () => {
        it("nên cho phép không gửi password khi cập nhật", () => {
            const updateData = { ...validUser };
            delete updateData.password;

            const { errors } = validateUserUpdate(updateData);
            expect(errors.password).toBeUndefined();
        });

        it("nên báo lỗi nếu user_name quá ngắn (dưới 4 ký tự)", () => {
            const updateData = { ...validUser, user_name: "abc" };
            const { errors } = validateUserUpdate(updateData);
            expect(errors.user_name).toBeDefined();
        });
    });
});