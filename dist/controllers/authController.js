"use strict";
// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import User, { IUser } from '../models/User';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
// REGISTER
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Validation failed', errors: errors.array() });
            return;
        }
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email' });
            return;
        }
        const newUser = new User_1.default({ name, email, password });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    }
    catch (error) {
        console.error('❌ Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.register = register;
// LOGIN
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Validation failed', errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        console.log('🔐 Login attempt for:', email);
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log('❌ User not found:', email);
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const isMatch = await user.comparePassword(password);
        console.log('🔐 Password match result:', isMatch);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
exports.login = login;
// GET PROFILE
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = await User_1.default.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error('❌ Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProfile = getProfile;
