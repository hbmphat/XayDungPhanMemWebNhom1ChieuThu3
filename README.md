# SIM Shop Management System - Industry 4.0

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat&logo=laravel)](https://laravel.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

Hệ thống quản lý bán hàng và kích hoạt SIM tự động, được xây dựng trên kiến trúc **Monorepo**, đảm bảo tính nhất quán giữa Frontend và Backend.

---

## 1. Architecture Overview

Dự án được triển khai với các thành phần chính nhằm tối ưu hóa hiệu suất và khả năng mở rộng:

* **Frontend (`apps/web-app`)**: Next.js 16 (Turbopack), TailwindCSS, áp dụng **Atomic Design**.
* **Backend (`apps/api`)**: Laravel 12 (PHP 8.3), PostgreSQL, áp dụng **Service Pattern**.
* **Gateway**: **Nginx** đóng vai trò Reverse Proxy điều phối request giữa Client và Server.
* **DevOps**: Dockerize toàn bộ dịch vụ, quản lý tập trung qua **Docker Compose**.

---

## 2. Getting Started

### Prerequisites
* **Docker Desktop**
* **Make** (GNU Make)
* **Git**
* **Composer for laravel**

### Quick Setup
Thực hiện các bước sau để dựng môi trường phát triển cục bộ:

1.  **Clone Project:**
   ```bash
    git clone https://github.com/hbmphat/XayDungPhanMemWebNhom1ChieuThu3.git

2.  **Setup Local Environment:**
    ```bash
    make setup-local
    ```
    aaa

3.  **Auto Initialize:**
    ```bash
    make setup
    ```
    *Lệnh này sẽ tự động: Build Image, Up Containers, Install Dependencies, Migrate & Seed Database.*

---

## 3. Development Workflow

### Git Flow & Branching
Dự án áp dụng quy trình phân nhánh nghiêm ngặt:
* `main`: Nhánh production, chỉ chứa mã nguồn đã qua kiểm thử.
* `develop`: Nhánh tích hợp chính cho các tính năng mới.
* `feat/`, `fix/`, `ref/`: Nhánh làm việc cá nhân, luôn checkout từ `develop`.

### Conventional Commits
Mọi commit phải tuân thủ cấu trúc: `prefix(scope): mo-ta`
* **feat**: Tính năng mới (ví dụ: `feat(auth): add google login`).
* **fix**: Sửa lỗi (ví dụ: `fix(api): sửa lỗi truy vấn users`).
* **docs**: Cập nhật tài liệu (README, comments).
* **refactor**: Tối ưu hóa/Cấu trúc lại code (Refactor).
* **chore**: Cập nhật công việc phụ (Dependencies, Build config).

---

## 4. Project Structure

```text
.
├── apps/
│   ├── api/                # Backend Service (Laravel 11)
│   │   ├── app/Services/   # Lớp xử lý nghiệp vụ chính
│   │   └── app/Http/       # Controllers, Requests & Resources
│   └── web-app/            # Frontend Service (Next.js 15)
│       ├── app/_features/  # Components chia theo chức năng
│       └── app/_shared/    # Hooks, Utils & API Client dùng chung
├── docker/                 # Cấu hình Nginx & Dockerfile cho từng dịch vụ
├── Makefile                # Các lệnh tự động hóa (Automation scripts)
└── README.md