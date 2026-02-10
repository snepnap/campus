'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    ShoppingBag,
    Tag,
    User,
    Zap,
    Heart,
    ShieldCheck,
    ArrowUpRight,
    Sparkles,
    Eye
} from 'lucide-react';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover, FadeIn } from "@/components/page-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);

    // Mock Data
    const items = [
        {
            id: 1,
            title: "Engineering Graphics Drafter",
            price: "₹350",
            category: "Stationery",
            status: "Good",
            seller: "Amit Verma",
            dept: "Civil Engineering",
            image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=400&h=300",
            date: "2 days ago"
        },
        {
            id: 2,
            title: "B.Tech 1st Year Chem Notes",
            price: "₹800",
            category: "Books/Notes",
            status: "New",
            seller: "Priya Singh",
            dept: "CSE",
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=300",
            date: "5 hours ago"
        },
        {
            id: 3,
            title: "Scientific Calculator FX-991ES",
            price: "₹600",
            category: "Electronics",
            status: "Used",
            seller: "Rahul K.",
            dept: "Mechanical",
            image: "https://images.unsplash.com/photo-1587145820266-a5951eebebb1?auto=format&fit=crop&q=80&w=400&h=300",
            date: "1 day ago"
        },
        {
            id: 4,
            title: "Lab Coat (Size M)",
            price: "₹200",
            category: "Uniform",
            status: "Good",
            seller: "Sneha G.",
            dept: "Biotech",
            image: "https://images.unsplash.com/photo-1584036561566-b452748e4279?auto=format&fit=crop&q=80&w=400&h=300",
            date: "3 days ago"
        },
        {
            id: 5,
            title: "Rechargeable Study Lamp",
            price: "₹450",
            category: "Electronics",
            status: "New",
            seller: "Vikas M.",
            dept: "IT",
            image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&q=80&w=400&h=300",
            date: "Just now"
        }
    ];

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] animate-pulse-glow" />
            </div>

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* Immersive Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-secondary rounded-3xl shadow-xl shadow-secondary/30 rotate-6 transition-transform hover:rotate-0 duration-500">
                                <ShoppingBag className="w-10 h-10 text-secondary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">GGU <span className="text-gradient">Marketplace</span></h1>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Campus Buy & Sell Network</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative sm:w-80 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-all" />
                                <Input
                                    placeholder="Search for items..."
                                    className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 font-bold"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Dialog open={isSellModalOpen} onOpenChange={setIsSellModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.05] transition-all">
                                        <Plus className="h-6 w-6 mr-2" />
                                        Sell Item
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-[2.5rem] border-white/10 bg-card/95 backdrop-blur-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">List an Item for Sale</DialogTitle>
                                        <DialogDescription className="font-black text-[10px] uppercase text-primary tracking-[0.2em]">Provide item details</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Item Name</Label>
                                            <Input placeholder="e.g. Drafter, Notes" className="h-12 rounded-xl bg-muted/50 border-0" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Price (₹)</Label>
                                                <Input placeholder="350" className="h-12 rounded-xl bg-muted/50 border-0" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Condition</Label>
                                                <Select>
                                                    <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-0">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl">
                                                        <SelectItem value="mint" className="font-bold">New</SelectItem>
                                                        <SelectItem value="used" className="font-bold">Used</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => {
                                            setIsSellModalOpen(false);
                                            alert("Item posted successfully! It will appear in the marketplace after a quick verification.");
                                        }} className="w-full h-12 rounded-xl font-black">Post Item</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </header>

                    {/* Inventory Grid */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <StaggerItem key={item.id}>
                                <ScaleOnHover className="h-full">
                                    <div className="group h-full flex flex-col glass-panel rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl">
                                        {/* Immersive Image Header */}
                                        <div className="relative aspect-video overflow-hidden group">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                                            {/* High-Tech Badges */}
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                <Badge className="bg-white/10 backdrop-blur-xl text-white border-white/20 font-black italic text-[9px] py-1">
                                                    {item.category}
                                                </Badge>
                                                <Badge className="bg-secondary/20 backdrop-blur-xl text-secondary border-secondary/30 font-black text-[9px] py-1">
                                                    {item.status}
                                                </Badge>
                                            </div>

                                            <div className="absolute bottom-6 left-6 text-white">
                                                <div className="flex items-center gap-2 opacity-80">
                                                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">Verified Seller</span>
                                                </div>
                                            </div>
                                        </div>

                                        <CardHeader className="p-8 pb-4">
                                            <div className="flex justify-between items-start gap-4 mb-4">
                                                <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-2xl font-black text-gradient leading-none">{item.price}</span>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="px-8 flex-grow">
                                            <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                                                        <div className="w-full h-full bg-card rounded-[10px] flex items-center justify-center font-black text-xs">
                                                            {item.seller.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-tight">{item.seller}</span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 italic">{item.dept}</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="p-8 pt-0 mt-6 flex gap-4">
                                            <Button className="flex-1 h-12 rounded-xl bg-muted/40 hover:bg-secondary hover:text-secondary-foreground border-0 font-black uppercase tracking-widest text-[10px] group/btn">
                                                Chat with Seller <ArrowUpRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl hover:bg-red-500/10 hover:text-red-500">
                                                <Heart className="w-5 h-5" />
                                            </Button>
                                        </CardFooter>
                                    </div>
                                </ScaleOnHover>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </PageWrapper>
        </main>
    );
}
