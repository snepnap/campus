'use client';

import { useState, useEffect } from 'react';
import {
    Bell,
    Search,
    Calendar,
    FileText,
    Download,
    Plus,
    MoreVertical,
    Clock,
    Zap,
    TrendingUp,
    ArrowUpRight,
    Gift,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/page-motion";

export default function Dashboard() {

    // Determine Greeting based on time
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/me');
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    const stats = [
        {
            label: "Current CGPA",
            value: user?.cgpa || "--",
            trend: "+0.2",
            trendLabel: "vs last sem",
            icon: TrendingUp,
            color: "text-white",
            bg: "bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600",
            shadow: "shadow-indigo-500/30"
        },
        {
            label: "Attendance",
            value: user ? `${user.attendance}%` : "--",
            trend: "Short",
            trendLabel: "in 2 subjects",
            icon: Clock,
            color: "text-white",
            bg: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
            shadow: "shadow-emerald-500/30"
        },
        {
            label: "Next Class",
            value: "DS & Algo",
            trend: "2:30 PM",
            trendLabel: "Room 304",
            icon: Calendar,
            color: "text-white",
            bg: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
            shadow: "shadow-orange-500/30"
        },
        {
            label: "Reward Points",
            value: user?.points?.toLocaleString() || "--",
            trend: "+150",
            trendLabel: "this week",
            icon: Gift,
            color: "text-white",
            bg: "bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600",
            shadow: "shadow-purple-500/30"
        }
    ];

    const recentFiles = [
        { title: "Operating Systems Unit 1", subject: "SOT - MCA", author: "Dr. Saxena", type: "PDF", color: "bg-blue-50 text-blue-600" },
        { title: "Thermodynamics Laws", subject: "Engg - Mech", author: "Prof. Gupta", type: "PDF", color: "bg-orange-50 text-orange-600" },
        { title: "Quantum Physics Notes", subject: "Science", author: "Dr. Singh", type: "DOCX", color: "bg-purple-50 text-purple-600" },
    ];

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] animate-float" />
            </div>

            <PageWrapper>
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <MobileNav />
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                {greeting}, <span className="text-gradient">{user?.name?.split(' ')[0] || "Student"}</span> 👋
                            </h1>
                            <p className="text-muted-foreground mt-1 font-medium">Ready to crush your goals today?</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto p-1 bg-card/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-sm">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search anything..."
                                className="pl-9 h-10 bg-transparent border-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="relative hover:bg-white/50 rounded-xl transition-all">
                            <Bell className="h-5 w-5 text-foreground/70" />
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                        </Button>
                        <ModeToggle />
                    </div>
                </header>

                {/* Quick Actions Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <Link href="/syllabus">
                        <StaggerItem>
                            <ScaleOnHover className="h-full">
                                <div className="h-full group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 to-indigo-600 p-8 shadow-2xl shadow-indigo-500/20">
                                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                                            <BookOpen className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Syllabus</h3>
                                            <p className="text-white/70 text-sm font-medium">View your course structure</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                </div>
                            </ScaleOnHover>
                        </StaggerItem>
                    </Link>

                    <Link href="/notes">
                        <StaggerItem>
                            <ScaleOnHover className="h-full">
                                <div className="h-full group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-8 shadow-2xl shadow-emerald-500/20">
                                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                                            <FileText className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Notes & PYQs</h3>
                                            <p className="text-white/70 text-sm font-medium">Access study materials</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                </div>
                            </ScaleOnHover>
                        </StaggerItem>
                    </Link>

                    <Link href="/events">
                        <StaggerItem>
                            <ScaleOnHover className="h-full">
                                <div className="h-full group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-600 p-8 shadow-2xl shadow-orange-500/20">
                                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                                            <Calendar className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Events</h3>
                                            <p className="text-white/70 text-sm font-medium">Check upcoming activities</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                                </div>
                            </ScaleOnHover>
                        </StaggerItem>
                    </Link>
                </StaggerContainer>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Feed Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary fill-primary/20" />
                                Recent Activity
                            </h2>
                            <Button variant="link" className="text-primary font-semibold">View All</Button>
                        </div>

                        <StaggerContainer className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <StaggerItem key={i}>
                                    <div className="group relative bg-card hover:bg-primary/5 border border-border/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                                <FileText className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">OS Notes Unit {i + 1} Uploaded</h3>
                                                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-lg">2h ago</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">Dr. S.K. Verma added new materials for Operating Systems.</p>
                                                <div className="flex gap-2 mt-3">
                                                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-0">PDF</Badge>
                                                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0">SOT-MCA</Badge>
                                                </div>
                                            </div>
                                            <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl hover:bg-primary hover:text-white">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Quick Actions (Bento-style) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Upload Notes', 'View Schedule', 'Exam Results', 'Library'].map((action, i) => (
                                <Button key={i} variant="neo-outline" className="h-auto py-6 flex flex-col gap-2 rounded-2xl hover:bg-primary/5">
                                    <Plus className="w-6 h-6 text-primary" />
                                    <span className="font-bold text-xs">{action}</span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="space-y-6">
                        {/* Exam Card (Glassmorphism) */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white shadow-xl group">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Upcoming Exams</h3>
                                    <Badge className="bg-white/10 hover:bg-white/20 border-0 backdrop-blur-md">May 2024</Badge>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { sub: "Computer Networks", date: "15 May", time: "10:00 AM" },
                                        { sub: "Compiler Design", date: "18 May", time: "02:00 PM" }
                                    ].map((exam, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex-col flex items-center justify-center bg-white/10 w-12 h-12 rounded-lg font-bold">
                                                <span className="text-xs uppercase opacity-70">{exam.date.split(' ')[1]}</span>
                                                <span className="text-lg">{exam.date.split(' ')[0]}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm">{exam.sub}</h4>
                                                <p className="text-xs text-gray-400">{exam.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-indigo-500/25 rounded-xl py-6 font-bold">
                                    Download Datesheet
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}
