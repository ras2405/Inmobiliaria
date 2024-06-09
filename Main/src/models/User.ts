import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
export const User = sequelize.define('User', {
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
    /*Documento. Máximo de 30 chars dígitos, letras, guion y punto, otro carácter no es permitido.
    • Tipo de Documento por ej. C.I/ DNI, etc.
    • Nombre: texto mínimo de 3 y máximo de 30 chars.
    • Apellido: texto mínimo de 3 y máximo de 30 chars.
    • Email: único en el sistema validar con formato email.
    • Número de teléfono: texto que valide el formato telefónico.
    • Rol: Administrador/ Operario/ Propietario
    */
}, {
    tableName: 'Users',
    timestamps: false
});

