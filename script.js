// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const navn = document.getElementById('navn').value;
        const email = document.getElementById('email').value;
        const besked = document.getElementById('besked').value;

        // Simple validation
        if (navn && email && besked) {
            alert('Tak for din besked! Vi vender tilbage hurtigst muligt.');
            contactForm.reset();
        } else {
            alert('Udfyld venligst alle påkrævede felter.');
        }
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .service-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const number = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current) + (isPercentage ? '%' : isPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ========== SUBPAGE INTERACTIVITY ==========

// Animate performance metrics
const metricCards = document.querySelectorAll('.metric-card');
if (metricCards.length > 0) {
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    // Animate metric value
                    const valueEl = entry.target.querySelector('.metric-value [data-target]');
                    if (valueEl) {
                        const target = parseFloat(valueEl.getAttribute('data-target'));
                        animateValue(valueEl, 0, target, 2000);
                    }

                    // Animate progress bar
                    const progressBar = entry.target.querySelector('.metric-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        progressBar.style.width = progress + '%';
                    }
                }, index * 200);
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    metricCards.forEach(card => metricsObserver.observe(card));
}

// Animate circular charts
const circularCharts = document.querySelectorAll('.circle-progress');
if (circularCharts.length > 0) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                const circumference = 2 * Math.PI * 80;
                const offset = circumference - (percent / 100 * circumference);
                entry.target.style.strokeDashoffset = offset;
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    circularCharts.forEach(chart => chartObserver.observe(chart));
}

// Helper function to animate numeric values
function animateValue(element, start, end, duration) {
    const isDecimal = end % 1 !== 0;
    const increment = (end - start) / (duration / 16);
    let current = start;

    const updateValue = () => {
        current += increment;
        if (current < end) {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = isDecimal ? end.toFixed(1) : end;
        }
    };

    updateValue();
}

// Animate breakpoint bars
const breakpointBars = document.querySelectorAll('.breakpoint-bar');
if (breakpointBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = entry.target.style.width || '100%';
                }, index * 300);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    breakpointBars.forEach(bar => barObserver.observe(bar));
}

// Animate timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Animate security layers
const layerItems = document.querySelectorAll('.layer-item');
if (layerItems.length > 0) {
    const layerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                layerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    layerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        layerObserver.observe(item);
    });
}

// Animate flow nodes
const flowNodes = document.querySelectorAll('.flow-node');
if (flowNodes.length > 0) {
    const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 200);
                flowObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    flowNodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';
        node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        flowObserver.observe(node);
    });
}

// Animate benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
if (benefitCards.length > 0) {
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        benefitObserver.observe(card);
    });
}

// Animate principle cards
const principleCards = document.querySelectorAll('.principle-card');
if (principleCards.length > 0) {
    const principleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 150);
                principleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    principleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        principleObserver.observe(card);
    });
}

// Animate color swatches
const colorSwatches = document.querySelectorAll('.color-swatch, .gradient-box');
if (colorSwatches.length > 0) {
    const colorObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'rotateY(0deg)';
                }, index * 100);
                colorObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    colorSwatches.forEach(swatch => {
        swatch.style.opacity = '0';
        swatch.style.transform = 'rotateY(90deg)';
        swatch.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        colorObserver.observe(swatch);
    });
}

// Animate trend cards
const trendCards = document.querySelectorAll('.trend-card');
if (trendCards.length > 0) {
    const trendObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';
                }, index * 120);
                trendObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    trendCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) rotate(-2deg)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        trendObserver.observe(card);
    });
}