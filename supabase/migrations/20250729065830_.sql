-- Fix security warnings: Set search_path for functions
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.slugify(text) SET search_path = '';;
