import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.LOGIN_DATABASE!,
    process.env.LOGIN_ROOT_USER!,
    process.env.LOGIN_ROOT_PASSWORD,
    {
        host: process.env.LOGIN_HOST,
        dialect: 'mysql',
        port: parseInt(process.env.LOGIN_PORT!, 10),
    });

console.log("el host", process.env.LOGIN_HOST);
console.log("la db", process.env.LOGIN_DATABASE);
console.log("el user", process.env.LOGIN_ROOT_USER);
console.log("el pass", process.env.LOGIN_ROOT_PASSWORD);
console.log("el port", process.env.LOGIN_PORT);

import { Session } from '../model/Session';

const syncTables = async () => {
    try {
        if (process.env.LOGIN_SYNC === 'true') {
            await Session.sync();
            console.log('The models were synchronized with the database.');
        }
    } catch (error) {
        console.error('Error synchronizing the models with the database:', error);
    }
};
const dbSync = async () => {
    await syncTables();
};

export { dbSync, sequelize };

