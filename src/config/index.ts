import dotenv from "dotenv";
dotenv.config();

export const SANDBOX_API_KEY = process.env.SANDBOX_API_KEY || "";
export const SANDBOX_API_SECRET = process.env.SANDBOX_API_SECRET || "";
export const API_BASE_URL = process.env.API_BASE_URL || "";
