<?php
// Gọi kết nối database nếu cần
// require_once __DIR__ . '/config/database.php';
// session_start();
include 'includes/header.php';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng nhập - Số Đẹp Việt</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    
    <link rel="stylesheet" href="assets/css/style.css" />
</head>

<body>

    <main class="auth-split-layout">
        
        <div class="auth-left">
            <div class="auth-left-bg"></div>
            
            <div class="auth-left-content">
                <h2 class="auth-left-title">
                    Sở hữu số điện thoại <br />
                    <span class="text-underline-primary">đẳng cấp & tài lộc</span>
                </h2>
                
                <p class="auth-left-desc">
                    Kết nối với hàng triệu số điện thoại đẹp, sim phong thủy giúp nâng tầm thương hiệu cá nhân của bạn.
                </p>
                
                <div class="feature-list">
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="material-symbols-outlined">check</span>
                        </div>
                        <span class="feature-text">Kho số khổng lồ từ các nhà mạng</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="material-symbols-outlined">check</span>
                        </div>
                        <span class="feature-text">Giao dịch an toàn, minh bạch</span>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">
                            <span class="material-symbols-outlined">check</span>
                        </div>
                        <span class="feature-text">Hỗ trợ trả góp 0% lãi suất</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="auth-right">
            <div class="auth-form-wrapper">
                
                <div class="auth-header-text">
                    <h1>Chào mừng trở lại</h1>
                    <p>Đăng nhập để quản lý kho số và đơn hàng của bạn</p>
                </div>
                
                <form class="modern-form" action="login.php" method="POST">
                    
                    <div class="form-group">
                        <label for="email">Email hoặc Số điện thoại</label>
                        <div class="input-icon-wrapper">
                            <div class="input-icon-left">
                                <span class="material-symbols-outlined">mail</span>
                            </div>
                            <input class="modern-input" id="email" name="username" placeholder="example@gmail.com" type="text" required />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <div class="input-icon-wrapper">
                            <div class="input-icon-left">
                                <span class="material-symbols-outlined">lock</span>
                            </div>
                            <input class="modern-input has-right-icon" id="password" name="password" placeholder="••••••••" type="password" required />
                            <button class="input-icon-right" type="button" id="togglePassword">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-options">
                        <div class="checkbox-group">
                            <input id="remember-me" name="remember-me" type="checkbox" />
                            <label for="remember-me">Ghi nhớ đăng nhập</label>
                        </div>
                        <a class="forgot-password" href="#">Quên mật khẩu?</a>
                    </div>
                    
                    <button class="btn-modern" type="submit">Đăng nhập ngay</button>
                </form>
                
                <div class="divider-wrapper">
                    <div class="divider-line"></div>
                    <span class="divider-text">Hoặc tiếp tục với</span>
                </div>
                
                <div class="social-grid">
                    <button class="btn-social">
                        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        </svg>
                        <span>Google</span>
                    </button>
                    <button class="btn-social">
                        <svg style="width: 20px; height: 20px; color: #1877F2;" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                        <span>Facebook</span>
                    </button>
                </div>
                
                <p style="margin-top: 2.5rem; text-align: center; font-size: 0.875rem; color: var(--slate-600);">
                    Bạn chưa có tài khoản?
                    <a href="register.php" style="font-weight: 700; color: var(--primary); text-decoration: none; margin-left: 0.25rem;">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    </main>

    <script>
        document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('.material-symbols-outlined');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.textContent = 'visibility_off';
            } else {
                passwordInput.type = 'password';
                icon.textContent = 'visibility';
            }
        });
    </script>
</body>
</html>