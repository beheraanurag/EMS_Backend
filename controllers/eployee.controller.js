import { count } from "console";
import Employee from "../model/employee.model.js";
import mongoose from "mongoose";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, designation, salary, joiningDate, address } =
      req.body;

    const isExistEmployee = await Employee.findOne({ email });

    if (isExistEmployee) {
      return res.status(400).json({
        mesage: "Employee Already Exist",
      });
    }

    const employee = await Employee.create({
      managerId: req.manager.id,
      name,
      email,
      phone,
      designation,
      salary,
      joiningDate,
      address,
    });
    return res.status(201).json({
      success: true,
      message: "Employee Create Successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

// Get All Employeee
// Get All Employees
export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};
// Get Single Employee
export const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee Id",
      });
    }

    const employee = await Employee.findOne({
      _id: id,
      managerId: req.manager.id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || String(error),
    });
  }
};

// Update Employee

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee Id",
      });
    }
    const employee = await Employee.findOne({
      _id: id,
      managerId: req.manager.id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || String(error),
    });
  }
};

// Delete Employee

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee Id",
      });
    }

    const employee = await Employee.findOne({
      _id: id,
      managerId: req.manager.id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    await Employee.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Employee Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || String(error),
    });
  }
};
