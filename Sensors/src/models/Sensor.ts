import mongoose from "mongoose";

const Sensor = new mongoose.Schema({
    id: { type: String, required: true, maxlength: 15, unique: true },
    description: { type: String, required: true, maxlength: 200 },
    series: { type: String, required: true, maxlength: 45, minlength: 45 },
    brand: { type: String, required: true, maxlength: 50 },
    address: { type: String, required: true, maxlength: 1000 },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    observableProperties: { type: String, required: true, maxlength: 1000 }
});

const SensorModel = mongoose.model("Sensor", Sensor);
export default SensorModel;
