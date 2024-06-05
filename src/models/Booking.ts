import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Booking = sequelize.define('bookings', {
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
            model: 'Property', 
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: 'Start date must be a valid date'
            }
        }
    },
    endDate: {
        type: DataTypes.DATE,
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

