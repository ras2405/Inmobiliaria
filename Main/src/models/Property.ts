import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { AvailabilityInstance } from './Availability';
import { BookingInstance } from './Booking';
import { PaymentStatus } from '../constants/payments';

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
    status?: PaymentStatus;
    createdAt?: Date;
    price?: number;
}

interface PropertyCreationAttributes extends Optional<PropertyAttributes, 'id'> { }

interface PropertyInstance extends Model<PropertyAttributes, PropertyCreationAttributes>, PropertyAttributes { }

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
        type: DataTypes.TEXT('long'),
        get() {
            const picturesString = this.getDataValue('pictures');
            return picturesString ? picturesString.split(',') : [];
        },
    },
    status: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        defaultValue: PaymentStatus.PENDING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Properties',
    timestamps: false
});

export { Property, PropertyAttributes, PropertyCreationAttributes, PropertyInstance };
