import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { parseCookie } from "cookie";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    });

    io.use((socket, next) => {
        try {
            const cookieHeader = socket.handshake.headers.cookie;

            if (!cookieHeader) {
                const error = new Error(
                    "Authentication required"
                );

                error.data = {
                    code: "AUTH_REQUIRED"
                };

                return next(error);
            }

            const cookies = parseCookie(cookieHeader);
            const token = cookies.token;

            if (!token) {
                const error = new Error(
                    "Authentication required"
                );

                error.data = {
                    code: "AUTH_REQUIRED"
                };

                return next(error);
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            socket.userId = decoded.userId;

            return next();
        } catch (error) {
            const authError = new Error(
                "Invalid or expired authentication"
            );

            authError.data = {
                code: "INVALID_AUTH"
            };

            return next(authError);
        }
    });

    io.on("connection", (socket) => {
        console.log(
            `Socket connected: ${socket.id} | User: ${socket.userId}`
        );

        socket.on("disconnect", (reason) => {
            console.log(
                `Socket disconnected: ${socket.id} | Reason: ${reason}`
            );
        });
    });

    return io;
};

export default initializeSocket;