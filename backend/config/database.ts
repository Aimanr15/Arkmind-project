import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// Load the appropriate .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const databaseUrl = 'mysql://root:iuuqFVWcGaQhyIAZQvPvhPlODKfoyOam@roundhouse.proxy.rlwy.net:51179/railway';

const sequelize = new Sequelize(databaseUrl, {
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

export default sequelize;