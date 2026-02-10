'use client';

import { useState } from 'react';
import { Sidebar, MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/page-motion";
import {
    Settings,
    Bell,
    Palette,
    User,
    Lock,
    ShieldAlert,
    Cpu,
    Zap,
    Fingerprint,
    Command,
    Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);

    return (
        <div className="min-h-screen bg-background flex font-[family-name:var(--font-geist-sans)]">
            <Sidebar />

            <main className="flex-1 md:ml-72 p-4 md:p-8 overflow-x-hidden relative">
                {/* Background Decor */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
                </div>

                <PageWrapper>
                    <div className="relative z-10 flex flex-col gap-10">
                        {/* Configuration Header */}
                        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                            <div className="flex items-center gap-6 w-full lg:w-auto">
                                <MobileNav />
                                <div className="p-4 bg-zinc-900 rounded-3xl shadow-xl shadow-black/20 rotate-[-12deg] hover:rotate-0 transition-transform duration-500 border border-white/10">
                                    <Terminal className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2 text-gradient">Settings</h1>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Manage your account preferences</p>
                                </div>
                            </div>
                            <Button className="h-14 px-10 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Save Settings
                            </Button>
                        </header>

                        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10">
                            {/* Settings Categories */}
                            <div className="md:col-span-8 space-y-10">
                                <StaggerContainer className="space-y-8">
                                    {/* Comms Protocol */}
                                    <StaggerItem>
                                        <div className="glass-panel p-8 rounded-[2.5rem] space-y-8 group transition-all duration-500 hover:border-primary/30">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                                                    <Bell className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-black uppercase tracking-tight">Notifications</h3>
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Control how you receive alerts</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-white/5">
                                                    <Label htmlFor="push-notifications" className="flex flex-col gap-1.5 cursor-pointer">
                                                        <span className="text-sm font-black uppercase tracking-tight italic">Push Notifications</span>
                                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Receive alerts in real-time</p>
                                                    </Label>
                                                    <Switch
                                                        id="push-notifications"
                                                        checked={notifications}
                                                        onCheckedChange={setNotifications}
                                                        className="data-[state=checked]:bg-primary"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-white/5">
                                                    <Label htmlFor="email-digest" className="flex flex-col gap-1.5 cursor-pointer">
                                                        <span className="text-sm font-black uppercase tracking-tight italic">Email Notifications</span>
                                                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Receive weekly updates via email</p>
                                                    </Label>
                                                    <Switch
                                                        id="email-digest"
                                                        checked={emailDigest}
                                                        onCheckedChange={setEmailDigest}
                                                        className="data-[state=checked]:bg-primary"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </StaggerItem>

                                    {/* Sensory Output */}
                                    <StaggerItem>
                                        <div className="glass-panel p-8 rounded-[2.5rem] space-y-8 group transition-all duration-500 hover:border-secondary/30">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                                                    <Palette className="w-5 h-5 text-secondary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-black uppercase tracking-tight">Appearance</h3>
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Customize the look and feel</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-white/5">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-sm font-black uppercase tracking-tight italic">Theme Mode</span>
                                                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Switch between light and dark mode</p>
                                                </div>
                                                <ModeToggle />
                                            </div>
                                        </div>
                                    </StaggerItem>

                                    {/* Security Access */}
                                    <StaggerItem>
                                        <div className="glass-panel p-8 rounded-[2.5rem] space-y-8 group transition-all duration-500 hover:border-red-500/30">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-red-500/10 rounded-2xl group-hover:bg-red-500/20 transition-colors">
                                                    <Lock className="w-5 h-5 text-red-500" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="text-lg font-black uppercase tracking-tight">Security</h3>
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Manage your account security</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 glass-panel font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all text-left justify-start">
                                                    Change Password
                                                </Button>
                                                <Button className="w-full h-14 rounded-2xl bg-red-500/5 text-red-500 font-black uppercase tracking-widest text-[10px] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-left justify-start group/btn">
                                                    Delete Account <ShieldAlert className="ml-2 w-4 h-4 opacity-50 group-hover/btn:animate-pulse" />
                                                </Button>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                </StaggerContainer>
                            </div>

                            {/* Sidebar Info */}
                            <div className="md:col-span-4 space-y-10">
                                <StaggerItem>
                                    <div className="glass-panel p-10 rounded-[2.5rem] text-center space-y-6 relative overflow-hidden">
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="p-5 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl mb-6">
                                                <Cpu className="w-8 h-8 text-white animate-pulse" />
                                            </div>
                                            <h4 className="text-xl font-black uppercase tracking-tighter">App Version</h4>
                                            <p className="text-3xl font-black text-gradient tracking-tighter">V1.0.0</p>
                                            <div className="pt-6 border-t border-white/5 w-full mt-6">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                                    <span>BUILD_ID</span>
                                                    <span className="text-foreground">BFX_7782</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">
                                                    <span>UPTIME</span>
                                                    <span className="text-foreground">99.99%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 transform translate-y-1/2" />
                                    </div>
                                </StaggerItem>

                                <StaggerItem>
                                    <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 space-y-6">
                                        <h4 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                            <Command className="w-4 h-4" /> Quick Links
                                        </h4>
                                        <div className="space-y-2">
                                            {['Sync Profile', 'Export Data', 'Privacy Policy'].map((item) => (
                                                <button key={item} className="w-full text-left p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between group">
                                                    {item} <Zap className="w-3 h-3 group-hover:text-amber-500 transition-colors" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </StaggerItem>
                            </div>
                        </div>
                    </div>
                </PageWrapper>
            </main>
        </div>
    );
}
