import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Student from "@/models/Student";
import { authConfig } from "./auth.config";

const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET && process.env.NODE_ENV === "production") {
    console.warn("[AUTH] WARNING: AUTH_SECRET is not defined. This will cause 'Server Configuration' errors on production.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    secret: AUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                enrollmentNo: { label: "Enrollment No", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.enrollmentNo || !credentials?.password) return null;

                try {
                    await dbConnect();
                } catch (dbError) {
                    console.error("Auth DB Connection Error:", dbError);
                    return null;
                }

                const user = await Student.findOne({ enrollmentNo: credentials.enrollmentNo as string });

                if (!user || !user.password) {
                    console.log("Auth Error: User not found or no password", credentials.enrollmentNo);
                    return null;
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordCorrect) {
                    console.log("Auth Error: Invalid password for", credentials.enrollmentNo);
                    return null;
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
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
});
