
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ExerciseTimerProps {
  exerciseName: string;
  setNumber: number;
}

export function ExerciseTimer({ exerciseName, setNumber }: ExerciseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handleTimeChange = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-3 mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Timer - {exerciseName} (Set {setNumber})</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(min => (
            <Button
              key={min}
              onClick={() => handleTimeChange(min)}
              variant={initialTime === min * 60 ? "default" : "outline"}
              size="sm"
              className="px-2 py-1 text-xs"
            >
              {min}m
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className={`text-2xl font-mono font-bold ${timeLeft <= 30 && timeLeft > 0 ? 'text-red-600' : timeLeft === 0 ? 'text-red-700 animate-pulse' : 'text-gray-800'}`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-1">
          <Button
            onClick={handleStart}
            size="sm"
            variant="outline"
            className="px-2"
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </Button>
          
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="px-2"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {timeLeft === 0 && (
        <div className="mt-2 text-sm text-red-600 font-medium animate-pulse">
          ⏰ Hết thời gian nghỉ!
        </div>
      )}
    </div>
  );
}
