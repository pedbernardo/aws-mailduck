const fs = require('fs')
const path = require('path')

exports.LOCAL_STYLES = fs
  .readFileSync(path.resolve(__dirname, '../dist/mailduck.css'))
  .toString()

exports.HTML_NANO_OPTIONS = {
  collapseWhitespace: 'aggressive',
  removeComments: true,
  removeRedundantAttributes: true,
  removeOptionalTags: true
}

exports.POST_HTML_OPTIONS = {
  lowerCaseTags: true,
  quoteAllAttributes: false
}
