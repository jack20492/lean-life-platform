
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface CreatePostModalProps {
  onClose: () => void;
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    youtubeUrl: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Tạo bài viết thành công!",
      description: `Bài viết "${formData.title}" đã được đăng.`,
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tạo bài viết mới</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tiêu đề</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Nội dung</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Nhập nội dung bài viết..."
              rows={8}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">YouTube URL (tùy chọn)</label>
            <Input
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" className="flex-1 bg-fitness-primary hover:bg-fitness-secondary">
              Đăng bài
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
