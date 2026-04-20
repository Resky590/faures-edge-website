document.addEventListener("DOMContentLoaded", async function() {
    // 1. Load Header
    await loadComponent('header-placeholder', 'partials/header.html');
    
    // 2. Load Footer
    await loadComponent('footer-placeholder', 'partials/footer.html');

    // 3. Initialize UI Logic (setelah header terload)
    initMobileMenu();
    initActiveMenu();
    initScrollEffect();
    initPremiumFeatures();
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
        // Handle home both as / and index.html
        if (href === currentPath || (href === '/' && (currentPath === 'index.html' || currentPath === ''))) {
            link.classList.remove('text-white/50');
            link.classList.add('text-white', 'font-bold');
        }
    });
}

// Logic Navbar Scroll Effect
function initScrollEffect() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-[#0a0a0a]/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.remove('bg-transparent', 'py-6');
        } else {
            navbar.classList.remove('bg-[#0a0a0a]/80', 'backdrop-blur-xl', 'py-4', 'border-b', 'border-white/5');
            navbar.classList.add('bg-transparent', 'py-6');
        }
    });
}

// PREMIUM UI FEATURES (GSAP, Lenis, Custom Cursor)
function initPremiumFeatures() {
    // 1. LENIS SMOOTH SCROLL
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP REVEAL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    // Generic Fade-up elements
    gsap.utils.toArray('.reveal-up, .gsap-fade').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Stagger items
    gsap.from('.gsap-stagger', {
        scrollTrigger: {
            trigger: '.gsap-stagger',
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Cards Animation
    gsap.utils.toArray('.card-interactive, .portfolio-card, .service-card-premium, .card-value').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // 3. CUSTOM CURSOR
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function renderCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        const updateHoverTriggers = () => {
            const hoverTriggers = document.querySelectorAll('a, button, .hover-trigger, .portfolio-card, .card-interactive');
            hoverTriggers.forEach(trigger => {
                trigger.addEventListener('mouseenter', () => cursor.classList.add('hover-active'));
                trigger.addEventListener('mouseleave', () => cursor.classList.remove('hover-active'));
            });
        };
        updateHoverTriggers();
        // Re-run after component load
        setTimeout(updateHoverTriggers, 1000);
    }

    // 4. MAGNETIC BUTTONS
    const magneticWraps = document.querySelectorAll('.magnetic-wrap');
    magneticWraps.forEach(wrap => {
        const btn = wrap.querySelector('.magnetic-btn');
        if (!btn) return;
        
        wrap.addEventListener('mousemove', (e) => {
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        wrap.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // 5. PROGRESS BAR
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
}