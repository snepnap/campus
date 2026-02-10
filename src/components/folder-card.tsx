import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface FolderCardProps {
    title: string;
    subtitle: string;
    itemsCount?: number;
    color?: string;
    onClick?: () => void;
    className?: string;
}

export function FolderCard({ title, subtitle, itemsCount, color = "text-blue-500", onClick, className }: FolderCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 border border-border/40 rounded-xl cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-md",
                className
            )}
        >
            <div className={cn("mb-3 p-3 bg-blue-500/10 rounded-full transition-colors group-hover:bg-blue-500/20", color.replace('text-', 'bg-').replace('500', '500/10'))}>
                <Folder className={cn("w-8 h-8 fill-current", color)} />
            </div>
            <h3 className="font-semibold text-foreground text-center mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground text-center">{subtitle}</p>
            {itemsCount !== undefined && (
                <span className="absolute top-3 right-3 text-[10px] font-medium bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                    {itemsCount}
                </span>
            )}
        </div>
    );
}
