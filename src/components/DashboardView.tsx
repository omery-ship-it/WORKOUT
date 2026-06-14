import { DailyLog } from '../types';
import { NUTRITION_TARGETS, MEALS, WORKOUT_DAYS } from '../data/seed';
import { ChevronRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function DashboardView({ logs, onNavigate }: { logs: DailyLog, onNavigate: (t: any) => void }) {
  // Calc nutrition
  const totalCals = MEALS.filter(m => logs.completedMeals.includes(m.id)).reduce((sum, m) => sum + m.cals, 0);
  const totalPro = MEALS.filter(m => logs.completedMeals.includes(m.id)).reduce((sum, m) => sum + m.p, 0);
  const calPercent = Math.min(100, Math.round((totalCals / NUTRITION_TARGETS.calories) * 100));

  const todayWorkout = WORKOUT_DAYS[0];

  return (
    <div className="p-6 space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-light tracking-tight text-white">Today's Overview</h2>
        <p className="text-sm text-zinc-400">Track less. Understand more.</p>
      </div>

      {/* Progress Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Calories</span>
            <div className="text-3xl font-light text-white mt-1">{totalCals.toFixed(0)} <span className="text-sm text-zinc-500">/ 2425</span></div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest">Protein</span>
            <div className="text-xl font-medium text-indigo-400 mt-1">{totalPro.toFixed(0)}<span className="text-sm">g</span></div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${calPercent}%` }}
            className="h-full bg-indigo-600 rounded-full"
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Workout Status */}
      <div 
        onClick={() => onNavigate('workout')}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors cursor-pointer group flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded font-mono uppercase">{todayWorkout.name} Workout</span>
          </div>
          <h3 className="text-lg text-white font-medium">{todayWorkout.subtitle}</h3>
          <p className="text-xs text-zinc-400 mt-1">{todayWorkout.blocks.length} Blocks Scheduled</p>
        </div>
        <div className="w-10 h-10 bg-zinc-800 rounded-full border border-zinc-800 flex justify-center items-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
           <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
        </div>
      </div>

      {/* Weekly Review Mock */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
        <h3 className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest mb-3 flex items-center gap-2">
           <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
           Weekly Review
        </h3>
        <p className="text-sm text-zinc-200 leading-relaxed">
          Your momentum this week is great. Your protein target is <span className="text-white font-medium">82%</span> completed. You are keeping your form in Bench Press, workout compliance is 100%! 
        </p>
        <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-zinc-800">
          💡 Keep calories steady next week, add some walking.
        </p>
      </div>

    </div>
  );
}
