# update-markdown-usage

> Updates a markdown section with CLI usage info via `--help`.

[![NPM](https://img.shields.io/npm/v/update-markdown-usage.svg)](https://www.npmjs.com/package/update-markdown-usage) [![Build Status](https://travis-ci.com/transitive-bullshit/update-markdown-usage.svg?branch=master)](https://travis-ci.com/transitive-bullshit/update-markdown-usage) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This tiny module makes it easy for a node CLI module to update the usage section of its readme by pasting in the results of running with `--help`. See the `docs` script in this module's [package.json](package.json) for a concrete example of how this readme is updated.

## Install

```bash
npm install -g update-markdown-usage
```

## Usage

```bash
  Usage: update-markdown-usage [options] readme.md

  Options:

    -V, --version           output the version number
    -P, --prefix <string>   optional markdown section prefix
    -S, --suffix <string>   optional markdown section suffix
    -s, --section <string>  name of markdown section to update (default: usage)
    -w, --write             write result to markdown file (defaults to stdout)
    -h, --help              output usage information
```

## NPM scripts

```json
  "scripts: {
    "docs": "node index.js --help | update-markdown-usage -w readme.md"
  },
```

## Related

- [mdast-util-inject](https://github.com/anandthakker/mdast-util-inject) - Mdast utility to inject some markdown content into some other markdown at a certain heading.
- [add-text-to-markdown](https://github.com/azu/add-text-to-markdown) - Add stdin text to exist markdown file.

## License

MIT © [Travis Fischer](https://github-cli.com/transitive-bullshit)
