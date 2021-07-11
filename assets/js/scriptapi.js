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

let mapquestApi = `http://www.mapquestapi.com/search/v3/prediction?key=M6cWf6SB2TBYZpZZyd6wL6kpI31d0emQ&limit=5&collection=poi&q=milwaukee`;
fetch(mapquestApi)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);

    for (i = 0; i < data.results.length; i++) console.log(data.results[i].name);
  });

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
