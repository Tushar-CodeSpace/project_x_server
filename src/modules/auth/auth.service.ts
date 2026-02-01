import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appConfig from "../../cache/app.config";
import { UserModel } from "./user.model";

export const authService = {
    signup: async (data: { email: string; password: string }) => {
        const existingUser = await UserModel.findOne({
            email: data.email
        });

        if (existingUser) {
            throw new Error("USER_ALREADY_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await UserModel.create({
            email: data.email,
            password: hashedPassword
        });

        const payload = {
            userId: user._id.toString(),
            email: user.email
        };

        const token = jwt.sign(
            payload,
            appConfig.jwt_secret as string,
            { expiresIn: "15m" }
        );

        return { token };
    }
};
