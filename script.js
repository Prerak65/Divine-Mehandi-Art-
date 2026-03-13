// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Close mobile menu if active
            const navList = document.querySelector('.nav-list');
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// Add a simple fade-in intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .section-title');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});

// ==========================================
// Booking Form Logic
// ==========================================
const serviceSelect = document.getElementById('b-service');
const priceEstimate = document.getElementById('price-estimate');
const estValue = document.getElementById('est-value');
const dateInput = document.getElementById('b-date');

// Restrict past dates for the booking form
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Prices mapped to service values
const prices = {
    'bridal': '$250+',
    'arabic': '$120+',
    'party': '$150+',
    'festival': '$40+'
};

// Dynamic Price Change
if (serviceSelect) {
    serviceSelect.addEventListener('change', (e) => {
        const selectedService = e.target.value;
        if (prices[selectedService]) {
            estValue.textContent = prices[selectedService];
            priceEstimate.style.display = 'block';
            // Add a small animation effect
            estValue.style.animation = 'none';
            estValue.offsetHeight; /* trigger reflow */
            estValue.style.animation = 'slowPulse 0.5s ease';
        } else {
            priceEstimate.style.display = 'none';
        }
    });
}


// Handle form submission
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('b-name').value;
    const date = document.getElementById('b-date').value;
    const serviceSelectElement = document.getElementById('b-service');
    const serviceName = serviceSelectElement.options[serviceSelectElement.selectedIndex].text;

    // Construct WhatsApp message
    const message = `Hi Divya! I would like to book an appointment.
Name: ${name}
Date: ${date}
Service: ${serviceName}

Please let me know your availability and exact pricing.`;

    const whatsappUrl = `https://wa.me/18252883108?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form optionally
    e.target.reset();
    if (priceEstimate) priceEstimate.style.display = 'none';
});

// ==========================================
// Stain Reveal Slider Logic
// ==========================================
const sliderContainer = document.querySelector('.slider-container');
const sliderHandle = document.getElementById('slider-handle');
const sliderFg = document.getElementById('slider-fg');

if (sliderContainer && sliderHandle && sliderFg) {
    let isDragging = false;

    const slide = (xPos) => {
        const bounds = sliderContainer.getBoundingClientRect();
        let pos = xPos - bounds.left;
        pos = Math.max(0, Math.min(pos, bounds.width));

        const percentage = (pos / bounds.width) * 100;

        sliderFg.style.width = `${percentage}%`;
        sliderHandle.style.left = `${percentage}%`;
    };

    // Mouse Events
    sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        slide(e.pageX);
    });

    // Touch Events for Mobile
    sliderHandle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        slide(e.touches[0].pageX);
    }, { passive: true });

    // Allow clicking anywhere to jump
    sliderContainer.addEventListener('click', (e) => {
        slide(e.pageX);
    });

    // Fix image sizing
    const fgImg = sliderFg.querySelector('img');
    const resizeImage = () => {
        fgImg.style.width = `${sliderContainer.offsetWidth}px`;
    };

    window.addEventListener('resize', resizeImage);
    resizeImage();
}

// ==========================================
// Gallery Filter Logic
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    // Slight timeout for a smoother appearance transition if needed
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hide');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
        });
    });
}

// ==========================================
// Lightbox Modal Logic
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.querySelector('.lightbox-close');

if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImg.setAttribute('src', '');
        }, 400); // Wait for transition
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ==========================================
// FAQ Accordion Logic
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        // Toggle current item
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Determine whether to open current
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});
