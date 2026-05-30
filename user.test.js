import request from "supertest";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./userRoutes.js";
import errorHandler from "./errorHandler.js";
import mongoose from "mongoose";
import User from "./userModel.js"; // ajuste o caminho conforme seu projeto

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/users", userRouter);
app.use(errorHandler);

// Conectar ao banco antes dos testes
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/testdb");
});

// Limpar a coleção antes de cada teste
beforeEach(async () => {
  await User.deleteMany({});
});

// Desconectar depois dos testes
afterAll(async () => {
  await mongoose.disconnect();
});

describe("User API", () => {
  it("deve registrar usuário", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Samuel",
      email: "Samuel@test.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("refresh");
  });

  it("deve fazer login", async () => {
    // Primeiro cria o usuário
    await request(app).post("/api/users/register").send({
      name: "Samuel",
      email: "Samuel@test.com",
      password: "123456",
    });

    // Depois faz login
    const res = await request(app).post("/api/users/login").send({
      email: "Samuel@test.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("refresh");
  });

  it("deve falhar login com a senha errada", async () => {
    // Primeiro cria o usuário
    await request(app).post("/api/users/register").send({
      name: "Samuel",
      email: "Samuel@test.com",
      password: "123456",
    });

    // Depois tenta login com senha errada
    const res = await request(app).post("/api/users/login").send({
      email: "Samuel@test.com",
      password: "senhaErrada",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Credenciais inválidas");
  });
});
