'use client';

import { useState } from 'react';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover, FadeIn } from "@/components/page-motion";
import { Progress } from "@/components/ui/progress";
import {
    Award,
    Star,
    Zap,
    TrendingUp,
    BookOpen,
    Upload,
    MessageSquare,
    Share2,
    Settings,
    Edit3,
    Fingerprint,
    Shield,
    Globe,
    Cpu,
    Target
} from 'lucide-react';
import Link from 'next/link';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/me')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserDetails(data.data);
                } else {
                    // Redirect to login if fetching fails
                    // router.push('/'); 
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch user", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading Profile...</div>;
    }

    if (!userDetails) {
        return <div className="flex items-center justify-center min-h-screen">User not found</div>;
    }

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* High-Fidelity Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20 rotate-[-8deg] hover:rotate-0 transition-transform duration-500">
                                <Fingerprint className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">My <span className="text-gradient">Profile</span></h1>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Manage your academic profile</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/settings">
                                <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 glass-panel font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                                    <Settings className="w-4 h-4 mr-2" /> Settings
                                </Button>
                            </Link>
                            <Button className="h-14 px-8 rounded-2xl bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-[10px] shadow-xl shadow-secondary/20 hover:scale-105 transition-all">
                                <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                            </Button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Personal Nexus Sidebar */}
                        <div className="lg:col-span-4 space-y-10">
                            <StaggerContainer className="space-y-10">
                                <StaggerItem>
                                    <div className="glass-panel p-10 rounded-[3.5rem] relative overflow-hidden group">
                                        {/* Profile Grid Pattern */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="relative mb-8">
                                                <div className="absolute inset-x-[-15px] inset-y-[-15px] rounded-full border border-primary/20 animate-spin-slow" />
                                                <div className="absolute inset-x-[-10px] inset-y-[-10px] rounded-full border border-dashed border-secondary/30 animate-reverse-spin" />
                                                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl relative z-10">
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black text-3xl">AK</AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <div className="text-center space-y-2 mb-8">
                                                <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">{userDetails.name}</h2>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{userDetails.course}</p>
                                            </div>

                                            <div className="flex flex-wrap justify-center gap-3 mb-10">
                                                <Badge className="bg-primary/10 text-primary border-primary/20 uppercase font-black text-[9px] tracking-widest px-4 py-2 rounded-xl italic">Student</Badge>
                                                <Badge className="bg-secondary/10 text-secondary border-secondary/20 uppercase font-black text-[9px] tracking-widest px-4 py-2 rounded-xl italic">{userDetails.enrollmentNo}</Badge>
                                            </div>

                                            <div className="w-full grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
                                                <div className="text-center">
                                                    <p className="text-2xl font-black tracking-tighter text-gradient">12</p>
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mt-1">COURSES</p>
                                                </div>
                                                <ol className="w-px h-full bg-white/5" />
                                                <div className="text-center">
                                                    <p className="text-2xl font-black tracking-tighter text-gradient">8.5</p>
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mt-1">CGPA</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="glass-panel p-8 rounded-[2.5rem] border-amber-500/20 relative overflow-hidden group">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-black uppercase tracking-tighter flex items-center gap-3">
                                                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                                                Karma Points
                                            </h3>
                                            <span className="text-2xl font-black tracking-tighter text-amber-500">1,250</span>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                                                    <span>LEVEL 12</span>
                                                    <span>150 XP TO NEXT LEVEL</span>
                                                </div>
                                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                                                    <div className="h-full bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" style={{ width: '75%' }} />
                                                </div>
                                            </div>
                                            <Link href="/rewards" className="block">
                                                <Button className="w-full h-14 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all">
                                                    Go to Rewards
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>
                        </div>

                        {/* Data Matrices */}
                        <div className="lg:col-span-8 space-y-10">
                            <StaggerContainer className="space-y-10">
                                <StaggerItem>
                                    <div className="glass-panel p-10 rounded-[3rem] space-y-8">
                                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                            <div className="p-3 bg-primary/10 rounded-2xl">
                                                <Cpu className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-black uppercase tracking-tighter text-xl">Academic Records</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                            <DataBlock icon={Globe} label="COURSE" value={userDetails.course} />
                                            <DataBlock icon={Target} label="SEMESTER" value={userDetails.semester} />
                                            <DataBlock icon={Shield} label="DEPARTMENT" value="CSE" />
                                            <DataBlock icon={BookOpen} label="BATCH" value="2022" />
                                            <DataBlock icon={Zap} label="ENROLLMENT NO" value="220315" />
                                            <DataBlock icon={Star} label="SECTION" value="Section A" />
                                        </div>
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-secondary/20">
                                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                            <div className="p-3 bg-secondary/10 rounded-2xl">
                                                <Fingerprint className="w-6 h-6 text-secondary" />
                                            </div>
                                            <h3 className="font-black uppercase tracking-tighter text-xl">Personal Information</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <DataBlock icon={Globe} label="EMAIL" value={userDetails.email} />
                                            <DataBlock icon={Zap} label="PHONE" value={userDetails.phone} />
                                            <DataBlock icon={Target} label="DATE OF BIRTH" value={userDetails.dob} />
                                            <DataBlock icon={Shield} label="BLOOD GROUP" value="O+ POSITIVE" />
                                            <div className="md:col-span-2">
                                                <DataBlock icon={Globe} label="ADDRESS" value={userDetails.address} />
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="p-10 rounded-[3rem] bg-gradient-to-br from-pink-600 to-rose-700 text-white shadow-2xl relative overflow-hidden group">
                                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                            <div>
                                                <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-3 italic">Refer a Friend</h3>
                                                <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">Earn 50 Karma points for every student you refer.</p>
                                            </div>
                                            <Button className="h-16 px-12 rounded-[1.5rem] bg-white text-pink-700 font-black uppercase tracking-widest text-[12px] shadow-2xl hover:scale-110 transition-transform flex items-center gap-3">
                                                <Share2 className="w-4 h-4" /> Invite Now
                                            </Button>
                                        </div>
                                        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
                                    </div>
                                </StaggerItem>
                            </StaggerContainer>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}

function DataBlock({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="space-y-3 group">
            <div className="flex items-center gap-2">
                <Icon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60 leading-none">{label}</label>
            </div>
            <p className="text-sm font-black uppercase tracking-tight text-foreground/90 border-b border-white/5 pb-2 group-hover:border-primary/50 transition-all">{value}</p>
        </div>
    );
}
