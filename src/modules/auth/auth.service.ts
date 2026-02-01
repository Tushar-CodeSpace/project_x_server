export const authService = {
    signup: async (data: { email: string; password: string }) => {
        // db check
        // hash password
        // create user
        // generate tokens

        return {
            token: "jwt.access.token",
            refreshToken: "jwt.refresh.token"
        };
    }
};
