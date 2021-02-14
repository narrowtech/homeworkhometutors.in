"use strict";

var scroll = new SmoothScroll('nav a[href*="#"]', {
  speed: 800
});
var hamburger = document.querySelector('.hamburger');
var closeIcon = document.querySelector('.close-icon');
var navLinks = document.querySelector('.nav-links');
var links = document.querySelector('.nav-links li');
var paras = document.querySelector('.single-course p');
var fileName = document.querySelector('.uploaded-file-name');
var address = document.querySelector('.teacher-address');
var saddress = document.querySelector('.student-address');

function processSelectedFile(fileInput) {
  var files = fileInput.files;
  fileName.textContent = files[0].name;
}

document.querySelectorAll('.call-pop').forEach(function (element) {
  element.addEventListener('click', function () {
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modal').classList.add('is-visible');
  });
});
document.getElementById('close-btn').addEventListener('click', function () {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function () {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('modal').classList.remove('is-visible');
});
document.getElementById('toast-close-btn').addEventListener('click', function () {
  document.getElementById('toast').classList.remove('is-visible');
});
window.addEventListener("load", function () {
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
    myTabs[i].addEventListener("click", myTabClicks);
  }
});
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});
closeIcon.addEventListener("click", function () {
  navLinks.classList.toggle("open");
}); //http://localhost:3000

var Url = 'https://homework-hometutors-mailer.herokuapp.com/student';
var Url2 = 'https://homework-hometutors-mailer.herokuapp.com/teacher';

function submitStudent(e) {
  e.preventDefault();
  var name = document.forms["studForm"]["name"];
  var email = document.forms["studForm"]["email"];
  var phone = document.forms["studForm"]["phone"];
  var classname = document.forms["studForm"]["class"];
  var district = document.forms["studForm"]["district"];
  var frm = document.getElementsByName('studForm')[0];
  var phoneno = /^\d{10}$/;
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (name.value == "") {
    window.alert("Please enter your name.");
    name.focus();
    return false;
  }

  if (email.value == "") {
    window.alert("Please enter e-mail address.");
    email.focus();
    return false;
  }

  if (!email.value.match(mailformat)) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (phone.value == "") {
    window.alert("Please enter your telephone number.");
    phone.focus();
    return false;
  }

  if (!phone.value.match(phoneno)) {
    window.alert("Please enter a valid number.");
    phone.focus();
    return false;
  }

  if (classname.selectedIndex < 1) {
    alert("Please enter your class.");
    classname.focus();
    return false;
  }

  if (district.selectedIndex < 1) {
    alert("Please enter your district.");
    district.focus();
    return false;
  }

  document.getElementById('student-button').disabled = true;
  document.getElementById('loader').classList.remove('void');
  document.getElementById('texter').classList.add('void');
  var Data = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    classname: classname.options[classname.selectedIndex].text,
    district: district.options[district.selectedIndex].text
  };
  var Params = {
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(Data),
    method: "POST"
  };
  console.log(Data);
  fetch(Url, Params) //.then(data => { return data.json() })
  .then(function (res) {
    document.getElementById('student-button').disabled = false;
    document.getElementById('toast').classList.add('is-visible');
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
    document.getElementById('loader').classList.add('void');
    document.getElementById('texter').classList.remove('void');
    frm.reset();
  }).then(function (error) {
    document.getElementById('student-button').disabled = false;
    document.getElementById('loader').classList.add('void');
    document.getElementById('texter').classList.remove('void');
    console.log(error);
  });
}

