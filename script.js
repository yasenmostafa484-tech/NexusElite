document.addEventListener('DOMContentLoaded', () => {

    // --- Touch Interaction Ripple Effect ---
    // Simulates OS-level touch feedback (Neon Orange Pulse)
    const createRipple = (event) => {
        const button = event.currentTarget;
        
        // Remove existing ripples to allow multi-tap
        const existingRipple = button.querySelector('.touch-ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        // Calculate cursor position relative to the element
        const rect = button.getBoundingClientRect();
        
        // Handling both mouse and touch events
        let clientX, clientY;
        if(event.type.includes('touch')) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${clientX - rect.left - radius}px`;
        circle.style.top = `${clientY - rect.top - radius}px`;
        circle.classList.add('touch-ripple');

        button.appendChild(circle);

        // Remove element after animation completes
        setTimeout(() => {
            circle.remove();
        }, 600);
    };

    const rippleTargets = document.querySelectorAll('.ripple-target');
    rippleTargets.forEach(target => {
        target.addEventListener('mousedown', createRipple);
        // Passive false not strictly needed here, but avoids touch action issues
        target.addEventListener('touchstart', createRipple, { passive: true });
    });


    // --- Desktop Sticky Nav ---
    const desktopNav = document.getElementById('desktop-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            desktopNav.classList.add('scrolled');
        } else {
            desktopNav.classList.remove('scrolled');
        }
    });

    // --- Mobile OS Dock Active State Handling ---
    const dockItems = document.querySelectorAll('.dock-item');
    const sections = document.querySelectorAll('header, section');

    // Update dock active state based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // --- Intersection Observer (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before element comes into view
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Form Submit Demo Handler ---
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sequence Activated!';
            btn.style.backgroundColor = '#25D366'; // Green confirmation
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; // Reset to default
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

});
