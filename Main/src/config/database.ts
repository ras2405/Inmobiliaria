import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize(process.env.MYSQL_DATABASE!, process.env.MYSQL_ROOT_USER!, process.env.MYSQL_ROOT_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT as 'mysql',
});


import { Availability } from '../models/Availability';
import { Booking } from '../models/Booking';
import { Property } from '../models/Property';
import { User } from '../models/User';
import { setRelationships } from '../models/relationships';
import { PropertySensor } from '../models/PropertySensor';

const syncTables = async () => {
  try {
    if (process.env.MYSQL_SYNC === 'true') {
      // Cambia 'force' a true si quieres que se borren y recreen las tablas
      await Property.sync({ force: false });
      await PropertySensor.sync({ force: false });
      await Availability.sync({ force: false });
      await User.sync();
      await Booking.sync();
      console.info('The models were synchronized with the database.');
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

