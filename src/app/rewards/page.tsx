'use client';

import { useState } from 'react';

import {
    Gift,
    Zap,
    Coffee,
    BookOpen,
    Trophy,
    ShoppingBag,
    Coins,
    ArrowRight,
    Star,
    Sparkles,
    Flame,
    Lock
} from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover, FadeIn } from "@/components/page-motion";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function RewardsPage() {
    const [userPoints, setUserPoints] = useState(1250);
    const [redeemedItems, setRedeemedItems] = useState<number[]>([]);
    const nextLevel = 1500;

    const rewards = [
        {
            id: 1,
            title: "Free Coffee",
            cost: 200,
            description: "Free coffee at Sector 7 Canteen.",
            icon: Coffee,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            category: "Basic"
        },
        {
            id: 2,
            title: "Workshop Pass",
            cost: 500,
            description: "50% discount on any college workshop.",
            icon: Zap,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            category: "Advanced"
        },
        {
            id: 3,
            title: "Library Fine Waiver",
            cost: 800,
            description: "Waiver up to ₹100 of library fines.",
            icon: Lock,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            category: "Special"
        },
        {
            id: 4,
            title: "College T-Shirt",
            cost: 1500,
            description: "Official GGU Connect branded T-shirt.",
            icon: ShoppingBag,
            color: "text-fuchsia-500",
            bg: "bg-fuchsia-500/10",
            category: "Premium"
        },
        {
            id: 5,
            title: "Top Contributor Badge",
            cost: 300,
            description: "Permanent badge as a Top Contributor on the platform.",
            icon: Trophy,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            category: "Profile"
        },
    ];

    const handleRedeem = (reward: any) => {
        if (userPoints >= reward.cost) {
            setUserPoints((prev: number) => prev - reward.cost);
            setRedeemedItems((prev: number[]) => [...prev, reward.id]);
            alert(`Success! You have redeemed: ${reward.title}. Check your email for details.`);
        }
    };

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[30%] left-[50%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
            </div>

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* Forge Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-amber-500 rounded-3xl shadow-xl shadow-amber-500/40 rotate-12 hover:rotate-0 transition-transform duration-500">
                                <Flame className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">Rewards <span className="text-gradient">Store</span></h1>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Redeem your points for rewards</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-card/60 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-amber-500/20 shadow-2xl">
                            <Coins className="w-6 h-6 text-amber-500 animate-bounce" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em] leading-none mb-1">POINT BALANCE</span>
                                <span className="text-2xl font-black tracking-tighter text-amber-500">{userPoints} Points</span>
                            </div>
                        </div>
                    </header>

                    {/* Rank Banner */}
                    <FadeIn>
                        <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-indigo-900 via-zinc-900 to-black p-12 text-white shadow-2xl border border-white/5">
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                <div className="lg:col-span-8 flex flex-col gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase font-black text-[10px] tracking-widest px-4 py-1.5">Rank: Gold</Badge>
                                            <div className="h-[1px] w-12 bg-white/20" />
                                            <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em]">LEVEL 12 CONTRIBUTOR</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                                            Reaching <span className="text-gradient">Level 13</span> Status
                                        </h2>
                                        <p className="text-white/60 font-medium text-lg max-w-xl">
                                            Collect 250 more points to reach Level 13 and unlock premium physical merchandise rewards.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">PROGRESS</span>
                                            <span className="text-2xl font-black tracking-tighter text-primary">{(userPoints / nextLevel * 100).toFixed(0)}%</span>
                                        </div>
                                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-[3px] border border-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(userPoints / nextLevel) * 100}%` }}
                                                transition={{ duration: 2, ease: "circOut" }}
                                                className="h-full rounded-full bg-gradient-to-r from-primary via-indigo-400 to-secondary shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                                        <Trophy className="w-56 h-56 text-primary relative drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                        </div>
                    </FadeIn>

                    <div className="space-y-8">
                        <div className="flex items-center gap-4 px-2">
                            <h3 className="font-black uppercase tracking-tighter text-xl">Available Rewards</h3>
                            <div className="h-[1px] flex-1 bg-white/5" />
                            <Lock className="w-4 h-4 text-muted-foreground opacity-30" />
                        </div>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {rewards.map((reward, index) => (
                                <StaggerItem key={index}>
                                    <ScaleOnHover className="h-full">
                                        <div className="h-full glass-panel rounded-[2.5rem] p-8 flex flex-col transition-all duration-500 hover:border-primary/50 group relative overflow-hidden">
                                            <div className={cn(
                                                "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110",
                                                reward.bg, reward.color
                                            )}>
                                                <reward.icon className="w-8 h-8" />
                                            </div>

                                            <div className="flex flex-col gap-2 mb-6">
                                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em]">{reward.category}</span>
                                                <h4 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{reward.title}</h4>
                                                <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-2 opacity-70">
                                                    {reward.description}
                                                </p>
                                            </div>

                                            <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black uppercase text-muted-foreground opacity-60">COST</span>
                                                    <div className="flex items-center gap-1.5 pt-1">
                                                        <Coins className="w-3 h-3 text-amber-500" />
                                                        <span className="font-black text-lg tracking-tighter">{reward.cost}</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={() => handleRedeem(reward)}
                                                    disabled={userPoints < reward.cost || redeemedItems.includes(reward.id)}
                                                    className={cn(
                                                        "rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all",
                                                        userPoints >= reward.cost && !redeemedItems.includes(reward.id)
                                                            ? "bg-primary text-white shadow-lg hover:scale-105"
                                                            : "bg-muted/30 opacity-50 cursor-not-allowed"
                                                    )}
                                                >
                                                    {redeemedItems.includes(reward.id) ? "Redeemed" : "Redeem"}
                                                </Button>
                                            </div>

                                            {/* Decorative background element */}
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                                                <reward.icon className="w-40 h-40 -mr-20 -mt-20 rotate-[-15deg]" />
                                            </div>
                                        </div>
                                    </ScaleOnHover>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}
