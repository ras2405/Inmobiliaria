import express from 'express';
import mongoose from 'mongoose';
import sensorsRoutes from './routes/sensorsRoutes';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', sensorsRoutes);

const main = async () => {
    mongoose.connect(process.env.MONGO_URI as string)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
};
