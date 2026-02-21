document.addEventListener('DOMContentLoaded', () => {
    // Add subtle parallax effect to the background text
    const bgText = document.querySelector('.background-text');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Move the text slightly opposite to mouse direction
        const moveX = -(x * 20); // Move within 20px
        const moveY = -(y * 20);

        bgText.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Dynamic Above the Fold Adjustment
    function adjustAboveTheFold() {
        const header = document.querySelector('header');
        const main = document.querySelector('main');

        // Target the primary content container for different pages
        const foldTarget = document.querySelector('.hero') ||
            document.querySelector('.case-study-header') ||
            document.querySelector('.about-container') ||
            document.querySelector('.contact-section') ||
            document.querySelector('.leadership-section');

        if (header && main && foldTarget) {
            const headerHeight = header.offsetHeight;
            const mainStyle = window.getComputedStyle(main);
            const paddingVertical = parseFloat(mainStyle.paddingTop) + parseFloat(mainStyle.paddingBottom);

            // Calculate available height
            const availableHeight = window.innerHeight - headerHeight - paddingVertical;

            // Apply minimum height to the target to fill the screen
            // Use a safe minimum (e.g., 600px) to prevent crushing content on very small screens in landscape
            const safeMinHeight = 500;
            const finalHeight = Math.max(availableHeight, safeMinHeight);

            foldTarget.style.minHeight = `${finalHeight}px`;

            // Ensure content is centered vertically
            foldTarget.style.display = 'flex';
            foldTarget.style.flexDirection = 'column';
            foldTarget.style.justifyContent = 'center';
        }
    }

    // Initial Adjustment
    adjustAboveTheFold();

    // Adjust on Resize
    window.addEventListener('resize', adjustAboveTheFold);

    // Scroll Reveal Effect
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Select elements to animate
    const revealElements = document.querySelectorAll('section > h2, section > h3, .case-study, .cert-item, .testimonial-card, .topic-block, .phil-card, .about-layout > *, .about-text > *, .footer-content-wrapper, .cv-section > *, .case-study-gallery > img, .case-study-header > *, .contact-hero > *, .contact-grid > *, .logo-track, .role-content > *');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    console.log("Portfolio layout initialized & Fold adjusted.");
});
