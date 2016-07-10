// https://github.com/alexpalombaro/webpack-logger-plugin
// https://github.com/webpack/webpack/blob/master/lib/Stats.js
var fs = require('fs');
var path = require('path');
var assign = require('object-assign');

function WebpackLoggerPlugin(options) {
  if (typeof options !== 'object') {
    options = {};
  }

  this.options = assign({
    'filename': 'webpack.log',
    'append': true
  }, options);
}

WebpackLoggerPlugin.prototype.apply = function (compiler) {
  var self = this;
  compiler.plugin('done', function (stats) {
    var filePath = path.resolve(process.cwd(), self.options.filename);
    var data = fs.existsSync(filePath) && self.options.append ? fs.readFileSync(filePath, 'utf8') : '';
    if (data.length) {
      data = data.concat('\n\n');
    }

    var compilation = stats.compilation;
    var outputPath = compilation.options.output.path;
    var obj = stats.toJson();

    data += 'Version: webpack ' + obj.version + '\n';
    data += 'Output: ' + path.relative(process.cwd(), outputPath) + '\n';
    data += 'Hash: ' + obj.hash + '\n';
    data += '--------------------' + '\n';

    // data = data.concat(new Date(stats.endTime).toString(), lineBreak(), stats.toString());
    var assets = obj.assets;
    data += assets.reduce(function (m, item) {
      if (/\.map$/.test(item.name)) return m;
      m += item.name + '  ' + formatSize(item.size) + '\n';
      return m;
    }, '');
    fs.writeFileSync(filePath, data, 'utf8');
  });
};

module.exports = WebpackLoggerPlugin;

function formatSize(size) {
  if(size <= 0) return "0 bytes";

  var abbreviations = ["bytes", "kB", "MB", "GB"];
  var index = Math.floor(Math.log(size) / Math.log(1000));

  return +(size / Math.pow(1000, index))
    .toPrecision(3) + " " + abbreviations[index];
}
