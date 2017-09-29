const carousel = document.querySelector('.carousel'),
queries = ['rain', 'mountain', 'snow', 'desert', 'ocean', 'forest', 'garden', 'field', 'sand'],
initMeasurements = window.innerWidth + 'x' + window.innerHeight,
bubbleRow = document.querySelector('.bubble-row');
let startX;

adjCSS('imgWidth', window.innerWidth);
adjCSS('imgHeight', window.innerHeight);

queries.forEach(function(query) {
    bubbleRow.innerHTML += `<div class="bubble"></div>`;
});

queries.forEach(function(query) {
    carousel.innerHTML += `<div class="slide" style="background: #222 url('http://source.unsplash.com/random/`+ initMeasurements + '?' + query + `') no-repeat center; background-size: contain;"></div>`;
});

document.querySelector('.slide').classList.add('active');
document.querySelector('.bubble').classList.add('active');
let slides = document.querySelectorAll('.slide');
let bubbles = document.querySelectorAll('.bubble');
[].forEach.call(bubbles, function(e){e.addEventListener('click', bubbleChange, false)});

// shifts two css variables on resize
window.addEventListener('resize', function() {
    adjCSS('imgWidth', window.innerWidth);
    adjCSS('imgHeight', window.innerHeight);
});

// make side arrow buttons work
const rightControl = document.querySelector('.go-right'),
leftControl = document.querySelector('.go-left');
rightControl.addEventListener('click', function() { moveSlide('right', slides) });
leftControl.addEventListener('click', function() { moveSlide('left', slides) });

// allow navigation with arrow keys
window.addEventListener('keydown', function(e) {
    if (e.keyCode == 39) moveSlide('right', slides);
    if (e.keyCode == 37) moveSlide('left', slides);
})

// initiate mobile UI
document.addEventListener("touchstart", touch2Mouse, true);
document.addEventListener("touchmove", touch2Mouse, true);
document.addEventListener("touchend", touch2Mouse, true);
document.addEventListener('mousedown', mousedownHandler, true);


function mousedownHandler(e) {
    startX = e.clientX;
    document.addEventListener('mouseup', mouseupHandler, true);
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
}
function adjCSS(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value + 'px');
}

function bubbleChange(e) {
    let node = e.target;
    document.querySelector('.bubble.active').classList.remove('active');
    document.querySelector('.slide.active').classList.remove('active');

    var i=0, e=node;
    while (e = e.previousSibling) { console.log(i); ++i;}

    node.classList.add('active');
    slides[i].classList.add('active');
}