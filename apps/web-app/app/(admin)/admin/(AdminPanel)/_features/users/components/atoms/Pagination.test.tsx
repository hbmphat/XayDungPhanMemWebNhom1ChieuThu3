import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";
import { PaginationMeta } from "@app/_types/api-response";

describe("Pagination Atom Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockOnPageChange = vi.fn();

  const mockMeta: PaginationMeta = {
    current_page: 2,
    last_page: 5,
    per_page: 10,
    total: 45,
    from: 11,
    to: 20,
    path: "/users",
  };

  it("nên hiển thị đúng thông tin số lượng bản ghi (Showing X to Y of Z)", () => {
    render(<Pagination meta={mockMeta} onPageChange={mockOnPageChange} />);

    // Kiểm tra dòng text hiển thị bản ghi (Desktop view)
    // From: (2-1)*10 + 1 = 11 | To: min(2*10, 45) = 20
    expect(screen.getByText(/Showing/i)).toBeDefined();
    expect(screen.getByText("11")).toBeDefined();
    expect(screen.getByText("20")).toBeDefined();
    expect(screen.getByText("45")).toBeDefined();
  });

  it("nên render đúng số lượng nút bấm trang", () => {
    render(<Pagination meta={mockMeta} onPageChange={mockOnPageChange} />);

    // 1. Tìm nav dành cho Desktop
    const desktopNav = screen.getByLabelText("Pagination");

    // 2. Lấy tất cả button bên trong Nav
    const allButtons = within(desktopNav).getAllByRole("button");

    // 3. Lọc: Chỉ giữ lại các nút có nội dung là Số hoặc "..."
    // Các nút chứa Icon (Chevron) sẽ có textContent rỗng hoặc chỉ có khoảng trắng
    const pageButtons = allButtons.filter((btn): btn is HTMLButtonElement => {
      const text = btn.textContent?.trim();
      return text !== "" && (text === "..." || !isNaN(Number(text)));
    });

    // Với last_page = 5, mảng pageButtons phải có đúng 5 phần tử
    expect(pageButtons).toHaveLength(5);
  });

  it("nên gọi onPageChange khi click vào một trang cụ thể", () => {
    render(<Pagination meta={mockMeta} onPageChange={mockOnPageChange} />);

    const page3Button = screen.getByText("3");
    fireEvent.click(page3Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("nên disable nút Previous khi đang ở trang 1", () => {
    const firstPageMeta = { ...mockMeta, current_page: 1 };
    render(<Pagination meta={firstPageMeta} onPageChange={mockOnPageChange} />);

    // Có 2 nút Previous (1 mobile, 1 desktop)
    const prevButtons = screen.getAllByText(/Previous/i);
    prevButtons.forEach((btn) => {
      const button = btn.closest("button");
      expect(button?.disabled).toBe(true);
    });
  });

  it("nên disable nút Next khi đang ở trang cuối cùng", () => {
    const lastPageMeta = { ...mockMeta, current_page: 5 };
    render(<Pagination meta={lastPageMeta} onPageChange={mockOnPageChange} />);

    const nextButtons = screen.getAllByText(/Next/i);
    nextButtons.forEach((btn) => {
      const button = btn.closest("button");
      expect(button?.disabled).toBe(true);
    });
  });

  it("nên highlight trang hiện tại (Active State)", () => {
    render(<Pagination meta={mockMeta} onPageChange={mockOnPageChange} />);

    // Lấy tất cả các nút số 2 (cả mobile/desktop nếu có)
    const activePages = screen.getAllByText("2");
    const activePage = activePages[activePages.length - 1]; // Ưu tiên nút ở Desktop view

    expect(activePage.className).toContain("bg-indigo-50");
    expect(activePage.getAttribute("aria-current")).toBe("page");
  });
  it("nên hiển thị dấu ba chấm (...) khi có quá nhiều trang", () => {
    // Tăng last_page lên 20 để chắc chắn dấu ba chấm xuất hiện
    const manyPagesMeta: PaginationMeta = {
      ...mockMeta,
      current_page: 10,
      last_page: 20,
    };
    render(<Pagination meta={manyPagesMeta} onPageChange={mockOnPageChange} />);

    // Sử dụng queryAllByText để linh hoạt hơn
    const ellipses = screen.getAllByText("...");
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it("nên hiển thị các trang đầu và cuối khi ở giữa danh sách trang dài", () => {
    const middlePageMeta: PaginationMeta = {
      ...mockMeta,
      current_page: 5,
      last_page: 10,
    };
    render(
      <Pagination meta={middlePageMeta} onPageChange={mockOnPageChange} />,
    );

    // Phải thấy trang 1 (đầu) và trang 10 (cuối)
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
    // Trang hiện tại 5 và các trang lân cận
    expect(screen.getByText("5")).toBeDefined();
  });

  it("nên gọi onPageChange khi nhấn nút Next hoặc Previous", () => {
    render(<Pagination meta={mockMeta} onPageChange={mockOnPageChange} />);

    // Click nút Next (lấy nút ở bản desktop để tránh trùng lặp nếu cần)
    const nextButton = screen.getAllByText(/Next/i)[0].closest("button");
    if (nextButton) fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(mockMeta.current_page + 1);

    // Click nút Previous
    const prevButton = screen.getAllByText(/Previous/i)[0].closest("button");
    if (prevButton) fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(mockMeta.current_page - 1);
  });

  it("không nên gọi onPageChange nếu click vào trang hiện tại", () => {
    // Tạo một mock riêng biệt hoàn toàn cho test case này để tránh ô nhiễm dữ liệu
    const localMock = vi.fn();
    render(<Pagination meta={mockMeta} onPageChange={localMock} />);

    // Lấy nút số 2 (trang hiện tại)
    const page2Buttons = screen.getAllByText("2");
    const activePage = page2Buttons[page2Buttons.length - 1]; // Lấy nút ở Desktop

    fireEvent.click(activePage);

    // Kiểm tra: Hàm onPageChange KHÔNG được gọi thêm lần nào kể từ khi click
    // Chúng ta dùng toHaveBeenCalledTimes(0) để chính xác tuyệt đối
    expect(localMock).not.toHaveBeenCalled();
  });
});
