import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User Name is required'],
            trim: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
    }, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;