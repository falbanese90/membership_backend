"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var _a = process.env, POSTGRES_USER = _a.POSTGRES_USER, ENV = _a.ENV, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB;
var Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = Client;
