export declare class SchemaError extends Error {
    _errors: Array<object>;
    _serialized: string;
    constructor(message: any, errors: any, long?: boolean);
    readonly errors: object[];
    serialize(): string;
}
export declare const isValid: (schema: any, data?: any, longError?: boolean) => Promise<boolean>;
