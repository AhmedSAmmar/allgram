import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import auth from "./routes/authRouter.js";
import post from "./routes/postRouter.js";
const port = process.env.PORT || 5000;
const corsOptions = {
  credentials: true,
  origin: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api", auth);
app.use("/api", post);

const serverConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await app.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.log(err);
  }
};

serverConnection();
