'use client';

import { useState } from 'react';
import {
    BookOpen,
    Download,
    CheckCircle2,
    MoreVertical,
    CircuitBoard,
    Database,
    Cpu,
    Globe,
    Calculator,
    Zap,
    Target,
    Layers,
    Activity,
    ArrowUpRight,
    PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/page-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SyllabusPage() {
    const [selectedSemester, setSelectedSemester] = useState("all");
    const [selectedDepartment, setSelectedDepartment] = useState("all");

    const subjects = [
        {
            code: "CS-401",
            title: "Operating Systems",
            credits: 4,
            progress: 75,
            units: 5,
            completedUnits: 3,
            color: "from-blue-500 via-indigo-500 to-violet-600",
            icon: Cpu,
            shadow: "shadow-blue-500/20",
            semester: "sem4"
        },
        {
            code: "CS-402",
            title: "Database Management",
            credits: 4,
            progress: 45,
            units: 5,
            completedUnits: 2,
            color: "from-emerald-500 via-teal-500 to-cyan-600",
            icon: Database,
            shadow: "shadow-emerald-500/20",
            semester: "sem4"
        },
        {
            code: "CS-403",
            title: "Computer Networks",
            credits: 3,
            progress: 20,
            units: 5,
            completedUnits: 1,
            color: "from-amber-500 via-orange-500 to-red-600",
            icon: Globe,
            shadow: "shadow-orange-500/20",
            semester: "sem4"
        },
        {
            code: "CS-404",
            title: "Design & Analysis of Algo",
            credits: 4,
            progress: 90,
            units: 5,
            completedUnits: 4,
            color: "from-violet-500 via-purple-500 to-fuchsia-600",
            icon: CircuitBoard,
            shadow: "shadow-purple-500/20",
            semester: "sem4"
        },
        {
            code: "MA-401",
            title: "Discrete Mathematics",
            credits: 3,
            progress: 60,
            units: 5,
            completedUnits: 3,
            color: "from-slate-700 via-slate-800 to-slate-900",
            icon: Calculator,
            shadow: "shadow-slate-500/20",
            semester: "sem4"
        },
        {
            code: "CS-501",
            title: "Artificial Intelligence",
            credits: 4,
            progress: 0,
            units: 5,
            completedUnits: 0,
            color: "from-pink-500 via-rose-500 to-red-600",
            icon: Zap,
            shadow: "shadow-rose-500/20",
            semester: "sem5"
        },
        {
            code: "CS-601",
            title: "Machine Learning",
            credits: 4,
            progress: 0,
            units: 5,
            completedUnits: 0,
            color: "from-cyan-500 via-blue-500 to-indigo-600",
            icon: Layers,
            shadow: "shadow-cyan-500/20",
            semester: "sem6"
        }
    ];

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Clean Background */}
            <div className="fixed inset-0 pointer-events-none z-[-1] bg-mesh" />

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* Immersive Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-primary/10 rounded-2xl">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight mb-1">Course Syllabus</h1>
                                <p className="text-muted-foreground text-sm font-medium">View and track your course syllabus</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Select onValueChange={setSelectedDepartment} defaultValue="all">
                                <SelectTrigger className="w-[180px] h-14 rounded-2xl bg-muted/40 border-0 font-black uppercase text-xs tracking-widest gap-2">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="all" className="font-black py-3">ALL DEPARTMENTS</SelectItem>
                                    <SelectItem value="cse" className="font-black py-3">CSE</SelectItem>
                                    <SelectItem value="ece" className="font-black py-3">ECE</SelectItem>
                                    <SelectItem value="me" className="font-black py-3">ME</SelectItem>
                                    <SelectItem value="ce" className="font-black py-3">CE</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={setSelectedSemester} defaultValue="all">
                                <SelectTrigger className="w-[180px] h-14 rounded-2xl bg-muted/40 border-0 font-black uppercase text-xs tracking-widest gap-2">
                                    <SelectValue placeholder="Semester" />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl">
                                    <SelectItem value="all" className="font-black py-3">ALL SEMESTERS</SelectItem>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                        <SelectItem key={s} value={`sem${s}`} className="font-black py-3">SEMESTER {s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </header>

                    {/* Progress Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex items-center gap-6">
                            <Activity className="w-10 h-10 text-primary" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Completion</p>
                                <h2 className="text-3xl font-black tracking-tighter">64.5%</h2>
                            </div>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 flex items-center gap-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Units Mastered</p>
                                <h2 className="text-3xl font-black tracking-tighter">13 / 25</h2>
                            </div>
                        </div>
                    </div>

                    {/* Subject Grid */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {subjects.filter(s => selectedSemester === "all" || s.semester === selectedSemester).map((subject, index) => (
                            <StaggerItem key={index}>
                                <div className="relative group h-full bg-card border border-border/50 rounded-[2rem] p-6 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                                    {/* Status Badge */}
                                    <div className="absolute top-6 right-6">
                                        <Badge variant="secondary" className="font-semibold">
                                            {subject.credits} Credits
                                        </Badge>
                                    </div>

                                    {/* Icon */}
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                                        "bg-primary/10 text-primary"
                                    )}>
                                        <subject.icon className="w-7 h-7" />
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{subject.code}</p>
                                        <h3 className="text-xl font-bold leading-tight">
                                            {subject.title}
                                        </h3>
                                    </div>

                                    {/* Progress Orb/Bar */}
                                    <div className="mt-auto space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-xs font-semibold text-muted-foreground block mb-1">Status</span>
                                                <span className="font-bold text-sm">{subject.completedUnits} of {subject.units} Units</span>
                                            </div>
                                            <span className="text-xl font-bold text-primary">{subject.progress}%</span>
                                        </div>
                                        <Progress value={subject.progress} className="h-2" />

                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <Link href="/notes" className="w-full">
                                                <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-bold uppercase tracking-wider">
                                                    Resources
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => alert(`Starting intense study mode for ${subject.title}... Focus enabled!`)}
                                                className="w-full h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold uppercase tracking-wider"
                                            >
                                                Learn Now
                                            </Button>
                                        </div>

                                        <Button variant="ghost" size="sm" className="w-full h-9 rounded-xl text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider">
                                            <Download className="w-3 h-3 mr-2" /> Get Syllabus PDF
                                        </Button>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </PageWrapper>
        </main >
    );
}
