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

let searchLocation = localStorage.getItem(`Search Location`);
$(`#city-name`).text(searchLocation);

// let mapquestApi = `https://www.mapquestapi.com/search/v3/prediction?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&limit=5&collection=poi&q=milwaukee`;
// fetch(mapquestApi)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.results);

//     for (i = 0; i < data.results.length; i++) console.log(data.results[i].name);
//   });



// const apiKey = '5569f0d8093687922f5c0ba190e02e6c'; // Olga's APIkey
const apiKey = 'd062b7cc2ea4bdcd13c368fce11ee8b1' // Bri's APIkey


function collectCityData() {
  const forcast = $('#city-name').text();
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${forcast}&units=imperial&appid=${apiKey}`;
  fetch(URL).then(function (response){
    if (response.ok){
      response.json()
      .then(function (data){
        console.log(data);
        renderForecast(forcast)
        // Create a card for today's forcast
        
        function renderForecast() {
        let stamp = data.dt
        const when = new Date(stamp * 1000)
        const forcastdate = Intl.DateTimeFormat("en-US").format(when)
        const look = data.weather[0].icon
        const temp = data.main.temp
        const wind = data.wind.speed
        const humidity = data.main.humidity
        const card = `<div class="col s12 weather-box"></div>
        <h3>Weather:</h3>
        <div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item date">${forcastdate}</li>
        <img class="list-group-item weather-icon" src="http://openweathermap.org/img/wn/${look}@2x.png" alt="">
        <li class="list-group-item temp">Temp: ${temp}&#8457</li>
        <li class="list-group-item wind">Wind: ${wind} MPH</li>
        <li class="list-group-item humidity">Humidity: ${humidity}%</li>
        </ul>
        </div>`    
        console.log(card)
        $('.forecast-container').prepend(card)
        console.log( $('.forecast-container'))
        }
      })
    }
  })
};

collectCityData()