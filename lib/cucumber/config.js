var Gherkin = require('gherkin');
var TestCase = require('./test_case');

module.exports = function Config() {
  var parser = new Gherkin.Parser();
  var compiler = new Gherkin.Compiler();

  this.buildTestCases = function (loadGlue, loadGherkinFiles) {
    var pickles = [];
    var glue = loadGlue();

    loadGherkinFiles().forEach(function (gherkinFile) {
      var feature = parser.parse(gherkinFile.read());
      pickles = pickles.concat(compiler.compile(feature));
    });
    return pickles.map(function (pickle) {
      return new TestCase(glue.createTestSteps(pickle));
    });
  }
};