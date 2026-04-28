document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
=======
    // Fungsi untuk memuat konten
>>>>>>> fdc665938497460d3a6595b403f8fd2609476dda
    const loadComponent = (id, file) => {
        fetch(file)
            .then(res => res.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
<<<<<<< HEAD
                
                // Setelah header dimuat, jalankan setup menu
                if (id === 'header-placeholder') {
                    setupMobileMenu(); // <--- Tambahkan ini
                    highlightActiveMenu();
                }
            });
    };

    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

// Fungsi baru untuk toggle menu mobile
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden'); // Menampilkan atau menyembunyikan
        });
    }
}
=======
            });
    };

    // Panggil fungsi untuk header dan footer
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});
>>>>>>> fdc665938497460d3a6595b403f8fd2609476dda
