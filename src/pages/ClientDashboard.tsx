
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Apple, TrendingUp, Calendar } from 'lucide-react';

const ClientDashboard = () => {
  const [currentWeight, setCurrentWeight] = useState(70);
  
  const weeklyWorkout = {
    week: 1,
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', weight: '60kg', volume: '240kg' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '25kg', volume: '225kg' },
      { name: 'Dips', sets: 3, reps: '12-15', weight: 'Bodyweight', volume: '0kg' },
      { name: 'Push-ups', sets: 2, reps: '15-20', weight: 'Bodyweight', volume: '0kg' }
    ]
  };

  const mealPlan = {
    totalCalories: 1800,
    meals: [
      { name: 'Sáng', calories: 400, foods: ['Yến mạch với chuối', 'Trứng luộc', 'Cà phê đen'] },
      { name: 'Trưa', calories: 600, foods: ['Cơm gạo lứt', 'Ức gà nướng', 'Rau xanh'] },
      { name: 'Chiều', calories: 200, foods: ['Protein shake', 'Chuối'] },
      { name: 'Tối', calories: 500, foods: ['Cá hồi nướng', 'Khoai lang', 'Salad'] },
      { name: 'Phụ', calories: 100, foods: ['Hạnh nhân', 'Nước'] }
    ]
  };

  const weightHistory = [
    { date: '01/12', weight: 72 },
    { date: '08/12', weight: 71.5 },
    { date: '15/12', weight: 70.8 },
    { date: '22/12', weight: 70 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard của bạn</h1>
          <p className="text-gray-600">Theo dõi tiến độ và hoàn thành mục tiêu</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cân nặng hiện tại</p>
                  <p className="text-2xl font-bold text-gray-800">{currentWeight}kg</p>
                  <p className="text-sm text-green-600">-2kg từ đầu tháng</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tuần tập này</p>
                  <p className="text-2xl font-bold text-gray-800">4/5</p>
                  <p className="text-sm text-gray-600">ngày đã tập</p>
                </div>
                <Dumbbell className="w-8 h-8 text-fitness-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Calories hôm nay</p>
                  <p className="text-2xl font-bold text-gray-800">1620</p>
                  <p className="text-sm text-gray-600">/ 1800 cal</p>
                </div>
                <Apple className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workout">Bài tập</TabsTrigger>
            <TabsTrigger value="meals">Meal Plan</TabsTrigger>
            <TabsTrigger value="progress">Tiến độ</TabsTrigger>
          </TabsList>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Bài tập tuần {weeklyWorkout.week}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{exercise.weight}</p>
                        <p className="text-sm text-gray-600">Volume: {exercise.volume}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Hoàn thành
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meals Tab */}
          <TabsContent value="meals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Plan hôm nay ({mealPlan.totalCalories} calories)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mealPlan.meals.map((meal, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{meal.name}</h4>
                        <span className="text-sm font-medium text-fitness-primary">
                          {meal.calories} cal
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {meal.foods.join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-fitness-light rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Tiến độ calories hôm nay</span>
                    <span className="text-sm">1620 / 1800 cal</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theo dõi cân nặng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weightHistory.map((record, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <span className="text-sm text-gray-600">{record.date}</span>
                        <span className="font-medium">{record.weight}kg</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-1">Tiến độ tuyệt vời!</h4>
                    <p className="text-sm text-green-600">
                      Bạn đã giảm được 2kg trong tháng này. Hãy tiếp tục duy trì!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mục tiêu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Giảm cân (68kg)</span>
                        <span className="text-sm">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Tập luyện (20 ngày/tháng)</span>
                        <span className="text-sm">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Chế độ ăn</span>
                        <span className="text-sm">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
