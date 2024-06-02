import { Booking } from "./Booking";
import { Property } from "./Property";

export const setRelationships = async () => {
    Property.hasMany(Booking, { foreignKey: 'propertyId', as: 'bookings' });
    Booking.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
};
