import "dotenv/config";

const envs = {
  PORT: (process.env.PORT as unknown as number) || 4000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};

export { envs };
