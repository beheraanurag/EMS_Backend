import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./db/db.js";
import dns from "dns";
import cors from "cors";
import managerRoutes from "./routes/manager.routes.js";
import EmployeeRoutes from "./routes/employee.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ems-frontend-virid-mu.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/api/v1/manager", managerRoutes);
app.use("/api/v1/employee", EmployeeRoutes);
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const PORT = process.env.PORT;
connectDb();
app.listen(PORT, () => {
  console.log("Server is Runing On Port", PORT);
});
