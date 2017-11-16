#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var engchk = require("runtime-engine-check");
engchk();
var program = require("commander");
var chalk_1 = require("chalk");
var fs_read_data_1 = require("fs-read-data");
var readPkg = require("read-pkg-up");
var _1 = require(".");
var pkg = readPkg();
program
    .version(pkg.version)
    .description("Validates data against schema, accepting both formatted as json/yaml. Both options are required.")
    .option("-d, --data <data>", "data to validate {json, yaml}", null)
    .option("-s, --schema <schema>", "schema to use for validation {json, yaml}", null)
    .parse(process.argv);
var JSON2 = function (j) { return JSON.stringify(j, null, 2); };
Promise.resolve().then(function () { return __awaiter(_this, void 0, void 0, function () {
    var schema, data, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!program.schema) {
                    throw new Error("--schema not specified");
                }
                return [4, fs_read_data_1.readFile(program.schema)];
            case 1:
                schema = _b.sent();
                if (!program.data) return [3, 3];
                return [4, fs_read_data_1.readFile(program.data)];
            case 2:
                _a = _b.sent();
                return [3, 4];
            case 3:
                _a = null;
                _b.label = 4;
            case 4:
                data = _a;
                return [2, {
                        schema: schema,
                        data: data
                    }];
        }
    });
}); }).then(function (input) {
    return _1.isValid(input.schema, input.data).then(function () {
        var msg = input.data ? "Data is valid" : "Schema is valid";
        console.log(chalk_1.default.green(msg));
    });
}).catch(function (err) {
    console.error(chalk_1.default.red(err.message));
    if (err.errors) {
        console.error(chalk_1.default.red(JSON2(err.errors)));
        console.error(chalk_1.default.red(err.stack));
    }
});
