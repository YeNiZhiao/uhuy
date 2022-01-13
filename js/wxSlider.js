// WX Slider
$(document).ready(function () {
  // Global variables
  var slides = 0,
    duration = 5000,
    direction = "rtl", // ltr, rtl, utd, dtu
    sequence = "inc", //inc, dec
    effect = "sliding", //fading, sliding
    isAnimating = true,
    animPauseTime = 15000,
    afterInit = false,
    $currentSlide = $(),
    $previousSlide = $(),
    i = 0,
    j = 0;

  // Prototypes - fade effect
  $.fn.showSlide = function () {
    $(this).addClass("active").fadeIn("slow");
  };

  $.fn.hideSlide = function () {
    $(this).removeClass("active");
    $slide = $(this);
    setTimeout(function () {
      $slide.css("display", "none");
    }, duration);
  };

  // Prototypes - slide effect
  $.fn.slideInSlide = function () {
    $(this).addClass("active").css("display", "block");
    $(this).css(css_anim_before).animate(css_anim_params, 500);
  };

  $.fn.slideOutSlide = function () {
    $slide = $(this);
    $slide.animate(css_anim_params, 500, function () {
      $slide.removeClass("active").css(css_anim_after);
    });
  };

  // Functions
  var initSlider = function () {
    $(".direction-changer").val(direction); // Initialize the direction changer
    $(".sequence-changer").val(sequence); // Initialize the sequence changer
    $(".effect-changer").val(effect); // Initialize the effct changer

    $(".slide").each(function () {
      slides++;
      $(this).addClass("slide-" + slides);
      $(this).css("display", "none");
      // $(this).prepend('<div class="caption-container">' + '<span class="caption for-slide-' + slides + '">' + slides + "</span>" + "</div>");
      if (slides == 1) {
        $(this).prepend('<div class="caption-container">' + '<span class="caption for-slide-' + slides + '">' + "30 januari" + "</span>" + "</div");
      }
      if (slides == 2) {
        $(this).prepend('<div class="caption-container">' + '<span class="caption for-slide-' + slides + '">' + "Aamiin Ya Robbal Aalamiin" + "</span>" + "</div");
      }
      if (slides == 3) {
        $(this).prepend('<div class="caption-container">' + '<span class="caption for-slide-' + slides + '">' + "Uhuyy 19 tahun" + "</span>" + "</div");
      }
    });

    i = 1;
    j = slides;

    switch (sequence) {
      case "inc":
        $currentSlide = $(".slide-" + 2);
        $previousSlide = $(".slide-" + i);
        $previousSlide.addClass("active").css("display", "block"); // "previous slide activate"
        break;

      case "dec":
        $currentSlide = $(".slide-" + j);
        $previousSlide = $(".slide-" + 1);
        $previousSlide.addClass("active").css("display", "block"); // "previous slide activate"
        break;

      default:
        alert("Please specify a valid slide sequence!");
        return false;
    }

    console.log("The slider was initialized successfully!");
    console.log("current  > ", $currentSlide.attr("class"));
    console.log("previous > ", $previousSlide.attr("class"));

    afterInit = true;
  };

  initSlider();

  var getNextSlides = function (slide) {
    var originalSequence = sequence;

    if (slide === "prev") {
      switch (sequence) {
        case "inc":
          sequence = "dec";
          break;

        case "dec":
          sequence = "inc";
          break;

        default:
          alert("Please specify a valid slide direction!");
          return false;
      }
    }

    switch (sequence) {
      case "inc":
        if (i === j) {
          i = 1;
        } else {
          i++;
        } // restart inc loop
        console.log("The slide sequence is 'INC'");
        break;

      case "dec":
        if (i === 1) {
          i = j;
        } else {
          i--;
        } // restart dec loop
        console.log("The slide sequence is 'DEC'");
        break;

      default:
        alert("Please specify a valid slide sequence!");
        return false;
    }

    if (!afterInit) {
      $previousSlide = $currentSlide;
      $currentSlide = $(".slide-" + i);
    } else {
      afterInit = false;
    }

    sequence = originalSequence;
  };

  var goToSlide = function (slide) {
    // switch (slide) {

    //   case "next":
    //     console.log("Going to next slide.");
    //   break;

    //   case "prev":
    //     console.log("Going to previous slide.")
    //   break;

    //   default:
    //     alert("Please specify the next slide!");
    //   return false;
    // };

    switch (effect) {
      case "fading":
        getNextSlides(slide);
        $previousSlide.hideSlide();
        $currentSlide.showSlide();

        break;

      case "sliding":
        getNextSlides(slide);
        getDirection(slide);
        $previousSlide.slideOutSlide();
        $currentSlide.slideInSlide();
        break;

      default:
        alert("Please specify a valid slide effect!");
        return false;
    }

    console.log("current  > ", $currentSlide.attr("class"));
    console.log("previous > ", $previousSlide.attr("class"));
  };

  var slideLoop = function () {
    if (isAnimating) {
      goToSlide("next");
      setTimeout(slideLoop, duration); // recursive call
    } else {
      console.log("Animation stopped.");
    }
  };
  setTimeout(slideLoop, duration); // starter call

  // Additional functions
  var css_anim_before = {};
  var css_anim_params = {};
  var css_anim_after = { top: "0", left: "0" };

  var getDirection = function (slide) {
    var originalDirection = direction;

    if (slide === "prev") {
      switch (direction) {
        case "ltr":
          direction = "rtl";
          break;

        case "rtl":
          direction = "ltr";
          break;

        case "utd":
          direction = "dtu";
          break;

        case "dtu":
          direction = "utd";
          break;

        default:
          alert("Please specify a valid slide direction!");
          return false;
      }
    }

    switch (direction) {
      case "ltr":
        css_anim_before = { left: "-100%" };
        css_anim_params = { left: "+=100%" };
        break;

      case "rtl":
        css_anim_before = { left: "100%" };
        css_anim_params = { left: "-=100%" };
        break;

      case "utd":
        css_anim_before = { top: "-100%" };
        css_anim_params = { top: "+=100%" };
        break;

      case "dtu":
        css_anim_before = { top: "100%" };
        css_anim_params = { top: "-=100%" };
        break;

      default:
        alert("Please specify a valid slide direction!");
        return false;
    }

    direction = originalDirection;
  };

  var changeEffectTo = function (effect_param) {
    switch (effect_param) {
      case "fading":
        effect = "fading";
        $(".slide").css("display", "none");
        $(".slide.active").css("display", "block");
        break;

      case "sliding":
        effect = "sliding";
        $(".slide").css("display", "block");
        break;

      default:
        alert("Please specify a valid slide effect!");
        return false;
    }
  };

  var resumeAnimation;

  var nextStep = function ($navItem) {
    isAnimating = false;
    $navItem.addClass("disabled");

    if ($navItem === $navNext) {
      goToSlide("next");
    } else if ($navItem === $navPrev) {
      goToSlide("prev");
    }

    setTimeout(function () {
      $navItem.removeClass("disabled");
    }, 1000);

    clearTimeout(resumeAnimation);
    resumeAnimation = setTimeout(function () {
      isAnimating = true;
      console.log("Resuming animation.");
      slideLoop();
    }, animPauseTime);
  };

  // event handlers - sequence
  $(".sequence-changer").change(function () {
    sequence = $(this).val();
    var seqText = $(".sequence-changer option:selected").text();
    console.log("Sequence was set to " + seqText + "!");
  });

  // event handlers - direction
  $(".direction-changer").change(function () {
    direction = $(this).val();
    var dirText = $(".direction-changer option:selected").text();
    console.log("Direction was set to " + dirText + "!");
  });

  // event handlers - effect
  $(".effect-changer").change(function () {
    var newEffect = $(this).val();
    changeEffectTo(newEffect);
    var effText = $(".effect-changer option:selected").text();
    console.log("Sliding effect was set to " + effText + "!");
  });

  // event handlers - navigation
  var $navPrev = $(".navi.prev"),
    $navNext = $(".navi.next");

  $navPrev.click(function () {
    nextStep($navPrev);
  });

  $navNext.click(function () {
    nextStep($navNext);
  });
});
