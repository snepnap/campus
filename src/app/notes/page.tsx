'use client';

import { useState } from 'react';
import {
    FileText,
    Download,
    Plus,
    Search,
    ChevronRight,
    Home,
    FolderOpen,
    ArrowLeft,
    Filter,
    BookOpen,
    Clock,
    Zap,
    Cpu,
    Dna,
    Layers
} from 'lucide-react';
import { MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PageWrapper, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/page-motion";
import { FolderCard } from "@/components/folder-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function NotesPage() {
    const [viewMode, setViewMode] = useState<'folders' | 'files'>('folders');
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("notes");

    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [semesterFilter, setSemesterFilter] = useState("all");

    const semesters = [
        { id: "sem1", title: "Semester 1", count: 12, icon: Cpu, color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: "sem2", title: "Semester 2", count: 8, icon: Dna, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        { id: "sem3", title: "Semester 3", count: 15, icon: Zap, color: "text-purple-500", bg: "bg-purple-500/10" },
        { id: "sem4", title: "Semester 4", count: 10, icon: Layers, color: "text-pink-500", bg: "bg-pink-500/10" },
    ];

    const handleFolderClick = (folderName: string) => {
        setCurrentPath([...currentPath, folderName]);
        setViewMode('files');
    };

    const handleBackClick = () => {
        if (currentPath.length > 0) {
            const newPath = [...currentPath];
            newPath.pop();
            setCurrentPath(newPath);
            if (newPath.length === 0) setViewMode('folders');
        } else {
            setViewMode('folders');
        }
    };

    return (
        <main className="p-4 md:p-8 overflow-x-hidden relative">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <PageWrapper>
                <div className="relative z-10 flex flex-col gap-10">
                    {/* Futuristic Header */}
                    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-card/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-xl">
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <MobileNav />
                            <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20">
                                <FolderOpen className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">Notes & <span className="text-gradient">PYQs</span></h1>
                                <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Access course notes and previous year questions</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 sm:w-80 w-full group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search for notes..."
                                    className="h-14 pl-12 rounded-2xl bg-muted/40 border-0 focus-visible:ring-2 focus-visible:ring-primary font-bold text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.05] transition-all">
                                        <Plus className="h-6 w-6 mr-2" />
                                        Upload
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-[2.5rem] border-white/10 bg-card/95 backdrop-blur-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">Upload New Resource</DialogTitle>
                                        <DialogDescription className="font-medium uppercase text-[10px] tracking-[0.2em] text-primary">Upload notes or PYQs for others</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
                                            <Input placeholder="e.g. Operating System Notes" className="h-12 rounded-xl bg-muted/50 border-0" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</Label>
                                            <Input placeholder="e.g. Computer Science" className="h-12 rounded-xl bg-muted/50 border-0" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="w-full h-12 rounded-xl font-black">Upload Now</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </header>

                    {/* Navigation Console */}
                    <div className="space-y-8">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="bg-muted/40 p-2 rounded-2xl h-auto gap-2 border border-white/5">
                                <TabsTrigger value="notes" className="rounded-xl flex-1 py-4 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                                    <BookOpen className="w-4 h-4 mr-2" /> NOTES
                                </TabsTrigger>
                                <TabsTrigger value="pyq" className="rounded-xl flex-1 py-4 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all">
                                    <Clock className="w-4 h-4 mr-2" /> PYQs
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="notes" className="mt-10">
                                {viewMode === 'folders' ? (
                                    <section className="space-y-8">
                                        <div className="flex items-center justify-between ml-2">
                                            <h2 className="text-xl font-black uppercase tracking-tighter">Choose Semester</h2>
                                            <div className="h-[1px] flex-1 mx-6 bg-gradient-to-r from-muted to-transparent" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {semesters.map((sem) => (
                                                <ScaleOnHover key={sem.id}>
                                                    <div
                                                        onClick={() => handleFolderClick(sem.title)}
                                                        className="group bg-card/60 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 cursor-pointer hover:border-primary/50 transition-all duration-500 hover:shadow-2xl relative overflow-hidden h-64 flex flex-col justify-between"
                                                    >
                                                        <div className={`p-4 rounded-[1.5rem] w-fit ${sem.bg} ${sem.color} group-hover:scale-110 transition-transform duration-500`}>
                                                            <sem.icon className="w-8 h-8" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h3 className="text-2xl font-black uppercase tracking-tight">{sem.title}</h3>
                                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{sem.count} FILES</p>
                                                        </div>
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                                                    </div>
                                                </ScaleOnHover>
                                            ))}
                                        </div>
                                    </section>
                                ) : (
                                    <section className="space-y-8">
                                        <div className="flex items-center gap-4 ml-2">
                                            <Button variant="ghost" className="h-12 rounded-xl px-4 hover:bg-primary/10 hover:text-primary font-black uppercase text-xs" onClick={handleBackClick}>
                                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Semesters
                                            </Button>
                                            <div className="h-6 w-[1px] bg-white/10" />
                                            <h3 className="font-black uppercase tracking-tighter text-primary">{currentPath.join(' / ')}</h3>
                                        </div>

                                        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <StaggerItem key={i}>
                                                    <div className="group bg-card/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-primary/50 transition-all duration-300">
                                                        <div className="flex items-center gap-6">
                                                            <div className="p-4 bg-muted/40 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                                                <FileText className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-lg leading-none mb-2 group-hover:text-primary transition-colors uppercase tracking-tight">OS Notes Set {i}</h4>
                                                                <div className="flex gap-4">
                                                                    <span className="text-[10px] font-black text-muted-foreground/60 uppercase">PDF • 12MB</span>
                                                                    <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">DR. SAXENA</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20">
                                                            <Download className="w-5 h-5" />
                                                        </Button>
                                                    </div>
                                                </StaggerItem>
                                            ))}
                                        </StaggerContainer>
                                    </section>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </PageWrapper>
        </main>
    );
}
