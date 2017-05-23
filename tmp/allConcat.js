var Journal = require('./../js/journal.js').journalModule;

$(document).ready(function() {
  $("#journal-entry").submit(function(event){
    event.preventDefault();
      let entry = {
        title: $("#title").val(),
        body: $("#body").val()
      }
      const diary = new Journal('New Journal');
      let consonants = diary.consonants(entry);
      let vowels = diary.vowels(entry);
      let words = diary.words(entry);
      let teaser = diary.getTeaser(entry);
      $("#journal-info").append("<p>" + teaser + "... This entry contains " + words + " words, " + consonants + " consonants and " + vowels + " vowels.</p>");
      $("#title").text("");
      $("#body").text("");
  });
});

$(document).ready(function(){
  $('#time').text(moment());
});

var Weather = require('./../js/weather.js').weatherModule;

var displayHumidity = function(city, humidityData) {
  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
}
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
  var currentWeatherObject = new Weather();
  $('#weather-location').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    currentWeatherObject.getWeather(city, displayHumidity);
  });
});
