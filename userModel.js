import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Hook para criptografar senha antes de salvar
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Usa mongoose.models para evitar redefinição em testes
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
