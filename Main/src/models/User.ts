import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
    id?: number;
    document: string;
    documentType: string;
    name: string;
    surname: string;
    mail: string;
    password: string;
    phone: string;
    role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

const User = sequelize.define<UserInstance>('User', {
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
    password: {
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
    role: {
        type: DataTypes.ENUM('Admin', 'Operator', 'Owner', 'Tenant'),
        allowNull: false
    }
}, {
    tableName: 'Users',
    timestamps: false
});

export { User, UserAttributes, UserCreationAttributes, UserInstance };
