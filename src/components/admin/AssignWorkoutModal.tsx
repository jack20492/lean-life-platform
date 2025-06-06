
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus } from 'lucide-react';

interface AssignWorkoutModalProps {
  onClose: () => void;
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
}

export function AssignWorkoutModal({ onClose }: AssignWorkoutModalProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    weekNumber: 1,
    daysPerWeek: 5,
  });
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: 3, reps: '8-10', weight: '' }
  ]);
  const { toast } = useToast();

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: '8-10', weight: '' }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const updated = exercises.map((ex, i) => 
      i === index ? { ...ex, [field]: value } : ex
    );
    setExercises(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Assign bài tập thành công!",
      description: `Đã giao bài tập tuần ${formData.weekNumber} cho khách hàng.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
              <label className="block text-sm font-medium mb-2">Số ngày/tuần</label>
              <Input
                type="number"
                value={formData.daysPerWeek}
                onChange={(e) => setFormData({...formData, daysPerWeek: parseInt(e.target.value)})}
                min="1"
                max="7"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Bài tập</h3>
              <Button type="button" onClick={addExercise} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Thêm bài tập
              </Button>
            </div>
            
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-5 gap-4 items-end">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">Tên bài tập</label>
                        <Input
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, 'name', e.target.value)}
                          placeholder="VD: Bench Press"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Sets</label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                          min="1"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Reps</label>
                        <Input
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          placeholder="8-10"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Tạ (kg)</label>
                        <div className="flex gap-2">
                          <Input
                            value={exercise.weight}
                            onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                            placeholder="60"
                            required
                          />
                          {exercises.length > 1 && (
                            <Button 
                              type="button" 
                              onClick={() => removeExercise(index)}
                              variant="outline" 
                              size="sm"
                              className="px-2"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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
