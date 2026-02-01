import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
    _id: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        _id: {
            type: String,
            default: () => uuidv4()
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
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
