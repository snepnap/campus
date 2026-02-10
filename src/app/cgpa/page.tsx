'use client';

import { useState } from 'react';
import { Sidebar, MobileNav } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Calculator, RotateCcw, Zap, Target, Activity, Cpu, ArrowUpRight } from 'lucide-react';
import { PageWrapper, FadeIn, ScaleOnHover } from "@/components/page-motion";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';

export default function CGPAPage() {
    const [result, setResult] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-background flex font-[family-name:var(--font-geist-sans)]">
            <Sidebar />

            <main className="flex-1 md:ml-72 p-4 md:p-8 overflow-x-hidden relative">
                {/* Background Decor */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
                </div>

                <PageWrapper>
                    <div className="relative z-10 flex flex-col gap-10">
                        {/* Nexus Header */}
                        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 glass-panel p-10 rounded-[3rem]">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <MobileNav />
                                <div className="p-4 bg-primary rounded-3xl shadow-xl shadow-primary/20 -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <Calculator className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">CGPA <span className="text-gradient">Calculator</span></h1>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Calculate your SGPA and CGPA easily</p>
                                </div>
                            </div>
                        </header>

                        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Control Panel */}
                            <div className="lg:col-span-12">
                                <Tabs defaultValue="sgpa" className="space-y-10">
                                    <TabsList className="bg-muted/40 p-2 rounded-3xl h-auto gap-4 border border-white/5 w-full md:w-fit">
                                        <TabsTrigger value="sgpa" className="rounded-2xl px-12 py-5 font-black uppercase tracking-widest text-xs data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                                            SGPA Calculator
                                        </TabsTrigger>
                                        <TabsTrigger value="cgpa" className="rounded-2xl px-12 py-5 font-black uppercase tracking-widest text-xs data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all">
                                            CGPA Calculator
                                        </TabsTrigger>
                                    </TabsList>

                                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                                        <div className="xl:col-span-8">
                                            <TabsContent value="sgpa" className="mt-0 focus-visible:ring-0">
                                                <SGPACalculator setResult={setResult} />
                                            </TabsContent>

                                            <TabsContent value="cgpa" className="mt-0 focus-visible:ring-0">
                                                <CGPACalculator setResult={setResult} />
                                            </TabsContent>
                                        </div>

                                        {/* Result Side Display */}
                                        <div className="xl:col-span-4">
                                            <AnimatePresence mode="wait">
                                                {result ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        className="glass-panel p-10 rounded-[3rem] sticky top-8 flex flex-col items-center justify-center text-center border-primary/30 bg-primary/5 h-[400px] overflow-hidden group"
                                                    >
                                                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 animate-pulse" />
                                                        <div className="relative z-10 space-y-6">
                                                            <div className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                                                <Target className="w-12 h-12 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">FINAL RESULT</p>
                                                                <h2 className="text-7xl font-black tracking-tighter text-gradient">{result}</h2>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Badge className="bg-primary/20 text-primary border-primary/30 uppercase font-black text-[10px] tracking-widest">TIER: ALPHA</Badge>
                                                                <Badge className="bg-secondary/20 text-secondary border-secondary/30 uppercase font-black text-[10px] tracking-widest">VERIFIED</Badge>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className="glass-panel p-10 rounded-[3rem] opacity-50 flex flex-col items-center justify-center text-center border-dashed h-[400px]">
                                                        <Cpu className="w-16 h-16 text-muted-foreground mb-6" />
                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Waiting for inputs...</p>
                                                    </div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </PageWrapper>
            </main>
        </div>
    );
}

