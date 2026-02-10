'use client';
import { motion } from 'framer-motion';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{
            opacity: 0,
            y: 40,
            scale: 0.98,
            filter: "blur(10px)",
            skewY: 2
        }}
        animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            skewY: 0
        }}
        transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom liquid easing
            opacity: { duration: 0.6 },
            filter: { duration: 0.6 }
        }}
        className="w-full origin-top"
    >
        {children}
    </motion.div>
);

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const ScaleOnHover = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);
