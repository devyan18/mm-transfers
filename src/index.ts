import { dbConnection } from "./database/db.mongo.js";
import { ServerApp } from "./server.js";
import { server, io } from "./server.js";
import { envs } from "./utils/env.js";

const serverApp = new ServerApp(server, io);

const main = async () => {
  serverApp.start(
    envs.PORT,
    () => {
      console.log(`Server started on port ${envs.PORT}`);
    },
    []
  );
};

main().then(async () => {
  console.log("Main function completed");
  const db = await dbConnection(envs.MONGO_URI);
  console.log("Database connected to", db.connection.name);
});
