'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/' || pathname === '/onboarding';

    return (
        <SessionProvider basePath="https://campus-steel.vercel.app/api/auth">
            <div className="min-h-screen bg-background flex overflow-x-hidden">
                {!isAuthPage && <Sidebar />}
                <div className={cn("flex-1 min-h-screen relative", !isAuthPage && "md:ml-72")}>
                    {children}
                </div>
            </div>
        </SessionProvider>
    );
}
