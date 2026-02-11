'use client';

import { useState, useEffect } from 'react';
import {
    BookOpen,
    FileText,
    Calendar,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { data: session } = useSession();
    // Default to session user name or fallback
    const userName = session?.user?.name?.split(' ')[0] || "Student";

    return (
        <main className="min-h-screen bg-background p-6 md:p-10 pb-24">
            <div className="max-w-md mx-auto md:max-w-4xl space-y-8">

                {/* Header Section */}
                <header className="space-y-2 mt-8 md:mt-0">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Welcome to GGU Connect, {userName}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Your personalized academic hub. What would you like to do today?
                    </p>
                </header>

                {/* Primary Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Syllabus Card */}
                    <Link href="/syllabus" className="group">
                        <div className="bg-card border border-border rounded-3xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <BookOpen className="w-32 h-32 text-primary" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 w-fit rounded-2xl">
                                    <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Syllabus</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                        Find your department syllabus and course structure.
                                    </p>
                                </div>
                                <div className="flex items-center text-primary font-bold text-sm">
                                    View Syllabus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Notes Card */}
                    <Link href="/notes" className="group">
                        <div className="bg-card border border-border rounded-3xl p-6 h-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <FileText className="w-32 h-32 text-orange-500" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 w-fit rounded-2xl">
                                    <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Notes & PYQs</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                        Access and upload study materials and past questions.
                                    </p>
                                </div>
                                <div className="flex items-center text-orange-600 dark:text-orange-400 font-bold text-sm">
                                    Get Resources <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Events/More Card (Keeping generic "More" or "Coming Soon" if no other feature is ready) */}
                    {/* The user asked for "Syllabus" and "Notes". I'll add a placeholder for future or "Events" as seen in my previous code, but simplify it. */}
                    <div className="group cursor-default">
                        <div className="bg-card border border-border rounded-3xl p-6 h-full shadow-sm relative overflow-hidden opacity-60">
                            {/* Reduced opacity to show it's secondary/placeholder */}
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Calendar className="w-32 h-32 text-purple-500" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 w-fit rounded-2xl">
                                    <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                                        Stay tuned for university schedules and events.
                                    </p>
                                </div>
                                <div className="flex items-center text-muted-foreground font-bold text-sm">
                                    Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
