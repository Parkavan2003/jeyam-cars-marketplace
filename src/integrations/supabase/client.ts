// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qggwdfbpdyklioeurwtn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZ3dkZmJwZHlrbGlvZXVyd3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MTQwODMsImV4cCI6MjA2MjE5MDA4M30.RRR6Qk7bY2c0zKim1drKhxe1LblpMWQ8jvSH7tGLGQ8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);