import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SessionAttributes {
    id?: number;
    mail: string;
    token: string;
    role: string;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> { }
interface SessionInstance extends Model<SessionAttributes, SessionCreationAttributes>, SessionAttributes { }

export const Session = sequelize.define<SessionInstance>('Session', {
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
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Operator', 'Owner', 'Tenant'),
        allowNull: false
    },
}, {
    tableName: 'Sessions',
    timestamps: false
});

