const navLinks = document.querySelector('.nav-links');
const menuButton = document.createElement('div');
menuButton.className = 'menu-button';
menuButton.textContent = 'Menu';
document.querySelector('nav').appendChild(menuButton);

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});