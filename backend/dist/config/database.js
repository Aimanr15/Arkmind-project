"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), envFile) });
const databaseUrl = 'mysql://root:iuuqFVWcGaQhyIAZQvPvhPlODKfoyOam@roundhouse.proxy.rlwy.net:51179/railway';
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: process.env.NODE_ENV === 'development',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map