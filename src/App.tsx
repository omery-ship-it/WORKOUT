import { useState, useEffect } from "react";
import { LayoutDashboard, Apple, Dumbbell } from "lucide-react";
import { Tab, DailyLog } from "./types";
import DashboardView from "./components/DashboardView";
import NutritionView from "./components/NutritionView";
import WorkoutView from "./components/WorkoutView";

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');
  
  // Simulated offline-first DB (using LocalStorage for demo)
  const [logs, setLogs] = useState<DailyLog>(() => {
    const saved = localStorage.getItem('fitness-log-v1');
    if (saved) return JSON.parse(saved);
    return { completedMeals: [], completedWorkouts: {}, logs: {} };
  });

  useEffect(() => {
    localStorage.setItem('fitness-log-v1', JSON.stringify(logs));
  }, [logs]);

  // Sync helpers
  const toggleMeal = (mealId: string) => {
    setLogs(prev => ({
      ...prev,
      completedMeals: prev.completedMeals.includes(mealId)
        ? prev.completedMeals.filter(id => id !== mealId)
        : [...prev.completedMeals, mealId]
    }));
  };

  const updateSetLog = (exerciseId: string, setIndex: number, data: { weight: string, reps: string }) => {
    setLogs(prev => {
      const exLogs = prev.logs[exerciseId] || [];
      const newExLogs = [...exLogs];
      newExLogs[setIndex] = data;
      return { ...prev, logs: { ...prev.logs, [exerciseId]: newExLogs } };
    });
  };

  return (
    <div className="h-screen w-full bg-zinc-950 font-sans text-zinc-200 flex justify-center selection:bg-indigo-600/30 overflow-hidden">
      {/* Mobile Frame Container for Desktop */}
      <div className="w-full max-w-md h-full bg-zinc-950 border-x border-zinc-800 flex flex-col relative shadow-2xl overflow-hidden">
        
        <header className="h-16 px-6 flex items-center justify-center border-b border-zinc-800 bg-zinc-950 shrink-0">
          <span className="text-lg font-bold tracking-[0.2em] text-white uppercase leading-tight">WORKOUT</span>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none pb-20 relative">
          {currentTab === 'dashboard' && <DashboardView logs={logs} onNavigate={setCurrentTab} />}
          {currentTab === 'nutrition' && <NutritionView logs={logs} toggleMeal={toggleMeal} />}
          {currentTab === 'workout' && <WorkoutView logs={logs} updateSetLog={updateSetLog} />}
        </main>

        <nav className="absolute bottom-0 w-full h-20 bg-zinc-950 border-t border-zinc-800 px-6 pb-4 pt-2 flex items-center justify-between z-50">
          <button 
            onClick={() => setCurrentTab('dashboard')} 
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === 'dashboard' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide uppercase">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('nutrition')} 
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === 'nutrition' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <Apple className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide uppercase">Nutrition</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('workout')} 
            className={`flex flex-col items-center gap-1.5 transition-colors ${currentTab === 'workout' ? 'text-indigo-400' : 'text-zinc-500 hover:text-zinc-400'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide uppercase">Workout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
