import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';
import { processAlerts } from './services/alertsSubscriber';
import { filesWatcher } from './config/sensorWatcher';
import { publishAlerts } from './services/alertsPublisher';
import path from 'path';
import { startSimulation } from './sensorSimulation';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = 3002;

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

const connectMongo = async () => {
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
};

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

const main = async () => {
    await connectMongo();
    await startServer();
    await publishAlerts([]);
    await processAlerts();
    await filesWatcher();
    // await startSimulation();
};

main();
