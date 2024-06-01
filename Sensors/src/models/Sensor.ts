import mongoose from "mongoose";

const Sensor = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    series: { type: String, required: true },
    brand: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    observableProperties: { type: Array, required: true }
});

const SensorModel = mongoose.model("Sensor", Sensor);
export default SensorModel;
