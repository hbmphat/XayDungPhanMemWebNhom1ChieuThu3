import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormInput from "./FormInput";
import { User } from "lucide-react"; // Import 1 icon bất kỳ để test

// Mock Lucide Icon để tránh render SVG phức tạp trong test
vi.mock("lucide-react", () => ({
  User: () => <div data-testid="mock-icon" />,
}));

describe("FormInput Atom Component", () => {
  const defaultProps = {
    label: "Username",
    name: "user_name",
    icon: User,
    placeholder: "Nhập tên đăng nhập",
  };

  it("nên hiển thị đúng label và placeholder", () => {
    render(<FormInput {...defaultProps} />);

    expect(screen.getByText(/Username/i)).toBeDefined();
    expect(screen.getByPlaceholderText("Nhập tên đăng nhập")).toBeDefined();
  });

  it("nên hiển thị nhãn (Optional) khi truyền prop optional", () => {
    render(<FormInput {...defaultProps} optional={true} />);
    expect(screen.getByText("(Optional)")).toBeDefined();
  });

  it("nên hiển thị thông báo lỗi và áp dụng class border-error khi có error", () => {
    const errorMessage = "Trường này là bắt buộc";
    render(<FormInput {...defaultProps} error={errorMessage} />);

    // Kiểm tra tin nhắn lỗi hiển thị
    expect(screen.getByText(errorMessage)).toBeDefined();

    // Kiểm tra input có class border-error (dựa trên code UI của bạn)
    const input = screen.getByPlaceholderText("Nhập tên đăng nhập");
    expect(input.className).toContain("border-error");
    expect(input.className).toContain("bg-error-container/20");
  });

  it("nên render textarea khi isTextArea là true", () => {
    const { container } = render(
      <FormInput {...defaultProps} isTextArea={true} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeDefined();
    expect(textarea?.name).toBe("user_name");
  });

  it("nên có thuộc tính readOnly khi truyền prop readOnly", () => {
    render(<FormInput {...defaultProps} readOnly={true} />);

    const input = screen.getByPlaceholderText(
      "Nhập tên đăng nhập",
    ) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("nên hiển thị đúng icon đi kèm", () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByTestId("mock-icon")).toBeDefined();
  });

  it("nên áp dụng defaultValue nếu được cung cấp", () => {
    render(<FormInput {...defaultProps} defaultValue="admin123" />);

    const input = screen.getByPlaceholderText(
      "Nhập tên đăng nhập",
    ) as HTMLInputElement;
    expect(input.value).toBe("admin123");
  });
});
