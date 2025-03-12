import { createLogger, transports, format } from "winston";
const { combine, timestamp, printf, colorize, align } = format;

export const logger = createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});
