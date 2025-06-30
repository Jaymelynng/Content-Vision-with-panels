
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

// List of admin gym PINs - add more as needed
const ADMIN_GYMS = ['1426', '2222'];

export function useUserRole() {
  const { gym } = useAuth();
  
  return useQuery({
    queryKey: ['user-role', gym?.pin_code],
    queryFn: async () => {
      if (!gym) return 'user';
      
      // Check if current gym is an admin gym
      return ADMIN_GYMS.includes(gym.pin_code) ? 'admin' : 'user';
    },
    enabled: true,
  });
}

export function useIsAdmin() {
  const { data: role } = useUserRole();
  return role === 'admin';
}
