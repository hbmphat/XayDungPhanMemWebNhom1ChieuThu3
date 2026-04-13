import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchFilter from "./SearchFilter";

describe("SearchFilter Molecule Component", () => {
  const mockOnSearchChange = vi.fn();
  const mockOnRoleChange = vi.fn();
  const mockOnStatusChange = vi.fn();

  const defaultProps = {
    searchTerm: "",
    roleFilter: "",
    statusFilter: "",
    onSearchChange: mockOnSearchChange,
    onRoleChange: mockOnRoleChange,
    onStatusChange: mockOnStatusChange,
  };

  it("nên render đầy đủ ô input và các dropdown filter", () => {
    render(<SearchFilter {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/Search by name, email.../i),
    ).toBeDefined();
    expect(screen.getByText("All Roles")).toBeDefined();
    expect(screen.getByText("All Status")).toBeDefined();
  });

  it("nên gọi onSearchChange khi người dùng nhập văn bản", () => {
    render(<SearchFilter {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Search by name, email.../i);
    fireEvent.change(input, { target: { value: "quang" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("quang");
  });

  it("nên hiển thị nút X và xóa nội dung khi nhấn vào nút X", () => {
    // Render với searchTerm có giá trị để nút X xuất hiện
    render(<SearchFilter {...defaultProps} searchTerm="admin" />);

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith("");
  });

  it("nên gọi onRoleChange khi thay đổi lựa chọn Role", () => {
    render(<SearchFilter {...defaultProps} />);

    const roleSelect = screen.getByDisplayValue("All Roles");
    fireEvent.change(roleSelect, { target: { value: "admin" } });

    expect(mockOnRoleChange).toHaveBeenCalledWith("admin");
  });

  it("nên gọi onStatusChange khi thay đổi lựa chọn Status", () => {
    render(<SearchFilter {...defaultProps} />);

    const statusSelect = screen.getByDisplayValue("All Status");
    fireEvent.change(statusSelect, { target: { value: "active" } });

    expect(mockOnStatusChange).toHaveBeenCalledWith("active");
  });

  it("nên hiển thị đúng giá trị đang được chọn từ props", () => {
    render(
      <SearchFilter
        {...defaultProps}
        searchTerm="test_user"
        roleFilter="moderator"
        statusFilter="banned"
      />,
    );

    expect(screen.getByDisplayValue("test_user")).toBeDefined();
    expect(screen.getByDisplayValue("Moderator")).toBeDefined();
    expect(screen.getByDisplayValue("Banned")).toBeDefined();
  });
});
