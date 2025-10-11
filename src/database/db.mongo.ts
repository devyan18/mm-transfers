import { connect } from "mongoose";

export const dbConnection = async (uri: string) => {
  try {
    const db = await connect(uri);
    return db;
  } catch (e: Error | unknown) {
    console.log("Database connection error:", e);
    process.exit(1);
  }
};
