document.addEventListener("DOMContentLoaded", () => {
    // 1. Fungsi untuk memuat komponen (Header/Footer)
    const loadComponent = (id, file) => {
        fetch(file)
            .then(res => res.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
                
                // Setelah konten dimuat, jalankan fungsi pendukung
                if (id === 'header-placeholder') {
                    setupMobileMenu();
                    highlightActiveMenu();
                }
            })
            .catch(err => console.error("Gagal memuat file: " + file, err));
    };

    // Panggil fungsi pemuat (Hanya dipanggil SEKALI di sini)
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

// 2. Fungsi Toggle Menu Mobile
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// 3. Fungsi Highlight Menu Aktif
function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Cek link aktif
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('text-white', 'active-nav-border');
        }
    });
}