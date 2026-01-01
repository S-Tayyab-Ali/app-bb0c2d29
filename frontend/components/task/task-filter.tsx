"use client";

import { FilterType } from "@/types/task";
import { cn } from "@/lib/utils";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    All: number;
    Active: number;
    Completed: number;
  };
}

export function TaskFilter({ currentFilter, onFilterChange, counts }: TaskFilterProps) {
  const filters: FilterType[] = ['All', 'Active', 'Completed'];

  return (
    <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 w-full sm:w-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 relative cursor-pointer",
            currentFilter === filter 
              ? "text-white bg-white/10 shadow-sm" 
              : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          {filter}
          <span className={cn(
            "ml-2 text-xs py-0.5 px-1.5 rounded-full",
            currentFilter === filter ? "bg-white/20 text-white" : "bg-white/5 text-slate-500"
          )}>
            {counts[filter]}
          </span>
        </button>
      ))}
    </div>
  );
}

