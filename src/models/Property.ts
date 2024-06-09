import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { AvailabilityInstance } from './Availability';
import { BookingInstance } from './Booking';

// Define PropertyAttributes según el esquema zod
interface PropertyAttributes {
    id?: number;
    name: string;
    adults: number;
    kids: number;
    beds: number;
    singleBeds: number;
    ac: boolean;
    wifi: boolean;
    garage: boolean;
    type: string;
    beachDistance: number;
    state: string;
    balneario: string;
    neighborhood: string;
    pictures: string;
    availabilities?: AvailabilityInstance[];
    bookings?: BookingInstance[];
}

// Define PropertyCreationAttributes que extiende Optional para los atributos que son opcionales al crear una instancia
interface PropertyCreationAttributes extends Optional<PropertyAttributes, 'id'> {}

// Define la interfaz PropertyInstance que extiende Model
interface PropertyInstance extends Model<PropertyAttributes, PropertyCreationAttributes>, PropertyAttributes {}

// Define el modelo de forma funcional usando los tipos definidos
const Property = sequelize.define<PropertyInstance>('Property', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    adults: {
        type: DataTypes.INTEGER
    },
    kids: {
        type: DataTypes.INTEGER
    },
    beds: {
        type: DataTypes.INTEGER
    },
    singleBeds: {
        type: DataTypes.INTEGER
    },
    ac: {
        type: DataTypes.BOOLEAN
    },
    wifi: {
        type: DataTypes.BOOLEAN
    },
    garage: {
        type: DataTypes.BOOLEAN
    },
    type: {
        type: DataTypes.STRING
    },
    beachDistance: {
        type: DataTypes.INTEGER
    },
    state: {
        type: DataTypes.STRING
    },
    balneario: {
        type: DataTypes.STRING
    },
    neighborhood: {
        type: DataTypes.STRING
    },
    pictures: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Properties',
    timestamps: false
});

export { Property, PropertyAttributes, PropertyCreationAttributes, PropertyInstance };

