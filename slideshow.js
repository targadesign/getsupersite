$(document).ready(function() {
  var currentSlide = 1;
  var totalSlides = $(".slide").length;
  var $slideCounterCurrent = $('.slide-counter-current');
  var $slideCounterTotal = $('.slide-counter-total');

  // set the visibility of all slides to hidden except for the first one
  $(".slide:not(:first)").css({
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
  });

  // add the active class to the first slide button and slide button counter
  $(".slide-btn:first, .slide-btn:first .slide-btn-counter").addClass("active-btn");

  // update slide counter
  $slideCounterCurrent.text(currentSlide);
  $slideCounterTotal.text(totalSlides);

  $(".slide-btn").click(function() {
    // get the slide number from the clicked button
    var slideNumber = $(this).attr("data-slide-number");

    if (slideNumber == currentSlide) {
      return;
    }

    // animate the current slide out and the next slide in
    $(".slide.active-slide")
      .removeClass("active-slide")
      .animate(
        {
          opacity: 0,
        },
        200,
        function() {
          $(this).css({
            visibility: "hidden",
            pointerEvents: "none",
          });
        }
      );

    $(".slide[data-slide-number=" + slideNumber + "]")
      .css({
        visibility: "visible",
        pointerEvents: "auto",
      })
      .animate(
        {
          opacity: 1,
        },
        200,
        function() {
          $(this).addClass("active-slide");
        }
      );

    // update the active button and button counter
    var $activeBtn = $(".slide-btn.active-btn");
    $activeBtn.find(".slide-btn-counter").removeClass("active-btn");
    $activeBtn.removeClass("active-btn");

    $(this).addClass("active-btn");
    $(this).find(".slide-btn-counter").addClass("active-btn");

    // update slide counter
    $slideCounterCurrent.text(slideNumber);
    currentSlide = slideNumber;
  });

  $(".slide .slide-next, .slide-next").click(function() {
  // get the slide number of the next slide
  var nextSlideNumber = parseInt(currentSlide) + 1;
  if (nextSlideNumber > totalSlides) {
    nextSlideNumber = 1;
  }

  // trigger the click event on the slide button with the corresponding slide number
  $(".slide-btn[data-slide-number=" + nextSlideNumber + "]").click();

  // update the current slide number
  currentSlide = nextSlideNumber;

  // update slide counter
  $slideCounterCurrent.text(currentSlide);
});

  $(".slide .slide-previous, .slide-previous").click(function() {
    // get the slide number of the previous slide
    var prevSlideNumber = currentSlide - 1;
    if (prevSlideNumber < 1) {
      prevSlideNumber = totalSlides;
    }

    // trigger the click event on the slide button with the corresponding slide number
    $(".slide-btn[data-slide-number=" + prevSlideNumber + "]").click();

    // update the current slide number
    currentSlide = prevSlideNumber;

    // update slide counter
    $slideCounterCurrent.text(currentSlide);
  });
  
// Add event listener for the submit button
$(".is-submit").click(function (event) {
  event.preventDefault();

  let allFieldsFilled = true;
 
