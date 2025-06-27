
-- Create function to set configuration values for RLS
CREATE OR REPLACE FUNCTION set_config(parameter text, value text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT set_config(parameter, value, false);
$$;
