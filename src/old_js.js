const carousel = document.querySelector('.carousel'),
queries = ['sky', 'sun+mountain', 'snow', 'sun+desert', 'sun+ocean', 'sun+forest', 'sun+winter', 'sun+field', 'autumn'],
initMeasurements = window.screen.availWidth + 'x' + window.screen.availHeight,
bubbleRow = document.querySelector('.bubble-row'),
rightControl = document.querySelector('.control.-right'),
leftControl = document.querySelector('.control.-left');
let startX; // variable for touch ui

setCSSVariables();
[].forEach.call(queries, function(e) { addMarkerToHTML(); addSlideToHTML(e) });
setActive('.slide');
setActive('.bubble');

const slides = document.querySelectorAll('.slide'), 
bubbles = document.querySelectorAll('.bubble');
[].forEach.call(bubbles, function(e) { e.addEventListener('click', bubbleChange, true) });

// set css variables everytime window size changes
window.addEventListener('resize', function() {
    setCSSVariables();
});

// make side arrow buttons work
rightControl.addEventListener('click', function() { moveSlide('right', slides) });
leftControl.addEventListener('click', function() { moveSlide('left', slides) });

// allow navigation with arrow keys
window.addEventListener('keydown', function(e) {
    if (e.keyCode == 39) moveSlide('right', slides);
    if (e.keyCode == 37) moveSlide('left', slides);
})

// initiate mobile UI
carousel.addEventListener("touchstart", touch2Mouse, true);
carousel.addEventListener("touchmove", touch2Mouse, true);
carousel.addEventListener("touchend", touch2Mouse, true);
carousel.addEventListener('mousedown', mousedownHandler, true);

let slideTimer = window.setInterval(function() { moveSlide('right', slides) } , 6000);

function mousedownHandler(e) {
    startX = e.clientX;
    carousel.addEventListener('mouseup', mouseupHandler, true);
}
function mouseupHandler(e) {
    if (startX > e.clientX && e.clientX < window.innerWidth/2) {
        moveSlide('right', slides);
    }
    if (startX < e.clientX && e.clientX > window.innerWidth/2) {
        moveSlide('left', slides);
    }
}
function touch2Mouse(e) {
  var theTouch = e.changedTouches[0];
  var mouseEv;

  switch(e.type)
  {
    case "touchstart": mouseEv="mousedown"; break;  
    case "touchend":   mouseEv="mouseup"; break;
    case "touchmove":  mouseEv="mousemove"; break;
    default: return;
  }

  var mouseEvent = document.createEvent("MouseEvent");
  mouseEvent.initMouseEvent(
      mouseEv, true, true, window, 1,
       theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, 
      false, false, false, false, 0, null
    );
  theTouch.target.dispatchEvent(mouseEvent);

  e.preventDefault();
}
function moveSlide(direction, target) {
    for (i = 0; i < target.length; i++) {
        if (target[i].classList.contains('active')) {

            // removes active from current slide
            target[i].classList.remove('active');

            // separates between right and left control functionality
            if (direction == 'right') {
                if (i == target.length-1) {
                    target[0].classList.add('active');
                    break;
                }
                target[i+1].classList.add('active');
                break;
            } else {
                if (i == 0) {
                    target[target.length-1].classList.add('active');
                    break;
                }
                target[i-1].classList.add('active');
                break;
            }

        }
    }
    if (target == slides) {
        moveSlide(direction, bubbles);
    }

    clearInterval(slideTimer);
    slideTimer = window.setInterval(function() { moveSlide('right', slides) } , 6000);
}
function adjCSS(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value + 'px');
}
function bubbleChange(e) {
    let node = e.target;
    document.querySelector('.bubble.active').classList.remove('active');
    document.querySelector('.slide.active').classList.remove('active');

    var i=0, e=node;
    while (e = e.previousSibling) { ++i;}

    node.classList.add('active');
    slides[i].classList.add('active');
}
function addSlideToHTML(query) {
    carousel.innerHTML += `<div class="slide" style="background: #222 url('http://source.unsplash.com/random/`+ initMeasurements + '?' + query + `') no-repeat center; background-size: cover;"></div>`;
}
function addMarkerToHTML() {
    bubbleRow.innerHTML += `<div class="bubble"><div class="marker"></div></div>`;
}
function setActive(selector) {
    const target = document.querySelector(selector);
    target.classList.add('active')
};
function setCSSVariables() {
    adjCSS('img-width', window.innerWidth);
    adjCSS('img-height', window.innerHeight);;
};