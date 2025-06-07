
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Users, FileText, Dumbbell, Apple, Plus, Home, Edit, Minus } from 'lucide-react';
import { CreateAccountModal } from '@/components/admin/CreateAccountModal';
import { CreatePostModal } from '@/components/admin/CreatePostModal';
import { AssignWorkoutModal } from '@/components/admin/AssignWorkoutModal';
import { CreateMealPlanModal } from '@/components/admin/CreateMealPlanModal';
import { HomepageContentModal } from '@/components/admin/HomepageContentModal';

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Mock data for clients
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'client1@example.com',
      workoutPlan: 'Giáo án giảm cân',
      startDate: '2024-06-01',
      totalSessions: 12,
      sessionsPerWeek: 3,
      sessionsCompleted: 6
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'client2@example.com',
      workoutPlan: 'Giáo án tăng cơ',
      startDate: '2024-05-15',
      totalSessions: 16,
      sessionsPerWeek: 4,
      sessionsCompleted: 10
    }
  ]);

  const calculateRemainingDays = (startDate: string, totalSessions: number, sessionsPerWeek: number, sessionsCompleted: number) => {
    const start = new Date(startDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const weeksElapsed = Math.floor(daysDiff / 7);
    const expectedSessions = Math.min(weeksElapsed * sessionsPerWeek, totalSessions);
    const remainingSessions = totalSessions - Math.max(sessionsCompleted, expectedSessions);
    return Math.max(0, remainingSessions);
  };

  const updateTotalSessions = (clientId: number, change: number) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, totalSessions: Math.max(1, client.totalSessions + change) }
        : client
    ));
  };

  const stats = [
    { title: 'Tổng khách hàng', value: clients.length.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Bài viết', value: '12', icon: FileText, color: 'text-green-600' },
    { title: 'Bài tập active', value: '36', icon: Dumbbell, color: 'text-purple-600' },
    { title: 'Meal plans', value: '18', icon: Apple, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Quản lý khách hàng và nội dung</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
            <TabsTrigger value="posts">Bài viết</TabsTrigger>
            <TabsTrigger value="workouts">Bài tập</TabsTrigger>
            <TabsTrigger value="meals">Meal Plans</TabsTrigger>
            <TabsTrigger value="homepage">Trang chủ</TabsTrigger>
          </TabsList>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quản lý khách hàng</h2>
              <Button 
                onClick={() => setActiveModal('create-account')}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo tài khoản
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên khách hàng</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Giáo án</TableHead>
                      <TableHead>Ngày bắt đầu</TableHead>
                      <TableHead>Tổng số buổi PT</TableHead>
                      <TableHead>Buổi/tuần</TableHead>
                      <TableHead>Số buổi còn lại</TableHead>
                      <TableHead>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.workoutPlan}</TableCell>
                        <TableCell>{new Date(client.startDate).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateTotalSessions(client.id, -1)}
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="min-w-[2rem] text-center">{client.totalSessions}</span>
                            <Button
                              onClick={() => updateTotalSessions(client.id, 1)}
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{client.sessionsPerWeek}</TableCell>
                        <TableCell className="font-semibold text-blue-600">
                          {calculateRemainingDays(client.startDate, client.totalSessions, client.sessionsPerWeek, client.sessionsCompleted)}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3 mr-1" />
                            Sửa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quản lý bài viết</h2>
              <Button 
                onClick={() => setActiveModal('create-post')}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo bài viết
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">5 bài tập ngực hiệu quả nhất</h4>
                      <p className="text-sm text-gray-600">Đăng ngày 15/12/2024</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Sửa</Button>
                      <Button variant="outline" size="sm">Xóa</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assign bài tập</h2>
              <Button 
                onClick={() => setActiveModal('assign-workout')}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Assign bài tập
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Chương trình ngực - Nguyễn Văn A</h4>
                      <p className="text-sm text-gray-600">Tuần 1 - 5 ngày/tuần</p>
                    </div>
                    <Button variant="outline" size="sm">Xem chi tiết</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meal Plans Tab */}
          <TabsContent value="meals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Meal Plans</h2>
              <Button 
                onClick={() => setActiveModal('create-meal-plan')}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo meal plan
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Meal plan giảm cân - Nguyễn Văn A</h4>
                      <p className="text-sm text-gray-600">1800 calories/ngày</p>
                    </div>
                    <Button variant="outline" size="sm">Xem chi tiết</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Homepage Content Tab */}
          <TabsContent value="homepage" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quản lý nội dung trang chủ</h2>
              <Button 
                onClick={() => setActiveModal('homepage-content')}
                className="bg-fitness-primary hover:bg-fitness-secondary"
              >
                <Home className="w-4 h-4 mr-2" />
                Chỉnh sửa trang chủ
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Hero Section</h4>
                      <p className="text-sm text-gray-600">Tiêu đề chính và mô tả giới thiệu</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Phần giới thiệu</h4>
                      <p className="text-sm text-gray-600">Thông tin về PT và thống kê</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Testimonials</h4>
                      <p className="text-sm text-gray-600">Phản hồi từ khách hàng</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Video hướng dẫn</h4>
                      <p className="text-sm text-gray-600">Video từ YouTube</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {activeModal === 'create-account' && (
        <CreateAccountModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'create-post' && (
        <CreatePostModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'assign-workout' && (
        <AssignWorkoutModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'create-meal-plan' && (
        <CreateMealPlanModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'homepage-content' && (
        <HomepageContentModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
