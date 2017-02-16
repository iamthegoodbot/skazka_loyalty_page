var cssjson = require('cssjson');

module.exports = function(source) {  
	this.cacheable && this.cacheable();
	this.value = source;

  var json = cssjson.toJSON(source), styleJson = {};
  for (var rule in json.children) {
    styleJson[rule.replace('.', '')] = json.children[rule].attributes
  }

  return "module.exports = " + JSON.stringify(styleJson);
};
module.exports.seperable = true;