var apiKey = require('./../.env').apiKey;

// $(document).ready(function() {
//   $('#weather-location').click(function() {
//     var city = $('#location').val();
//     $('#location').val("");
//
//     $('.showWeather').text("The city you have chosen is " + city + ".");
//     $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
//       $('.showWeather').append("The humidity in " + city + " is " + response.main.humidity + "%");
//       $('.showWeather').append("The weather in " + city + " is " + response.weather[0].description + "!");
//       console.log(JSON.stringify(response));
//       console.log(response);
//     });
//
//     $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
//       .then(function(response) {
//         $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
//       });
//
//       console.log("Notice: The GET request has been made.");
//
//   });
// });

$(document).ready(function() {
  $('#weather-location').click(function() {
    var city = $('#location').val();
    $('#location').val("");

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
      .then(function(response){
        $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
     })

     .fail(function(error) {
        $('.showWeather').text(error.responseJSON.message);
      });
  });
});
