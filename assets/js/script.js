$(document).ready(function () {
  $(`.carousel.carousel-slider`).carousel({
    duration: 200,
    fullWidth: true,
    indicators: true,
  });
  setInterval(function () {
    $(`.carousel.carousel-slider`).carousel(`next`);
  }, 5000);
});

$(document).ready(function () {
  $('.modal').modal();
});

$(document).ready(function () {
  $('select').formSelect();
});
