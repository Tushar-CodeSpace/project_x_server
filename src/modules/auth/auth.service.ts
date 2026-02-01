import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../../cache/app.config";
import { UserModel } from "./user.model";

export const authService = {
    signup: async (data: { email: string; password: string }) => {
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) throw new Error("USER_ALREADY_EXISTS");

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await UserModel.create({
            email: data.email,
            password: hashedPassword
        });

        return generateToken(user);
    },

    signin: async (data: { email: string; password: string }) => {
        const user = await UserModel.findOne({ email: data.email });

        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            throw new Error("INVALID_CREDENTIALS");
        }

        return generateToken(user);
    }
};

const generateToken = (user: any) => {
    const secret = appConfig.jwt_secret;

    if (typeof secret !== "string") {
        throw new Error("JWT_SECRET_INVALID");
    }

    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        secret,
        { expiresIn: "15m" }
    );
};
