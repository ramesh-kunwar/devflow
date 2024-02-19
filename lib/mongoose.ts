import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.log("missing mongo db url");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    isConnected = true;
    console.log("MONGODB IS CONNECTED");
  } catch (error) {
    console.log(error);
    console.log("DB CONNECTION ERROR");
  }
};
