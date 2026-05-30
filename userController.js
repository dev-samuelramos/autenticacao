// Importações únicas e corretas
import User from "./userModel.js";
import { generateToken, generateRefreshToken } from "./token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro de usuário
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({
    token: generateToken(user._id),
    refresh: generateRefreshToken(user._id),
  });
};

// Login de usuário
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  res.json({
    token: generateToken(user._id),
    refresh: generateRefreshToken(user._id),
  });
};

// Refresh token
export const refresh = async (req, res) => {
  const { refresh } = req.body;
  try {
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    res.json({ token: generateToken(decoded.id) });
  } catch {
    res.status(401).json({ message: "Refresh token inválido" });
  }
};

// Listar usuários
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Atualizar usuário
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user, req.body, { new: true });
  res.json(user);
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user);
  res.json({ message: "Usuário deletado" });
};
