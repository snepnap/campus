'use client';

import { useState, useEffect } from 'react';
import {
    MessageSquare,
    Heart,
    Share2,
    MoreHorizontal,
    Plus,
    Search,
    TrendingUp,
    Users,
    Image as ImageIcon,
    Send,
    Flame,
    Zap,
    Sparkles,
    ArrowUpRight,
    Repeat2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/page-motion";
import { cn } from "@/lib/utils";


import { fetchApi } from "@/lib/api-client";

const trendingTopics = [
    { name: "#Kulotsav2024", count: "1.2k posts", icon: Flame },
    { name: "#ExamDates", count: "850 posts", icon: Zap },
    { name: "#GGUConnect", count: "2.1k posts", icon: Sparkles }
];

export default function FeedPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [content, setContent] = useState("");
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [userRes, postsRes] = await Promise.all([
                    fetchApi('/api/me'),
                    fetchApi('/api/feed')
                ]);

                const userData = await userRes.json();
                const postsData = await postsRes.json();

                if (userData.success) setUser(userData.data);
                if (postsData.success) setPosts(postsData.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handlePost = async () => {
        if (!content.trim() || !user) return;

        setIsPosting(true);
        try {
            const newPost = {
                author: {
                    name: user.name,
                    avatar: "https://github.com/shadcn.png", // Fallback avatar
                    role: user.course || "Student"
                },
                content: content,
                image: null,
                likes: 0,
                comments: 0,
                shares: 0,
                category: "General",
                trending: false
            };

            const res = await fetchApi('/api/feed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            const data = await res.json();
            if (data.success) {
                setPosts([data.data, ...posts]);
                setContent("");
            }
        } catch (error) {
            console.error("Failed to post:", error);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-mesh opacity-50" />

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* Luminescent Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-panel p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" />

                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <Users className="w-8 h-8 text-primary relative z-10" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-1">Campus <span className="text-gradient">Feed</span></h1>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Real-time student network</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search feed..."
                                    className="h-14 pl-12 rounded-2xl bg-muted/40 border-0 focus-visible:ring-2 focus-visible:ring-primary font-bold text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button className="h-14 w-14 rounded-2xl bg-primary text-white shadow-xl shadow-primary/30 hover:scale-110 transition-all flex-shrink-0">
                                <Plus className="h-6 w-6" />
                            </Button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Feed */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                            {/* Post Creator */}
                            <div className="glass-panel p-6 rounded-[2rem] border border-white/10 flex flex-col gap-6 relative group overflow-hidden">
                                <div className="flex gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                                        <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                                    </Avatar>
                                    <textarea
                                        placeholder="What's happening on campus?"
                                        className="flex-1 bg-transparent border-0 focus:ring-0 resize-none font-bold text-lg placeholder:text-muted-foreground/40 min-h-[100px]"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-primary/10 hover:text-primary transition-all">
                                            <ImageIcon className="w-4 h-4" /> Media
                                        </Button>
                                        <Button variant="ghost" size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-secondary/10 hover:text-secondary transition-all">
                                            <Zap className="w-4 h-4" /> Live
                                        </Button>
                                    </div>
                                    <Button
                                        className="rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest px-8 shadow-lg shadow-primary/20"
                                        onClick={handlePost}
                                        disabled={isPosting || !content.trim()}
                                    >
                                        {isPosting ? "Posting..." : "Post"} <Send className="w-3 h-3 ml-2" />
                                    </Button>
                                </div>
                            </div>

                            {/* Feed Items */}
                            <StaggerContainer className="flex flex-col gap-8">
                                {posts.map((post: any) => (
                                    <StaggerItem key={post._id || post.id}>
                                        <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:border-primary/30 group relative overflow-hidden">
                                            {/* Card Background Glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex gap-4">
                                                    <Avatar className="h-14 w-14 border-2 border-white/10 rounded-2xl">
                                                        <AvatarImage src={post.author.avatar} />
                                                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-black text-lg tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{post.author.name}</h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-muted-foreground uppercase opacity-60 tracking-wider font-mono">{post.author.role}</span>
                                                            <span className="text-[10px] text-muted-foreground">•</span>
                                                            <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">{post.createdAt ? new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : post.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 opacity-40 hover:opacity-100">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </Button>
                                            </div>

                                            <p className="text-lg font-medium leading-relaxed mb-6">
                                                {post.content}
                                            </p>

                                            {post.image && (
                                                <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[16/9] border border-white/5 shadow-2xl">
                                                    <img
                                                        src={post.image}
                                                        alt="Post content"
                                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute top-4 right-4">
                                                        <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 uppercase font-black text-[9px] italic tracking-widest">Featured HQ</Badge>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                                <div className="flex gap-6">
                                                    <button className="flex items-center gap-2 group/btn">
                                                        <div className="p-2.5 rounded-xl group-hover/btn:bg-red-500/10 transition-colors">
                                                            <Heart className="w-5 h-5 text-muted-foreground group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-all" />
                                                        </div>
                                                        <span className="font-bold text-sm text-muted-foreground group-hover/btn:text-foreground">{post.likes}</span>
                                                    </button>
                                                    <button className="flex items-center gap-2 group/btn">
                                                        <div className="p-2.5 rounded-xl group-hover/btn:bg-primary/10 transition-colors">
                                                            <MessageSquare className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-all" />
                                                        </div>
                                                        <span className="font-bold text-sm text-muted-foreground group-hover/btn:text-foreground">{post.comments}</span>
                                                    </button>
                                                    <button className="flex items-center gap-2 group/btn">
                                                        <div className="p-2.5 rounded-xl group-hover/btn:bg-secondary/10 transition-colors">
                                                            <Repeat2 className="w-5 h-5 text-muted-foreground group-hover/btn:text-secondary transition-all" />
                                                        </div>
                                                        <span className="font-bold text-sm text-muted-foreground group-hover/btn:text-foreground">{post.shares}</span>
                                                    </button>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        {/* Sidebar Widgets */}
                        <aside className="lg:col-span-4 flex flex-col gap-10">
                            {/* Trending Widget */}
                            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 leading-none">
                                        Trending <TrendingUp className="w-4 h-4 text-primary" />
                                    </h2>
                                    <Badge className="bg-primary/10 text-primary border-primary/20 uppercase font-black text-[8px] italic tracking-[0.2em]">Live Scan</Badge>
                                </div>

                                <div className="space-y-6">
                                    {trendingTopics.map((topic, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-2">
                                                    <topic.icon className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-all" />
                                                    <span className="font-black text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{topic.name}</span>
                                                </div>
                                                <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-60 transition-all translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                                            </div>
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-6">{topic.count}</p>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="outline" className="w-full h-12 rounded-2xl border-white/5 mt-8 bg-white/5 hover:bg-primary hover:text-white border-0 font-black uppercase tracking-widest text-[9px]">Explore More</Button>
                            </div>

                            {/* Active Communities */}
                            <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 mb-8">
                                    Active Hubs <Sparkles className="w-4 h-4 text-secondary" />
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { name: "Code Nexus", members: "1.2k", color: "text-blue-500", bg: "bg-blue-500/10" },
                                        { name: "Creative Arts", members: "850", color: "text-purple-500", bg: "bg-purple-500/10" },
                                        { name: "Sports Core", members: "3.4k", color: "text-orange-500", bg: "bg-orange-500/10" }
                                    ].map((hub, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5 group">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", hub.bg)}>
                                                    <Users className={cn("w-5 h-5", hub.color)} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-xs uppercase tracking-tight">{hub.name}</h4>
                                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60">{hub.members} ACTIVE</p>
                                                </div>
                                            </div>
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}
