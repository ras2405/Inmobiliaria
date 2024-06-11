import express from "express";

const app = express();
const port = 3004;

// Middlewares

// Server
const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};

const main = async () => {
    await startServer();
};

main();
