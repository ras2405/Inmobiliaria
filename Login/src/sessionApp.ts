import { dbSync, sequelize } from "./config/database";

const port = 3001;

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

const main = async () => {
    await connectDB();
};

main();
