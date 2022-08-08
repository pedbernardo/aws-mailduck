import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const LOCAL_STYLES = fs
  .readFileSync(path.resolve(__dirname, '../dist/mailduck.css'))
  .toString()

export const HTML_NANO_OPTIONS = {
  collapseWhitespace: 'aggressive',
  removeComments: true,
  removeRedundantAttributes: true,
  removeOptionalTags: true
}

export const POST_HTML_OPTIONS = {
  lowerCaseTags: true,
  quoteAllAttributes: false
}
