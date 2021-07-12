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

function saveLocation() {
  let searchLocation = $(`#city-search`).val();

  if (!searchLocation) {
    // tell the user to enter a city
    return;
  } else {
    localStorage.setItem(`Search Location`, searchLocation);
    location.href = './index2.html';
  }
}

// $(`#city-search-button`).on(`click`, saveLocation);
