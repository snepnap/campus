'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, ArrowRight, User, Lock, Hash, Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { PageWrapper, FadeIn, ScaleOnHover } from "@/components/page-motion";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNo: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleSubmit = async () => {
    setError("");

    if (!formData.enrollmentNo || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (isRegistering && !formData.name) {
      setError("Name is required for registration.");
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        // Register first
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Registration failed");
          setLoading(false);
          return;
        }
      }

      // SignIn with Credentials
      const result = await signIn("credentials", {
        enrollmentNo: formData.enrollmentNo,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Enrollment No. or Password. Please try again.");
      } else {
        router.push(isRegistering ? `/onboarding?name=${encodeURIComponent(formData.name)}&enrollmentNo=${encodeURIComponent(formData.enrollmentNo)}` : '/dashboard');
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-2 md:p-8 font-[family-name:var(--font-geist-sans)] selection:bg-primary/30 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      {/* Optimized Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Side: Brand Immersive Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-12 p-4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 group cursor-pointer w-fit"
          >
            <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-gradient uppercase">GGU Connect</span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-black leading-tight tracking-tight"
            >
              Your Campus. <br />
              <span className="text-gradient">Fully Digital.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-lg font-medium leading-relaxed"
            >
              Access syllabus, notes, results and more with Guru Ghasidas Vishwavidyalaya's most advanced student ecosystem.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
            {[
              { icon: Globe, title: "Centralized Hub", desc: "All departments unified", color: "text-blue-500" },
              { icon: Zap, title: "Real-time Ready", desc: "Instant updates & alerts", color: "text-amber-500" },
              { icon: ShieldCheck, title: "Verified Data", desc: "Official GGU resources", color: "text-emerald-500" },
              { icon: Sparkles, title: "Smart Prep", desc: "AI-curated resources", color: "text-indigo-500" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-4 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 hover:border-primary/30 transition-all group"
              >
                <div className={`p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Identity Interface */}
        <div className="lg:col-span-5 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full max-w-md"
          >
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
              {/* Interactive Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />

              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black tracking-tight">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
                  <p className="text-muted-foreground text-sm font-medium mt-1">
                    {isRegistering ? 'Register for a new account' : 'Enter your credentials'}
                  </p>
                </div>
                <ModeToggle />
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isRegistering ? 'reg' : 'login'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {isRegistering && (
                    <div className="space-y-2 group">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Your Name (e.g. Rahul)"
                          className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary font-medium"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 group">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Enrollment No.</Label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        placeholder="GGV/24/0001"
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary font-medium uppercase"
                        value={formData.enrollmentNo}
                        onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center ml-1">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                      {!isRegistering && (
                        <Link href="#" className="text-xs font-bold text-primary hover:text-primary/70">Forgot?</Link>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary font-medium"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm font-bold text-center bg-destructive/10 py-2 rounded-xl"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="block w-full pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 text-lg"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{isRegistering ? 'Creating Account...' : 'Logging in...'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {isRegistering ? 'Sign Up' : 'Login'}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </div>
                </motion.form>
              </AnimatePresence>

              <div className="mt-10 pt-8 border-t border-border/50 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  {isRegistering ? 'Already part of the fleet? ' : "New to GGU Connect? "}
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-primary font-bold hover:underline"
                  >
                    {isRegistering ? 'Login Instead' : 'Create Account'}
                  </button>
                </p>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                Central University Bilaspur • Student Identity Portal
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
