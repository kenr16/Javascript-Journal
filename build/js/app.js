(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "4df2f506980b4408686c19d278f83ad1";

},{}],2:[function(require,module,exports){
function Journal(name) {
  this.name = name;
}

Journal.prototype.words = function(entry) {
  return entry.body.replace(/[^a-z\s]/gi, "").split(" ").length;
}

Journal.prototype.consonants = function(entry) {
  return entry.body.replace(/^a-z/gi, "").match(/[^aeiou]/gi).length;
}

Journal.prototype.vowels = function(entry) {
  return entry.body.match(/[aeiou]/gi).length;
}

Journal.prototype.getTeaser = function(entry) {
  let teaser_array = entry.body.split(".");
  let teaser = teaser_array[0].split(" ").slice(0, 8).join(" ");
  return teaser;
}

exports.journalModule = Journal;

},{}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Weather(){
}

Weather.prototype.getWeather = function(city, displayHumidity) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
    .then(function(response) {
      displayHumidity(city, response.main.humidity);})
    .fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);});
}

exports.weatherModule = Weather;

},{"./../.env":1}],4:[function(require,module,exports){
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

},{"./../js/journal.js":2,"./../js/weather.js":3}]},{},[4]);
