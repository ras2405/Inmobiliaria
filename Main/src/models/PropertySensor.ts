import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface PropertySensorAttributes {
    propertyId: number;
    sensorId: string;
}

interface PropertySensorCreationAttributes extends Optional<PropertySensorAttributes, 'propertyId'> { }
interface PropertySensorInstance extends Model<PropertySensorAttributes, PropertySensorCreationAttributes>, PropertySensorAttributes { }

const PropertySensor = sequelize.define<PropertySensorInstance>('PropertySensor', {
    propertyId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    sensorId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    }
}, {
    tableName: 'PropertySensors',
    timestamps: false
});

export { PropertySensor, PropertySensorAttributes, PropertySensorCreationAttributes, PropertySensorInstance };
