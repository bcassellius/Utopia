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
  let searchedLocation = $(`#city-search`).val();

  if (!searchedLocation) {
    return;
  } else {
    localStorage.setItem(`Search Location`, searchedLocation);
    location.href = './index2.html';
  }
}

function updateCurrencyModal() {
  let currencyAmount = $(`#currency-amount`).val().trim().replace(/,/g, '');
  let newCurrencyCode = $(`.select-dropdown`).val().slice(0, 3);
  let currencyConverterApi = `https://www.geoplugin.net/json.gp?base_currency=${newCurrencyCode}`;

  fetch(currencyConverterApi)
    .then((response) => response.json())
    .then(function (data) {
      let newCurrencyName = $(`.select-dropdown`).val().slice(3).replace(`(`, ``).replace(`)`, ``);

      console.log($(`#currency-amount`).val());
      if (newCurrencyName === `ose the currency` || $(`#currency-amount`).val() === ``) {
        return;
      } else {
        $(`#currency-search-title`).text(newCurrencyName);

        let userCurrency = data.geoplugin_currencyCode;
        let convertedCurrency = data.geoplugin_currencyConverter;
        let convertedTotal = (convertedCurrency * currencyAmount).toFixed(2);

        $('#currency-modal-content').text(`${currencyAmount} ${newCurrencyCode}  is worth ${convertedTotal} ${userCurrency}.`);
      }
    });
}
$(`#currency-search-button`).on(`click`, updateCurrencyModal);

function findSearchLocation() {
  let searchLocation = $(`#city-search`).val();
  key = `M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ`; // lashaun's key

  let geoFinderApi = `https://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchLocation}`;

  if (!searchLocation) {
    return;
  } else {
    fetch(geoFinderApi).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          searchLocation = data.results[0].locations[0].adminArea5;
          localStorage.setItem(`Search Location`, searchLocation);
          location.href = './index2.html';
        });
      } else {
        $(`.city-card-details`).text(`Sorry, something went wrong`);
      }
    });
  }
}
$(`#city-search-button`).on(`click`, findSearchLocation);

// Weather api
const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // Olga's APIkey

// const apiKey = 'd062b7cc2ea4bdcd13c368fce11ee8b1' // Bri's APIkey

function updateWeatherModal() {
  let city = $('#weather-search').val().trim();
  $(`#weather-search`).val(``);

  if (!city) {
    $('#weather-modal-content').text(`Please, enter city name.`);
  } else {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(URL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          $('#weather-modal-content').text(`The current weather in ${data.name} is ${Math.round(data.main.temp)}°F with ${data.weather[0].description}.`);
        });
      } else {
        $('#weather-modal-content').text(`Please, enter a correct city name.`);
      }
    });
  }
}

$('#weather-search-button').on('click', updateWeatherModal);
