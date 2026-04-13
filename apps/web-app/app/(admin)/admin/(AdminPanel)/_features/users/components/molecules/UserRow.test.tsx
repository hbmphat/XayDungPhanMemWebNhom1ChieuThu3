import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserRow from "./UserRow";
import { User } from "@admin.features/users/types/user-types";

describe("UserRow Molecule Component", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const mockUser: User = {
    user_id: "u123",
    user_name: "quang_admin",
    first_name: "Quang",
    last_name: "Nguyễn Văn",
    full_name: "Nguyễn Văn Quang",
    email: "quang@gmail.com",
    date_of_birth: "2000-01-01",
    address: "123 Đường ABC, Quận 1, HCMC",
    phone: "0123456789",
    role: "admin",
    status: "active",
    created_at: "2024-03-20T08:00:00Z",
    updated_at: "2024-03-21T09:30:00Z",
  };

  it("nên hiển thị đúng thông tin cơ bản của người dùng", () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("quang_admin")).toBeDefined();
    expect(screen.getByText("Nguyễn Văn Quang")).toBeDefined();
    expect(screen.getByText("quang@gmail.com")).toBeDefined();
    expect(screen.getByText("0123456789")).toBeDefined();
    expect(screen.getByText("01/01/2000")).toBeDefined();
  });

  it("nên hiển thị đúng Badge cho Role Admin", () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    const roleBadge = screen.getByText("Admin");
    expect(roleBadge.parentElement?.className).toContain("text-indigo-600");
    expect(roleBadge.parentElement?.className).toContain("bg-indigo-50");
  });

  it("nên hiển thị đúng màu sắc cho Status Active", () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    const statusBadge = screen.getByText(/active/i);
    expect(statusBadge.className).toContain("text-emerald-700");
  });

  it("nên hiển thị N/A khi các trường dữ liệu bị thiếu hoặc rỗng", () => {
    const emptyUser = {
      ...mockUser,
      full_name: "",
      address: "  ",
      phone: null,
    } as unknown as User;

    render(
      <table>
        <tbody>
          <UserRow
            user={emptyUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    const naElements = screen.getAllByText("N/A");
    expect(naElements.length).toBeGreaterThanOrEqual(3);
  });

  it("nên gọi hàm onEdit khi nhấn vào nút Edit", () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it("nên gọi hàm onDelete với user_id đúng khi nhấn nút Delete", () => {
    render(
      <table>
        <tbody>
          <UserRow
            user={mockUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("u123");
  });

  it("nên render Role mặc định là Customer nếu role không tồn tại trong config", () => {
    const weirdUser = { ...mockUser, role: "unknown_role" } as User;
    render(
      <table>
        <tbody>
          <UserRow
            user={weirdUser}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("Customer")).toBeDefined();
  });
});
