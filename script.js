// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const categoryTabs = document.querySelectorAll('.category-tab');
const categoryContents = document.querySelectorAll('.category-content');
const contactForm = document.getElementById('contactForm');
const backToTop = document.getElementById('backToTop');

// Theme Toggle Functionality
const initTheme = () => {
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('portfolio-theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggle(true);
    }
    
    // Update theme toggle button
    const themeIcon = themeToggle.querySelector('.theme-icon i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
    }
};

const updateThemeToggle = (isDark) => {
    const themeIcon = themeToggle.querySelector('.theme-icon i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    if (isDark) {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
    }
};

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateThemeToggle(isDarkMode);
    
    // Save preference
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    const menuIcon = menuToggle.querySelector('.menu-icon');
    mobileMenu.classList.toggle('active');
    
    // Animate menu icon
    if (mobileMenu.classList.contains('active')) {
        menuIcon.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        menuIcon.style.backgroundColor = 'transparent';
        menuIcon.style.width = '0';
        
        menuIcon.before.style.transform = 'rotate(45deg)';
        menuIcon.before.style.top = '0';
        menuIcon.after.style.transform = 'rotate(-45deg)';
        menuIcon.after.style.top = '0';
    } else {
        menuIcon.style.transform = 'translate(-50%, -50%)';
        menuIcon.style.backgroundColor = '';
        menuIcon.style.width = '24px';
        
        menuIcon.before.style.transform = '';
        menuIcon.before.style.top = '-8px';
        menuIcon.after.style.transform = '';
        menuIcon.after.style.top = '8px';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        // Reset menu icon
        const menuIcon = menuToggle.querySelector('.menu-icon');
        menuIcon.style.transform = 'translate(-50%, -50%)';
        menuIcon.style.backgroundColor = '';
        menuIcon.style.width = '24px';
        
        menuIcon.before.style.transform = '';
        menuIcon.before.style.top = '-8px';
        menuIcon.after.style.transform = '';
        menuIcon.after.style.top = '8px';
    });
});

// Skills Tabs Functionality
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all content
        categoryContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show corresponding content
        const category = tab.getAttribute('data-category');
        const contentToShow = document.getElementById(category);
        if (contentToShow) {
            contentToShow.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight - 100) {
            const width = bar.getAttribute('style')?.match(/width: (\d+)%/)?.[1] || bar.parentElement.getAttribute('data-width') || '0';
            bar.style.width = width + '%';
            bar.style.transition = 'width 1.5s ease-in-out';
        }
    });
};

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Notification System
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        </span>
        <span class="notification-text">${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
};

// Back to Top Functionality
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
        backToTop.style.transform = 'translateY(0)';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transform = 'translateY(20px)';
    }
    
    // Animate skill bars when in view
    animateSkillBars();
    
    // Update active navigation link
    updateActiveNavLink();
});

// Update active navigation link on scroll
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Update desktop nav
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Update mobile nav
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Animate numbers counter
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current).toLocaleString();
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Animate counters
    animateCounters();
    
    // Initialize skill bars
    animateSkillBars();
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border-left: 4px solid var(--primary-color);
            box-shadow: var(--card-shadow);
            border-radius: 8px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #10b981;
        }
        
        .notification-error {
            border-left-color: #ef4444;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-icon {
            color: #10b981;
        }
        
        .notification-error .notification-icon {
            color: #ef4444;
        }
        
        .notification-text {
            flex: 1;
            font-size: 0.9rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: var(--transition);
        }
        
        .notification-close:hover {
            color: var(--text-color);
            background: var(--bg-alt);
        }
    `;
    document.head.appendChild(style);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('portfolio-theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeToggle(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeToggle(false);
        }
    }
});

// Tech wheel rotation animation
const animateTechWheel = () => {
    const techWheel = document.querySelector('.tech-wheel');
    if (!techWheel) return;
    
    const techItems = techWheel.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        const angle = (360 / techItems.length) * index;
        const radius = 120;
        
        const x = radius * Math.cos(angle * Math.PI / 180);
        const y = radius * Math.sin(angle * Math.PI / 180);
        
        item.style.transform = `translate(${x}px, ${y}px)`;
        item.style.opacity = '1';
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            item.style.zIndex = '1';
        });
    });
};

// Initialize tech wheel animation
window.addEventListener('load', () => {
    animateTechWheel();
    
    // Add floating shapes animation
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });
});

// Add floating animation for shapes
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
        }
    }
`;
document.head.appendChild(floatingStyle);