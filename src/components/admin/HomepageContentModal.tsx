
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Upload } from 'lucide-react';

interface HomepageContentModalProps {
  onClose: () => void;
}

interface Testimonial {
  name: string;
  content: string;
  image?: string;
}

interface Video {
  title: string;
  videoId: string;
}

export function HomepageContentModal({ onClose }: HomepageContentModalProps) {
  const [heroContent, setHeroContent] = useState({
    title: 'Personal Trainer Chuyên Nghiệp',
    description: 'Hơn 5 năm kinh nghiệm trong việc giúp khách hàng đạt được mục tiêu fitness. Chương trình tập luyện và dinh dưỡng được cá nhân hóa cho từng người.'
  });

  const [aboutContent, setAboutContent] = useState({
    title: 'Về Personal Trainer',
    description: 'Tôi là một Personal Trainer với hơn 5 năm kinh nghiệm trong lĩnh vực fitness và dinh dưỡng. Tôi đã giúp hơn 200 khách hàng đạt được mục tiêu của họ, từ giảm cân, tăng cân, đến xây dựng cơ bắp.',
    clients: '200+',
    experience: '5+',
    successRate: '95%'
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      name: 'Nguyễn Văn A',
      content: 'Đã giảm được 15kg trong 3 tháng với chương trình tập luyện khoa học!',
      image: '/placeholder.svg'
    },
    {
      name: 'Trần Thị B',
      content: 'PT rất tận tâm, meal plan cực kỳ hiệu quả. Cảm ơn coach!',
      image: '/placeholder.svg'
    },
    {
      name: 'Lê Văn C',
      content: 'Tăng cân vào cơ thành công sau 6 tháng. Highly recommended!',
      image: '/placeholder.svg'
    }
  ]);

  const [videos, setVideos] = useState<Video[]>([
    {
      title: 'Bài tập ngực cho người mới bắt đầu',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Chương trình cardio giảm cân hiệu quả',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      title: 'Bài tập vai 3D cho nam',
      videoId: 'dQw4w9WgXcQ'
    }
  ]);

  const { toast } = useToast();

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Lưu thành công!",
      description: "Nội dung trang chủ đã được cập nhật.",
    });
    onClose();
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      name: '',
      content: '',
      image: '/placeholder.svg'
    }]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateTestimonial(index, 'image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateVideo = (index: number, field: string, value: string) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], [field]: value };
    setVideos(updated);
  };

  const addVideo = () => {
    setVideos([...videos, {
      title: '',
      videoId: ''
    }]);
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa nội dung trang chủ</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">Giới thiệu</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề chính</label>
              <Input
                value={heroContent.title}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                placeholder="Tiêu đề chính"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <Textarea
                value={heroContent.description}
                onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                placeholder="Mô tả"
                rows={4}
              />
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <Input
                value={aboutContent.title}
                onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                placeholder="Tiêu đề"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <Textarea
                value={aboutContent.description}
                onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
                placeholder="Mô tả"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Số khách hàng</label>
                <Input
                  value={aboutContent.clients}
                  onChange={(e) => setAboutContent({...aboutContent, clients: e.target.value})}
                  placeholder="200+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Năm kinh nghiệm</label>
                <Input
                  value={aboutContent.experience}
                  onChange={(e) => setAboutContent({...aboutContent, experience: e.target.value})}
                  placeholder="5+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tỷ lệ thành công</label>
                <Input
                  value={aboutContent.successRate}
                  onChange={(e) => setAboutContent({...aboutContent, successRate: e.target.value})}
                  placeholder="95%"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Phản hồi khách hàng</h3>
              <Button onClick={addTestimonial} size="sm" className="bg-fitness-primary hover:bg-fitness-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Thêm testimonial
              </Button>
            </div>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Testimonial {index + 1}</h4>
                  {testimonials.length > 1 && (
                    <Button
                      onClick={() => removeTestimonial(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tên khách hàng</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                        placeholder="Tên khách hàng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nội dung</label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                        placeholder="Nội dung testimonial"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Hình ảnh</label>
                    <div className="flex flex-col items-center space-y-2">
                      {testimonial.image && (
                        <img
                          src={testimonial.image}
                          alt="Preview"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="hidden"
                        />
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Video hướng dẫn</h3>
              <Button onClick={addVideo} size="sm" className="bg-fitness-primary hover:bg-fitness-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Thêm video
              </Button>
            </div>
            {videos.map((video, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Video {index + 1}</h4>
                  {videos.length > 1 && (
                    <Button
                      onClick={() => removeVideo(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tiêu đề video</label>
                  <Input
                    value={video.title}
                    onChange={(e) => updateVideo(index, 'title', e.target.value)}
                    placeholder="Tiêu đề video"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">YouTube Video ID</label>
                  <Input
                    value={video.videoId}
                    onChange={(e) => updateVideo(index, 'videoId', e.target.value)}
                    placeholder="dQw4w9WgXcQ"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ví dụ: với URL https://www.youtube.com/watch?v=dQw4w9WgXcQ thì Video ID là "dQw4w9WgXcQ"
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Hủy
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-fitness-primary hover:bg-fitness-secondary">
            Lưu thay đổi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
