<?php
// Bắt đầu session ở header để dùng cho giỏ hàng và đăng nhập sau này
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sim Số Đẹp - Kho Sim Lớn Nhất Việt Nam</title>
    
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    
    <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
    <header class="navbar">
        <div class="logo-container">
            <svg width="24" height="24" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
            <h2><a href="index.php" style="text-decoration: none; color: inherit;">SIM SỐ ĐẸP</a></h2>
        </div>
        
        <nav class="nav-links">
            <a href="sim.php">Trang Chủ</a>
            <a href="#">Sim Số Đẹp</a>
            <a href="#">Sim Phong Thủy</a>
            <a href="#">Tin Tức</a>
            <a href="#">Về Chúng Tôi</a>
        </nav>
        
        <div class="user-actions">
            <a href="login.php" class="btn btn-primary hidden-mobile" style="text-decoration: none;">Đăng nhập</a>
            <!-- <a href="register.php" class="btn btn-secondary hidden-mobile" style="text-decoration: none;">Đăng ký</a> -->
            <button class="btn btn-secondary btn-icon" id="openCartBtn" style="position: relative;">
                <span class="material-symbols-outlined">shopping_cart</span>
                <span class="cart-badge" id="cartBadge" style="display: none;">0</span>
            </button>
        </div>
    </header>