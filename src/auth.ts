import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Student from "@/models/Student";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                enrollmentNo: { label: "Enrollment No", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.enrollmentNo || !credentials?.password) return null;

                await dbConnect();

                const user = await Student.findOne({ enrollmentNo: credentials.enrollmentNo as string });

                if (!user || !user.password) {
                    throw new Error("No user found with this enrollment number.");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password.");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    enrollmentNo: user.enrollmentNo,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
});
