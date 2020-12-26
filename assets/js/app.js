const scroll = new SmoothScroll('nav a[href*="#"]', {
    speed: 800
});
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const paras = document.querySelector('.single-course p');

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
closeIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href == document.URL) {
        document.links[i].className = 'active';
    }
}
