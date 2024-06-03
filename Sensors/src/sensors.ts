import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import sensorsRoutes from './routes/sensorsRoutes';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use('/api', sensorsRoutes);

const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri) {
    console.error("MongoDB URI is not defined in the environment variables");
    process.exit(1);
}
console.log("Connecting to MongoDB with URI:", mongoUri);

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
