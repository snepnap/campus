import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthPage = nextUrl.pathname === "/";

            if (!isLoggedIn && !isAuthPage) {
                return false; // Redirect to login
            }
            if (isLoggedIn && isAuthPage) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.enrollmentNo = user.enrollmentNo;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token.enrollmentNo) {
                session.user.enrollmentNo = token.enrollmentNo;
            }
            return session;
        },
    },
    providers: [], // Empty for now, will be added in auth.ts
} satisfies NextAuthConfig;
