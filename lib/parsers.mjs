import posthtml from 'posthtml'
import posthtmlUnicodeEscaperPlugin from './plugins/unicode-escaper.cjs'

export async function unicodeEscape (html) {
  return await posthtml()
    .use(posthtmlUnicodeEscaperPlugin())
    .process(html)
    .then(result => result.html)
}
