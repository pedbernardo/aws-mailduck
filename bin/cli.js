#!/usr/bin/env node

const { Command } = require('commander')
const pkg = require('../package.json')

const MailDuck = new Command()
  .version(pkg.version)
  .description('Mailduck CLI 🦆')
  .argument('<inputGlob>')
  .option('-d, --debug', 'output extra debugging')
  .option('-w, --watch <watchdir>', 'enable watch directory')
  .option('-s, --sass <sasspath>', 'external SASS file for mail styles')
  .option('-m, --minify', 'minify HTML output')
  .requiredOption('-o, --outdir <outdir>', 'output directory')
  .action(async (inputGlob, options) => {
    if (options.debug) console.info('Mailduck called with options %o', options)
    console.log('start...')
  })

MailDuck.parse(process.argv)
