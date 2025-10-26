"use strict";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import User from "../models/User";
// import Project from "../models/Project";
// import Task from "../models/Task";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const seed = async () => {
//   await mongoose.connect(process.env.MONGO_URI!);
//   // Clear collections
//   await User.deleteMany({});
//   await Project.deleteMany({});
//   await Task.deleteMany({});
//   // Create user
//   const user = new User({ name: "Test User", email: "test@example.com", password: "Test@123" });
//   await user.save();
//   // Create projects
//   const projects = [];
//   for (let i = 1; i <= 2; i++) {
//     const project = new Project({ title: `Project ${i}`, description: `Description ${i}`, user: user._id });
//     await project.save();
//     projects.push(project);
//   }
//   // Create tasks
//   for (const project of projects) {
//     for (let i = 1; i <= 3; i++) {
//       const task = new Task({
//         title: `Task ${i} for ${project.title}`,
//         description: `Task description ${i}`,
//         status: "todo",
//         dueDate: new Date(),
//         project: project._id,
//       });
//       await task.save();
//     }
//   }
//   console.log("Database seeded successfully!");
//   process.exit();
// };
// seed();
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from '../models/User';
// import Project from '../models/Project';
// import Task from '../models/Task';
// dotenv.config();
// const seedDatabase = async () => {
//   try {
//     const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_management';
//     await mongoose.connect(mongoUri);
//     console.log('✅ Connected to MongoDB');
//     // Clear existing data
//     await User.deleteMany({});
//     await Project.deleteMany({});
//     await Task.deleteMany({});
//     console.log('🗑️  Cleared existing data');
//     // Create test user
//     const user = new User({
//       email: 'test@example.com',
//       password: 'Test@123',
//       name: 'Test User'
//     });
//     await user.save();
//     console.log('✅ Created test user');
//     // Create projects
//     const project1 = new Project({
//       title: 'E-Commerce Website',
//       description: 'Build a full-stack e-commerce platform with payment integration',
//       status: 'active',
//       userId: user._id
//     });
//     await project1.save();
//     const project2 = new Project({
//       title: 'Mobile App Development',
//       description: 'Develop a cross-platform mobile application for task management',
//       status: 'active',
//       userId: user._id
//     });
//     await project2.save();
//     console.log('✅ Created 2 projects');
//     // Create tasks for project 1
//     const tasks1 = [
//       {
//         title: 'Design Database Schema',
//         description: 'Create comprehensive database schema for products, users, and orders',
//         status: 'done',
//         dueDate: new Date('2025-11-01'),
//         projectId: project1._id
//       },
//       {
//         title: 'Implement User Authentication',
//         description: 'Set up JWT-based authentication with registration and login',
//         status: 'in-progress',
//         dueDate: new Date('2025-11-10'),
//         projectId: project1._id
//       },
//       {
//         title: 'Build Product Catalog',
//         description: 'Create product listing, filtering, and search functionality',
//         status: 'todo',
//         dueDate: new Date('2025-11-20'),
//         projectId: project1._id
//       },
//       {
//         title: 'Integrate Payment Gateway',
//         description: 'Implement Stripe payment processing',
//         status: 'todo',
//         dueDate: new Date('2025-12-01'),
//         projectId: project1._id
//       }
//     ];
//     // Create tasks for project 2
//     const tasks2 = [
//       {
//         title: 'Setup React Native Environment',
//         description: 'Configure development environment for React Native',
//         status: 'done',
//         dueDate: new Date('2025-10-28'),
//         projectId: project2._id
//       },
//       {
//         title: 'Design UI Components',
//         description: 'Create reusable UI components with proper styling',
//         status: 'in-progress',
//         dueDate: new Date('2025-11-05'),
//         projectId: project2._id
//       },
//       {
//         title: 'Implement Task CRUD Operations',
//         description: 'Build create, read, update, delete functionality for tasks',
//         status: 'todo',
//         dueDate: new Date('2025-11-15'),
//         projectId: project2._id
//       },
//       {
//         title: 'Add Push Notifications',
//         description: 'Integrate push notification service',
//         status: 'todo',
//         dueDate: new Date('2025-11-25'),
//         projectId: project2._id
//       }
//     ];
//     await Task.insertMany([...tasks1, ...tasks2]);
//     console.log('✅ Created 8 tasks (4 per project)');
//     console.log('\n🎉 Database seeded successfully!');
//     console.log('\n📝 Test Credentials:');
//     console.log('   Email: test@example.com');
//     console.log('   Password: Test@123');
//     console.log('\n📊 Data Summary:');
//     console.log(`   Users: 1`);
//     console.log(`   Projects: 2`);
//     console.log(`   Tasks: 8`);
//     await mongoose.connection.close();
//     console.log('\n✅ Database connection closed');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seeding error:', error);
//     process.exit(1);
//   }
// };
// seedDatabase();
// src/config/seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Project_1 = __importDefault(require("../models/Project"));
const Task_1 = __importDefault(require("../models/Task"));
dotenv_1.default.config();
const seed = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        await User_1.default.deleteMany({});
        await Project_1.default.deleteMany({});
        await Task_1.default.deleteMany({});
        console.log('🗑️  Cleared existing collections');
        // ✅ DON'T hash manually - let the User model's pre-save hook do it
        const user = new User_1.default({
            name: 'Test User',
            email: 'test@example.com',
            password: 'Test@123', // Plain text - will be hashed by pre-save hook
        });
        await user.save();
        console.log(`✅ Created test user: ${user.email}`);
        // Create sample projects
        const projects = await Project_1.default.insertMany([
            {
                title: 'E-Commerce Website',
                description: 'Online shop for electronics',
                status: 'active',
                userId: user._id
            },
            {
                title: 'Mobile App Development',
                description: 'Cross-platform app using React Native',
                status: 'active',
                userId: user._id
            },
        ]);
        console.log(`✅ Created ${projects.length} projects`);
        // Create sample tasks
        const tasksData = projects.flatMap((project) => [
            {
                title: 'Design UI',
                description: 'Create wireframes',
                status: 'todo',
                dueDate: new Date('2025-12-01'),
                projectId: project._id
            },
            {
                title: 'Setup Backend',
                description: 'Create Node.js API',
                status: 'in-progress',
                dueDate: new Date('2025-12-10'),
                projectId: project._id
            },
            {
                title: 'Integrate Database',
                description: 'MongoDB setup and models',
                status: 'todo',
                dueDate: new Date('2025-12-15'),
                projectId: project._id
            },
            {
                title: 'Testing',
                description: 'Unit and integration tests',
                status: 'todo',
                dueDate: new Date('2025-12-20'),
                projectId: project._id
            },
        ]);
        await Task_1.default.insertMany(tasksData);
        console.log(`✅ Created ${tasksData.length} tasks`);
        console.log(`
🎉 DATABASE SEEDED SUCCESSFULLY
════════════════════════════════════════
👤 User: test@example.com
🔐 Password: Test@123
📁 Projects: ${projects.length}
📝 Tasks: ${tasksData.length}
════════════════════════════════════════
    `);
        await mongoose_1.default.connection.close();
        console.log('🔌 MongoDB connection closed');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};
seed();
//# sourceMappingURL=seed.js.map