import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
export declare const createProject: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getProjects: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getProjectById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateProject: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteProject: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=projectController.d.ts.map