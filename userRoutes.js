import express from "express";
import { register, login, refresh, getUsers, updateUser, deleteUser } from "./userController.js";
import authMiddleware from "./authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.get("/", authMiddleware, getUsers);
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

export default router;
