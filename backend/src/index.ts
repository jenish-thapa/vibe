import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { config } from "dotenv";
import { logger } from "./utils/logger";
import SocketService from "./socket/socket";
config();

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

const init = () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // app.use((req, res, next) => {
  //   logger.info({ method: req.method, url: req.url, body: req.body });
  //   next();
  // });

  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);
  app.use("/api/messages", messageRoutes);

  const server = http.createServer(app);
  const socketService = new SocketService(server);

  const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    logger.info(`Server started at PORT: ${PORT}`);
  });

  socketService.initListeners();
};

init();
