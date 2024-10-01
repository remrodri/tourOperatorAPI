import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import mongoose from "mongoose";

const dbUrl = env.DB_CONNECTION;
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.info(`Error connect to DB: ${error}`);
  }
};
export default connectDB;
