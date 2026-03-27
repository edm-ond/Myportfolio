// =================================================================
// CORE DOM ELEMENTS
// =================================================================
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const heroCanvas = document.getElementById('hero-canvas');
const typingTextElement = document.querySelector('.hero-tagline .typing-text');
const timelineContainer = document.querySelector('.timeline');
const skillsGrid = document.querySelector('.skills-grid');
const projectsGrid = document.querySelector('.projects-grid');
const contactForm = document.getElementById('contact-form');

// =================================================================
// DATA
// =================================================================
const taglineTexts = [
    "I build things for the web.",
    "Problem Solver & Tech Enthusiast.",
    "Turning ideas into reality.",
    "Creative Developer."
];

const timelineData = [
    { date: "2020", title: "Started My Journey", description: "Began my journey into web development, learning the fundamentals of HTML, CSS, and JavaScript." },
    { date: "2021", title: "Dived into Frameworks", description: "Explored modern frontend frameworks and started building more complex applications." },
    { date: "2022", title: "Backend & Databases", description: "Expanded my skills to the backend, learning about servers, APIs, and databases." },
    { date: "2023 - Present", title: "Professional Development", description: "Working on freelance projects and contributing to open-source, continuously learning and growing as a developer." }
];

const skillsData = [
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js-square" },
    { name: "Python", icon: "fab fa-python" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Git", icon: "fab fa-git-alt" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "SQL", icon: "fas fa-database" }
];

const projectsData = [
    {
        title: "Mindcare",
        image: "old_portfolio/assets/mindcare-screenshot.png",
        description: "A sophisticated mental wellness platform designed to help users achieve mindfulness through guided experiences and a serene interface.",
        tech: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://mind-care-96.vercel.app",
        githubUrl: "https://github.com/Edm-ond"
    },
    {
        title: "AgriMarket",
        image: "https://via.placeholder.com/400x200",
        description: "A digital agriculture platform focused on smarter trade decisions, trusted connections, and better market access for farmers and buyers.",
        tech: ["AI", "Marketplace", "Logistics"],
        liveUrl: "#",
        githubUrl: "#"
    }
];

// =================================================================
// INITIALIZATION
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    populateTimeline();
    populateSkills();
    populateProjects();
    initTypingAnimation();
    initScrollAnimations();
    initNavbarBehavior();
    initMobileMenu();
    initHeroCanvas();
    initContactForm();
});

// =================================================================
// DYNAMIC CONTENT POPULATION
// =================================================================
function populateTimeline() {
    timelineData.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <p class="timeline-date">${item.date}</p>
                <h3 class="timeline-title">${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
}

function populateSkills() {
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

function populateProjects() {
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-secondary">Live Demo</a>
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// =================================================================
// ANIMATIONS & INTERACTIONS
// =================================================================

// --- Typing Animation ---
function initTypingAnimation() {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = taglineTexts[textIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingTextElement.textContent = displayText;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % taglineTexts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
}

// --- Scroll-based Animations ---
function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// --- Navbar Behavior ---
function initNavbarBehavior() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// --- Hero Canvas Animation ---
function initHeroCanvas() {
    const ctx = heroCanvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > heroCanvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > heroCanvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        let numberOfParticles = (heroCanvas.height * heroCanvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(0, 170, 255, 0.5)';
            particles.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }

    initParticles();
    animateParticles();
}

// --- Contact Form ---
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const subject = `New message from ${name}`;
        const body = `${message}%0D%0A%0D%0AFrom: ${name}%0D%0AEmail: ${email}`;
        window.location.href = `mailto:edmon.digihub@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
    });
}
