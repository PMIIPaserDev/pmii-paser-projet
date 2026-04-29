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

// 3. Fungsi Highlight Menu Aktif (Versi Perbaikan)
function highlightActiveMenu() {
    // Ambil nama file saja dari URL, contoh: "profil.html"
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Cek apakah href sama dengan nama file saat ini
        if (page === href) {
            // Aktifkan: Warna biru tua dan garis kuning
            link.classList.add('text-blue-950', 'active-nav-border');
            link.classList.remove('text-slate-500');
        } else {
            // Non-aktif: Warna abu-abu dan hapus garis
            link.classList.remove('text-blue-950', 'active-nav-border');
            link.classList.add('text-slate-500');
        }
    });
}