
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Client {
  id: string;
  name: string;
  email: string;
  workoutPlan?: string;
  startDate: string;
  totalSessions: number;
  sessionsPerWeek: number;
  sessionsCompleted: number;
  height?: number;
  weight?: number;
  targetWeight?: number;
  activityLevel: string;
}

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select(`
          *,
          client_profiles (*)
        `)
        .eq('role', 'client');

      if (error) throw error;

      return data.map((profile: any): Client => {
        const clientProfile = profile.client_profiles?.[0];
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          workoutPlan: clientProfile?.workout_plan || 'Chưa có giáo án',
          startDate: clientProfile?.start_date || new Date().toISOString().split('T')[0],
          totalSessions: clientProfile?.total_sessions || 0,
          sessionsPerWeek: clientProfile?.sessions_per_week || 3,
          sessionsCompleted: clientProfile?.sessions_completed || 0,
          height: clientProfile?.height,
          weight: clientProfile?.weight,
          targetWeight: clientProfile?.target_weight,
          activityLevel: clientProfile?.activity_level || 'moderate',
        };
      });
    },
  });
}

export function useUpdateClientSessions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ clientId, totalSessions }: { clientId: string; totalSessions: number }) => {
      const { error } = await (supabase as any)
        .from('client_profiles')
        .update({ total_sessions: totalSessions })
        .eq('user_id', clientId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Cập nhật thành công",
        description: "Số buổi PT đã được cập nhật.",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật số buổi PT.",
        variant: "destructive",
      });
      console.error('Error updating sessions:', error);
    },
  });
}
