const Carousel = (function() {
  const initMeasurements =
      window.screen.availWidth + "x" + window.screen.availHeight,
    queries = [
      "sky",
      "sun+mountain",
      "snow",
      "sun+desert",
      "sun+ocean",
      "sun+forest",
      "sun+winter",
      "sun+field",
      "autumn"
    ],
    carousel = document.querySelector(".carousel"),
    bubbleRow = document.querySelector(".bubble-row"),
    rightControl = document.querySelector(".control.-right"),
    leftControl = document.querySelector(".control.-left");

  let startx,
    methods = {};

    methods.mouseupHandler = function(e) {
      if (startX > e.clientX && e.clientX < window.innerWidth / 2) {
        methods.moveSlide("right", slides);
      }
      if (startX < e.clientX && e.clientX > window.innerWidth / 2) {
        methods.moveSlide("left", slides);
      }
    };
  methods.mousedownHandler = function(e) {
    startX = e.clientX;
    carousel.addEventListener("mouseup", methods.mouseupHandler, true);
  };
  methods.touchHandler = function(e) {
    let theTouch = e.changedTouches[0],
        mouseEv;

    switch (e.type) {
      case "touchstart":
        mouseEv = "mousedown";
        break;
      case "touchend":
        mouseEv = "mouseup";
        break;
      case "touchmove":
        mouseEv = "mousemove";
        break;
      default:
        return;
    }

    let mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent(
      mouseEv,
      true,
      true,
      window,
      1,
      theTouch.screenX,
      theTouch.screenY,
      theTouch.clientX,
      theTouch.clientY,
      false,
      false,
      false,
      false,
      0,
      null
    );
    theTouch.target.dispatchEvent(mouseEvent);

    e.preventDefault();
  };
  methods.moveSlide = function(direction, target) {
    for (i = 0; i < target.length; i++) {
      if (target[i].classList.contains("active")) {
        // removes active from current slide
        target[i].classList.remove("active");

        // separates between right and left control functionality
        if (direction == "right") {
          if (i == target.length - 1) {
            target[0].classList.add("active");
            break;
          }
          target[i + 1].classList.add("active");
          break;
        } else {
          if (i == 0) {
            target[target.length - 1].classList.add("active");
            break;
          }
          target[i - 1].classList.add("active");
          break;
        }
      }
    }
    if (target == slides) {
      methods.moveSlide(direction, bubbles);
    }

    clearInterval(slideTimer);
    slideTimer = window.setInterval(function() {
      methods.moveSlide("right", slides);
    }, 6000);
  };
  methods.adjustCss = function(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value + "px");
  };
  methods.changeBubble = function(e) {
    let node = e.target;
    document.querySelector(".bubble.active").classList.remove("active");
    document.querySelector(".slide.active").classList.remove("active");

    let i = 0,
      e = node;
    while ((e = e.previousSibling)) {
      ++i;
    }

    node.classList.add("active");
    slides[i].classList.add("active");
  };
  methods.addSlide = function(query) {
    carousel.innerHTML +=
      `<div class="slide" style="background: #222 url('http://source.unsplash.com/random/` +
      initMeasurements +
      "?" +
      query +
      `') no-repeat center; background-size: cover;"></div>`;
  };
  methods.addMarker = function() {
    bubbleRow.innerHTML += `<div class="bubble"><div class="marker"></div></div>`;
  };
  methods.setActive = function(selector) {
    const target = document.querySelector(selector);
    target.classList.add("active");
  };
  methods.setImageSize = function() {
    methods.adjustCss("img-width", window.innerWidth);
    methods.adjustCss("img-height", window.innerHeight);
  };

  // on page load
  methods.setImageSize();
  [].forEach.call(queries, function(query) {
    methods.addMarker();
    methods.addSlide(query);
  });

  methods.setActive(".slide");
  methods.setActive(".bubble");

  const slides = document.querySelectorAll(".slide"),
    bubbles = document.querySelectorAll(".bubble");
  [].forEach.call(bubbles, function(bubble) {
    bubble.addEventListener("click", methods.changeBubble, true);
  });

  window.addEventListener("resize", methods.setImageSize);
  rightControl.addEventListener("click", function() {
    methods.moveSlide("right", slides);
  });
  leftControl.addEventListener("click", function() {
    methods.moveSlide("left", slides);
  });

  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 39) methods.moveSlide("right", slides);
    if (e.keyCode == 37) methods.moveSlide("left", slides);
  });

  carousel.addEventListener("touchstart", methods.touchHandler, true);
  carousel.addEventListener("touchmove", methods.touchHandler, true);
  carousel.addEventListener("touchend", methods.touchHandler, true);
  carousel.addEventListener("mousedown", methods.mousedownHandler, true);

  let slideTimer = window.setInterval(function() {
    methods.moveSlide("right", slides);
  }, 6000);
})();
