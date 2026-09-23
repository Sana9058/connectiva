import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const startServer = async () => {
    await connectDatabase();

    server.listen(PORT, () => {
        console.log(`Connectiva backend running on port ${PORT}`);
    });
};

startServer();