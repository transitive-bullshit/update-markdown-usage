'use strict'

const fs = require('fs')
const getStdin = require('get-stdin')
const program = require('commander')

const updateMarkdownSection = require('.')
const { version } = require('../package')

program
  .version(version)
  .usage('update-markdown-usage [options] readme.md')
  .option('-P, --prefix <string>', 'optional markdown section prefix')
  .option('-S, --suffix <string>', 'optional markdown section suffix')
  .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'usage')
  .option('-w, --write', 'write result to markdown file (defaults to stdout)')
  .action(async (markdownFilePath, opts) => {
    if (!program.section) return program.outputHelp()

    const markdownContent = fs.readFileSync(markdownFilePath, 'utf8')
    const stdin = await getStdin()
    const prefix = program.prefix || '```bash'
    const suffix = program.suffix | '```'
    const sectionContent = `${prefix || ''}${stdin}${suffix || ''}`

    const output = updateMarkdownSection(markdownContent, sectionContent, program.section)

    if (program.write) {
      fs.writeFileSync(markdownFilePath, output, 'utf8')
    } else {
      console.log(output)
    }
  })
  .parse(process.argv)
