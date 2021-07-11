let currencyCode;
let newCurrency = { currencyCode }; // placeholder
let currencyConverterApi = `http://www.geoplugin.net/json.gp?base_currency=${newCurrency}`;

// the currency api converts based on ISO 4217 codes (i.e. EUR for euros, USD FOR u.S. dollars)
// convert the search location to the appropriate currency code
// take the city and find it's region
// search for the regions ISO
function findCurrencyCode() {}

function runLater() {
  fetch(currencyConverterApi)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      console.log(data.geoplugin_currencyConverter);
      console.log(`1 USD = ${data.geoplugin_currencyConverter} euros`);
    });
}

// let mapquestApi = `http://www.mapquestapi.com/search/v3/prediction?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&limit=5&collection=poi&q=milwaukee`;
// fetch(mapquestApi)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.results);

//     for (i = 0; i < data.results.length; i++) console.log(data.results[i].name);
//   });

//   testing
let key = `zyAk0vwUuaz2iWvaUGfsN9GfdQyi5dFO`;
let secret = `tqQXPFGGfGiXw4kH`;
let token;

fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
  body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  method: 'POST',
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.access_token);
    token = data.access_token;
    localStorage.setItem(`ApiToken`, token);
  });

// api for destination content
// token = localStorage.getItem(`ApiToken`);
// let amadeusApi = `https://test.api.amadeus.com/v1/shopping/activities?latitude=41.397158&longitude=2.160873&radius=1`;
// // fetch(amadeusApi)
// //   .then((response) => response.json())
// //   .then((data) => {
  // //     console.log(data);
  // //   });
  
  
  
  
  
//   // Weather api


const apiKey = '5569f0d8093687922f5c0ba190e02e6c' // Olga's APIkey

  
//   // Bri's Key:  d062b7cc2ea4bdcd13c368fce11ee8b1
  
  
//   const weather = document.querySelector("#weather-search")
//   const submit = document.querySelector("#submit")
//   console.log(weather)  
  
//   submit.addEventListener("submit", weatherSearchSubmitHandler)
  
// // search button clicked
// var weatherSearchSubmitHandler = function(event) {
//   event.preventDefault();
//   // get value from input element
//   var cityName = weather.value.trim();
//   if (cityName) {
//     getCityData(cityName);
//     cityName.value = "";
//     console.log(cityName)
//   } else {
//     alert("Please enter the name of a city.")
//   }
// }

  
// function getCityData(cityName){
//   // get the data for the city's name
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=d062b7cc2ea4bdcd13c368fce11ee8b1`)
//   .then(response =>{
//     return response.json()
//   })
//   // use the data from city's name to get the latitude and longidude coordinates
//   .then(data =>{
//     console.log(data)
//     let lat = data.coord.lat
//     let lon = data.coord.lon
//     // get the data for the city by using the city's latitude and longitude
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=d062b7cc2ea4bdcd13c368fce11ee8b1`)
//     .then(response=>{
//       return response.json()
//     })
//     .then(data =>{
//       rendersTodaysWeather(data)
      
//       // Create a new JavaScript Date object based on the timestamp
//       let unix_timestamp = data.current.dt
//       var date = new Date(unix_timestamp * 1000);
//       console.log(date)
//       var currentDate = Intl.DateTimeFormat("en-US").format(date)
//       console.log(Intl.DateTimeFormat("en-US").format(date))
//       console.log(currentDate)
//       console.log(data.current.temp)
//       console.log(data.current.humidity)
      
      
//     })
//   })
// }  

function updateWeatherModal() {
  let city = $("#weather-search").val().trim()
  if (!city) {
    $('#weather-modal-content').text(`Please, enter city name.`)
  } else {
  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(URL).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        console.log(data)
        $('#weather-modal-content').text(`Current weather in ${data.name} is ${Math.round(data.main.temp)} and ${data.weather[0].description}.`)
      })
    }else{
      $('#weather-modal-content').text(`Please, enter correct city name.`)
    }
  })
  }
};

$('#city-search-button').on("click", updateWeatherModal)