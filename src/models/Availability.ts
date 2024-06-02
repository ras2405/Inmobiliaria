import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Availability = sequelize.define('Availability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    propertyId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Properties',
            key: 'id'
        },
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'Availabilities',
    timestamps: false
});
