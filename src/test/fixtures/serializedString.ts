export const serializedString = `Invalid data
[
  {
    "keyword": "additionalProperties",
    "dataPath": "",
    "schemaPath": "#/additionalProperties",
    "params": {
      "additionalProperty": "test1"
    },
    "message": "should NOT have additional properties",
    "schema": false,
    "data": {
      "test1": "test1"
    }
  },
  {
    "keyword": "required",
    "dataPath": "",
    "schemaPath": "#/required",
    "params": {
      "missingProperty": "firstName"
    },
    "message": "should have required property 'firstName'",
    "schema": {
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "age": {
        "description": "Age in years",
        "type": "integer",
        "minimum": 0
      }
    },
    "data": {
      "test1": "test1"
    }
  },
  {
    "keyword": "required",
    "dataPath": "",
    "schemaPath": "#/required",
    "params": {
      "missingProperty": "lastName"
    },
    "message": "should have required property 'lastName'",
    "schema": {
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "age": {
        "description": "Age in years",
        "type": "integer",
        "minimum": 0
      }
    },
    "data": {
      "test1": "test1"
    }
  }
]`;
