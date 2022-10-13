import posthtml from 'posthtml'
import unicodeParser from '../plugins/unicodeParser.js'

export async function convertToUnicode(html) {
  return await posthtml()
    .use(unicodeParser())
    .process(html)
    .then((result) => {
      return result.html
    })
}
