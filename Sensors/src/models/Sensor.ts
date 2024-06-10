import mongoose from "mongoose";

const Sensor = new mongoose.Schema({
    id: { type: String, required: true, maxlength: 15 },
    description: { type: String, required: true, maxlength: 200 },
    series: { type: String, required: true, maxlength: 45, minlength: 45 },
    brand: { type: String, required: true, maxlength: 50 },
    address: { type: String, required: true, maxlength: 1000 },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    observableProperties: {
        type: [{ type: String, maxlength: 1000 }],
        validate: [arrayLimit, 'There must be at least one observable property.']
    }
});

function arrayLimit(val: string[]) {
    return val.length > 0;
}

const SensorModel = mongoose.model("Sensor", Sensor);
export default SensorModel;
