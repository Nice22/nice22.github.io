const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

themeBtn.addEventListener('click', toggleTheme);

// Initialisation
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);