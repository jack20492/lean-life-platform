
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface HomepageContentModalProps {
  onClose: () => void;
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

  const [testimonials, setTestimonials] = useState([
    {
      name: 'Nguyễn Văn A',
      content: 'Đã giảm được 15kg trong 3 tháng với chương trình tập luyện khoa học!'
    },
    {
      name: 'Trần Thị B',
      content: 'PT rất tận tâm, meal plan cực kỳ hiệu quả. Cảm ơn coach!'
    },
    {
      name: 'Lê Văn C',
      content: 'Tăng cân vào cơ thành công sau 6 tháng. Highly recommended!'
    }
  ]);

  const [videos, setVideos] = useState([
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

  const updateVideo = (index: number, field: string, value: string) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], [field]: value };
    setVideos(updated);
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
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Testimonial {index + 1}</h4>
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
            ))}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Video {index + 1}</h4>
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
