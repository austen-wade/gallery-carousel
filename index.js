const carousel = document.querySelector('.carousel'),
queries = ['screen', 'mountain', 'snow', 'people', 'ball'],
initMeasurements = window.innerWidth + 'x' + window.innerHeight;

adjCSS('imgWidth', window.innerWidth);
adjCSS('imgHeight', window.innerHeight);

queries.forEach(function(query) {
    carousel.innerHTML += `<div class="slide" style="background: #fff url('http://source.unsplash.com/random/`+ initMeasurements + '?' + query + `') no-repeat center"></div>`
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