import { Availability } from "./Availability";
import { Booking } from "./Booking";
import { Property } from "./Property";
import { PropertySensor } from "./PropertySensor";

export const setRelationships = async () => {
    Property.hasMany(Availability, { foreignKey: 'propertyId', as: 'availabilities' });
    Availability.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

    Property.hasMany(Booking, { foreignKey: 'propertyId', as: 'bookings' });
    Booking.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

    Property.belongsTo(PropertySensor, { foreignKey: 'sensorId', as: 'sensor' });
    PropertySensor.hasMany(Property, { foreignKey: 'sensorId', as: 'properties' });
};
