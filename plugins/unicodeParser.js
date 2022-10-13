module.exports = function (options, plugins) {
  options = options || {}
  plugins = [].concat(plugins) || []

  const escapeUnicode = require('escape-unicode')

  return function unicodeParser(tree) {
    tree.walk(function (node) {
      if (typeof node === 'string' && !/^\n\s*$/.test(node)) {
        const regex = /[^\w\s\]+[^\.,~+<>!@#$%(){}—&º_*-]/g
        if (regex.test(node)) {
          const replaced = node.replace(regex, function (matched) {
            return escapeUnicode(matched)
          })
          return replaced
        }
      }
      return node
    })
    return tree
  }
}
