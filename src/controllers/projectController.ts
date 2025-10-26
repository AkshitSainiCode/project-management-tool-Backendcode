import { Request, Response } from "express";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/auth.middleware";

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await Project.create({
      title,
      description,
      status: status || 'active',
      userId,
    });

    res.status(201).json({ 
      message: "Project created successfully", 
      project 
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { search, status } = req.query;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Build query
    const query: any = { userId };
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const projects = await Project.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await Project.findOne({ _id: id, userId })
      .populate("userId", "name email");

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;

    const project = await Project.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({ 
      message: "Project updated successfully", 
      project 
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await Project.findOneAndDelete({ _id: id, userId });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: "Server error", error });
  }
};