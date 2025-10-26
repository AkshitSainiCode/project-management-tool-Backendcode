// import mongoose, { Schema, Document } from "mongoose";

// export interface ITask extends Document {
//   title: string;
//   description: string;
//   status: "todo" | "in-progress" | "done";
//   dueDate: Date;
//   project: mongoose.Types.ObjectId;
// }

// const TaskSchema: Schema<ITask> = new Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
//   dueDate: { type: Date },
//   project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
// });

// export default mongoose.model<ITask>("Task", TaskSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: Date;
  projectId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
taskSchema.index({ projectId: 1, status: 1 });

export default mongoose.model('Task', taskSchema);