'use strict'

const execa = require('execa')
const program = require('commander')
const readPkg = require('read-pkg-up')

const getReadmeFile = require('./get-readme-file')
const { version } = require('../package')

program
  .version(version)
  .usage('update-markdown-usage [options]')
  .option('-f, --file <filename>', 'markdown file to update (defaults to local readme)')
  .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'api')
  .option('-w, --write', 'write result to markdown file (defaults to stdout)')
  .action(async (opts) => {
    const file = opts.file || await getReadmeFile('.')
    const pkg = await readPkg()

    if (!file || !pkg || !pkg.main) return program.outputHelp()

    await execa('documentation', [
      'readme',
      '--readme-file', file,
      '-q',
      '-g',
      '-s', opts.section,
      pkg.main
    ])
  })
  .parse(process.argv)
