import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE!, process.env.MYSQL_ROOT_USER!, process.env.MYSQL_ROOT_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT as 'mysql',
});

import { Booking } from '../models/Booking';
import { Property } from '../models/Property';
import { User } from '../models/User';
import { setRelationships } from '../models/relationships';

const syncTables = async () =>{
  try {
    // Verifica si la sincronización está habilitada
    if (process.env.MYSQL_SYNC === 'true') {      
      // Cambia 'force' a true si quieres que se borren y recreen las tablas
      await Property.sync();
      await User.sync();
      await Booking.sync();
      console.log('Los modelos fueron sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('Error al sincronizar los modelos con la base de datos:', error);
  }
}
const dbSync = async () => {
  await setRelationships(); 
  await syncTables();  
};

export { dbSync, sequelize };

