document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const backToTopButton = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const contactForm = document.getElementById('contactForm');

    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 1000);
    });
    
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
    }
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (backToTopButton) {
                backToTopButton.style.display = 'flex';
                setTimeout(() => {
                    backToTopButton.style.opacity = '1';
                }, 50);
            }
        } else {
            if (backToTopButton) {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    backToTopButton.style.display = 'none';
                }, 300);
            }
        }

        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (navbar && navbarCollapse && navbarToggler) {
            const isClickInsideNav = navbar.contains(e.target);
            const isTogglerClick = navbarToggler.contains(e.target);
            
            if (!isClickInsideNav && !isTogglerClick && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });

    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                setTimeout(() => {
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }, 100);
            }
        });
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'invalid-feedback';
                    errorMessage.textContent = 'This field is required';
                    
                    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
                        input.after(errorMessage);
                    }
                } else {
                    input.classList.remove('is-invalid');
                    
                    if (input.nextElementSibling && input.nextElementSibling.classList.contains('invalid-feedback')) {
                        input.nextElementSibling.remove();
                    }
                }
            });
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    emailInput.classList.add('is-invalid');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'invalid-feedback';
                    errorMessage.textContent = 'Please enter a valid email address';
                    
                    if (!emailInput.nextElementSibling || !emailInput.nextElementSibling.classList.contains('invalid-feedback')) {
                        emailInput.after(errorMessage);
                    }
                }
            }
            
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! We will get back to you shortly.';
                
                contactForm.after(successMessage);
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }
        });
        
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('invalid-feedback')) {
                    this.nextElementSibling.remove();
                }
            });
        });
    }
    
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked: ' + link.getAttribute('href'));
        });
    });
    
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in-element');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();
    
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 10px 30px rgba(0, 198, 255, 0.15)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    function animateCounters() {
        const statsNumbers = document.querySelectorAll('.stats-number');
        
        statsNumbers.forEach(number => {
            const target = parseInt(number.innerText);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    number.innerText = target.toString();
                    clearInterval(timer);
                } else {
                    number.innerText = Math.floor(current).toString();
                }
            }, 16);
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function checkStatsVisibility() {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection && isInViewport(statsSection)) {
            animateCounters();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    window.addEventListener('DOMContentLoaded', checkStatsVisibility);
});

window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

window.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function checkScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});