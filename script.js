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

    // --- UI Helpers ---
    showToast(message, type = 'info') {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        const icon = type === 'love' ? '❤️' : '📢';
        toast.innerHTML = `<span style="font-size: 1.5rem">${icon}</span> <div><strong>New Notification</strong><br>${message}</div>`;

        requestAnimationFrame(() => toast.classList.add('active'));

        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    },

    createModal(content) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `<div class="modal">${content}</div>`;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => overlay.classList.add('active'));

        return overlay;
    },

    // --- Actions ---
    sendAppreciation() {
        this.showToast("You sent a virtual 'High Five' to the team!", 'love');
    },

    proposeIdea() {
        const overlay = this.createModal(`
            <h2>Pitching...</h2>
            <div style="font-size:3rem; margin: 1rem 0;">💼 ➡️ 🗑️</div>
            <p>Your idea has been successfully filed in the 'Later' bin.</p>
            <button class="btn-action" id="close-modal" style="margin-top:1rem">Understood</button>
        `);

        overlay.querySelector('#close-modal').onclick = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        };
    },

    dispenseTreat() {
        const btn = document.querySelector('#chocolate .btn-action');
        const originalText = btn.innerText;
        btn.innerText = "ERR_SUGAR_LOW";
        btn.style.color = "red";

        // Glitch effect on the card
        const card = document.querySelector('#chocolate .card');
        card.style.animation = "glitch-anim 0.2s 5";

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.color = "";
            card.style.animation = "";
            this.showToast("Bug fixed: Chocolate wrapper exception.", 'info');
        }, 1000);
    },

    squeezeTeddy() {
        const card = document.querySelector('#teddy .card');
        card.classList.add('shaking');

        // Spawn hearts
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerText = '💖';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = `translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            heart.style.transition = 'all 1s ease-out';
            heart.style.opacity = '1';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            card.appendChild(heart);

            setTimeout(() => {
                heart.style.opacity = '0';
                heart.style.transform += ' translateY(-50px)';
            }, 50);

            setTimeout(() => heart.remove(), 1050);
        }

        setTimeout(() => {
            card.classList.remove('shaking');
        }, 500);
    },

    makePromise() {
        const overlay = document.createElement('div');
        overlay.className = 'terminal-overlay active';
        overlay.innerHTML = `
            <div class="terminal-window">
                <div class="terminal-header">
                    <div class="dot red" onclick="this.closest('.terminal-overlay').remove()"></div>
                    <div class="dot yellow"></div>
                    <div class="dot green"></div>
                </div>
                <div class="terminal-body" id="term-text"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const text = "> git commit -m 'I promise to document my code'\n> [master 8badf00] Promise committed.\n> git push origin master\n> ... Success.";
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                document.getElementById('term-text').innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                }, 1500);
            }
        };
        typeWriter();
    },

    groupHug() {
        document.body.style.transition = "transform 0.5s";
        document.body.style.transform = "scale(0.9)";
        this.showToast("🤗 Group hug initiated...");

        setTimeout(() => {
            document.body.style.transform = "scale(1)";
        }, 1000);
    },

    refactorLove() {
        const kissSection = document.querySelector('#kiss');
        kissSection.style.transition = "all 0.5s";
        kissSection.style.filter = "grayscale(100%) blur(2px)";

        setTimeout(() => {
            kissSection.style.filter = "none";
            this.showToast("Complexity reduced by 40%.");
        }, 1000);
    },

    celebrate() {
        this.showToast("🚀 Deploying to Production...", 'love');

        // Intensity the background particles
        // (Assuming existing confetti logic or enhancing it)
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.left = '0';
        confetti.style.width = '100vw';
        confetti.style.height = '100vh';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100%; font-size:5rem; animation: shake 0.5s infinite;">🚀💖💰</div>';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
