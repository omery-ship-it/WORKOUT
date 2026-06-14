import { useState, useEffect } from 'react';
import { WORKOUT_DAYS } from '../data/seed';
import { DailyLog } from '../types';
import { Timer as TimerIcon, Info, CheckCircle2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function WorkoutView({ logs, updateSetLog }: { logs: DailyLog, updateSetLog: any }) {
  const [activeDayId, setActiveDayId] = useState(WORKOUT_DAYS[0].id);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const activeWorkout = WORKOUT_DAYS.find(w => w.id === activeDayId) || WORKOUT_DAYS[0];

  const [activeBlockIndex, setActiveBlockIndex] = useState(0);

  // Reset block index when changing days
  useEffect(() => {
    setActiveBlockIndex(0);
  }, [activeDayId]);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer <= 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const startTimer = (seconds: number) => {
    setTimer(seconds);
    setIsTimerActive(true);
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

  const activeBlock = activeWorkout.blocks[activeBlockIndex];
  const totalBlocks = activeWorkout.blocks.length;

  return (
    <div className="p-4 flex flex-col h-full overflow-y-auto scrollbar-none">
      
      {/* Day Selector & Progress */}
      <div className="flex items-center gap-3 pb-3 shrink-0 sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10 pt-2 -mt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1">
          {WORKOUT_DAYS.map(day => (
             <button 
               key={day.id}
               onClick={() => setActiveDayId(day.id)}
               className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shadow-sm ${activeDayId === day.id ? 'bg-indigo-600 text-white' : 'bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
             >
               {day.name}
             </button>
          ))}
        </div>
        <div className="text-[11px] font-mono tracking-widest text-zinc-300 shrink-0 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-md shadow-sm">
           {activeBlockIndex + 1}<span className="text-zinc-600">/{totalBlocks}</span>
        </div>
      </div>

      <div className="flex flex-col shrink-0 pb-4">
        {activeBlock && (
          activeBlock.type === 'single' ? (
            <ExerciseCard key={activeBlock.id} item={activeBlock} logs={logs} updateSetLog={updateSetLog} startTimer={startTimer} timer={timer} formatTime={formatTime} />
          ) : (
            <div key={activeBlock.id} className="relative bg-zinc-900 border border-orange-900/40 rounded-xl overflow-hidden p-1 group shadow-none flex flex-col shrink-0">
               <div className="flex items-center justify-between px-2 pt-2 pb-1.5 shrink-0">
                 <span className="text-[9px] text-orange-500 uppercase font-mono tracking-widest px-2 py-1 bg-orange-500/10 rounded">{activeBlock.name} ({activeBlock.type})</span>
                 <div className="flex items-center gap-2">
                   {timer > 0 && (
                      <div className="px-2 py-0.5 bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 rounded-full flex items-center gap-1 font-mono text-[9px] shadow-sm">
                        <TimerIcon className="w-3 h-3" />
                        {formatTime(timer)}
                      </div>
                   )}
                 </div>
               </div>
               <div className="space-y-1.5 px-0.5 pb-1">
                 {activeBlock.exercises?.map((ex: any) => <ExerciseCard key={ex.id} item={ex} logs={logs} updateSetLog={updateSetLog} startTimer={startTimer} isGrouped timer={timer} formatTime={formatTime} />)}
               </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Nav for Next/Back */}
      <div className="mt-4 pt-4 flex gap-3 shrink-0 border-t border-zinc-800/50 pb-6">
        <button
          disabled={activeBlockIndex === 0}
          onClick={() => setActiveBlockIndex(prev => prev - 1)}
          className="flex-1 py-3 rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all text-sm"
        >
          Previous
        </button>
        <button
          disabled={activeBlockIndex === totalBlocks - 1}
          onClick={() => setActiveBlockIndex(prev => prev + 1)}
          className="flex-[2] py-3 rounded-xl border border-indigo-600 bg-indigo-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg shadow-indigo-600/20 text-sm"
        >
          {activeBlockIndex === totalBlocks - 1 ? 'Finish' : 'Next Exercise'}
        </button>
      </div>

    </div>
  );
}

function ExerciseCard({ item, logs, updateSetLog, startTimer, isGrouped = false, timer, formatTime }: any) {
  const targetReps = typeof item.reps === 'string' ? item.reps.split('-') : Array(item.sets).fill(item.reps);
  
  const exLogs = logs.logs[item.id] || [];
  
  // Calculate if all sets are done
  const completedSets = exLogs.reduce((acc: number, log: any) => acc + (log && log.weight && log.reps ? 1 : 0), 0);
  const isFullyDone = completedSets === item.sets;

  return (
    <div className={`border flex flex-col ${isGrouped ? 'border-none bg-zinc-900 rounded-xl px-0' : 'border-zinc-800 bg-zinc-900 rounded-xl'} overflow-hidden transition-all shadow-sm shrink-0 ${isFullyDone && !isGrouped ? 'border-green-500/30' : ''}`}>
      <div 
        className="px-3 py-2 flex justify-between items-start transition-colors shrink-0"
      >
        <div className="flex items-start gap-2.5">
          {isFullyDone && (
             <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
             </div>
          )}
          <div>
            <h3 className={`text-[13px] font-medium tracking-tight transition-colors ${isFullyDone ? 'text-green-500' : 'text-zinc-100'} leading-tight`}>{item.name}</h3>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.sets} Sets × {item.reps} Reps</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {timer > 0 && !isGrouped && (
            <div className="px-2 py-0.5 bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 rounded-full flex items-center gap-1 font-mono text-[9px] shadow-sm">
              <TimerIcon className="w-2.5 h-2.5" />
              {formatTime(timer)}
            </div>
          )}
        </div>
      </div>

      <div className="px-2 pb-2.5 space-y-1">
        <div className="flex items-center justify-between px-1 mb-0.5 text-zinc-500">
            <div className="flex gap-4"></div>
            {item.lastWeight && <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400">Prev: <span className="text-zinc-200">{item.lastWeight} kg</span></span>}
          </div>

          <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 text-[9px] uppercase font-mono text-zinc-500 mb-0.5 px-0.5 tracking-wider">
            <span className="w-5 text-center">Set</span>
            <span className="pl-1.5">KG</span>
            <span className="pl-1.5">Reps</span>
            <span className="w-9 text-center text-zinc-400">Done</span>
          </div>

          {[...Array(item.sets)].map((_, idx) => {
            const currentLog = exLogs[idx] || { weight: '', reps: '' };
            const isDone = currentLog.weight && currentLog.reps;
            const targetRepText = targetReps[idx] || targetReps[0];
            
            const prevWeightRecord = idx > 0 ? exLogs[idx - 1]?.weight : item.lastWeight;
            const placeholderWeight = prevWeightRecord || '-';

            const handleWeightBlur = (e: any) => {
               if(e.target.value === '' && placeholderWeight !== '-') {
                 updateSetLog(item.id, idx, { ...currentLog, weight: placeholderWeight.toString() });
               }
            };

            const handleRepsBlur = (e: any) => {
               if(e.target.value === '' && targetRepText) {
                 updateSetLog(item.id, idx, { ...currentLog, reps: targetRepText.toString() });
               }
            };

            return (
              <div key={idx} className={`grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center py-0.5 px-1 rounded-lg transition-colors ${isDone ? 'bg-green-500/10 ring-1 ring-green-500/20' : 'bg-zinc-950/30'}`}>
                <span className={`w-5 text-center text-[10px] font-mono flex justify-center items-center ${isDone ? 'text-green-500 font-bold tracking-tighter' : 'text-zinc-400'}`}>
                  {isDone ? <CheckCircle2 className="w-3 h-3"/> : idx + 1}
                </span>
                
                <input 
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  placeholder={placeholderWeight.toString()}
                  value={currentLog.weight}
                  onBlur={handleWeightBlur}
                  onChange={e => updateSetLog(item.id, idx, { ...currentLog, weight: e.target.value })}
                  className={`w-full bg-zinc-800 border h-7 ${isDone ? 'border-green-500/50 text-green-400 font-bold' : 'border-zinc-700 text-zinc-100 font-medium'} rounded-[4px] px-1 py-0.5 text-[12px] focus:outline-none focus:border-indigo-600 transition-colors text-center`} 
                />
                
                <input 
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  placeholder={targetRepText}
                  value={currentLog.reps}
                  onBlur={handleRepsBlur}
                  onChange={e => updateSetLog(item.id, idx, { ...currentLog, reps: e.target.value })}
                  className={`w-full bg-zinc-800 border h-7 ${isDone ? 'border-green-500/50 text-green-400 font-bold' : 'border-zinc-700 text-zinc-100 font-medium'} rounded-[4px] px-1 py-0.5 text-[12px] focus:outline-none focus:border-indigo-600 transition-colors text-center`} 
                />

                <button 
                  onClick={() => {
                    const weightVal = currentLog.weight || placeholderWeight.toString() || '0';
                    const repsVal = currentLog.reps || targetRepText.toString() || '0';
                    
                    if (isDone) {
                       updateSetLog(item.id, idx, { weight: '', reps: '' });
                    } else {
                       updateSetLog(item.id, idx, { weight: weightVal, reps: repsVal });
                       startTimer(90); // Auto-start rest timer
                    }
                  }} 
                  className={`w-8 h-7 flex justify-center items-center rounded-[4px] border transition-all ${isDone ? 'bg-green-500 text-white border-green-500 shadow-md shadow-green-500/20' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-green-500 hover:text-green-500 active:scale-95'}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
    </div>
  );
}
