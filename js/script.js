// ===================================================================
//  All Functions
// ===================================================================

// Initialize navigation functionality
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const mobileMenu = document.querySelector('.mobile-menu');
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Change nav background on scroll
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }, { passive: true });
}

// Initialize animations with IntersectionObserver
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Initialize all modal dialogs
function initializeModals() {
    const modals = [
        { modalId: 'sushiMenuModal', btnClass: '.menu-btn', closeClass: '.close-menu' },
        { modalId: 'hibachiMenuModal', btnClass: '.hibachi-btn', closeClass: '.hibachi-close' },
        { modalId: 'contactModal', btnClass: '.contact-btn', closeClass: '.close-contact' }
    ];

    modals.forEach(config => {
        const modal = document.getElementById(config.modalId);
        const closeBtn = modal.querySelector(config.closeClass);
        const openBtns = document.querySelectorAll(config.btnClass);

        if (modal && openBtns.length && closeBtn) {
            openBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            });

            const closeModal = () => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    });
}

// Initialize form submission with AJAX
function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = this;
            const submitButton = form.querySelector('.submit-btn');
            const successMessage = document.getElementById('formSuccessMessage');
            const errorMessage = document.getElementById('formErrorMessage');
            const formData = new FormData(form);

            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then(() => {
                successMessage.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    document.getElementById('contactModal').style.display = 'none';
                    document.body.style.overflow = '';
                }, 3000);
            })
            .catch(error => {
                errorMessage.style.display = 'block';
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            });
        });
    }
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Initialize the Swiper carousel for testimonials
function initializeSwiper() {
    // Testimonials Swiper (existing)
    if (document.querySelector('.testimonials-swiper')) {
        var swiper = new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
            },
        });
    }
    // Brewery Logos Swiper (mobile only)
    if (window.innerWidth <= 700 && document.querySelector('.brewery-logos-swiper')) {
        var brewerySwiper = new Swiper('.brewery-logos-swiper', {
            slidesPerView: 2,
            spaceBetween: 16,
            loop: true,
            pagination: {
                el: '.brewery-logos-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }
    // Catering Swiper (mobile only)
    if (window.innerWidth <= 768 && document.querySelector('.catering-swiper')) {
        var cateringSwiper = new Swiper('.catering-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false,
            pagination: {
                el: '.catering-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }
    // Workshops Swiper (mobile only)
    if (window.innerWidth <= 768 && document.querySelector('.workshops-swiper')) {
        var workshopsSwiper = new Swiper('.workshops-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: false,
            pagination: {
                el: '.workshops-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }
    console.log('Swipers initialized.');
}


// ===================================================================
//  Main Script Entry Point
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything in order
    initializeNavigation();
    initializeModals();
    initializeForm();
    initializeAnimations();
    initializeLazyLoading();
    initializeSwiper();

    // Hide loading screen when the page is fully loaded
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if(loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
            }, 500); // A short delay
        }
    });
});