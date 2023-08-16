import escapeUnicode from 'escape-unicode'

const UNICODE_CHAR_REGEX = /[^\w\s\]+[^.,~+<>!@#$%(){}—&º_*-]/g
const isNodeString = node => typeof node === 'string' && !/^\n\s*$/.test(node)
const hasUnicodeChar = node => UNICODE_CHAR_REGEX.test(node)

export default function (options = {}, plugins = []) {
  return function unicodeEscaper (tree) {
    tree.walk(node => {
      if (!isNodeString(node)) return node

      return hasUnicodeChar(node)
        ? node.replace(UNICODE_CHAR_REGEX, matched => escapeUnicode(matched))
        : node
    })
    return tree
  }
}
