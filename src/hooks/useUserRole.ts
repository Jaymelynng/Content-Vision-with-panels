
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useUserRole() {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Use the RPC function we created to get the user role
      const { data, error } = await supabase
        .rpc('get_user_role', { user_id: user.id });
      
      if (error) {
        console.log('No role found for user, defaulting to user role');
        return 'user';
      }
      
      return data || 'user';
    },
    enabled: true,
  });
}

export function useIsAdmin() {
  const { data: role } = useUserRole();
  return role === 'admin';
}
