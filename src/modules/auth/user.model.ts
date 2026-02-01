import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
