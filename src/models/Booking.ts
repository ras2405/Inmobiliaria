import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface BookingAttributes {
    id?: number;
    document: string;
    documentType: string;
    name: string;
    surname: string;
    mail: string;
    phone: string;
    country: string;
    state: string;
    status?: string;
    adults: number;
    kids: number;
    propertyId: number;
    startDate: Date;
    endDate: Date;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {
    status?: string;
}

interface BookingInstance extends Model<BookingAttributes, BookingCreationAttributes>, BookingAttributes {}


const Booking = sequelize.define<BookingInstance>('bookings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[(a-z)(A-Z)(0-9)_.-]{1,30}$/,
                msg: 'Document can only contain letters, numbers, hyphen, underscore y dot, from 1 to 30 characters max'
            }
        }
    },
    documentType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[(a-z)(A-Z) ñÇç]{3,30}$/,
                msg: 'Name must contain text, from 3 to 30 characters'
            }
        }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[(a-z)(A-Z) ñÇç]{3,30}$/,
                msg: 'Name must contain text, from 3 to 30 characters'
            }
        }
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[+]?[0-9\s-]{7,15}$/,
                msg: 'Phone must be 7 and 15 numbers long'
            }
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('En espera', 'Aceptado', 'Denegado'),
        allowNull: true,
        defaultValue: 'En espera'
    },
    adults: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    kids: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Properties', 
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: 'Start date must be a valid date'
            }
        }
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: 'End date must be a valid date'
            }
        }
    }

}, {
    tableName: 'Bookings',
    timestamps: false
});

export { Booking, BookingAttributes, BookingCreationAttributes, BookingInstance };

