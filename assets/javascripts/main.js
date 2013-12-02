$('document').ready(function () {
  var animateArrow = function (cb) {
    $('.js-scroll-hint').animate({'margin-top': "1em"}, 100).animate({'margin-top': "0em"}, 100, cb);
  };

  setTimeout(function () {
    var arrowAnim = setInterval(function () {
      animateArrow(function () {animateArrow(animateArrow)});
    }, 3000);
    $(window).scroll(function() {
      clearInterval(arrowAnim);
    });
    $('#projects-header').click(function () {
          $('html, body').animate({
            scrollTop: $("#projects-header").offset().top
          }, 500);
    });
  }, 1000);

  $('.js-rewrite-email').attr('href', 'mailto:'+'julian'+'.ceipek'+'@'+'gmail.com')
});