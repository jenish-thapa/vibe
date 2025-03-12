import { Server } from "socket.io";
import http from "http";
import { logger } from "../utils/logger";

class SocketService {
  private _io: Server;

  constructor(server: http.Server) {
    logger.info("Initializing Socket...");
    this._io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  public initListeners() {
    const io = this._io;

    io.on("connect", (socket) => {
      logger.info(`New client connected ${socket.id}`);

      socket.on("message", async ({ message }: { message: string }) => {
        logger.info(`New message received: ${message}`);
      });

      socket.on("disconnect", () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
