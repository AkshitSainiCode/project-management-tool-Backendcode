"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const createProject = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const project = await Project_1.default.create({
            title,
            description,
            status: status || 'active',
            userId,
        });
        res.status(201).json({
            message: "Project created successfully",
            project
        });
    }
    catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createProject = createProject;
const getProjects = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { search, status } = req.query;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Build query
        const query = { userId };
        if (status) {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const projects = await Project_1.default.find(query)
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({ projects });
    }
    catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const project = await Project_1.default.findOne({ _id: id, userId })
            .populate("userId", "name email");
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json({ project });
    }
    catch (error) {
        console.error('Get project by ID error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const updateData = {};
        if (title)
            updateData.title = title;
        if (description)
            updateData.description = description;
        if (status)
            updateData.status = status;
        const project = await Project_1.default.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json({
            message: "Project updated successfully",
            project
        });
    }
    catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const project = await Project_1.default.findOneAndDelete({ _id: id, userId });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteProject = deleteProject;
