
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, TrendingUp, TrendingDown, Minus, BookOpen } from 'lucide-react';
import { ExerciseTimer } from './ExerciseTimer';

interface ExerciseSet {
  reps: number;
  reality: number;
  weight: number;
  volume: number;
  previousWeekVolume?: number;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface DayWorkout {
  dayName: string;
  isOffDay: boolean;
  exercises: Exercise[];
}

interface WeeklyWorkoutViewProps {
  currentWeek: number;
}

export function WeeklyWorkoutView({ currentWeek }: WeeklyWorkoutViewProps) {
  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  
  // Current workout program name
  const currentProgramName = 'Giáo án giảm cân';
  
  // Mock data with previous week comparison
  const [weeklyWorkout, setWeeklyWorkout] = useState<DayWorkout[]>([
    {
      dayName: 'Thứ 2',
      isOffDay: false,
      exercises: [
        {
          name: 'Bench Press',
          sets: [
            { reps: 8, reality: 8, weight: 60, volume: 480, previousWeekVolume: 450 },
            { reps: 8, reality: 7, weight: 60, volume: 420, previousWeekVolume: 480 },
            { reps: 8, reality: 8, weight: 60, volume: 480, previousWeekVolume: 480 }
          ]
        },
        {
          name: 'Incline Dumbbell Press',
          sets: [
            { reps: 10, reality: 10, weight: 25, volume: 250, previousWeekVolume: 275 },
            { reps: 10, reality: 9, weight: 25, volume: 225, previousWeekVolume: 250 }
          ]
        }
      ]
    },
    {
      dayName: 'Thứ 3',
      isOffDay: true,
      exercises: []
    },
    {
      dayName: 'Thứ 4',
      isOffDay: false,
      exercises: [
        {
          name: 'Squat',
          sets: [
            { reps: 12, reality: 12, weight: 80, volume: 960, previousWeekVolume: 900 },
            { reps: 12, reality: 10, weight: 80, volume: 800, previousWeekVolume: 960 }
          ]
        }
      ]
    }
  ]);

  const [activeTimers, setActiveTimers] = useState<{[key: string]: boolean}>({});

  const updateSetData = (dayIndex: number, exerciseIndex: number, setIndex: number, field: 'reality' | 'weight', value: number) => {
    const updated = [...weeklyWorkout];
    const set = updated[dayIndex].exercises[exerciseIndex].sets[setIndex];
    set[field] = value;
    set.volume = set.reality * set.weight;
    setWeeklyWorkout(updated);
  };

  const getVolumeColor = (currentVolume: number, previousVolume?: number) => {
    if (!previousVolume) return '';
    if (currentVolume > previousVolume) return 'text-green-600 bg-green-50';
    if (currentVolume < previousVolume) return 'text-red-600 bg-red-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const getVolumeIcon = (currentVolume: number, previousVolume?: number) => {
    if (!previousVolume) return null;
    if (currentVolume > previousVolume) return <TrendingUp className="w-4 h-4" />;
    if (currentVolume < previousVolume) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const toggleTimer = (exerciseName: string, setIndex: number) => {
    const timerKey = `${exerciseName}-${setIndex}`;
    setActiveTimers(prev => ({
      ...prev,
      [timerKey]: !prev[timerKey]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Bài tập tuần {currentWeek}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span>Giáo án: {currentProgramName}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            {daysOfWeek.map((day, index) => (
              <TabsTrigger key={index} value={index.toString()} className="text-xs">
                {day}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {weeklyWorkout.map((day, dayIndex) => (
            <TabsContent key={dayIndex} value={dayIndex.toString()} className="mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{day.dayName}</h3>
                
                {day.isOffDay ? (
                  <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    <p className="text-lg">Ngày nghỉ</p>
                    <p className="text-sm">Hãy nghỉ ngơi và phục hồi</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-4">{exercise.name}</h4>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Set</th>
                                <th className="text-left p-2">Reps</th>
                                <th className="text-left p-2">Reality</th>
                                <th className="text-left p-2">Tạ (kg)</th>
                                <th className="text-left p-2">Volume</th>
                                <th className="text-left p-2">So sánh</th>
                                <th className="text-left p-2">Timer</th>
                              </tr>
                            </thead>
                            <tbody>
                              {exercise.sets.map((set, setIndex) => {
                                const timerKey = `${exercise.name}-${setIndex}`;
                                return (
                                  <tr key={setIndex} className="border-b">
                                    <td className="p-2">{setIndex + 1}</td>
                                    <td className="p-2">{set.reps}</td>
                                    <td className="p-2">
                                      <Input
                                        type="number"
                                        value={set.reality}
                                        onChange={(e) => updateSetData(dayIndex, exerciseIndex, setIndex, 'reality', parseInt(e.target.value))}
                                        min="0"
                                        className="w-16 h-8 text-sm"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <Input
                                        type="number"
                                        value={set.weight}
                                        onChange={(e) => updateSetData(dayIndex, exerciseIndex, setIndex, 'weight', parseFloat(e.target.value))}
                                        min="0"
                                        step="0.5"
                                        className="w-20 h-8 text-sm"
                                      />
                                    </td>
                                    <td className="p-2">
                                      <span className={`px-2 py-1 rounded text-sm font-medium ${getVolumeColor(set.volume, set.previousWeekVolume)}`}>
                                        {set.volume}
                                      </span>
                                    </td>
                                    <td className="p-2">
                                      <div className="flex items-center gap-1">
                                        {getVolumeIcon(set.volume, set.previousWeekVolume)}
                                        {set.previousWeekVolume && (
                                          <span className="text-xs text-gray-500">
                                            {set.previousWeekVolume}
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <Button
                                        onClick={() => toggleTimer(exercise.name, setIndex)}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs px-2 py-1"
                                      >
                                        {activeTimers[timerKey] ? 'Ẩn' : 'Timer'}
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        
                        {/* Show active timers */}
                        {exercise.sets.map((set, setIndex) => {
                          const timerKey = `${exercise.name}-${setIndex}`;
                          return activeTimers[timerKey] && (
                            <ExerciseTimer 
                              key={timerKey}
                              exerciseName={exercise.name} 
                              setNumber={setIndex + 1} 
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
