import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserHeader from "./UserHeader";
import { SidebarProvider } from "@shared/contexts/SidebarContext";

// Vì UserHeader có sử dụng useSidebar, chúng ta cần bọc nó vào Provider
// hoặc Mock cái Context đó. Cách đơn giản nhất là bọc Provider:
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
};

describe("UserHeader Molecule Component", () => {
  const mockOnAddClick = vi.fn();

  it("nên hiển thị đúng tiêu đề và số lượng user", () => {
    renderWithProvider(<UserHeader total={1250} onAddClick={mockOnAddClick} />);

    // Kiểm tra tiêu đề fix cứng
    expect(screen.getByText("User Management")).toBeDefined();

    // Kiểm tra số lượng đã được toLocaleString()
    expect(screen.getByText("Total: 1,250")).toBeDefined();
  });

  it("nên gọi hàm onAddClick khi nhấn vào nút Add User", () => {
    renderWithProvider(<UserHeader total={0} onAddClick={mockOnAddClick} />);

    const addButton = screen.getByRole("button", { name: /Add User/i });
    fireEvent.click(addButton);

    expect(mockOnAddClick).toHaveBeenCalledTimes(1);
  });

  it("nên render các icon chức năng (Bell, Menu, UserPlus)", () => {
    const { container } = renderWithProvider(
      <UserHeader total={0} onAddClick={mockOnAddClick} />,
    );

    // Kiểm tra sự tồn tại của các thẻ svg (từ lucide-react)
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });
});
