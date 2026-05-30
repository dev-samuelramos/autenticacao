import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./userRoutes.js";
import errorHandler from "./errorHandler.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
