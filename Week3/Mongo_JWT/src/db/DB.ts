import mongoose, { mongo,Document, Schema  } from 'mongoose';

mongoose.connect("mongodb+srv://Aryan:RnD141103@cluster0.ytfx5mx.mongodb.net/assignment");
interface IUser extends Document {
    username: string;
    password: string;
    amount : number;
    purchasedCourses: ICourse[];
}

interface IAdmin extends Document {
    username: string;
    password: string;
}

interface ICourse extends Document {
    title : string;
    description: string;
    imageLink : string;
    price : number;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    amount: {type: Number},
    purchasedCourses: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course' 
    }]
});


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    imageLink: { type: String, unique: true },
    price: {type : Number} 
});

const adminSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true },
    password : {type: String}
})

const UserModel = mongoose.model<IUser>('User', userSchema);
const AdminModel = mongoose.model<IAdmin>('Admin', adminSchema);
const CourseModel = mongoose.model<ICourse>('Course', courseSchema);
export {
    UserModel, AdminModel, CourseModel
}