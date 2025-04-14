// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background canvas
    initBackgroundCanvas();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize audio toggle (optional)
    initAudioToggle();
});

// Background Canvas with Three.js
function initBackgroundCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 6000;
    
    const posArray = new Float32Array(particlesCount * 2);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x64ffda,
        transparent: true,
        opacity: 0.8
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
    }
    
    // Toggle theme on click
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// Initialize Skill Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--level', level);
    });
    
    // Animate skill bars on scroll
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.classList.add('animate');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Project Filters
function initProjectFilters() {
    const filters = document.querySelectorAll('.project-filter');
    const projects = document.querySelectorAll('.project-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const category = this.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const phrases = ['Creative Developer', 'AI Specialist', 'Web Developer', 'Problem Solver'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Scroll Animations with GSAP
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.fromTo(
            section.querySelector('.section-title'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        gsap.fromTo(
            category,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Animate header on scroll
    gsap.to('header', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top -80',
            toggleClass: { className: 'scrolled', targets: 'header' }
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            
            // Show success message (you can replace this with a proper UI notification)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Audio Toggle (Optional)
