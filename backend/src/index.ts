import express from "express";
import http from "http";
import { config } from "dotenv";
import { logger } from "./utils/logger";
import SocketService from "./socket/socket";
config();

const init = () => {
  const app = express();
  const server = http.createServer(app);
  const socketService = new SocketService(server);

  const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    logger.info(`Server started at PORT: ${PORT}`);
  });

  socketService.initListeners();
};

init();
