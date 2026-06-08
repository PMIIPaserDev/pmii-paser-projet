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

        // Menutup menu jika klik dilakukan di luar area menu dan tombol hamburger
        document.addEventListener('click', (event) => {
            if (!menu.classList.contains('hidden')) {
                const isClickInsideMenu = menu.contains(event.target);
                const isClickOnBtn = btn.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnBtn) {
                    menu.classList.add('hidden');
                }
            }
        });
    }

    // Toggle Submenu Update di Mobile
    const updateBtn = document.getElementById('mobile-update-btn');
    const updateSubmenu = document.getElementById('mobile-update-submenu');
    const updateIcon = document.getElementById('mobile-update-icon');

    if (updateBtn && updateSubmenu) {
        updateBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah pemicuan klik global yang menutup menu utama
            updateSubmenu.classList.toggle('hidden');
            if (updateIcon) {
                updateIcon.classList.toggle('rotate-180');
            }
        });
    }

    // Toggle Submenu Komisariat di Mobile
    const komisariatBtn = document.getElementById('mobile-komisariat-btn');
    const komisariatSubmenu = document.getElementById('mobile-komisariat-submenu');
    const komisariatIcon = document.getElementById('mobile-komisariat-icon');

    if (komisariatBtn && komisariatSubmenu) {
        komisariatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            komisariatSubmenu.classList.toggle('hidden');
            if (komisariatIcon) {
                komisariatIcon.classList.toggle('rotate-180');
            }
        });
    }
}

// 3. Fungsi Highlight Menu Aktif dengan proteksi tombol Admin
function highlightActiveMenu() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Proteksi khusus untuk Update Dropdown button
        if (link.id === 'nav-update-btn') {
            if (page === 'berita.html' || page === 'agenda.html') {
                link.classList.add('text-blue-950', 'active-nav-border');
                link.classList.remove('text-slate-500');
            } else {
                link.classList.remove('text-blue-950', 'active-nav-border');
                link.classList.add('text-slate-500');
            }
            return;
        }

        // Proteksi khusus untuk Komisariat Dropdown button
        if (link.id === 'nav-komisariat-btn') {
            if (page === 'komisariat.html') {
                link.classList.add('text-blue-950', 'active-nav-border');
                link.classList.remove('text-slate-500');
            } else {
                link.classList.remove('text-blue-950', 'active-nav-border');
                link.classList.add('text-slate-500');
            }
            return;
        }

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