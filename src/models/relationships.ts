import { Availability } from "./Availability";
import { Property } from "./Property";

export const setRelationships = async () => {
    Property.hasMany(Availability, { foreignKey: 'propertyId', as: 'availabilities' });
    Availability.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });
};
