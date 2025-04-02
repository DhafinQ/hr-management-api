import dotenv from "dotenv";
dotenv.config();

export default {
  secret: process.env.AUTH_SECRET, // ✅ Use secret from .env
};