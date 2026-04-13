import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserModal from "./UserModal";
import { User } from "../../types/user-types";

describe("UserModal Organism Component", () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();
  const mockGetFieldError = vi.fn();

  const mockUser: User = {
    user_id: "1",
    user_name: "quang_admin",
    first_name: "Quang",
    last_name: "Dang",
    full_name: "Quang Dang",
    email: "quang@test.com",
    phone: "0987654321",
    address: "Ho Chi Minh City",
    date_of_birth: "2000-01-01T00:00:00.000Z",
    role: "admin",
    status: "active",
    created_at: "",
    updated_at: "",
  };

  const defaultProps = {
    isOpen: true,
    isLoading: false,
    currentUser: null,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
    getFieldError: mockGetFieldError,
  };

  it("nên không render gì nếu isOpen là false", () => {
    const { container } = render(
      <UserModal {...defaultProps} isOpen={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("nên render tiêu đề 'New User' khi ở chế độ tạo mới", () => {
    render(<UserModal {...defaultProps} />);
    expect(screen.getByText("New User")).toBeDefined();
    expect(screen.getByText("Create User")).toBeDefined();
  });

  it("nên render tiêu đề kèm username và nút Update khi ở chế độ chỉnh sửa", () => {
    render(<UserModal {...defaultProps} currentUser={mockUser} />);
    expect(screen.getByText(`Edit User: ${mockUser.user_name}`)).toBeDefined();
    expect(screen.getByText("Update Changes")).toBeDefined();
    // Kiểm tra field username bị readOnly
    const usernameInput = screen.getByDisplayValue(mockUser.user_name);
    expect(usernameInput.getAttribute("readonly")).not.toBeNull();
  });

  it("nên định dạng đúng ngày sinh khi truyền vào từ currentUser", () => {
    render(<UserModal {...defaultProps} currentUser={mockUser} />);
    const dobInput = screen.getByDisplayValue("2000-01-01") as HTMLInputElement;
    // Chuyển đổi từ ISO sang YYYY-MM-DD
    expect(dobInput.value).toBe("2000-01-01");
  });

  it("nên hiển thị thông báo lỗi khi có lỗi từ validate", () => {
    mockGetFieldError.mockImplementation((field) =>
      field === "email" ? "Email không hợp lệ" : undefined,
    );
    render(<UserModal {...defaultProps} />);
    expect(screen.getByText("Email không hợp lệ")).toBeDefined();
  });

  it("nên gọi onSubmit với đúng dữ liệu khi nhấn Submit form", async () => {
    // Mock trả về một Promise thành công
    mockOnSubmit.mockResolvedValue(undefined);

    // Render và lấy container để query sâu hơn nếu cần
    const { container } = render(<UserModal {...defaultProps} />);

    // 1. Điền dữ liệu vào các ô input bằng Placeholder
    // Lưu ý: Đảm bảo FormInput của bạn render placeholder đúng như thế này
    fireEvent.change(screen.getByPlaceholderText("user123"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("user123@gmail.com"), {
      target: { value: "test@gmail.com" },
    });

    // 2. Tìm thẻ form (UserModal của bạn có duy nhất 1 thẻ form)
    const form = container.querySelector("form");
    if (!form) throw new Error("Không tìm thấy thẻ form");

    // 3. Trigger sự kiện submit trực tiếp trên form
    fireEvent.submit(form);

    // 4. Chờ hàm onSubmit được gọi
    await waitFor(
      () => {
        expect(mockOnSubmit).toHaveBeenCalled();
      },
      { timeout: 2000 },
    ); // Tăng timeout nếu máy chạy chậm

    // 5. Kiểm tra payload gửi đi (dựa trên logic handleSubmit của bạn)
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        user_name: "testuser",
        email: "test@gmail.com",
      }),
    );
  });

  it("nên hiển thị trạng thái loading trên nút bấm", () => {
    render(<UserModal {...defaultProps} isLoading={true} />);
    expect(screen.getByText(/Creating.../i)).toBeDefined();
    expect(screen.getByRole("button", { name: /Creating.../i })).toBeDisabled();
  });

  it("nên gọi onClose khi nhấn nút đóng hoặc Cancel", () => {
    render(<UserModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();

    // Nút X icon
    const closeIconBtn = screen.getAllByRole("button")[0];
    fireEvent.click(closeIconBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });
});
