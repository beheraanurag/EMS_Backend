import dotenv from "dotenv";
dotenv.config();
import bcrypt, { truncates } from "bcryptjs";
import Manager from "../model/manager.model.js";

import jwt from "jsonwebtoken";
export const registerManager = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const managerExists = await Manager.findOne({ email });

    if (managerExists) {
      return res.status(400).json({
        success: false,
        message: "Manager Already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const manager = await Manager.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Manager Registered Successfully",
      manager,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, manager.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generrate Token
    const token = jwt.sign(
      { id: manager._id, email: manager.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("managerToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 100,
    });

    res.status(200).json({
      success: true,
      message: "Login SuccessFully",
      token,
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

export const logoutManager = async (req, res) => {
  try {
    res.cookie("managerToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logout Succesful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};
