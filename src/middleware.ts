import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    // Use a regex that excludes public files like images, manifest, and favicon
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\.png$).*)"],
};
