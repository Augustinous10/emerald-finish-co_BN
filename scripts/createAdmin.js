// scripts/createAdmin.js
import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

const EMAIL = process.env.ADMIN_EMAIL || "Augustinho10@gmail.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "A1u0gustinho10";
const NAME = process.env.ADMIN_NAME || "Augustine NSHIMIYIMANA";

async function run() {
  await connectDB();

  const existing = await User.findOne({ email: EMAIL.toLowerCase() });
  if (existing) {
    console.log(`Admin already exists: ${EMAIL}`);
    await mongoose.connection.close();
    process.exit(0);
  }

  const user = new User({ email: EMAIL, name: NAME, role: "admin" });
  await user.setPassword(PASSWORD);
  await user.save();

  console.log(`Admin created:`);
  console.log(`  name: ${NAME}`);
  console.log(`  email: ${EMAIL}`);
  console.log(`  password: ${PASSWORD}`);
  console.log(`Change this password after first login.`);

  await mongoose.connection.close();
  process.exit(0);
}

run().catch((e) => {
  console.error("Failed to create admin:", e.message);
  process.exit(1);
});