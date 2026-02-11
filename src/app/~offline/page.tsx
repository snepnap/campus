'use client';

import { WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center space-y-6 max-w-md"
            >
                <div className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                    <WifiOff className="w-16 h-16 text-red-500" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight">You are Offline</h1>
                    <p className="text-muted-foreground font-medium">
                        It seems like you've lost internet connection. Check your network and try again.
                    </p>
                </div>

                <div className="pt-8 w-full">
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
                    >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Retry Connection
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
