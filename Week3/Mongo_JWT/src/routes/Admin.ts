import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminModel, CourseModel } from '../db/DB';
import { AdminMiddleware } from '../middleware/Admin'; 
import dotenv from 'dotenv';
import { z, ZodError } from 'zod';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const router = Router();

const SignupSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6)
});

const SigninSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6)
});

const CourseSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageLink: z.string().url(),
    price: z.number().positive()
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
        SignupSchema.parse(req.body);
        const { username, password } = req.body;
        const existingAdmin = await AdminModel.findOne({ username }).exec();
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        await AdminModel.create({ username, password });
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signin', async (req: Request, res: Response) => {
    try {
        SigninSchema.parse(req.body);
        const { username, password } = req.body;
        const admin = await AdminModel.findOne({ username, password }).exec();
        if (admin) {
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Incorrect username or password' });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/courses', AdminMiddleware, async (req: Request, res: Response) => {
    try {
        CourseSchema.parse(req.body);
        const { title, description, imageLink, price } = req.body;
        const newCourse = await CourseModel.create({ title, description, imageLink, price });
        res.status(201).json({
            message: 'Course created successfully',
            courseId: newCourse._id
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/courses', AdminMiddleware, async (req: Request, res: Response) => {
    try {
        const courses = await CourseModel.find({}).exec();
        res.json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
