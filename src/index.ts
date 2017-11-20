
import * as Ajv from 'ajv';
import * as a from 'awaiting';
import * as merge from 'lodash.merge';

const schemaRef = require('json-schema-ref-parser');
const ajv04 = require('ajv/lib/refs/json-schema-draft-04.json');

// const deref = require('json-schema-deref');
export class SchemaError extends Error {
  _errors: Array<object>;
  _serialized: string;
  constructor(message, errors, long?: boolean) {
    const _serialized = `${message}\n${JSON.stringify(errors.map(v => {
      const w = merge({}, v);
      delete w['parentSchema'];
      return w;
    }), null, 2)}`;
    const msg = long ? _serialized : message;
    super(msg);
    this._errors = errors;
    this._serialized = _serialized;
    Object.setPrototypeOf(this, SchemaError.prototype);
  }
  get errors() {
    return this._errors;
  }

  serialize() {
    return this._serialized;
  }
}

function getVersion(schema) {
  const s = schema['$schema'] || schema.schema || 'http://json-schema.org/draft-06/schema#';
  const m = s.match(/.*draft-0(\d).*/);
  return m ? m[1] : null;
}

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
 * @param longError serializes all schema violations
 * @returns Promise<boolean>
 */
export const isValid = async (
  schema,
  data = null,
  longError = false
): Promise<boolean> => {
  const fullSchema = await schemaRef.dereference(schema);
  const ajv = new Ajv({
    allErrors: true,
    format: 'full',
    verbose: true
  });
  if (getVersion(schema) === '4') {
    ajv.addMetaSchema(ajv04);
  }
  if (!ajv.validateSchema(fullSchema)) {
    throw new SchemaError(`Invalid schema`, ajv.errors, longError);
  }
  if (data && !ajv.validate(fullSchema, data)) {
    throw new SchemaError(`Invalid data`, ajv.errors, longError);
  }
  return true;
};

