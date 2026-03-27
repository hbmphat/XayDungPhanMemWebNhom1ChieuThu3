# Development Guidelines

## Clone project
## Project Setup
   - Cài đặt docker desktop, make
   - Chạy make setup

## Development Workflow
1. Chuyển sang nhánh develop để phát triển (không code trên main):
   git checkout develop

2. Tạo nhánh mới từ develop để code feature hay fix bug:
   git checkout -b feat/fe-ten-chuc-nang

   git checkout -b feat/be-ten-chuc-nang

   git checkout -b fix/bug-id
3. Staging code vào local repo (máy tính)
   git add .
   git pull origin nhanh-hien-tai
   git commit -m "prefix(scope):mo-ta"

   *Chú thích:
   prefix:
      feat: Thêm tính năng mới cho ứng dụng.
         "feat: thêm chức năng đăng nhập bằng Google"
      fix: Sửa lỗi (bug fix).
         "fix:#01-lỗi nút đăng nhập biến mất"
      docs: Chỉ thay đổi tài liệu (README, comments...).
         "docs: cập nhật hướng dẫn cài đặt trong README"
      ref: Sửa lại code mà không thêm feat hay fix bug.
         "ref: tối ưu hóa query lấy SIM card"
      chore: Các công việc phụ (cập nhật build, deps, CI/CD...).
         "chore: cập nhật version laravel/framework lên 12"
   scope: module hay service đang làm
      feat(auth):...
      feat(api):...
4. Push code lên remote repo (github):
   git push origin nhanh-hien-tai

5. Tạo pull request (PR) và team cùng nhau review code.

## Code Standards
- Tuân thủ quy ước.
- Commit mess có ý nghĩa, đúng cấu trúc tại mục 3.
- Pass testing trước khi push.
- Code tại nhánh nào thì Pull & Push ở nhánh đó 
## Build
make build
- Check log nếu có lỗi.