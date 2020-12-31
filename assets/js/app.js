const scroll = new SmoothScroll('nav a[href*="#"]', {
    speed: 800
});
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const paras = document.querySelector('.single-course p');
const fileName = document.querySelector('.uploaded-file-name');

function processSelectedFile(fileInput) {
    var files = fileInput.files;
    
    fileName.textContent = files[0].name;
  }

document.querySelectorAll('.call-pop').forEach(element => {
    element.addEventListener('click', function() {
        document.getElementById('overlay').classList.add('is-visible');
        document.getElementById('modal').classList.add('is-visible');
    });
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
});

window.addEventListener("load", function() {

	// store tabs variable
	var myTabs = document.querySelectorAll("ul.nav-tabs > li");

	function myTabClicks(tabClickEvent) {

		for (var i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}

		var clickedTab = tabClickEvent.currentTarget; 

		clickedTab.classList.add("active");

		tabClickEvent.preventDefault();

		var myContentPanes = document.querySelectorAll(".tab-pane");

		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
		}

		var anchorReference = tabClickEvent.target;
		var activePaneId = anchorReference.getAttribute("href");
		var activePane = document.querySelector(activePaneId);

		activePane.classList.add("active");

	}

	for (i = 0; i < myTabs.length; i++) {
		myTabs[i].addEventListener("click", myTabClicks)
	}
});

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});
closeIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// for (var i = 0; i < document.links.length; i++) {
//     if (document.links[i].href == document.URL) {
//         document.links[i].className = 'active';
//     }
// }
