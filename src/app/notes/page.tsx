'use client';

import { useState, useEffect } from 'react';
import {
    FileText,
    Download,
    Upload,
    Search,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import { fetchApi } from "@/lib/api-client";

interface Resource {
    _id: string;
    title: string;
    type: string;
    subject: string;
    department: string;
    semester: string;
    author: string;
    fileUrl: string;
    size: string;
    createdAt: string;
}

export default function NotesPage() {
    const [department, setDepartment] = useState("all");
    const [semester, setSemester] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadOpen, setUploadOpen] = useState(false);

    // Upload Form State
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [type, setType] = useState("Notes");
    const [dept, setDept] = useState("cse");
    const [sem, setSem] = useState("1");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchResources();
    }, [department, semester, searchQuery]);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (department !== 'all') params.append('department', department);
            if (semester !== 'all') params.append('semester', semester);
            if (searchQuery) params.append('search', searchQuery);

            const res = await fetchApi(`/api/resources?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setResources(data.data);
            }
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!title || !subject || !dept || !sem || !type) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Simulate file upload metadata
            const res = await fetchApi('/api/resources', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    subject,
                    type,
                    department: dept,
                    semester: sem,
                    author: "Student User", // Replace with session user name if avail
                    fileUrl: file ? `/uploads/${file.name}` : "#",
                    size: file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Unknown"
                })
            });

            const data = await res.json();
            if (data.success) {
                setUploadOpen(false);
                fetchResources(); // Refresh list
                setTitle("");
                setSubject("");
                setFile(null);
                alert("Success! Resource uploaded successfully.");
            } else {
                alert("Upload Failed: " + (data.message || "Something went wrong."));
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error: An error occurred during upload.");
        }
    };

    return (
        <main className="min-h-screen bg-background p-6 md:p-10 pb-24">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Resource Hub</h1>
                        <p className="text-muted-foreground mt-1 text-lg">Notes, PYQs, and Study Material</p>
                    </div>

                    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl px-6 h-12 bg-primary hover:bg-primary/90 text-white font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                                <Upload className="w-4 h-4 mr-2" /> Upload New
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-3xl border-border shadow-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold">Upload Resource</DialogTitle>
                                <DialogDescription>
                                    Share notes or PYQs with the community.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="font-semibold">Title</Label>
                                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. OS Unit 1 Notes" className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="font-semibold">Subject</Label>
                                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Operating Systems" className="rounded-xl" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-semibold">Department</Label>
                                        <Select onValueChange={setDept} defaultValue="cse">
                                            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="cse">CSE</SelectItem>
                                                <SelectItem value="ece">ECE</SelectItem>
                                                <SelectItem value="me">Mechanical</SelectItem>
                                                <SelectItem value="ce">Civil</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-semibold">Semester</Label>
                                        <Select onValueChange={setSem} defaultValue="1">
                                            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <SelectItem key={s} value={s.toString()}>Sem {s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold">Type</Label>
                                    <Select onValueChange={setType} defaultValue="Notes">
                                        <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select Type" /></SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="Notes">Notes</SelectItem>
                                            <SelectItem value="PYQ">PYQ</SelectItem>
                                            <SelectItem value="Lab">Lab Manual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="file" className="font-semibold">File</Label>
                                    <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="rounded-xl cursor-pointer" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleUpload} className="w-full rounded-xl h-12 bg-primary font-bold">Upload Now</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </header>

                {/* Filters */}
                <div className="bg-card border border-border rounded-[2rem] p-5 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4 relative">
                        <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search topics or subjects..."
                            className="pl-10 h-11 bg-muted/40 border-transparent rounded-xl focus:bg-background focus:border-primary transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <Select onValueChange={setDepartment} defaultValue="all">
                            <SelectTrigger className="h-11 rounded-xl bg-muted/40 border-transparent focus:bg-background focus:border-primary transition-all font-medium"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="cse">CSE</SelectItem>
                                <SelectItem value="ece">ECE</SelectItem>
                                <SelectItem value="me">Mechanical</SelectItem>
                                <SelectItem value="ce">Civil</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-3">
                        <Select onValueChange={setSemester} defaultValue="all">
                            <SelectTrigger className="h-11 rounded-xl bg-muted/40 border-transparent focus:bg-background focus:border-primary transition-all font-medium"><SelectValue placeholder="Semester" /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">All Semesters</SelectItem>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <SelectItem key={s} value={s.toString()}>Sem {s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-2 text-right text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">
                        {loading ? "..." : resources.length} Found
                    </div>
                </div>

                {/* Resource List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-20 text-muted-foreground animate-pulse">Loading resources...</div>
                    ) : resources.length > 0 ? (
                        resources.map((res) => (
                            <div key={res._id} className="group bg-card border border-border/60 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-lg hover:border-border transition-all duration-300 gap-4">
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${res.type === 'Notes' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                                        res.type === 'PYQ' ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400' : 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400'
                                        }`}>
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">{res.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1.5 font-medium">
                                            <Badge variant="secondary" className="rounded-md uppercase text-[10px] tracking-wider px-2 h-5 flex items-center bg-muted/60 text-foreground/80">{res.department} • Sem {res.semester}</Badge>
                                            <span className="hidden sm:inline">•</span>
                                            <span>{res.author}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>{res.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <a href={res.fileUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl hover:bg-primary hover:text-white transition-all self-end sm:self-center shrink-0">
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 text-muted-foreground">
                            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 opacity-40" />
                            </div>
                            <h3 className="font-bold text-lg text-foreground mb-1">No resources found</h3>
                            <p>Try adjusting your filters or search query.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
