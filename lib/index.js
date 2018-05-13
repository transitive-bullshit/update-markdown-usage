'use strict'

const inject = require('mdast-util-inject')
const remark = require('remark')()

/**
 * Updates the given markdown section with new content.
 *
 * @param {string} content - Original markdown file content
 * @param {string} sectionContent - Markdown content to insert into the given section
 * @param {string} sectionName - Name of markdown section to update
 * @param {object} [opts] - Options
 * @param {object} [opts.remarkParseOptions] - Options for `remark.parse`
 * @param {object} [opts.remarkStringifyOptions] - Options for `remark.stringify`
 */
module.exports = (content, sectionContent, sectionName, opts = { }) => {
  const {
    remarkParseOptions = {},
    remarkStringifyOptions = {
      listItemIndent: 1
    }
  } = opts

  const target = remark.parse(content)
  const newContent = remark.parse(sectionContent, remarkParseOptions)
  inject(sectionName, target, newContent)
  return remark.stringify(target, remarkStringifyOptions)
}
