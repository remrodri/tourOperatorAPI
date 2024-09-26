import { env } from "@/common/utils/envConfig";
import mongoose from "mongoose";

const dbUrl = env.DB_CONNECTION;
const connectDB = async () => {
  await mongoose.connect(dbUrl);
  try {
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error connect to DB: ${error}`);
  }
};
export default connectDB;
