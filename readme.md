# update-markdown-usage

> Updates a markdown document section with CLI usage info via `--help`.

[![NPM](https://img.shields.io/npm/v/update-markdown-usage.svg)](https://www.npmjs.com/package/update-markdown-usage) [![Build Status](https://travis-ci.com/transitive-bullshit/update-markdown-usage.svg?branch=master)](https://travis-ci.com/transitive-bullshit/update-markdown-usage) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This module makes it easy for a node CLI module to update the usage section of its readme by pasting in the results of running with `--help`.

See the `docs` script in this module's [package.json](package.json) for a concrete example of how this readme's `Usage` section is updated automatically.

## Install

```bash
npm install -g update-markdown-usage
```

## Usage

```bash
  Usage: update-markdown-usage [options]

  Options:

    -V, --version           output the version number
    -f, --file <filename>   markdown file to update (defaults to local readme)
    -i, --stdin             read usage from stdin (defaults to running pkg binary with --help)
    -P, --prefix <string>   optional markdown section prefix
    -S, --suffix <string>   optional markdown section suffix
    -s, --section <string>  name of markdown section to update (default: usage)
    -W, --no-write          write result to stdout (defaults to updating markdown file)
    -h, --help              output usage information
```

## NPM scripts

```json
  "scripts: {
    "docs": "update-markdown-usage"
  },
```

## Related

-   [update-markdown-jsdoc](https://github.com/transitive-bullshit/update-markdown-jsdoc) - Same as this module but for documenting libraries with jsdoc.
-   [mdast-util-inject](https://github.com/anandthakker/mdast-util-inject) - Mdast utility to inject some markdown content into some other markdown at a certain heading.
-   [add-text-to-markdown](https://github.com/azu/add-text-to-markdown) - Add stdin text to exist markdown file.

## License

MIT © [Travis Fischer](https://github-cli.com/transitive-bullshit)
