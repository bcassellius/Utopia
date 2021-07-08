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

let newCurrency = `EUR`; // placeholder
let currencyConverterApi = `http://www.geoplugin.net/json.gp?base_currency=${newCurrency}`;

fetch(currencyConverterApi)
  .then((response) => response.json())
  .then(function (data) {
    console.log(data);
    console.log(data.geoplugin_currencyConverter);
    console.log(`1 USD = ${data.geoplugin_currencyConverter} euros`);
  });
