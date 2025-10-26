import { Router } from "express";
import { body } from "express-validator";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// 🔒 Protect all project routes
router.use(authenticateToken);

// 📁 Create a new project
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Project title is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  createProject
);

// 📦 Get all projects for the authenticated user
router.get("/", getProjects);

// 🔍 Get a single project by ID
router.get("/:id", getProjectById);

// ✏️ Update a project
router.put(
  "/:id",
  [
    body("title").optional().notEmpty().withMessage("Project title cannot be empty"),
    body("description").optional().notEmpty().withMessage("Description cannot be empty"),
  ],
  updateProject
);

// 🗑️ Delete a project
router.delete("/:id", deleteProject);

export default router;