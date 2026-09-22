import "dotenv/config";
import { createServer } from "node:http";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Connectiva backend running on port ${PORT}`);
});