import express from "express";
import {
  getPendingTransactions,
  getUserTransactions,
  approveTopup,
  createTransaction,
  rejectTopup,
} from "../controllers/walletTransactionController.js";
import { admin } from "../middlewares/adminMiddleware.js";
import { body } from "express-validator";
import { validate } from "../middlewares/validationMiddleware.js";
import { isProfileComplete } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/", admin, getPendingTransactions);
router.get("/user-wallet-transactions", isProfileComplete, getUserTransactions);
router.post(
  "/create-transaction", isProfileComplete,
  [
    body("transactionId")
      .isLength({ min: 12, max: 12 })
      .withMessage("Transaction ID must be 12 characters long"),
  ],
  validate,
  createTransaction
);
router.patch("/approve-topup/:id", admin, approveTopup);
router.patch("/reject-topup/:id", admin, rejectTopup);

export default router;
