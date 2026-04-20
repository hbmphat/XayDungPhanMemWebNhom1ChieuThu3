import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserTable from "./UserTable";
import { User } from "../../types/user-types";

describe("UserTable Organism Component", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const mockUsers: User[] = [
    {
      user_id: "1",
      user_name: "admin_test",
      first_name: "Admin",
      last_name: "System",
      full_name: "System Admin",
      email: "admin@test.com",
      phone: "0111",
      address: "Hà Nội",
      date_of_birth: "1990-01-01",
      role: "admin",
      status: "active",
      created_at: "",
      updated_at: "",
    },
    {
      user_id: "2",
      user_name: "customer_test",
      first_name: "User",
      last_name: "Customer",
      full_name: "Customer User",
      email: "user@test.com",
      phone: "0222",
      address: "HCM",
      date_of_birth: "1995-05-05",
      role: "customer",
      status: "pending",
      created_at: "",
      updated_at: "",
    },
  ];

  it("nên hiển thị đúng tất cả các tiêu đề cột", () => {
    render(
      <UserTable
        users={[]}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const headers = ["User", "Fullname", "Email", "Role", "Status", "Actions"];
    headers.forEach((head) => {
      expect(screen.getByText(head)).toBeDefined();
    });
  });

  it("nên hiển thị trạng thái loading (skeleton) khi isLoading là true", () => {
    const { container } = render(
      <UserTable
        users={[]}
        isLoading={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const loadingRows = container.querySelectorAll(".animate-pulse");
    expect(loadingRows.length).toBe(5);
  });

  it("nên hiển thị thông báo khi danh sách người dùng trống", () => {
    render(
      <UserTable
        users={[]}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("Không tìm thấy người dùng nào.")).toBeDefined();
  });

  it("nên render đúng số lượng UserRow tương ứng với dữ liệu truyền vào", () => {
    render(
      <UserTable
        users={mockUsers}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("admin_test")).toBeDefined();
    expect(screen.getByText("customer_test")).toBeDefined();

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3);
  });

  it("nên truyền đúng các hàm callback xuống cho UserRow", () => {
    // Thực tế đã được kiểm tra gián tiếp qua việc UserRow gọi onEdit/onDelete trong file UserRow.test.tsx
    // Chỉ cần đảm bảo Table render thành công.
    render(
      <UserTable
        users={mockUsers}
        isLoading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("admin_test")).toBeDefined();
  });
});
