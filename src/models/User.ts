import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mail: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Users',
    timestamps: false
});
