"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const Project_1 = __importDefault(require("../models/Project"));
const createTask = async (req, res) => {
    try {
        const { title, description, projectId, status, dueDate } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Verify project belongs to user
        const project = await Project_1.default.findOne({ _id: projectId, userId });
        if (!project) {
            res.status(404).json({ message: "Project not found or unauthorized" });
            return;
        }
        const task = await Task_1.default.create({
            title,
            description,
            projectId,
            status: status || 'todo',
            dueDate,
        });
        res.status(201).json({
            message: "Task created successfully",
            task
        });
    }
    catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { status } = req.query;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Verify project belongs to user
        const project = await Project_1.default.findOne({ _id: projectId, userId });
        if (!project) {
            res.status(404).json({ message: "Project not found or unauthorized" });
            return;
        }
        // Build query
        const query = { projectId };
        if (status) {
            query.status = status;
        }
        const tasks = await Task_1.default.find(query)
            .populate("projectId", "title description")
            .sort({ createdAt: -1 });
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getTasks = getTasks;
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await Task_1.default.findById(id).populate("projectId", "title description");
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        // Verify task's project belongs to user
        const project = await Project_1.default.findOne({ _id: task.projectId, userId });
        if (!project) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        res.status(200).json({ task });
    }
    catch (error) {
        console.error('Get task by ID error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await Task_1.default.findById(id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        // Verify task's project belongs to user
        const project = await Project_1.default.findOne({ _id: task.projectId, userId });
        if (!project) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        const updatedTask = await Task_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    }
    catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await Task_1.default.findById(id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        // Verify task's project belongs to user
        const project = await Project_1.default.findOne({ _id: task.projectId, userId });
        if (!project) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        await Task_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteTask = deleteTask;
