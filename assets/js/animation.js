// Typewriter
const text = "L'ingénierie au service de l'expérience numérique.";
const target = document.getElementById('typewriter');
let i = 0;

const typeEffect = () => {
    if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
};

window.addEventListener('load', typeEffect);

// Scroll Reveal simple (peut être étendu)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 400;
        if(top > offset) {
            sec.classList.add('show-animate');
        }
    });
});