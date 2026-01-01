"use client";

import { useState } from "react";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/custom-button";
import { Priority } from "@/types/task";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);
    setTitle("");
    setPriority("Medium");
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative group">
        <CustomInput
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="pr-12 text-lg h-14 bg-white/5 border-white/10 focus:bg-white/10 transition-all"
        />
        <div className="absolute right-2 top-2">
           <CustomButton 
             type="submit" 
             size="icon" 
             className={cn("h-10 w-10 rounded-lg transition-all duration-300", title.trim() ? "opacity-100 scale-100" : "opacity-0 scale-90")}
             disabled={!title.trim()}
           >
             <Plus className="h-6 w-6" />
           </CustomButton>
        </div>
      </div>

      {/* Priority Selection - Visible when focused or has text */}
      <div className={cn(
        "flex items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded || title ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
      )}>
        <span className="text-sm text-slate-400 mr-2">Priority:</span>
        {(['High', 'Medium', 'Low'] as Priority[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer",
              priority === p 
                ? p === 'High' ? "bg-red-500/20 text-red-300 border-red-500/50" 
                  : p === 'Medium' ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                : "bg-transparent text-slate-400 border-white/10 hover:bg-white/5"
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </form>
  );
}

