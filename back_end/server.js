import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { seedAuthUsers } from "./utils/seedAuthUsers.js";
import usersRouter from "./Routers/usersRouter.js";
import authRouter from "./Routers/authRouter.js";
import emailRouter from "./Routers/emailRouter.js";
import statsRouter from "./Routers/statsRouter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
dotenv.config();

const corsOrigin =
  process.env.CORS_ORIGIN ||
  "http://localhost:5174,http://127.0.0.1:5174";
app.use(
  cors({
    origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/email", emailRouter);
app.use("/api/stats", statsRouter);

const port = process.env.PORT || 7000;

async function start() {
  await connectDB();
  await seedAuthUsers();
  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
