import express from "express";
import { dbSync, sequelize } from "./config/database";
import router from "./routes/";

const app = express();
const port = 3003;

// Middlewares
app.use(express.json());
app.use('/api', router);

// Database connection
const connectDB = async () => {
    try {
        await dbSync();
        await sequelize.authenticate();
        console.log('The connection to the database has been successfully established.');
    } catch (error) {
        console.error('Failed to connect to the database": ', error);
    }
};

// Server
const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};

const main = async () => {
    await connectDB();
    await startServer();
};

main();
