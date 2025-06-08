
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  title: string;
  content?: string;
  created_at: string;
  author_name?: string;
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('posts')
        .select(`
          *,
          profiles:author_id (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((post: any): Post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        author_name: post.profiles?.name,
      }));
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await (supabase as any)
        .from('posts')
        .insert({
          title,
          content,
          author_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Thành công",
        description: "Bài viết đã được tạo.",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể tạo bài viết.",
        variant: "destructive",
      });
      console.error('Error creating post:', error);
    },
  });
}
