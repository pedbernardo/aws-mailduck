const fs = require('fs')
const path = require('path')
const sass = require('sass')
const juice = require('juice')
const glob = require('glob')
const htmlnano = require('htmlnano')

const {
  LOCAL_STYLES,
  HTML_NANO_OPTIONS,
  POST_HTML_OPTIONS
} = require('./constants')

/**
 * CompiledEmail
 * @typedef {object} CompiledEmail
 * @property {string} name - origin HTML filename
 * @property {string} content - compiled HTML email with inlined styles
 */

/**
 * Inline CSS styles using `juice` node package
 * @param {string} html - html content
 * @param {string[]} css - css styles
 * @returns {string} html with inlined css styles
 */
function inlineCSS (html, css) {
  return juice(`<style>${css.join('')}</style>${html}`)
}

/**
 * Minifies HTML content using `htmlnano` node package
 * @param {string} html - html content
 * @returns {string} minified html content
 */
function minifyHTML (html) {
  return htmlnano
    .process(
      html,
      HTML_NANO_OPTIONS,
      {},
      POST_HTML_OPTIONS
    )
}

/**
 * Compile a SASS file by the filepath
 * @param {string} sassPath - sass entry filepath
 * @returns {string} css result
 */
function compileExternalSass (sassPath) {
  if (!sassPath) return
  return sass.compile(sassPath, { style: 'compressed' })?.css
}

/**
 * Read a HTML file content from disk
 * @param {string} filepath - html file path
 * @returns {object} html content and filename
 */
function readHTML (filepath) {
  return {
    content: fs.readFileSync(filepath).toString(),
    name: path.basename(filepath)
  }
}

/**
 * Compile HTML files to Email templates using `juice` and `htmlnano`
 * @public
 * @param {object} config - configuration options
 * @param {string} config.inputs - input glob of html files to compile
 * @param {string} config.sassPath - file path of a external sass file
 * @param {boolean} config.minify - indicates whether is to minify the HTML output
 * @returns {CompiledEmail[]} resulting emails
 */
async function compile ({ inputs, sassPath, minify }) {
  const styles = [
    LOCAL_STYLES,
    compileExternalSass(sassPath)
  ]

  const htmlFiles = glob.sync(inputs)
    .filter(filepath => path.extname(filepath) === '.html')
    .map(readHTML)
    .map(async html => {
      if (!minify) return html
      return { ...html, content: (await minifyHTML(html.content))?.html }
    })

  const htmlCompiled = await Promise.all(htmlFiles)

  const emails = htmlCompiled.map(html => ({
    ...html,
    content: inlineCSS(html.content, styles)
  }))

  return emails
}

/**
 * Save HTML emails to disk
 * @public
 * @param {CompiledEmail[]} emails - compiled emails
 * @param {string} outdir - output directory to save the emails
 */
function save ({ emails, outdir }) {
  if (!fs.existsSync(outdir)) fs.mkdirSync(outdir)

  emails.forEach(({ name, content }) =>
    fs.writeFileSync(`${outdir}/${name}`, content)
  )
}

exports.compile = compile
exports.save = save
