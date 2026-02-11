'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Book, Award, BookOpen, CheckCircle, ArrowRight, ArrowLeft, Star, Heart, Activity, Globe, Sparkles, User, Image as ImageIcon } from 'lucide-react';
import { Suspense } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchApi } from "@/lib/api-client";
import { ggvNepCourses, ggvDepartments } from "@/data/ggv-data";
import { PageWrapper, FadeIn, ScaleOnHover } from "@/components/page-motion";

export default function OnboardingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OnboardingContent />
        </Suspense>
    );
}

function OnboardingContent() {

    const router = useRouter();
    const [step, setStep] = useState(1);
    const [departments] = useState<string[]>(ggvDepartments.map(d => d.name));
    const [loadingDepartments] = useState(false);

    const [formData, setFormData] = useState({
        semester: "",
        year: "",
        department: "",
        cgpa: "",
        minor: "",
        mdc: "",
        sec: "",
        vac: "",
        avatar: "",
        name: "", // Will be filled from search params
        enrollmentNo: "" // Will be filled from search params
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        const name = searchParams.get('name');
        const enrollmentNo = searchParams.get('enrollmentNo');
        if (name || enrollmentNo) {
            setFormData(prev => ({
                ...prev,
                name: name || prev.name,
                enrollmentNo: enrollmentNo || prev.enrollmentNo
            }));
        }
    }, [searchParams]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        try {
            const res = await fetchApi('/api/me', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Failed to save profile", error);
        }
    };

    return (
        <div className="min-h-screen bg-mesh flex items-center justify-center p-4 md:p-8 font-[family-name:var(--font-geist-sans)] selection:bg-primary/20 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <main className="w-full max-w-4xl relative z-10">
                <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary rounded-[1.5rem] shadow-xl shadow-primary/30">
                                <Activity className="w-8 h-8 text-white animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight uppercase">Setup your profile</h1>
                                <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase">Let's get you ready</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4 flex flex-col items-center justify-center p-6 bg-muted/20 rounded-[2rem] border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden">
                            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                            <div className="w-24 h-24 rounded-full bg-muted/40 flex items-center justify-center relative z-10 overflow-hidden">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                                )}
                            </div>
                            <div className="text-center z-10">
                                <p className="font-bold text-sm group-hover:text-primary transition-colors">Upload Profile Picture</p>
                                <p className="text-xs text-muted-foreground">Tap to select image</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary" /> Core Department
                                </Label>
                                <Select onValueChange={(val) => handleInputChange("department", val)} value={formData.department} disabled={loadingDepartments}>
                                    <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-0 focus:ring-2 focus:ring-primary font-bold">
                                        <SelectValue placeholder={loadingDepartments ? "Loading..." : "Select Fleet"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl">
                                        {departments.map(dept => (
                                            <SelectItem key={dept} value={dept} className="rounded-xl font-bold py-3">{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500" /> Current Standing (CGPA)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="8.50"
                                    className="h-14 rounded-2xl bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary font-bold text-lg"
                                    value={formData.cgpa}
                                    onChange={(e) => handleInputChange("cgpa", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Select Semester</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => handleInputChange("semester", s.toString())}
                                            className={`h-12 rounded-xl font-black text-sm transition-all ${formData.semester === s.toString() ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : 'bg-muted/40 text-muted-foreground hover:bg-muted/60'}`}
                                        >
                                            S{s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground ml-1">Select Year</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[1, 2, 3, 4].map(y => (
                                        <button
                                            key={y}
                                            onClick={() => handleInputChange("year", y.toString())}
                                            className={`h-12 rounded-xl font-black text-xs transition-all ${formData.year === y.toString() ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 scale-105' : 'bg-muted/40 text-muted-foreground hover:bg-muted/60'}`}
                                        >
                                            YEAR {y}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-16 pt-8 border-t border-border/50 flex items-center justify-end gap-6">
                        <Button onClick={handleSubmit} className="h-14 px-10 rounded-2xl bg-secondary text-secondary-foreground font-black shadow-xl shadow-secondary/30 hover:scale-[1.05] active:scale-95 transition-all text-lg tracking-tight">
                            Setup Profile <CheckCircle className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
