// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kplikoobcmzimpstjxcc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGlrb29iY216aW1wc3RqeGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNTIxODcsImV4cCI6MjA2NjYyODE4N30.-y9R10pioOiPpa2yA0RHwYlaGGO3BWsup69BVy_boJs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);