import jwt from "jsonwebtoken";

export const isManagerAuthenticated = (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.manager = decoded;

    next();
  } catch (error) {
    console.log(error); // IMPORTANT
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};
