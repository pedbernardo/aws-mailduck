#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'module'
import { compile, save } from '../lib/index.mjs'
import * as logger from '../lib/logger.mjs'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const MailDuck = new Command()
  .version(pkg.version)
  .description('Mailduck CLI 🦆')
  .argument('<inputs>')
  .option('-d, --debug', 'output extra debugging')
  .option('-w, --watch <watchdir>', 'enable watch directory')
  .option('-s, --sass <sasspath>', 'external SASS file for mail styles')
  .option('-m, --minify', 'minify HTML output')
  .option('-u, --unicode', 'Convert accents to unicode characters')
  .requiredOption('-o, --outdir <outdir>', 'output directory')
  .action(async (inputs, options) => {
    options.minify = options.minify || true
    options.parseUnicode = options.parseUnicode || true

    if (options.debug) console.info('Mailduck called with options %o', options)

    logger.start({
      inputs,
      minify: options.minify,
      parseUnicode: options.parseUnicode
    })

    const emails = await compile({
      inputs,
      sasspath: options.sass,
      minify: options.minify,
      parseUnicode: options.parseUnicode
    })

    logger.save({ outdir: options.outdir })

    await save({
      emails,
      outdir: options.outdir
    })

    logger.finish({ outdir: options.outdir })
  })

MailDuck.parse(process.argv)
