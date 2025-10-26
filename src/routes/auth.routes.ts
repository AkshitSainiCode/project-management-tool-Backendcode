import { Router } from "express";
import { body } from "express-validator";
import { register, login, getProfile } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/profile", authenticateToken, getProfile);

export default router;