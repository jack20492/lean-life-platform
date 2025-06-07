import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface AssignWorkoutModalProps {
  onClose: () => void;
}

interface ExerciseSet {
  reps: number;
  weight: number;
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

interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
}

export function AssignWorkoutModal({ onClose }: AssignWorkoutModalProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    weekNumber: 1,
    programName: '',
  });

  // Mock workout programs
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([
    { id: '1', name: 'Giáo án giảm cân', description: 'Tập trung vào cardio và giảm mỡ' },
    { id: '2', name: 'Giáo án tăng cơ', description: 'Tập trung vào tăng khối lượng cơ bắp' },
    { id: '3', name: 'Giáo án siết cơ', description: 'Tập trung vào định hình và siết cơ' },
  ]);

  const [newProgramName, setNewProgramName] = useState('');
  const [showAddProgram, setShowAddProgram] = useState(false);

  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  
  const [weeklyWorkout, setWeeklyWorkout] = useState<DayWorkout[]>(
    daysOfWeek.map(day => ({
      dayName: day,
      isOffDay: false,
      exercises: [{ name: '', sets: [{ reps: 8, weight: 0 }] }]
    }))
  );

  const { toast } = useToast();

  const addWorkoutProgram = () => {
    if (newProgramName.trim()) {
      const newProgram: WorkoutProgram = {
        id: Date.now().toString(),
        name: newProgramName.trim(),
        description: 'Giáo án tùy chỉnh'
      };
      setWorkoutPrograms([...workoutPrograms, newProgram]);
      setFormData({...formData, programName: newProgram.name});
      setNewProgramName('');
      setShowAddProgram(false);
      toast({
        title: "Thêm giáo án thành công!",
        description: `Đã thêm giáo án: ${newProgram.name}`,
      });
    }
  };

  const deleteWorkoutProgram = (programId: string) => {
    setWorkoutPrograms(workoutPrograms.filter(p => p.id !== programId));
    if (formData.programName === workoutPrograms.find(p => p.id === programId)?.name) {
      setFormData({...formData, programName: ''});
    }
    toast({
      title: "Xóa giáo án thành công!",
      description: "Giáo án đã được xóa khỏi danh sách.",
    });
  };

  const toggleOffDay = (dayIndex: number) => {
    const updated = [...weeklyWorkout];
    updated[dayIndex].isOffDay = !updated[dayIndex].isOffDay;
    setWeeklyWorkout(updated);
  };

  const addExercise = (dayIndex: number) => {
    const updated = [...weeklyWorkout];
    updated[dayIndex].exercises.push({ name: '', sets: [{ reps: 8, weight: 0 }] });
    setWeeklyWorkout(updated);
  };

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updated = [...weeklyWorkout];
    updated[dayIndex].exercises = updated[dayIndex].exercises.filter((_, i) => i !== exerciseIndex);
    setWeeklyWorkout(updated);
  };

  const updateExerciseName = (dayIndex: number, exerciseIndex: number, name: string) => {
    const updated = [...weeklyWorkout];
    updated[dayIndex].exercises[exerciseIndex].name = name;
    setWeeklyWorkout(updated);
  };

  const addSet = (dayIndex: number, exerciseIndex: number) => {
    const updated = [...weeklyWorkout];
    if (updated[dayIndex].exercises[exerciseIndex].sets.length < 4) {
      updated[dayIndex].exercises[exerciseIndex].sets.push({ reps: 8, weight: 0 });
      setWeeklyWorkout(updated);
    }
  };

  const removeSet = (dayIndex: number, exerciseIndex: number, setIndex: number) => {
    const updated = [...weeklyWorkout];
    if (updated[dayIndex].exercises[exerciseIndex].sets.length > 1) {
      updated[dayIndex].exercises[exerciseIndex].sets = updated[dayIndex].exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
      setWeeklyWorkout(updated);
    }
  };

  const updateSet = (dayIndex: number, exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
    const updated = [...weeklyWorkout];
    updated[dayIndex].exercises[exerciseIndex].sets[setIndex][field] = value;
    setWeeklyWorkout(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.programName) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng chọn hoặc tạo giáo án.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Assign bài tập thành công!",
      description: `Đã giao bài tập tuần ${formData.weekNumber} (${formData.programName}) cho khách hàng.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign bài tập cho khách hàng</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Khách hàng</label>
              <Select value={formData.clientId} onValueChange={(value) => setFormData({...formData, clientId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khách hàng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Nguyễn Văn A</SelectItem>
                  <SelectItem value="2">Trần Thị B</SelectItem>
                  <SelectItem value="3">Lê Văn C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tuần số</label>
              <Input
                type="number"
                value={formData.weekNumber}
                onChange={(e) => setFormData({...formData, weekNumber: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Giáo án</label>
              <div className="flex gap-2">
                <Select value={formData.programName} onValueChange={(value) => setFormData({...formData, programName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giáo án" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutPrograms.map((program) => (
                      <SelectItem key={program.id} value={program.name}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={() => setShowAddProgram(!showAddProgram)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {showAddProgram && (
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Tên giáo án mới</label>
                    <Input
                      value={newProgramName}
                      onChange={(e) => setNewProgramName(e.target.value)}
                      placeholder="VD: Giáo án tăng cân"
                    />
                  </div>
                  <Button type="button" onClick={addWorkoutProgram} size="sm">
                    Thêm
                  </Button>
                  <Button type="button" onClick={() => setShowAddProgram(false)} variant="outline" size="sm">
                    Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Quản lý giáo án</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {workoutPrograms.map((program) => (
                <div key={program.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium text-sm">{program.name}</span>
                    <p className="text-xs text-gray-500">{program.description}</p>
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => deleteWorkoutProgram(program.id)}
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Lịch tập trong tuần</h3>
            
            <div className="space-y-6">
              {weeklyWorkout.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium">{day.dayName}</h4>
                      <div className="flex items-center gap-2">
                        <label className="text-sm">Ngày nghỉ:</label>
                        <input
                          type="checkbox"
                          checked={day.isOffDay}
                          onChange={() => toggleOffDay(dayIndex)}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    
                    {!day.isOffDay && (
                      <div className="space-y-4">
                        {day.exercises.map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                              <Input
                                value={exercise.name}
                                onChange={(e) => updateExerciseName(dayIndex, exerciseIndex, e.target.value)}
                                placeholder="Tên bài tập"
                                className="max-w-md"
                                required
                              />
                              {day.exercises.length > 1 && (
                                <Button 
                                  type="button" 
                                  onClick={() => removeExercise(dayIndex, exerciseIndex)}
                                  variant="outline" 
                                  size="sm"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-600">
                                <span>Set</span>
                                <span>Reps</span>
                                <span>Tạ (kg)</span>
                                <span>Thao tác</span>
                              </div>
                              
                              {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex} className="grid grid-cols-4 gap-2 items-center">
                                  <span className="text-sm">{setIndex + 1}</span>
                                  <Input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => updateSet(dayIndex, exerciseIndex, setIndex, 'reps', parseInt(e.target.value))}
                                    min="1"
                                    className="text-sm"
                                    required
                                  />
                                  <Input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => updateSet(dayIndex, exerciseIndex, setIndex, 'weight', parseFloat(e.target.value))}
                                    min="0"
                                    step="0.5"
                                    className="text-sm"
                                    required
                                  />
                                  <div className="flex gap-1">
                                    {exercise.sets.length < 4 && (
                                      <Button 
                                        type="button" 
                                        onClick={() => addSet(dayIndex, exerciseIndex)}
                                        variant="outline" 
                                        size="sm"
                                        className="px-2"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                    )}
                                    {exercise.sets.length > 1 && (
                                      <Button 
                                        type="button" 
                                        onClick={() => removeSet(dayIndex, exerciseIndex, setIndex)}
                                        variant="outline" 
                                        size="sm"
                                        className="px-2"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          type="button" 
                          onClick={() => addExercise(dayIndex)}
                          variant="outline" 
                          size="sm"
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm bài tập
                        </Button>
                      </div>
                    )}
                    
                    {day.isOffDay && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Ngày nghỉ</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" className="flex-1 bg-fitness-primary hover:bg-fitness-secondary">
              Assign bài tập
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
