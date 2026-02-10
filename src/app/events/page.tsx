'use client';

import {
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    ExternalLink,
    Ticket,
    Share2,
    ArrowRight,
    Search,
    Filter,
    Zap,
    Users,
    ChevronRight,
    Trophy,
    Music,
    Terminal
} from 'lucide-react';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover, FadeIn } from "@/components/page-motion";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
    const featuredEvent = {
        title: "KULOTSAV 2024",
        subtitle: "Annual Cultural Fest",
        date: "March 15-17, 2024",
        time: "10:00 AM ONWARDS",
        location: "RAJAT JAYANTI SABHAGAR, GGU",
        category: "Cultural",
        description: "Join the largest student congregation in Central India. A 3-day experience of art, music, and performance.",
        image: "bg-gradient-to-br from-primary via-indigo-600 to-secondary",
        attendees: "4.2K+"
    };

    const upcomingEvents = [
        {
            title: "Neural Network Symposium",
            date: "Apr 05",
            day: "Fri",
            time: "09:30 AM",
            location: "CSIT Seminar Hall",
            category: "Academic",
            color: "text-blue-500",
            icon: Terminal
        },
        {
            title: "Inter-Sector Cricket Cup",
            date: "Feb 20",
            day: "Tue",
            time: "08:00 AM",
            location: "Main Ground",
            category: "Sports",
            color: "text-emerald-500",
            icon: Trophy
        },
        {
            title: "Beat_Con: Audio Expo",
            date: "Mar 25",
            day: "Mon",
            time: "11:00 AM",
            location: "Central Auditorium",
            category: "Music",
            color: "text-fuchsia-500",
            icon: Music
        }
    ];

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* High-Tech Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20 rotate-[-4deg]">
                                <CalendarIcon className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2 text-gradient">Campus <span className="text-foreground">Events</span></h1>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Discover what's happening on campus</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative group sm:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
                                <Input placeholder="Search for events..." className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 font-bold" />
                            </div>
                            <Button className="h-14 px-8 rounded-2xl bg-secondary text-secondary-foreground font-black tracking-widest text-[10px] shadow-lg shadow-secondary/20">
                                <Ticket className="w-4 h-4 mr-2" /> MY TICKETS
                            </Button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Featured Event - Cyberpunk Style */}
                        <div className="lg:col-span-8">
                            <FadeIn>
                                <div className="relative group rounded-[3.5rem] overflow-hidden shadow-2xl h-[500px]">
                                    <div className={`absolute inset-0 ${featuredEvent.image} opacity-90 transition-transform duration-700 group-hover:scale-110`}></div>
                                    {/* Animated Grid Overlay */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                    <div className="absolute top-10 left-10 flex gap-3">
                                        <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20">
                                            <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{featuredEvent.category}</span>
                                        </div>
                                        <div className="bg-red-500/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-red-500/30 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">LIVE</span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-12 left-12 right-12 text-white">
                                        <div className="flex items-center gap-4 mb-4 text-xs font-black uppercase tracking-[0.2em] text-white/60">
                                            <Users className="w-4 h-4 text-secondary" /> {featuredEvent.attendees} INTERESTED
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                                            {featuredEvent.title}
                                        </h2>
                                        <div className="flex flex-wrap gap-8 items-center border-t border-white/10 pt-8 mt-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                                                    <CalendarIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">DATE</span>
                                                    <p className="font-bold">{featuredEvent.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">LOCATION</span>
                                                    <p className="font-bold truncate max-w-xs">{featuredEvent.location}</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => alert("Registration Successful! Your digital ticket has been added to 'MY TICKETS'.")}
                                                className="h-14 px-10 rounded-2xl bg-white text-black font-black hover:bg-white/90 shadow-xl ml-auto"
                                            >
                                                Register Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Upcoming Feed - Terminal Style */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="font-black uppercase tracking-tighter flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-secondary" /> Upcoming Events
                                </h3>
                                <Button variant="ghost" size="sm" className="text-[10px] font-black text-muted-foreground hover:text-primary">VIEW ALL</Button>
                            </div>

                            <StaggerContainer className="space-y-4">
                                {upcomingEvents.map((event, i) => (
                                    <StaggerItem key={i}>
                                        <ScaleOnHover>
                                            <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden">
                                                <div className="flex items-center gap-5 relative z-10">
                                                    <div className={`p-4 rounded-2xl bg-muted/40 ${event.color} group-hover:scale-110 transition-transform`}>
                                                        <event.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${event.color}`}>{event.category}</span>
                                                            <div className="flex-1 h-[1px] bg-white/5" />
                                                        </div>
                                                        <h4 className="font-black text-sm uppercase leading-tight group-hover:text-primary transition-colors">{event.title}</h4>
                                                        <div className="flex gap-4 mt-2">
                                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{event.day} {event.date}</span>
                                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{event.time}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </ScaleOnHover>
                                    </StaggerItem>
                                ))}
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed opacity-50 hover:opacity-100 font-black uppercase text-[10px] tracking-widest">
                                    View Past Events
                                </Button>
                            </StaggerContainer>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}
