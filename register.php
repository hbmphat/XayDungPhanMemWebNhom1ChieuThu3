<?php
// Gọi kết nối database
// require_once __DIR__ . '/config/database.php';

$error = '';
$success = '';

// Xử lý logic đăng ký khi form được submit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate cơ bản
    if (empty($username) || empty($password) || empty($confirm_password)) {
        $error = "Vui lòng nhập đầy đủ thông tin.";
    } elseif ($password !== $confirm_password) {
        $error = "Mật khẩu xác nhận không khớp.";
    } else {
        // Kiểm tra xem user đã tồn tại chưa
        $stmt = $pdo->prepare("SELECT ma_nguoi_dung FROM nguoi_dung WHERE ten_nguoi_dung = ?");
        $stmt->execute([$username]);
        
        if ($stmt->rowCount() > 0) {
            $error = "Tên đăng nhập này đã có người sử dụng!";
        } else {
            // Mã hóa mật khẩu bảo mật
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert vào Database (Quyền mặc định là 'user')
            $sql = "INSERT INTO nguoi_dung (ten_nguoi_dung, mat_khau, quyen) VALUES (?, ?, 'user')";
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute([$username, $hashed_password])) {
                $success = "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.";
            } else {
                $error = "Có lỗi xảy ra, vui lòng thử lại sau.";
            }
        }
    }
}

// Gọi header.php (header đã chứa session_start() và thanh điều hướng gốc)
include 'includes/header.php';
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đăng ký - Số Đẹp Việt</title>
    
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
                    <h1>Tạo tài khoản mới</h1>
                    <p>Đăng ký để bắt đầu hành trình mua sắm sim số đẹp của bạn</p>
                </div>
                
                <?php if($error): ?>
                    <div class="alert alert-error" style="margin-bottom: 1.5rem; padding: 1rem; background: #fee2e2; color: #ef4444; border-radius: 0.5rem;">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>
                
                <?php if($success): ?>
                    <div class="alert alert-success" style="margin-bottom: 1.5rem; padding: 1rem; background: #dcfce3; color: #22c55e; border-radius: 0.5rem;">
                        <?php echo $success; ?>
                    </div>
                <?php endif; ?>

                <form class="modern-form" action="register.php" method="POST">
                    
                    <div class="form-group">
                        <label for="username">Tên đăng nhập</label>
                        <div class="input-icon-wrapper">
                            <div class="input-icon-left">
                                <span class="material-symbols-outlined">person</span>
                            </div>
                            <input class="modern-input" id="username" name="username" placeholder="Nhập tên đăng nhập" type="text" required />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Mật khẩu</label>
                        <div class="input-icon-wrapper">
                            <div class="input-icon-left">
                                <span class="material-symbols-outlined">lock</span>
                            </div>
                            <input class="modern-input has-right-icon" id="password" name="password" placeholder="••••••••" type="password" required />
                            <button class="input-icon-right toggle-password" type="button" data-target="password">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="confirm_password">Xác nhận mật khẩu</label>
                        <div class="input-icon-wrapper">
                            <div class="input-icon-left">
                                <span class="material-symbols-outlined">lock_reset</span>
                            </div>
                            <input class="modern-input has-right-icon" id="confirm_password" name="confirm_password" placeholder="••••••••" type="password" required />
                            <button class="input-icon-right toggle-password" type="button" data-target="confirm_password">
                                <span class="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    </div>
                    
                    <button class="btn-modern" type="submit" style="margin-top: 1rem;">Đăng ký ngay</button>
                </form>
                
                <div class="divider-wrapper">
                    <div class="divider-line"></div>
                    <span class="divider-text">Hoặc tiếp tục với</span>
                </div>
                
                <div class="social-grid">
                    <button class="btn-social" type="button">
                        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        </svg>
                        <span>Google</span>
                    </button>
                    <button class="btn-social" type="button">
                        <svg style="width: 20px; height: 20px; color: #1877F2;" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                        <span>Facebook</span>
                    </button>
                </div>
                
                <p style="margin-top: 2.5rem; text-align: center; font-size: 0.875rem; color: var(--slate-600);">
                    Đã có tài khoản?
                    <a href="login.php" style="font-weight: 700; color: var(--primary); text-decoration: none; margin-left: 0.25rem;">Đăng nhập ngay</a>
                </p>
            </div>
        </div>
    </main>
    <?php include 'includes/footer.php'; ?>

    <script>
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', function() {
                // Lấy ID của ô input từ thuộc tính data-target
                const targetId = this.getAttribute('data-target');
                const passwordInput = document.getElementById(targetId);
                const icon = this.querySelector('.material-symbols-outlined');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.textContent = 'visibility_off';
                } else {
                    passwordInput.type = 'password';
                    icon.textContent = 'visibility';
                }
            });
        });
    </script>
</body>
</html>