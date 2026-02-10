'use client';

import { Home, BookOpen, Calendar, User, Settings, LogOut, FileText, Menu, Calculator, ShoppingBag, Briefcase, GraduationCap, Zap, Sparkles, MessageSquare, Gift } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function SidebarContent() {
    const pathname = usePathname();

    const navSections = [
        {
            title: "Core",
            items: [
                { href: "/dashboard", icon: Home, label: "Dashboard" },
                { href: "/feed", icon: MessageSquare, label: "Campus Feed" },
            ]
        },
        {
            title: "Academics",
            items: [
                { href: "/syllabus", icon: BookOpen, label: "Syllabus" },
                { href: "/notes", icon: FileText, label: "Notes & PYQs" },
            ]
        },
        {
            title: "Community",
            items: [
                { href: "/events", icon: Calendar, label: "Events" },
            ]
        },
        {
            title: "User",
            items: [
                { href: "/profile", icon: User, label: "My Profile" },
            ]
        }
    ];

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch('/api/me').then(res => res.json()).then(data => {
            if (data.success) setUser(data.data);
        });
    }, []);

    return (
        <div className="flex flex-col h-full bg-card/40 backdrop-blur-2xl border-r border-white/10 relative overflow-hidden">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-0" />

            <div className="p-6 pb-2 relative z-10">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 group px-2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        <div className="bg-primary p-2.5 rounded-2xl shadow-lg relative">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl tracking-tighter uppercase leading-none">GGU</span>
                        <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">Connect</span>
                    </div>
                </motion.div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-8 relative z-10 overflow-y-auto custom-scrollbar">
                {navSections.map((section) => (
                    <div key={section.title} className="space-y-2">
                        <h3 className="px-6 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.3em] mb-4">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <div key={item.href} className="relative group px-1">
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-4 px-5 py-2.5 rounded-[1.25rem] transition-all duration-300 font-bold text-sm relative overflow-hidden group/link",
                                                isActive
                                                    ? "bg-primary text-white shadow-xl shadow-primary/30 translate-x-1"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-1"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-xl transition-all duration-300",
                                                isActive ? "bg-white/20" : "bg-muted/30 group-hover/link:bg-primary/10"
                                            )}>
                                                <item.icon className={cn("h-4 w-4 transition-transform duration-300 group-hover/link:rotate-6", isActive ? "text-white" : "text-muted-foreground group-hover/link:text-primary")} />
                                            </div>
                                            <span className="relative z-10 transition-colors uppercase tracking-tight text-[11px] leading-none">{item.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeGlow"
                                                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
                                                />
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-6 pt-0 mt-auto relative z-10">
                <div className="bg-muted/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-4 mb-4 group hover:border-primary/30 transition-all duration-500">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-white/20 rounded-2xl">
                                <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} className="rounded-2xl object-cover" />
                                <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-black rounded-full" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-black truncate leading-none mb-1 capitalize">{user?.name || "Student"}</span>
                            <div className="flex items-center gap-1.5 opacity-60">
                                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{user?.enrollmentNo || "Guest"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center justify-center gap-3 w-full py-4 px-6 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all group overflow-hidden relative border border-white/5"
                >
                    <LogOut className="h-4 w-4 relative z-10 group-hover:-translate-x-1 transition-transform" />
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-destructive/5 transition-transform duration-300" />
                </button>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </div>
    );
}

export function Sidebar() {
    return (
        <aside className="hidden md:flex w-72 flex-col fixed h-full z-30 transition-all duration-300 shadow-[20px_0_40px_-15px_rgba(0,0,0,0.1)]">
            <SidebarContent />
        </aside>
    );
}

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="neo-outline" size="icon" className="md:hidden w-12 h-12 rounded-2xl border-none">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-80 bg-background/95 backdrop-blur-xl">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    );
}
