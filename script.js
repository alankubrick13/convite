document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('button, a, .letter, .ransom');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // RSVP Logic
    const btnConfirm = document.getElementById('btn-confirm');
    const btnDecline = document.getElementById('btn-decline');
    const modal = document.getElementById('modal-success');
    const closeModal = document.querySelector('.close-modal');

    btnConfirm.addEventListener('click', () => {
        modal.classList.add('active');
        createConfetti();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });


    // Background Music - starts with user interaction
    const bgMusic = document.getElementById('bg-music');
    bgMusic.volume = 0.3; // Set volume to 30%

    // Try to play music on first user interaction
    const playMusic = () => {
        bgMusic.play().catch(err => console.log('Music autoplay prevented'));
        document.removeEventListener('click', playMusic);
        document.removeEventListener('mousemove', playMusic);
    };
    document.addEventListener('click', playMusic);
    document.addEventListener('mousemove', playMusic);

    // Runaway Button Logic - REMOVED (keeping only click message)

    // Click handler - show humorous message
    btnDecline.addEventListener('click', (e) => {
        e.preventDefault();
        alert('O que tu quer tá mole, tente novamente 😏');
    });

    // Countdown Timer
    function updateCountdown() {
        // Graduation ceremony: February 11, 2026 at 16:00 (Brasília time, UTC-3)
        const graduationDate = new Date('2026-02-11T16:00:00-03:00');
        const now = new Date();
        const difference = graduationDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Event has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    function createConfetti() {
        const colors = ['#1e3a8a', '#3b82f6', '#000', '#fff'];
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '10001';
            confetti.style.opacity = Math.random();
            confetti.style.borderRadius = i % 3 === 0 ? '50%' : '2px';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(.1, .7, 1.0, .1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // Subtle tilt effect for the card
    const card = document.querySelector('.collage-card');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});
