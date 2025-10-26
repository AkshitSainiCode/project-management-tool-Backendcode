// import mongoose, { Schema, Document } from "mongoose";

// export interface IProject extends Document {
//   title: string;
//   description: string;
//   status: "active" | "completed";
//   user: mongoose.Types.ObjectId;
// }

// const ProjectSchema: Schema<IProject> = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   status: { type: String, enum: ["active", "completed"], default: "active" },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// });

// export default mongoose.model<IProject>("Project", ProjectSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  status: 'active' | 'completed';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ userId: 1, status: 1 });

export default mongoose.model('Project', projectSchema);