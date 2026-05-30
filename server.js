import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db.js";

connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
});