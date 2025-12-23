import express from "express";
import { getUserInfo } from "../controllers/userController.js";

const router = express.Router();

// Sample route to get user information
router.get("/info", getUserInfo);

export default router;