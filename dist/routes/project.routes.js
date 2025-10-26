"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const projectController_1 = require("../controllers/projectController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// 🔒 Protect all project routes
router.use(auth_middleware_1.authenticateToken);
// 📁 Create a new project
router.post("/", [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Project title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
], projectController_1.createProject);
// 📦 Get all projects for the authenticated user
router.get("/", projectController_1.getProjects);
// 🔍 Get a single project by ID
router.get("/:id", projectController_1.getProjectById);
// ✏️ Update a project
router.put("/:id", [
    (0, express_validator_1.body)("title").optional().notEmpty().withMessage("Project title cannot be empty"),
    (0, express_validator_1.body)("description").optional().notEmpty().withMessage("Description cannot be empty"),
], projectController_1.updateProject);
// 🗑️ Delete a project
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.routes.js.map