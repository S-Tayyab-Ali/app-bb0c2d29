import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/5",
        hoverEffect && "hover:bg-white/10 hover:border-white/20 hover:shadow-violet-500/10 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

