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
