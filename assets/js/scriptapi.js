function updateCurrencyModal() {
  let newCurrencyCode = $(`.select-dropdown`).val().slice(0, 3);
  let currencyConverterApi = `http://www.geoplugin.net/json.gp?base_currency=${newCurrencyCode}`;

  fetch(currencyConverterApi)
    .then((response) => response.json())
    .then(function (data) {
      let newCurrencyName = $(`.select-dropdown`).val().slice(3).replace(`(`, ``).replace(`)`, ``);
      $(`#currency-search-title`).text(newCurrencyName);

      let userCurrency = data.geoplugin_currencyCode;
      let convertedCurrency = data.geoplugin_currencyConverter.toFixed(2);
      $('#currency-modal-content').text(`Every 1 ${userCurrency}  is worth ${convertedCurrency} ${newCurrencyCode}.`);
    });
}
$(`#currency-search-button`).on(`click`, updateCurrencyModal);

function findSearchLocation() {
  let searchLocation = $(`#city-search`).val();
  key = `M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ`; // lashaun's key

  let geoFinderApi = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${searchLocation}`;

  if (!searchLocation) {
    // please enter a location
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
        $('#currency-modal-content').text(`Please select a currency before searching.`);
        return;
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



// // Create a card for today's forcast
// function renderForecast(forcast) {
//   let forcast = $('#weather-search').val().trim();
//   let stamp = daily.data.dt
//   const when = new Date(stamp * 1000)
//   const forcastdate = Intl.DateTimeFormat("en-US").format(when)
//   const look = data.daily.weather[0].icon
//   const temp = data.daily.temp.day
//   const wind = data.daily.wind_speed
//   const humidity = data.daily.humidity
//   const card = `<div class="col s12 weather-box"></div>
//               <h3>Weather:</h3>
//               <div>
//                 <ul class="list-group list-group-flush">
//                   <li class="list-group-item date">${forcastdate}</li>
//                   <img class="list-group-item weather-icon" src="http://openweathermap.org/img/wn/${look}@2x.png" alt="">
//                   <li class="list-group-item temp">Temp: ${temp}&#8457</li>
//                   <li class="list-group-item wind">Wind: ${wind} MPH</li>
//                 <li class="list-group-item humidity">Humidity: ${humidity}%</li>
//                 </ul>
//               </div>`
              
// $('.forecast-container').append(card)
 
// }



