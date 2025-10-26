import { Request, Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, projectId, status, dueDate } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Verify project belongs to user
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      res.status(404).json({ message: "Project not found or unauthorized" });
      return;
    }

    const task = await Task.create({
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
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Verify project belongs to user
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      res.status(404).json({ message: "Project not found or unauthorized" });
      return;
    }

    // Build query
    const query: any = { projectId };
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .populate("projectId", "title description")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const task = await Task.findById(id).populate("projectId", "title description");
    
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Verify task's project belongs to user
    const project = await Project.findOne({ _id: task.projectId, userId });
    if (!project) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Verify task's project belongs to user
    const project = await Project.findOne({ _id: task.projectId, userId });
    if (!project) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ 
      message: "Task updated successfully", 
      task: updatedTask 
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Verify task's project belongs to user
    const project = await Project.findOne({ _id: task.projectId, userId });
    if (!project) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};