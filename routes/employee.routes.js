import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getSingleEmployee,
  updateEmployee,
} from "../controllers/eployee.controller.js";
import { isManagerAuthenticated } from "../middleware/auth.middleware.js";
const EmployeeRoutes = express.Router();

EmployeeRoutes.post("/create", isManagerAuthenticated, createEmployee);
EmployeeRoutes.get("/get-all", isManagerAuthenticated, getAllEmployee);

EmployeeRoutes.get(
  "/get-single/:id",
  isManagerAuthenticated,
  getSingleEmployee,
);
EmployeeRoutes.put("/upadte/:id", isManagerAuthenticated, updateEmployee);

EmployeeRoutes.delete("/delete/:id", isManagerAuthenticated, deleteEmployee);

export default EmployeeRoutes;
