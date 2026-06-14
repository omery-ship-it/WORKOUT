import { NUTRITION_TARGETS, MEALS } from '../data/seed';
import { DailyLog } from '../types';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function NutritionView({ logs, toggleMeal }: { logs: DailyLog, toggleMeal: (id: string) => void }) {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  
  return (
    <div className="p-6 space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-light tracking-tight text-white">Daily Nutrition</h2>
        <p className="text-sm text-zinc-400">Check off meals to hit your macros.</p>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-4 gap-2">
        {[
           { label: 'CAL', val: NUTRITION_TARGETS.calories, color: 'text-white' },
           { label: 'PRO', val: NUTRITION_TARGETS.protein, color: 'text-indigo-400' },
           { label: 'CARB', val: NUTRITION_TARGETS.carbs, color: 'text-orange-500' },
           { label: 'FAT', val: NUTRITION_TARGETS.fat, color: 'text-zinc-500' },
        ].map(m => (
          <div key={m.label} className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col p-3 items-center justify-center">
            <span className="text-[9px] text-zinc-500 uppercase font-mono mb-1">{m.label}</span>
            <span className={`text-sm font-semibold ${m.color}`}>{Math.round(m.val)}</span>
          </div>
        ))}
      </div>

      {/* Meal List */}
      <div className="space-y-3">
        {MEALS.map(meal => {
          const isDone = logs.completedMeals.includes(meal.id);
          const isExpanded = expandedMeal === meal.id;

          return (
            <div 
              key={meal.id} 
              className={`rounded-2xl border transition-all ${isDone ? 'bg-indigo-600/5 border-indigo-600/30' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}
            >
              <div 
                onClick={() => setExpandedMeal(isExpanded ? null : meal.id)}
                className="flex items-center gap-4 p-4 cursor-pointer"
              >
                {/* Visual indicator (not the actual checkout button, but shows state) */}
                <div 
                  onClick={(e) => { e.stopPropagation(); toggleMeal(meal.id); }}
                  className={`w-8 h-8 shrink-0 rounded-full border-2 flex justify-center items-center transition-colors shadow-sm cursor-pointer ${isDone ? 'bg-indigo-600 border-indigo-600' : 'bg-zinc-800 border-zinc-700 hover:border-indigo-600/60'}`}
                >
                   {isDone && <Check className="w-5 h-5 text-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1 text-white">
                    <span className="text-[15px] font-medium tracking-tight">{meal.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono border border-zinc-700 px-2 py-0.5 bg-zinc-800 rounded uppercase">{meal.time}</span>
                  </div>
                  <p className={`text-xs pr-4 ${isDone ? 'text-zinc-400' : 'text-zinc-500'} line-clamp-1`}>{meal.summary}</p>
                </div>

                <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-zinc-800/50">
                  <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-mono uppercase text-zinc-400 tracking-widest">Detail</span>
                      {meal.cals > 0 && (
                         <div className="flex gap-2 text-[10px] font-mono text-zinc-500">
                           <span>{meal.p}g P</span>
                           <span>{meal.c}g C</span>
                           <span>{meal.f}g F</span>
                           <span className="text-white ml-1">{meal.cals} kcal</span>
                         </div>
                      )}
                    </div>
                    
                    <ul className="space-y-2">
                       {meal.items?.map((item, idx) => (
                         <li key={idx} className="text-sm text-zinc-200 flex items-start gap-2 before:content-['•'] before:text-indigo-400">
                           {item}
                         </li>
                       ))}
                    </ul>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleMeal(meal.id); setExpandedMeal(null); }}
                      className={`w-full mt-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDone ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' : 'bg-indigo-600 text-white hover:bg-indigo-600/90'}`}
                    >
                      {isDone ? 'Mark as Incomplete' : 'Finish Meal'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
