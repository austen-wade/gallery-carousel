const carousel = document.querySelector('.carousel'),
queries = ['rain', 'mountain', 'snow', 'desert', 'ocean', 'forest', 'garden', 'field', 'sand'],
initMeasurements = window.innerWidth + 'x' + window.innerHeight;
let startX;

adjCSS('imgWidth', window.innerWidth);
adjCSS('imgHeight', window.innerHeight);

queries.forEach(function(query) {
    carousel.innerHTML += `<div class="slide" style="background: #222 url('http://source.unsplash.com/random/`+ initMeasurements + '?' + query + `') no-repeat center; background-size: contain;"></div>`
});

document.querySelector('.slide').classList.add('active');
let slides = document.querySelectorAll('.slide');

window.addEventListener('resize', function() {
    adjCSS('imgWidth', window.innerWidth);
    adjCSS('imgHeight', window.innerHeight);
});

const rightControl = document.querySelector('.go-right'),
leftControl = document.querySelector('.go-left');

rightControl.addEventListener('click', function() { moveSlide('right') });
leftControl.addEventListener('click', function() { moveSlide('left') });

window.addEventListener('keydown', function(e) {
    if (e.keyCode == 39) moveSlide('right');
    if (e.keyCode == 37) moveSlide('left');
})

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
        moveSlide('right');
    }
    if (startX < e.clientX && e.clientX > window.innerWidth/2) {
        moveSlide('left');
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
function moveSlide(direction) {
    for (i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {

            // removes active from current slide
            slides[i].classList.remove('active');

            // separates between right and left control functionality
            if (direction == 'right') {
                if (i == slides.length-1) {
                    slides[0].classList.add('active');
                    break;
                }
                slides[i+1].classList.add('active');
                break;
            } else {
                if (i == 0) {
                    slides[slides.length-1].classList.add('active');
                    break;
                }
                slides[i-1].classList.add('active');
                break;
            }

        }
    }
}
function adjCSS(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value + 'px');
}