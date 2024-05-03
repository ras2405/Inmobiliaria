import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Property = sequelize.define('property', { 
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
        type: DataTypes.INTEGER 
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
        type: DataTypes.ARRAY(DataTypes.STRING) 
    }
}, {
    tableName: 'Property',
    timestamps: false
});