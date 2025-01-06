"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const promise_1 = tslib_1.__importDefault(require("mysql2/promise"));
dotenv_1.default.config({ path: '.env.dev' });
const DB_NAME = process.env.DB_NAME || 'items_db';
async function createDatabase() {
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
    await connection.end();
}
async function initDb() {
    try {
        // First create the database
        await createDatabase();
        // Then initialize Sequelize
        const sequelize = new sequelize_1.Sequelize({
            dialect: 'mysql',
            host: process.env.DB_HOST || '127.0.0.1',
            username: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: DB_NAME,
            logging: false,
        });
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        // Import and sync models
        const ItemModel = (await Promise.resolve().then(() => tslib_1.__importStar(require('./models/item.model')))).default;
        await ItemModel.sync({ force: true }); // This will drop and recreate the table
        // Add sample data with Malaysian prices
        await ItemModel.bulkCreate([
            {
                name: 'Laptop',
                description: 'High-performance laptop with 16GB RAM',
                price: 4999.99, // Updated to RM
            },
            {
                name: 'Smartphone',
                description: 'Latest model with 5G capability',
                price: 3299.99, // Updated to RM
            },
            {
                name: 'Headphones',
                description: 'Noise-cancelling wireless headphones',
                price: 899.99, // Updated to RM
            },
        ]);
        console.log('Database initialized successfully with sample data.');
        await sequelize.close();
    }
    catch (error) {
        console.error('Unable to initialize the database:', error);
        process.exit(1);
    }
}
initDb();
