'use strict'

const execa = require('execa')
const fs = require('fs')
const getStdin = require('get-stdin')
const path = require('path')
const program = require('commander')
const readPkg = require('read-pkg-up')

const getReadmeFile = require('./get-readme-file')
const updateMarkdownSection = require('.')
const { version } = require('../package')

const main = module.exports = async (argv) => {
  program
    .version(version)
    .usage('update-markdown-usage [options]')
    .option('-f, --file <filename>', 'markdown file to update (defaults to local readme)')
    .option('-i, --stdin', 'read usage from stdin')
    .option('-P, --prefix <string>', 'optional markdown section prefix')
    .option('-S, --suffix <string>', 'optional markdown section suffix')
    .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'usage')
    .option('-W, --no-write', 'write result to stdout (defaults to updating markdown file)')
    .parse(argv)

  const pkg = await readPkg()
  if (!pkg) {
    console.error('unable to find valid package.json')
    return program.outputHelp()
  }

  const root = path.dirname(pkg.path)
  const file = program.file || await getReadmeFile(root)
  if (!file || !fs.existsSync(file)) {
    console.error('unable to find valid readme markdown file')
    return program.outputHelp()
  }

  let usage = ''

  if (program.stdin) {
    usage = await getStdin()
  } else {
    const binary = Object.values(pkg.package.bin || { })[0]
    const binPath = path.join(root, binary)
    if (!binary || !fs.existsSync(binPath)) {
      console.error('unable to find valid binary in package.json')
      return program.outputHelp()
    }

    const { stdout } = await execa(binary, [ '--help' ])
    usage = stdout
  }

  const markdownContent = fs.readFileSync(file, 'utf8')
  const prefix = program.prefix || '```bash'
  const suffix = program.suffix | '```'
  const sectionContent = `${prefix || ''}${usage}${suffix || ''}`

  const output = updateMarkdownSection(markdownContent, sectionContent, program.section)

  if (program.write) {
    fs.writeFileSync(file, output, 'utf8')
  } else {
    console.log(output)
  }
}

main(process.argv)
