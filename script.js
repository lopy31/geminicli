// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // Hero Slideshow (only on index.html)
    const heroSlideshow = document.querySelector('.hero-slideshow');
    if (heroSlideshow) {
        const images = [
            'assets/images/0001_xlarge.jpg',
            'assets/images/0002_xlarge.jpg',
            'assets/images/0007_xlarge.jpg',
            'assets/images/0026_xlarge.jpg',
            'assets/images/0032_xlarge.jpg',
            'assets/images/0035_xlarge.jpg',
            'assets/images/0038_xlarge.jpg',
            'assets/images/0042_xlarge.jpg',
            'assets/images/0053_xlarge.jpg',
            'assets/images/0059_xlarge.jpg',
            'assets/images/0063_xlarge.jpg',
            'assets/images/0071_xlarge.jpg',
            'assets/images/0072_xlarge.jpg',
            'assets/images/0082_xlarge.jpg',
            'assets/images/0085_xlarge.jpg',
            'assets/images/0088_xlarge.jpg',
            'assets/images/0089_xlarge.jpg',
            'assets/images/0090_xlarge.jpg',
            'assets/images/0094_xlarge.jpg',
            'assets/images/0097_xlarge.jpg',
            'assets/images/0102_xlarge.jpg',
            'assets/images/0104_xlarge.jpg',
            'assets/images/0107_xlarge.jpg',
            'assets/images/0123_xlarge.jpg',
            'assets/images/0139_xlarge.jpg',
            'assets/images/0147_xlarge.jpg',
            'assets/images/0161_xlarge.jpg',
            'assets/images/0182_xlarge.jpg',
            'assets/images/0185_xlarge.jpg',
            'assets/images/0200_xlarge.jpg',
            'assets/images/0201_xlarge.jpg',
            'assets/images/0205_xlarge.jpg',
            'assets/images/0227_xlarge.jpg',
            'assets/images/0232_xlarge.jpg',
            'assets/images/0246_xlarge.jpg',
            'assets/images/0247_xlarge.jpg',
            'assets/images/0251_xlarge.jpg',
            'assets/images/0259_xlarge.jpg',
            'assets/images/0270_xlarge.jpg',
            'assets/images/0273_xlarge.jpg',
            'assets/images/0281_xlarge.jpg',
            'assets/images/0282_xlarge.jpg'
        ];
        let currentImageIndex = 0;

        function changeHeroImage() {
            heroSlideshow.style.backgroundImage = `url(${images[currentImageIndex]})`;
            heroSlideshow.style.opacity = 1;

            setTimeout(() => {
                heroSlideshow.style.opacity = 0;
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }, 4000); // Image visible for 4 seconds
        }

        changeHeroImage();
        setInterval(changeHeroImage, 5000); // Change every 5 seconds (4s visible + 1s transition)
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieConsentButton = document.getElementById('cookie-consent-button');

    if (cookieBanner && cookieConsentButton) {
        // Check if cookie consent has been given
        if (!localStorage.getItem('cookieConsentGiven')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000); // Show after 1 second
        }

        cookieConsentButton.addEventListener('click', () => {
            localStorage.setItem('cookieConsentGiven', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // Scroll Animations (Fade-in)
    const fadeInElements = document.querySelectorAll('.content-section, .card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        element.classList.add('fade-in'); // Add base class for animation
        observer.observe(element);
    });

    // Language Switcher
    const langSwitchers = document.querySelectorAll('.lang-switcher a');

    function setLanguage(lang) {
        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update title and meta description
        if (translations[lang] && translations[lang].site_title) {
            document.title = translations[lang].site_title;
        }
        if (translations[lang] && translations[lang].meta_description) {
            document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].meta_description);
        }

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // For elements that might contain HTML (like hero_catchphrase)
                if (key.includes('hero_catchphrase') || key.includes('privacy_policy_intro_text') || key.includes('service_area_text')) {
                    element.innerHTML = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update active class for language links
        langSwitchers.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Save preferred language to localStorage
        localStorage.setItem('preferredLanguage', lang);
    }

    langSwitchers.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const lang = event.target.getAttribute('data-lang');
            setLanguage(lang);

            // For navigation to privacy-policy.html, ensure lang param is added
            if (event.target.closest('header')) { // Check if click is from header nav
                const currentPath = window.location.pathname;
                if (currentPath.includes('privacy-policy.html')) {
                    // Already on privacy policy page, just update language
                    window.history.replaceState({}, '', `privacy-policy.html?lang=${lang}`);
                } else {
                    // On index page, update privacy policy link in footer
                    const privacyLink = document.getElementById('footer-privacy-link');
                    if (privacyLink) {
                        privacyLink.href = `privacy-policy.html?lang=${lang}`;
                    }
                }
            }
        });
    });

    
});
