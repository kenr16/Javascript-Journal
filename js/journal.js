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
