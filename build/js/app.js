(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/journal.js":1}]},{},[2]);
