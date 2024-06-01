import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE!, process.env.MYSQL_ROOT_USER!, process.env.MYSQL_ROOT_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT as 'mysql',
});

import { Availability } from '../models/Availability';
import { Property } from '../models/Property';
import { setRelationships } from '../models/relationships';
import { User } from '../models/User';

const syncTables = async () => {
  try {
    if (process.env.MYSQL_SYNC === 'true') {
      // Cambia 'force' a true si quieres que se borren y recreen las tablas
      await Property.sync({ force: false });
      await Availability.sync({ force: false });
      await User.sync();
      console.log('The models were synchronized with the database.');
    }
  } catch (error) {
    console.error('Error synchronizing the models with the database:', error);
  }
};
const dbSync = async () => {
  await setRelationships();
  await syncTables();
};

export { dbSync, sequelize };