function SGPACalculator({ setResult }: { setResult: (res: string | null) => void }) {
    interface Subject { name: string; credits: string; grade: string; }
    const [subjects, setSubjects] = useState<Subject[]>([{ name: '', credits: '', grade: '' }]);

    const addSubject = () => setSubjects([...subjects, { name: '', credits: '', grade: '' }]);
    const removeSubject = (index: number) => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const updateSubject = (index: number, field: keyof Subject, value: string) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const calculateSGPA = () => {
        let totalCredits = 0, totalPoints = 0;
        subjects.forEach(sub => {
            const credit = parseFloat(sub.credits), gradePoint = parseFloat(sub.grade);
            if (!isNaN(credit) && !isNaN(gradePoint)) {
                totalCredits += credit;
                totalPoints += credit * gradePoint;
            }
        });
        setResult(totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2));
    };

    const reset = () => {
        setSubjects([{ name: '', credits: '', grade: '' }]);
        setResult(null);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {subjects.map((subject, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end glass-panel p-8 rounded-[2rem] border-white/5 group hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="md:col-span-5 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject Name</Label>
                            <Input placeholder="e.g. Mathematics" value={subject.name} onChange={(e) => updateSubject(index, 'name', e.target.value)} className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                        </div>
                        <div className="md:col-span-3 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Credits</Label>
                            <Input type="number" placeholder="4" value={subject.credits} onChange={(e) => updateSubject(index, 'credits', e.target.value)} className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                        </div>
                        <div className="md:col-span-3 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Grade Point</Label>
                            <Input type="number" placeholder="9" max={10} value={subject.grade} onChange={(e) => updateSubject(index, 'grade', e.target.value)} className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                        </div>
                        <div className="md:col-span-1 flex justify-center pb-2">
                            {subjects.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => removeSubject(index)} className="w-12 h-12 rounded-2xl text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="outline" onClick={addSubject} className="h-16 flex-1 rounded-[1.5rem] border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 font-black uppercase tracking-widest text-[10px]">
                    <Plus className="h-4 w-4 mr-2" /> Add Subject
                </Button>
                <Button onClick={calculateSGPA} className="h-16 px-12 rounded-[1.5rem] bg-primary text-white font-black shadow-xl shadow-primary/30 hover:scale-[1.05] transition-all text-sm tracking-tight">
                    Calculate SGPA <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}

function CGPACalculator({ setResult }: { setResult: (res: string | null) => void }) {
    interface Semester { sgpa: string; credits: string; }
    const [semestres, setSemestres] = useState<Semester[]>([{ sgpa: '', credits: '' }]);

    const addSemester = () => setSemestres([...semestres, { sgpa: '', credits: '' }]);
    const removeSemester = (index: number) => {
        const newSemesters = [...semestres];
        newSemesters.splice(index, 1);
        setSemestres(newSemesters);
    };

    const updateSemester = (index: number, field: keyof Semester, value: string) => {
        const newSemesters = [...semestres];
        newSemesters[index][field] = value;
        setSemestres(newSemesters);
    };

    const calculateCGPA = () => {
        let totalCredits = 0, weightedSum = 0;
        semestres.forEach(sem => {
            const sgpa = parseFloat(sem.sgpa), credit = parseFloat(sem.credits);
            if (!isNaN(sgpa) && !isNaN(credit)) { weightedSum += sgpa * credit; totalCredits += credit; }
        });
        setResult(totalCredits === 0 ? "0.00" : (weightedSum / totalCredits).toFixed(2));
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {semestres.map((sem, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end glass-panel p-8 rounded-[2rem] border-white/5"
                    >
                        <div className="md:col-span-4 flex flex-col justify-center h-14">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-1">SEM_ID</span>
                            <span className="text-xl font-black uppercase tracking-tight">Semester {index + 1}</span>
                        </div>
                        <div className="md:col-span-4 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Semester SGPA</Label>
                            <Input type="number" placeholder="8.5" max={10} value={sem.sgpa} onChange={(e) => updateSemester(index, 'sgpa', e.target.value)} className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                        </div>
                        <div className="md:col-span-3 space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Total Credits</Label>
                            <Input type="number" placeholder="22" value={sem.credits} onChange={(e) => updateSemester(index, 'credits', e.target.value)} className="h-14 rounded-2xl bg-muted/30 border-0 font-bold" />
                        </div>
                        <div className="md:col-span-1 flex justify-center pb-2">
                            {semestres.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => removeSemester(index)} className="w-12 h-12 rounded-2xl text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="outline" onClick={addSemester} className="h-16 flex-1 rounded-[1.5rem] border-2 border-dashed border-white/10 hover:border-primary/50 font-black uppercase tracking-widest text-[10px]">
                    <Plus className="h-4 w-4 mr-2" /> Add Semester
                </Button>
                <Button onClick={calculateCGPA} className="h-16 px-12 rounded-[1.5rem] bg-secondary text-secondary-foreground font-black shadow-xl shadow-secondary/30 hover:scale-[1.05] transition-all text-sm tracking-tight">
                    Calculate CGPA <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
