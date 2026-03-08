
-- Fix search_path on update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix permissive INSERT policy on comments - restrict to reasonable checks
DROP POLICY "Anyone can insert comments" ON public.comments;
CREATE POLICY "Anyone can insert comments" ON public.comments
  FOR INSERT WITH CHECK (approved = false);
