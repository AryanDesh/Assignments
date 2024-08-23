import { Router } from "express";
import z from 'zod'
import jwt  from "jsonwebtoken";
import { UserMiddleware } from "../middleware/User";
import { UserModel, AdminModel, CourseModel } from "../db/DB";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const UserRouter = Router();

const UserSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6)
});
type zodSchema = z.infer<typeof UserSchema>

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

UserRouter.post('/signup' , async (req, res) => {
    const {username, password} = req.body;
    try {
        UserSchema.parse({
            username , password
        });
    } catch {
        res.status(411).json({
            message : "Invalid inputs try again"
        });
        return null;
    }
    const isUser = await UserModel.findOne({
        username : username
    })
    if(isUser) {
        res.status(411).json({
            message: "User already exists"
        })
    }
    else{
        const amount = getRandomInt(1000,10000);
        await UserModel.create({
            username : username,
            password : password,
            amount : amount
        })
        res.status(200).json({
            message: "User created successfully"
        })
    }
})

UserRouter.post('/signIn', async (req,res) => {
    const {username, password} = req.body;
    try {
        UserSchema.parse({
            username , password
        });
    } catch {
        res.status(411).json({
            message : "Invalid inputs try again"
        });
        return null;
    }
    const isUser = await UserModel.findOne({
        username : username
    })
    if(isUser){
        const payload = { username, password };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json(token);
    }
    else return res.status(403).json({
        message : "User does not exists, Try signing Up"
    })
})

UserRouter.get('/courses', UserMiddleware, async (req, res) => {
    const username = req.body.username;
    try {
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const user = await UserModel.findOne({ username })
            .populate('purchasedCourses', 'title description')
            .exec();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const courses = user.purchasedCourses.map(course => ({
            title: course.title,
            description: course.description
        }));

        return res.json({ courses });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({ message: "An error occurred while retrieving the courses" });
        }
    }
});



UserRouter.post('/courses/:courseId', UserMiddleware, async (req, res) => {
    const username = req.body.username;
    const courseId = req.params.courseId;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const course = await CourseModel.findById(courseId).session(session);
        if (!course) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Invalid course_id" });
        }

        const user = await UserModel.findOne({ username }).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "User not found" });
        }
        if (user.amount < course.price) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Don't have enough amount" });
        }

        user.amount -= course.price; 
        user.purchasedCourses.push(course); 

        await UserModel.updateOne(
            { username },
            { 
                $set: { amount: user.amount },
                $push: { purchasedCourses: courseId }
            },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: `Purchased course ${course.title}`
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error); 
        res.status(500).json({
            message: "Server error"
        });
    }
});

export {
    UserRouter
}
