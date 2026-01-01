"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Priority, FilterType } from "@/types/task";
import { TaskForm } from "@/components/task/task-form";
import { TaskList } from "@/components/task/task-list";
import { TaskFilter } from "@/components/task/task-filter";
import { GlassCard } from "@/components/ui/glass-card";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("focusflow-tasks", []);
  const [filter, setFilter] = useState<FilterType>("All");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success("Task added successfully");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Active") return !task.isCompleted;
      if (filter === "Completed") return task.isCompleted;
      return true;
    })
    .sort((a, b) => {
      // Sort by completion status first (active first)
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      // Then by priority (High > Medium > Low)
      const priorityWeight = { High: 3, Medium: 2, Low: 1 };
      if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      // Finally by date (newest first)
      return b.createdAt - a.createdAt;
    });

  const counts = {
    All: tasks.length,
    Active: tasks.filter((t) => !t.isCompleted).length,
    Completed: tasks.filter((t) => t.isCompleted).length,
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-violet-500/30 relative overflow-x-hidden">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-fuchsia-500/10 rounded-full blur-[100px] animate-bounce duration-[10s]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20 mb-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
              FocusFlow
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Organize your day with clarity and purpose.
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Input Section */}
          <GlassCard className="p-1">
            <TaskForm onAdd={addTask} />
          </GlassCard>

          {/* Filter & List Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white/90">Your Tasks</h2>
              <TaskFilter 
                currentFilter={filter} 
                onFilterChange={setFilter} 
                counts={counts} 
              />
            </div>

            <TaskList 
              tasks={filteredTasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} FocusFlow. Designed for productivity.</p>
        </footer>
      </div>
    </div>
  );
}

