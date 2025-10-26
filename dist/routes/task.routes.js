"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const taskController_1 = require("../controllers/taskController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// 🔒 Protect all task routes
router.use(auth_middleware_1.authenticateToken);
// 🧩 Create a new task
router.post("/", [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("dueDate").isISO8601().withMessage("Valid due date is required"),
    (0, express_validator_1.body)("projectId").notEmpty().withMessage("Project ID is required"),
], taskController_1.createTask);
// 📦 Get all tasks for a project
router.get("/project/:projectId", taskController_1.getTasks);
// 🔍 Get a single task by ID
router.get("/:id", taskController_1.getTaskById);
// ✏️ Update a task
router.put("/:id", taskController_1.updateTask);
// 🗑️ Delete a task
router.delete("/:id", taskController_1.deleteTask);
exports.default = router;
