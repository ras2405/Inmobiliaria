import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize(
    process.env.LOGIN_DATABASE!,
    process.env.LOGIN_ROOT_USER!,
    process.env.LOGIN_ROOT_PASSWORD,
    {
        host: process.env.LOGIN_HOST,
        dialect: 'mysql',
        port: parseInt(process.env.LOGIN_PORT!, 10),
    });

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

