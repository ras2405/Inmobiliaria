import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AvailabilityAttributes {
    id?: number;
    propertyId:number
    startDate:Date
    endDate:Date
}

interface AvailabilityCreationAttributes extends Optional<AvailabilityAttributes, 'id'> {}

interface AvailabilityInstance extends Model<AvailabilityAttributes, AvailabilityCreationAttributes>, AvailabilityAttributes {}

const Availability = sequelize.define<AvailabilityInstance>('Availability', {
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
        allowNull: false,
        onUpdate: 'CASCADE'
    },
    startDate: {
        type: DataTypes.DATEONLY,
    },
    endDate: {
        type: DataTypes.DATEONLY,
    },
}, {
    tableName: 'Availabilities',
    timestamps: false
});

export { Availability, AvailabilityAttributes, AvailabilityCreationAttributes, AvailabilityInstance };

