import express from "express";
import router from "./routes";

const app = express();
const port = 3004;

// Middlewares
app.use(express.json());

app.use('/api', router);

// Server
const startServer = async () => {
    app.listen(port, () => {
        console.info(`Server running on http://localhost:${port}`);
    });
};

const main = async () => {
    await startServer();
};

main();