function submitTeacher(e) {
  e.preventDefault();
  var name = document.forms["techForm"]["name"];
  var email = document.forms["techForm"]["email"];
  var phone = document.forms["techForm"]["phone"];
  var qualification = document.forms["techForm"]["qualification"];
  var address = document.forms["techForm"]["address"];
  var frm = document.getElementsByName('techForm')[0];
  var phoneno = /^\d{10}$/;
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (name.value == "") {
    window.alert("Please enter your name.");
    name.focus();
    return false;
  }

  if (email.value == "") {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (!email.value.match(mailformat)) {
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
  }

  if (phone.value == "") {
    window.alert("Please enter your telephone number.");
    phone.focus();
    return false;
  }

  if (!phone.value.match(phoneno)) {
    window.alert("Please enter a valid number.");
    phone.focus();
    return false;
  }

  if (qualification.value == "") {
    alert("Please enter your qualification.");
    qualification.focus();
    return false;
  }

  if (address.value == "") {
    alert("Please enter your address.");
    address.focus();
    return false;
  }

  var file = document.getElementById("file-upload").files[0];
  document.getElementById('teacher-button').disabled = true;
  document.getElementById('loader2').classList.remove('void');
  document.getElementById('texter2').classList.add('void'); // const Data = {
  // 	name: name.value,
  // 	email: email.value,
  // 	phone: phone.value,
  // 	qualification: qualification.value,
  // 	address: address.value,
  // }

  var formData = new FormData();
  formData.append("file", file);
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("phone", phone.value);
  formData.append("qualification", qualification.value);
  formData.append("address", address.value);
  var Params = {
    // headers: {
    // 	"Content-Type": "multipart/form-data",
    // },
    //mode: "no-cors",
    body: formData,
    method: "POST"
  };
  fetch(Url2, Params) //.then(data => { return data.json() })
  .then(function (res) {
    console.log(res);
    document.getElementById('teacher-button').disabled = false;
    document.getElementById('toast').classList.add('is-visible');
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
    document.getElementById('loader2').classList.add('void');
    document.getElementById('texter2').classList.remove('void');
    frm.reset();
  }).then(function (error) {
    document.getElementById('teacher-button').disabled = false;
    document.getElementById('loader2').classList.add('void');
    document.getElementById('texter2').classList.remove('void');
    console.log(error);
  });
} //https://www.mapquestapi.com/geocoding/v1/reverse?key=KEY&location=1%2C1&outFormat=json&thumbMaps=false


var getLocation = function getLocation(e) {
  e.preventDefault();

  if (navigator.geolocation) {
    document.getElementById('location-button').disabled = true;
    document.getElementById('loader3').classList.remove('void');
    document.getElementById('texter3').classList.add('void');
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}; //'https://jsonplaceholder.typicode.com/posts/1'


function showPosition(position) {
  var res = {};
  var data = fetch("https://www.mapquestapi.com/geocoding/v1/reverse?key=gLhWAWj0r9MjYC6XLfzD2UqtvOaduCuF&location=".concat(position.coords.latitude, "%2C").concat(position.coords.longitude, "&outFormat=json&thumbMaps=false")).then(function (response) {
    return response.json();
  }).then(function (json) {
    //console.log(json);
    res = json;
    address.value = "".concat(res.results[0].locations[0].street, ", ").concat(res.results[0].locations[0].adminArea5, ", ").concat(res.results[0].locations[0].adminArea3, ", ").concat(res.results[0].locations[0].postalCode); //console.log(res);

    document.getElementById('location-button').disabled = false;
    document.getElementById('loader3').classList.add('void');
    document.getElementById('texter3').classList.remove('void');
  });
}

var getLocation2 = function getLocation2(e) {
  e.preventDefault();

  if (navigator.geolocation) {
    document.getElementById('student-location').disabled = true;
    document.getElementById('loader4').classList.remove('void');
    document.getElementById('texter4').classList.add('void');
    navigator.geolocation.getCurrentPosition(showPosition2);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}; //'https://jsonplaceholder.typicode.com/posts/1'


function showPosition2(position) {
  var res = {};
  var data = fetch("https://www.mapquestapi.com/geocoding/v1/reverse?key=gLhWAWj0r9MjYC6XLfzD2UqtvOaduCuF&location=".concat(position.coords.latitude, "%2C").concat(position.coords.longitude, "&outFormat=json&thumbMaps=false")).then(function (response) {
    return response.json();
  }).then(function (json) {
    //console.log(json);
    res = json;
    saddress.value = "".concat(res.results[0].locations[0].street, ", ").concat(res.results[0].locations[0].adminArea5, ", ").concat(res.results[0].locations[0].adminArea3, ", ").concat(res.results[0].locations[0].postalCode); //console.log(res);

    document.getElementById('student-location').disabled = false;
    document.getElementById('loader4').classList.add('void');
    document.getElementById('texter4').classList.remove('void');
  });
}