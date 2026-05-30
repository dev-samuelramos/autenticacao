import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "test_secret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "test_refresh_secret";

export const generateToken = (id) =>
  jwt.sign({ id }, secret, { expiresIn: "15m" });

export const generateRefreshToken = (id) =>
  jwt.sign({ id }, refreshSecret, { expiresIn: "7d" });
