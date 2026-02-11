'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SyllabusPage() {
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");

    const handleRedirect = () => {
        if (!department) return;

        // Simplified mapping logic. in a real app, this would be a comprehensive database of URLs.
        // For now, we redirect to the main GGV syllabus section or specific known school pages.
        let url = "https://www.ggu.ac.in/Academics/Syllabus.aspx";

        // Example logic: if specific department pages exist, we could map them here.
        // const deptMap: Record<string, string> = {
        //     "cse": "https://www.ggu.ac.in/school-of-studies-engineering-technology",
        //     "ece": "https://www.ggu.ac.in/school-of-studies-engineering-technology",
        // };
        // if (deptMap[department]) url = deptMap[department];

        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen bg-background p-6 md:p-10 flex items-center justify-center">
            <Card className="max-w-md w-full border-border shadow-lg rounded-3xl">
                <CardHeader>
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Find Syllabus</CardTitle>
                    <CardDescription>
                        Select your academic details to view the official course structure on the GGV website.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1">Department</label>
                        <Select onValueChange={setDepartment}>
                            <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-0 focus:ring-1 focus:ring-primary">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="cse">Computer Science & Engg (CSE)</SelectItem>
                                <SelectItem value="ece">Electronics & Comm with Engg (ECE)</SelectItem>
                                <SelectItem value="it">Information Technology (IT)</SelectItem>
                                <SelectItem value="me">Mechanical Engineering</SelectItem>
                                <SelectItem value="ce">Civil Engineering</SelectItem>
                                <SelectItem value="mca">MCA</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Year</label>
                            <Select onValueChange={setYear}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-0 focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="1">1st Year</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Semester</label>
                            <Select onValueChange={setSemester}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-0 focus:ring-1 focus:ring-primary">
                                    <SelectValue placeholder="Sem" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                        <SelectItem key={s} value={s.toString()}>Sem {s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button
                        onClick={handleRedirect}
                        disabled={!department || !year || !semester}
                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base mt-4 transition-all hover:shadow-lg hover:-translate-y-0.5"
                    >
                        View Syllabus <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
