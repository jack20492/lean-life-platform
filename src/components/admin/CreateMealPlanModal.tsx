
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus } from 'lucide-react';

interface CreateMealPlanModalProps {
  onClose: () => void;
}

interface Meal {
  name: string;
  calories: number;
  foods: string[];
}

export function CreateMealPlanModal({ onClose }: CreateMealPlanModalProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    totalCalories: 1800,
    goal: 'weight-loss' as 'weight-loss' | 'weight-gain' | 'maintain'
  });
  const [meals, setMeals] = useState<Meal[]>([
    { name: 'Sáng', calories: 400, foods: [''] },
    { name: 'Trưa', calories: 600, foods: [''] },
    { name: 'Tối', calories: 500, foods: [''] },
    { name: 'Phụ', calories: 300, foods: [''] }
  ]);
  const { toast } = useToast();

  const addFood = (mealIndex: number) => {
    const updated = meals.map((meal, i) => 
      i === mealIndex ? { ...meal, foods: [...meal.foods, ''] } : meal
    );
    setMeals(updated);
  };

  const removeFood = (mealIndex: number, foodIndex: number) => {
    const updated = meals.map((meal, i) => 
      i === mealIndex ? { 
        ...meal, 
        foods: meal.foods.filter((_, fi) => fi !== foodIndex) 
      } : meal
    );
    setMeals(updated);
  };

  const updateFood = (mealIndex: number, foodIndex: number, value: string) => {
    const updated = meals.map((meal, i) => 
      i === mealIndex ? {
        ...meal,
        foods: meal.foods.map((food, fi) => fi === foodIndex ? value : food)
      } : meal
    );
    setMeals(updated);
  };

  const updateMeal = (mealIndex: number, field: keyof Meal, value: string | number) => {
    const updated = meals.map((meal, i) => 
      i === mealIndex ? { ...meal, [field]: value } : meal
    );
    setMeals(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Tạo meal plan thành công!",
      description: `Đã tạo meal plan ${formData.totalCalories} calories cho khách hàng.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo meal plan cho khách hàng</DialogTitle>
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
              <label className="block text-sm font-medium mb-2">Tổng calories</label>
              <Input
                type="number"
                value={formData.totalCalories}
                onChange={(e) => setFormData({...formData, totalCalories: parseInt(e.target.value)})}
                min="1000"
                max="4000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mục tiêu</label>
              <Select value={formData.goal} onValueChange={(value: any) => setFormData({...formData, goal: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight-loss">Giảm cân</SelectItem>
                  <SelectItem value="weight-gain">Tăng cân</SelectItem>
                  <SelectItem value="maintain">Duy trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Chi tiết bữa ăn</h3>
            
            <div className="space-y-4">
              {meals.map((meal, mealIndex) => (
                <Card key={mealIndex}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Bữa ăn</label>
                        <Input
                          value={meal.name}
                          onChange={(e) => updateMeal(mealIndex, 'name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Calories</label>
                        <Input
                          type="number"
                          value={meal.calories}
                          onChange={(e) => updateMeal(mealIndex, 'calories', parseInt(e.target.value))}
                          min="0"
                          required
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <Button 
                          type="button" 
                          onClick={() => addFood(mealIndex)}
                          variant="outline" 
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm món
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Món ăn</label>
                      {meal.foods.map((food, foodIndex) => (
                        <div key={foodIndex} className="flex gap-2">
                          <Input
                            value={food}
                            onChange={(e) => updateFood(mealIndex, foodIndex, e.target.value)}
                            placeholder="VD: Ức gà nướng 150g"
                            required
                          />
                          {meal.foods.length > 1 && (
                            <Button 
                              type="button" 
                              onClick={() => removeFood(mealIndex, foodIndex)}
                              variant="outline" 
                              size="sm"
                              className="px-2"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
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
              Tạo meal plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
