
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAppSettings() {
  return useQuery({
    queryKey: ['app-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .order('setting_key');
      
      if (error) throw error;
      
      // Transform into key-value pairs for easier access
      const settings: { [key: string]: any } = {};
      data.forEach(setting => {
        settings[setting.setting_key] = setting.setting_value;
      });
      
      return settings;
    },
  });
}

export function useContentCategories() {
  return useQuery({
    queryKey: ['content-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_categories')
        .select('*')
        .eq('active', true)
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
  });
}
