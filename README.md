# data-check

<!-- badge -->
[![npm license](https://img.shields.io/npm/l/data-check.svg)](https://www.npmjs.com/package/data-check)
[![travis status](https://img.shields.io/travis/tufan-io/data-check.svg)](https://travis-ci.org/tufan-io/data-check)
[![Build status](https://ci.appveyor.com/api/projects/status/90am2usst4qeutgi?svg=true)](https://ci.appveyor.com/project/tufan-io/data-check)
[![Coverage Status](https://coveralls.io/repos/github/tufan-io/data-check/badge.svg?branch=master)](https://coveralls.io/github/tufan-io/data-check?branch=master)
[![David](https://david-dm.org/tufan-io/data-check/status.svg)](https://david-dm.org/tufan-io/data-check)
[![David](https://david-dm.org/tufan-io/data-check/dev-status.svg)](https://david-dm.org/tufan-io/data-check?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<br/>
[![NPM](https://nodei.co/npm/data-check.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/data-check/)
<!-- endbadge -->

Convenience method to wrap json-schema validation into a single function.

The single API method exported: `isValid(schema, data)`, does three things:

1. Dereference the schema to resolve all external references
2. Validate the resulting fullSchema
3. Validate the data against the fullSchema.

## Usage

### API

```typescript
/**
 * Provides a convenience interface to validate a data object
 * against a dereferenced schema object.
 *
 * Throws a SchemaError if either the schema or data is not valid.
 * SchemaError provides an `errors` property, detailing individual
 * violations.
 *
 * @async
 * @param schema schema to validate data against
 * @param data data to validate
 * @returns Promise<boolean>
 */
export declare const isValid: (schema: any, data?: any) => Promise<boolean>;

```

### CLI

```bash
  Usage: data-check [options]


  Options:

    -V, --version          output the version number
    -d, --data <data>      data to validate {json, yaml}
    -s, --schema <schema>  schema to use for validation {json, yaml}
    -h, --help             output usage information
```

## Development Tooling

- [Development tooling](./docs/DevTools.md)
- [Changelog](./CHANGELOG.md)

## License

[Apache-2.0](./LICENSE)

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to abide by its terms.

## Support

Bugs, PRs, comments, suggestions welcomed!
