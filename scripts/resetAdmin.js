// scripts/resetAdmin.js
// Deletes the admin account matching ADMIN_EMAIL so `npm run create-admin` can recreate it fresh.
import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

const EMAIL = process.env.ADMIN_EMAIL || "Augustinho10@gmail.com";

async function run() {
  await connectDB();

  const result = await User.deleteOne({ email: EMAIL.toLowerCase() });

  if (result.deletedCount > 0) {
    console.log(`Deleted admin: ${EMAIL}`);
    console.log(`Now run: npm run create-admin`);
  } else {
    console.log(`No admin found with email: ${EMAIL}`);
  }

  await mongoose.connection.close();
  process.exit(0);
}

run().catch((e) => {
  console.error("Failed to reset admin:", e.message);
  process.exit(1);
});