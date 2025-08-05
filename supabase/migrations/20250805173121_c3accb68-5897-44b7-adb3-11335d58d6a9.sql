-- Add ambassador role to the user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'ambassador';

-- Create function to check if user is an ambassador
CREATE OR REPLACE FUNCTION public.is_ambassador(user_id uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_ambassador.user_id 
    AND role = 'ambassador'
  );
$function$;