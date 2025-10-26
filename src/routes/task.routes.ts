import { Router } from "express";
import { body } from "express-validator";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// 🔒 Protect all task routes
router.use(authenticateToken);

// 🧩 Create a new task
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("dueDate").isISO8601().withMessage("Valid due date is required"),
    body("projectId").notEmpty().withMessage("Project ID is required"),
  ],
  createTask
);

// 📦 Get all tasks for a project
router.get("/project/:projectId", getTasks);

// 🔍 Get a single task by ID
router.get("/:id", getTaskById);

// ✏️ Update a task
router.put("/:id", updateTask);

// 🗑️ Delete a task
router.delete("/:id", deleteTask);

export default router;