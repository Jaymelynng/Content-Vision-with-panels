
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useUserRole() {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Query user_roles table directly since RLS policies are in place
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.log('No role found for user, defaulting to user role');
        return 'user';
      }
      
      return data?.role || 'user';
    },
    enabled: true,
  });
}

export function useIsAdmin() {
  const { data: role } = useUserRole();
  return role === 'admin';
}
