document.addEventListener("DOMContentLoaded", () => {
    // 1. Fungsi untuk memuat komponen (Header/Footer) secara dinamis
    const loadComponent = (id, file) => {
        const targetElement = document.getElementById(id);
        if (!targetElement) return; // Mencegah crash jika elemen placeholder tidak ada di halaman tersebut

        fetch(file)
            .then(res => res.text())
            .then(data => {
                targetElement.innerHTML = data;
                
                // Setelah konten dimuat, jalankan fungsi pendukung
                if (id === 'header-placeholder') {
                    setupMobileMenu();
                    highlightActiveMenu();
                }
            })
            .catch(err => console.error("Gagal memuat file: " + file, err));
    };

    // Panggil fungsi pemuat komponen statis publik
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

// 3. Fungsi Highlight Menu Aktif dengan proteksi tombol Admin
function highlightActiveMenu() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Pengecualian khusus: Jangan sentuh class warna teks dari tombol admin-dashboard
        if (href === 'admin-dashboard.html') {
            if (page === href) {
                link.classList.add('active-nav-border');
            } else {
                link.classList.remove('active-nav-border');
            }
            return; 
        }
        
        // Aturan standard untuk menu publik lainnya
        if (page === href) {
            link.classList.add('text-blue-950', 'active-nav-border');
            link.classList.remove('text-slate-500');
        } else {
            link.classList.remove('text-blue-950', 'active-nav-border');
            link.classList.add('text-slate-500');
        }
    });
}