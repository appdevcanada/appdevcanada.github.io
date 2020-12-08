'use strict'

var slideIndex = 1;

function loadImage(id, targetId) {
  var el = document.getElementById(id);
  var targetEl = targetId ? document.getElementById(targetId) : el;
  var imageToLoad;
  if (el.dataset.image) {
    imageToLoad = el.dataset.image;
  } else if (typeof el.currentSrc === "undefined") {
    imageToLoad = el.src;
  } else {
    imageToLoad = el.currentSrc;
  }
  if (imageToLoad) {
    var img = new Image();
    img.src = imageToLoad;
    img.onload = function () {
      targetEl.classList.add("is-loaded");
    };
  }
}

function flippage() {
  let flipped = document.getElementById('cardface').classList.contains('is-flipped');
  document.getElementById('cardface').classList.toggle('is-flipped');
  document.getElementById('btnFlip').textContent = `${flipped ? 'Show Skills' : 'Hide Skills'}`;
  setTimeout(function () {
    document.getElementsByClassName('slideshow-container')[0].style.display = `${flipped ? 'block' : 'none'}`;
  }, 300)
}

function plusSlides(ev) {
  showSlides(slideIndex += parseInt(ev.currentTarget.dataset.idx));
}

function currentSlide(ev) {
  showSlides(slideIndex = parseInt(ev.target.dataset.idx));
}

function showSlides(sldIndex) {
  console.log(sldIndex)
  let dots = document.getElementsByClassName("dot");
  let slides = document.getElementsByClassName("mySlides");
  if (sldIndex > slides.length) { slideIndex = 1 }
  if (sldIndex < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  loadImage("wallpaper");
  loadImage("pictureImage", "picture");
  document.getElementById('btnFlip').addEventListener('click', flippage);
  let dot = document.getElementsByClassName("dot");
  for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", currentSlide);
  }
  document.getElementById("prev").addEventListener('click', plusSlides);
  document.getElementById("next").addEventListener('click', plusSlides);
  showSlides(slideIndex);
});
