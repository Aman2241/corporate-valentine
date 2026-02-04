const app = {
    init() {
        console.log('Corporate Valentine Protocol Initiated...');
        this.addScrollEffects();
        this.initMobileNav();
        this.initParticles();
        this.initTiltEffect();
    },

    initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    },

    initParticles() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor(width * height / 15000); // Density
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    type: Math.random() > 0.9 ? 'heart' : 'node' // 10% hearts
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                if (p.type === 'heart') {
                    ctx.fillStyle = '#f43f5e';
                    ctx.font = `${p.size * 4}px Arial`;
                    ctx.fillText('♥', p.x, p.y);
                } else {
                    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();
    },

    initTiltEffect() {
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.borderColor = 'var(--glass-border)';
            });
        });
    },

    addScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add a subtle animation class or trigger
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(card);
        });
    },

    // Actions
    sendAppreciation() {
        alert("Success! 500 'Kudos' coins transferred to colleague's dormant account.");
    },

    proposeIdea() {
        const ideas = [
            "Meeting-free Fridays (Rejected)",
            "Free Coffee IV Drips (Pending Approval)",
            "Nap Pods in Server Room (Under Review)"
        ];
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        alert(`Pitching: ${randomIdea}`);
    },

    dispenseTreat() {
        alert("Error: Virtual Chocolate Printer not connected. Please clear cookies.");
    },

    squeezeTeddy() {
        alert("*SQUEAK* 'It works on my machine.'");
    },

    makePromise() {
        alert("Promise committed to git with SHA-1: 8badf00d");
    },

    groupHug() {
        alert("Exception Caught: PersonalSpaceViolationException. Safe mode enabled.");
    },

    refactorLove() {
        alert("Deleting 'Ex' variable... Optimization complete.");
    },

    celebrate() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.left = '0';
        confetti.style.width = '100vw';
        confetti.style.height = '100vh';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100%; font-size:5rem;">🚀💖💰</div>';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
        alert("Release successful! Client is happy. Go home.");
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
