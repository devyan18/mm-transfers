import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import type { Socket } from "socket.io";
import type { Server as HttpType } from "node:http";
import { authRouter } from "./modules/auth/auth.module.js";

type Event = (sk: Socket, io: Server) => void;

const app = express();
export const server = createServer(app);

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);

export const io = new Server(server);

export class ServerApp {
  constructor(private readonly http: HttpType, private readonly io: Server) {}
  async start(port: number, callbackStart: () => void, events: Event[]) {
    try {
      this.io.on("connection", (socket) => {
        if (events.length) {
          events.forEach((event) => event(socket, this.io));
        }
      });
      this.http.listen(port, () => {
        callbackStart();
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  }
}
