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
