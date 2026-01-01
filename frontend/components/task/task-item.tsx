"use client";

import { Task } from "@/types/task";
import { GlassCard } from "@/components/ui/glass-card";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <GlassCard 
      className={cn(
        "group flex items-center justify-between p-4 transition-all duration-500",
        task.isCompleted ? "opacity-60 bg-white/5" : "hover:translate-x-1"
      )}
      hoverEffect={!task.isCompleted}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-pointer",
            task.isCompleted 
              ? "bg-emerald-500 border-emerald-500 text-white" 
              : "border-slate-500 hover:border-violet-500 bg-transparent"
          )}
        >
          {task.isCompleted && <Check className="h-3.5 w-3.5" />}
        </button>
        
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className={cn(
            "text-base font-medium truncate transition-all duration-300",
            task.isCompleted ? "text-slate-500 line-through" : "text-slate-200"
          )}>
            {task.title}
          </span>
          <div className="flex items-center gap-2">
             <PriorityBadge priority={task.priority} />
             <span className="text-xs text-slate-500">
               {new Date(task.createdAt).toLocaleDateString()}
             </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CustomButton
          variant="danger"
          size="icon"
          className="h-8 w-8 rounded-lg"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </CustomButton>
      </div>
    </GlassCard>
  );
}

