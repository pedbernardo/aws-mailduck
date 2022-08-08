const ora = require('ora')
const colors = require('colors')

let logger

function update ({ text, color }) {
  text && (logger.text = text)
  color && (logger.color = color)
}

function start ({ inputs, minify }) {
  logger = ora()
  logger.start(`Compiling emails from ${colors.grey(inputs)} ${minify ? `with output ${colors.cyan('minified')}` : ''}`)
}

function save ({ outdir }) {
  update({
    text: `Saving emails to ${colors.grey('./' + outdir)}`,
    color: 'green'
  })
}

function finish ({ outdir }) {
  logger.succeed(`Emails created on ${colors.grey('./' + outdir)} 🦆`)
}

exports.start = start
exports.save = save
exports.finish = finish
