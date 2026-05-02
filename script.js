// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        // Scrolled background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link on Scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars-staggered');
            icon.classList.toggle('fa-xmark');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars-staggered');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    // Animated Counter Logic
    const counters = document.querySelectorAll('.count-num');
    const speed = 200;

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = countTo / speed;
                    if (count < countTo) {
                        count += increment;
                        target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        target.innerText = countTo + (countTo === 10 ? '+' : (countTo >= 1000 ? '+' : ''));
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounter, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // Parallax Effect for Flying Elements
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        document.querySelectorAll('.flying-element').forEach((el, index) => {
            const speed = (index + 1) * 2;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    console.log('Trisno Jaya Barokah - Polished UI with Flying Animations & Map');
});
