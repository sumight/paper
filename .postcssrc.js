// https://github.com/michael-ciniawsky/postcss-load-config
var browserslist = require('./package.json').browserslist
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {
      "browsers": browserslist
    }
  }
}
