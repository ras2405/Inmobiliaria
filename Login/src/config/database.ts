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
        // port: parseInt(process.env.LOGIN_PORT!, 10),
    });

import { Session } from '../model/Session';
// import { Availability } from '../models/Availability';
// import { Property } from '../models/Property';
// import { setRelationships } from '../models/relationships';
// import { User } from '../models/User';

const syncTables = async () => {
    try {
        if (process.env.LOGIN_SYNC === 'true') {
            // Cambia 'force' a true si quieres que se borren y recreen las tablas
            //   await Property.sync({ force: false });
            //   await Availability.sync({ force: false });
            //   await User.sync();
            await Session.sync();
            console.log('The models were synchronized with the database.');
        }
    } catch (error) {
        console.error('Error synchronizing the models with the database:', error);
    }
};
const dbSync = async () => {
    // await setRelationships();
    await syncTables();
};

export { dbSync, sequelize };

