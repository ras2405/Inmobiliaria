import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
export const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Sessions',
    timestamps: false
});

