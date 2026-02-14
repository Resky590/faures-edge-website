document.addEventListener("DOMContentLoaded", async function() {
    // 1. Load Header
    await loadComponent('header-placeholder', 'partials/header.html');
    
    // 2. Load Footer
    await loadComponent('footer-placeholder', 'partials/footer.html');

    // 3. Initialize UI Logic (setelah header terload)
    initMobileMenu();
    initActiveMenu();
    initScrollEffect();
});

// Fungsi Fetch Component
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            document.getElementById(elementId).innerHTML = content;
        } else {
            console.error(`Gagal memuat ${filePath}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Logic Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu-icon');
    const openBtn = document.getElementById('open-menu-icon');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                openBtn.classList.add('hidden');
                closeBtn.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                openBtn.classList.remove('hidden');
                closeBtn.classList.add('hidden');
            }
        });
    }
}

// Logic Highlight Menu Aktif (Sesuai Halaman)
function initActiveMenu() {
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.remove('text-gray-400');
            link.classList.add('text-black');
        }
    });
}

// Logic Navbar Scroll Effect
function initScrollEffect() {
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'py-4', 'border-b', 'border-gray-100');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'py-4', 'border-b', 'border-gray-100');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });
}