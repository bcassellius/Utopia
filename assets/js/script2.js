let searchLocation = localStorage.getItem(`Search Location`);
let geoFinderApi = `https://open.mapquestapi.com/geocoding/v1/address?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&location=${searchLocation}`;

if (searchLocation === ``) {
  $(`#city-name`).text(`:(`);
  $(`.card-content`).text(`Sorry, we couldn't find that city, but here are some cool travel photos.`);
  $(`.find-out-more`).text(``);
} else {
  $(`#city-name`).text(searchLocation);
  $(`.find-out-more`).text(`FIND OUT MORE ABOUT ${searchLocation}`);
  $(`.find-out-more`).attr(`href`, `https://en.wikipedia.org/wiki/${searchLocation}`);
  displayImages();
  collectCityData();
}

// const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // Olga's APIkey

function collectCityData() {
  const forecast = $('#city-name').text();
  const apiKey = 'd062b7cc2ea4bdcd13c368fce11ee8b1'; // Bri's APIkey
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${forecast}&units=imperial&appid=${apiKey}`;
  fetch(URL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        renderForecast(forecast);

        function renderForecast() {
          let stamp = data.dt;
          const when = new Date(stamp * 1000);
          const forcastdate = Intl.DateTimeFormat('en-US').format(when);
          const look = data.weather[0].icon;
          const temp = data.main.temp;
          const wind = data.wind.speed;
          const humidity = data.main.humidity;
          const card = `<div class="col s12 weather-box"></div>
        <h3>Weather:</h3>
        <div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item date">${forcastdate}</li>
        <img class="list-group-item weather-icon" src="https://openweathermap.org/img/wn/${look}@2x.png" alt="">
        <li class="list-group-item temp">Temp: ${temp}&#8457</li>
        <li class="list-group-item wind">Wind: ${wind} MPH</li>
        <li class="list-group-item humidity">Humidity: ${humidity}%</li>
        </ul>
        </div>`;
          $('.forecast-container').prepend(card);
        }
      });
    }
  });
  getLatitudeLongitude();
}

function getLatitudeLongitude() {
  fetch(geoFinderApi)
    .then((response) => response.json())
    .then((data) => {
      let lat = data.results[0].locations[0].latLng.lat;
      let lon = data.results[0].locations[0].latLng.lng;

      localStorage.setItem(`Longitude`, lon);
      localStorage.setItem(`Latitude`, lat);
      findPointsOfInterest();
    });
}

function findPointsOfInterest() {
  key = `ap-QFdC7AMslspXollmZWcZB09UvlkCPifDAjqGxosk`;
  lat = localStorage.getItem(`Latitude`);
  lon = localStorage.getItem(`Longitude`);

  fetch(`https://discover.search.hereapi.com/v1/
discover
?at=${lat},${lon}
&q=restaurant
&apiKey=${key}`)
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        $(`.travel-sites`)[i].textContent = data.items[i].address.label;
      }
    });

  fetch(`https://discover.search.hereapi.com/v1/
discover
?at=${lat},${lon}
&q=hotel
&apiKey=${key}`)
    .then((response) => response.json())
    .then((data) => {
      for (i = 5; i < 10; i++) {
        $(`.travel-sites`)[i].textContent = data.items[i].address.label;
      }
    });
}

function displayImages() {
  fetch(`https://api.pexels.com/v1/search?query=${searchLocation}`, {
    headers: {
      Authorization: '563492ad6f91700001000001c8cea40a6038478d89f44dd50b19416f',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.photos[0] === undefined) {
        $(`.no-images-found`).click();
        return;
      } else {
        $(`.hi`).attr(`src`, data.photos[0].src.landscape);
        for (i = 1; i < 6; i++) {
          let pi;
          $(`.slider-images`)[i - 1].setAttribute(`src`, data.photos[i + 1].src.landscape);
        }
      }
    });
}

function findSearchLocation() {
  let searchLocation = $(`#search`).val();
  key = `M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ`; // lashaun's key

  let geoFinderApi = `https://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchLocation}`;

  if (!searchLocation) {
    $(`.unfound-city`).click();
    // return;
  } else {
    fetch(geoFinderApi).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          searchLocation = data.results[0].locations[0].adminArea5;
          localStorage.setItem(`Search Location`, searchLocation);

          $(`#search`).val(``);

          collectCityData();
        });
      }
    });
  }
}

$(`.search-button`).on(`click`, (event) => {
  event.preventDefault();
  let searchNewLocation = $('#search').val();
  key = `M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ`; // lashaun's key

  let geoFinderApi = `https://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchNewLocation}`;

  if (!searchNewLocation) {
    $(`.modal-trigger`).click();
    return;
  } else {
    fetch(geoFinderApi).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          searchNewLocation = data.results[0].locations[0].adminArea5;
          localStorage.setItem(`Search Location`, searchNewLocation);

          $('#search').val();

          collectCityData();
          location.reload();
        });
      }
    });
  }
});

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
