import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) res.status(401).json({ message: "Not authorized, no token" });
};


export const isVerified = (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(403).json({ message: "User is not verified" });
  }
};

export const isProfileComplete = (req, res, next) => {
  if (req.user && req.user.profileIsComplete) {
    next();
  } else {
    res.status(403).json({ message: "User profile is not complete" });
  }
};