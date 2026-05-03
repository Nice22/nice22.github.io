const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
    
    // Animation fluide pour le cercle extérieur
    ring.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
    }, { duration: 500, fill: "forwards" });
});

// Interaction avec les éléments cliquables
const interactives = document.querySelectorAll('a, button, .theme-toggle-wrap');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.borderColor = 'var(--amber)';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(232, 168, 56, .45)';
    });
});