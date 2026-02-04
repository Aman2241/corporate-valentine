const app = {
    init() {
        console.log('Corporate Valentine Protocol Initiated...');
        this.addScrollEffects();
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
