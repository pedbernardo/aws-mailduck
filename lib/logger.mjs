import ora from 'ora'
import colors from 'colors'

let logger

function update ({ text, color }) {
  text && (logger.text = text)
  color && (logger.color = color)
}

export function start ({ inputs, minify }) {
  logger = ora()
  logger.start(`Compiling emails from ${colors.grey(inputs)} ${minify ? `with output ${colors.cyan('minified')}` : ''}`)
}

export function save ({ outdir }) {
  update({
    text: `Saving emails to ${colors.grey('./' + outdir)}`,
    color: 'green'
  })
}

export function finish ({ outdir }) {
  logger.succeed(`Emails created on ${colors.grey('./' + outdir)} 🦆`)
}
