"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], authController_1.register);
router.post("/login", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Valid email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
], authController_1.login);
router.get("/profile", auth_middleware_1.authenticateToken, authController_1.getProfile);
exports.default = router;
