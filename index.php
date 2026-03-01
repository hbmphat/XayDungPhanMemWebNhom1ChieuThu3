<?php
// Gọi file kết nối CSDL
// require_once 'config/database.php';

// Gọi Header
include 'includes/header.php';

// Tạm thời dùng mảng giả lập. Bước sau sẽ query từ Database.
$categories = [
    ["name" => "Sim Tứ Quý", "img" => "https://lh3.googleusercontent.com/aida-public/AB6AXuBe9GWnrgurKMEeuE_4PZgfyROlb6jzKbAewVrXcbkhB0_RUbQhTqRM0h1B4T_qVUnrOKsfmnfKroPkXXazjmap-d3lzcvFtQ4PsxO4ltVRM5dYe_MevXxki-sYRTH-Sh41ian287l3PLPLi_V8r11X2vyzCdh6SCFiV5qFCkHU3IN3YIglFFwo-3CMs3bzKaxEdZdJuOKNZYI3Bvd2cUA0jTONiltAyaydQTV0PvY-rCpCurtRwXeDrdXV40Vy_K_2pDwplrJ_8CI"],
    ["name" => "Sim Lộc Phát", "img" => "https://lh3.googleusercontent.com/aida-public/AB6AXuDmQ9uxNYTBtxDI2HBuO0ZQ85EUf092VUct_GPuPoL8rbfhZcW5gFRDYXX_0B-ElZA1a6wbDpDaP09UY7drjZPIrri9iXXGGFAzuaR69fwVWThrWfqLCEy-prweX50EqdO7LCiUA-TeLEL2Or82BxYdlrnX-KcjTGoDejBX13wDGXvwx88rcz10mXrQoPRvcHU0sphnPBaAWgIn6YjNJODqpl80LkjAgKMqeRbc8UWPKm2IAMpq9ORwUCHIU-r9WUbH7RpFDbMddeo"]
];

$products = [
    ["number" => "098.888.8888", "logo" => "https://lh3.googleusercontent.com/aida-public/AB6AXuA3T1ALkoVzeEkwjAEJFVkLwFT5KI0HdXy8guEVl3TXBH1h8EwfJuDiexk1ahRDbix2plAaYCPrVSq7hwz2GpwLuhwvy1AumYlcFkmCncOoNXHQQEJMrmKuDVkj40NcYYJKXsTL1Me-OfL62UW_k-dyvHIJNRJP6LfCyG-Y4gdxBOiylalOLvZjVfkjhOCChKXkYiZOxXCcu7-Rg5ukxRDGklDTh-7Jd7shyPcuO5DljlvC4LUDXIg1sh2cRFszjZ6NtQHn6KJLg2U", "price" => "3.500.000đ", "old_price" => "4.000.000đ"],
    ["number" => "091.666.8888", "logo" => "https://lh3.googleusercontent.com/aida-public/AB6AXuDOnh0S7ReK-bE-eHy5RBDsY6MIk7zhVws4k-rr8u2X8NPhHKq6THxe0Rx47yYjjTX0fWkybhBLFRsCqrL1bRJCvVgLT6A0W6W2-m_s1GoGNcA09s2f9ZUAEvW_evC6Svny_HubiGMGdFwsFsGGsJ6Pj-g3T0ArK9Pv0OHdpk5nXuLYqvIQ0x4GMRQmPp4qkXsGDu1Dye8wdS9bzVa2NXVfF_KIL14egusGuZWjZ8Dnv1nnS2nXE_FntfvHcOjYDGJaSzd1DiAXaic", "price" => "2.800.000đ", "old_price" => null]
];
?>

<main>
    <section class="hero-section container">
        <div class="hero-banner">
            <div>
                <h1>Kho Sim Số Đẹp Lớn Nhất Việt Nam</h1>
            </div>
            <div class="search-box">
                <div class="search-icon"><span class="material-symbols-outlined">search</span></div>
                <input type="text" placeholder="Nhập số bạn muốn tìm..." id="searchInput" />
                <button class="btn btn-accent btn-search" id="btnSearch">Tìm kiếm</button>
            </div>
        </div>
    </section>

    <section class="section container">
        <h2 class="section-title">Sim VIP Bán Chạy</h2>
        <div class="product-grid">
            <?php foreach ($products as $prod): ?>
                <div class="product-card">
                    <div class="product-header">
                        <h3><?php echo htmlspecialchars($prod['number']); ?></h3>
                        <img src="<?php echo htmlspecialchars($prod['logo']); ?>" alt="Logo Nhà Mạng" />
                    </div>
                    <div class="product-price">
                        <span class="price-current"><?php echo htmlspecialchars($prod['price']); ?></span>
                        <?php if ($prod['old_price']): ?>
                            <span class="price-old"><?php echo htmlspecialchars($prod['old_price']); ?></span>
                        <?php endif; ?>
                    </div>
                    <button class="btn btn-accent btn-add-cart" data-number="<?php echo htmlspecialchars($prod['number']); ?>" data-price="<?php echo htmlspecialchars($prod['price']); ?>">
                        <span class="material-symbols-outlined">add_shopping_cart</span>
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</main>

<?php
// Gọi Footer
include 'includes/footer.php';
?>