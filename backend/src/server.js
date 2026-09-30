import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import initializeSocket from "./sockets/socketManager.js";

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = initializeSocket(server);

const startServer = async () => {
    await connectDatabase();

    server.listen(PORT, () => {
        console.log(`Connectiva backend running on port ${PORT}`);
    });
};

startServer();