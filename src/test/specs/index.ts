
import { test } from 'ava';
import { isValid } from '../..';
import { fixtures } from '../fixtures';
import { serializedString } from '../fixtures/serializedString';
import * as execa from 'execa';

const JSON2 = j => JSON.stringify(j, null, 2);

test('data-check API schema-ok', async (t) => {
  try {
    await isValid(fixtures.valid.schema);
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});

test('data-check API schema-v04-ok', async (t) => {
  try {
    await isValid(fixtures.v04.schema, null);
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});

test('data-check API schema with invalid version', async (t) => {
  try {
    await isValid(fixtures.invalidVersion.schema, null);
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});

test('data-check API schema-ok, data-check', async (t) => {
  try {
    await isValid(fixtures.valid.schema, fixtures.valid.data);
    t.pass();
  } catch (err) {
    t.fail(err.message);
  }
});

test('data-check API schema-fail', async (t) => {
  try {
    await isValid(fixtures.invalid.schema);
    t.fail('invalid *schema* passed validation!');
  } catch (err) {
    // console.log(err);
    t.regex(
      err.message,
      /Invalid schema/,
      err.message);
    t.deepEqual(
      err.errors,
      [{
        keyword: 'type',
        dataPath: '.properties',
        schemaPath: '#/properties/properties/type',
        params: {
          type: 'object'
        },
        message: 'should be object',
        schema: 'object',
        parentSchema: {
          type: 'object',
          additionalProperties: {
            $ref: '#'
          },
          default: {}
        },
        data: [
          'string',
          'number'
        ]
      }],
      JSON2(err.errors)
    );
  }
});

test('data-check API schema-ok, data-fail', async (t) => {
  try {
    await isValid(fixtures.valid.schema, fixtures.invalid.data);
    t.fail('invalid *data* passed validation!');
  } catch (err) {
    t.regex(
      err.message,
      /Invalid data.*/
    );
    t.regex(
      err.errors[0].message,
      /should NOT have additional properties/
    );
    t.is(
      err.serialize(),
      serializedString,
      err.serialize()
    );
  }
});

test('data-check CLI schema-ok', async (t) => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
      '-s',
      'src/test/fixtures/valid-schema.json'
    ]
  );
  t.regex(result.stdout, /Schema is valid/, JSON2(result));
});

test('data-check CLI schema-ok, data-check', async (t) => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
      '-s',
      'src/test/fixtures/valid-schema.json',
      '-d',
      'src/test/fixtures/valid-data.json'
    ]
  );
  t.regex(result.stdout, /Data is valid/, JSON2(result));
});

test('data-check CLI schema-fail', async (t) => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
      '-s',
      'src/test/fixtures/invalid-schema.json'
    ]
  ).catch(err => {
    console.log(`#### schema-fail error`);
    console.log(err);
  });
  t.regex(
    result.stderr,
    /Invalid schema(.|[\n])*"message": "should be object".*/,
    JSON2(result));
});

test('data-check CLI schema-fail, data-fail', async (t) => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
      '-s',
      'src/test/fixtures/valid-schema.json',
      '-d',
      'src/test/fixtures/invalid-data.json'
    ]
  );
  t.regex(result.stderr, /Invalid data.*/, JSON2(result));
});

test(`data-check CLI invalid schema file`, async t => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
      '-s',
      'src/test/fixtures/non-existant.yaml'
    ]).catch(err => {
      t.fail(err.message);
    });
  t.regex(
    result.stderr,
    /ENOENT: no such file or directory, open .*non-existant.yaml.*/,
    JSON2(result));
});


test(`data-check CLI invalid schema file`, async t => {
  const result = await execa(
    'node',
    [
      'build/cli.js',
    ]);
  t.regex(
    result.stderr,
    /--schema not specified/,
    JSON2(result));
});
