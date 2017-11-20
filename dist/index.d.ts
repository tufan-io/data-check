export declare class SchemaError extends Error {
    _errors: Array<object>;
    constructor(message: any, errors: any);
    readonly errors: object[];
    serialize(): string;
}
export declare const isValid: (schema: any, data?: any) => Promise<boolean>;
