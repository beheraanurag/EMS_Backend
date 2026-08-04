import express from "express";
import {
  loginManager,
  logoutManager,
  registerManager,
} from "../controllers/manager.controller.js";

const managerRoutes = express.Router();

managerRoutes.post("/register", registerManager);
managerRoutes.post("/login", loginManager);
managerRoutes.post("/logout", logoutManager);
export default managerRoutes;
