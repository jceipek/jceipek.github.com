$('document').ready(function () {
  var animateArrow = function (cb) {
    $('.js-scroll-hint').animate({'top': "1em"}, 100).animate({'top': "0em"}, 100, cb);
  };

  var have_scrolled = false;

  setTimeout(function () {
    var arrowAnim = setInterval(function () {
      animateArrow(function () {animateArrow(animateArrow)});
    }, 3000);
    $(window).scroll(function() {
      have_scrolled = true;
      clearInterval(arrowAnim);
    });

    $('.js-scroll-button').hover(function () {
      if (!have_scrolled)
        $('.js-scroll-button').animate({'margin-top': '-2em'}, 300);
    }, function () {
      if (!have_scrolled)
        $('.js-scroll-button').animate({'margin-top': '0'}, 300);
    });
    $('.js-scroll-button').click(function () {
      $('.js-scroll-button').css('margin-top', '0');
      $('html, body').animate({
        scrollTop: $("#projects-header").offset().top
      }, 500);
    });
  }, 1000);

  $('.js-rewrite-email').attr('href', 'mailto:'+'julian'+'.ceipek'+'@'+'gmail.com')
});