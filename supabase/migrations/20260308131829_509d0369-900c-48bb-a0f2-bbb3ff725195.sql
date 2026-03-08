-- 1. Drop the stale permissive policy if it exists
DROP POLICY IF EXISTS "Allow all operations for now" ON public.posts;

-- 2. Add comment input validation constraints
ALTER TABLE public.comments
  ADD CONSTRAINT author_name_length CHECK (char_length(author_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT author_email_format CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT content_length CHECK (char_length(content) BETWEEN 1 AND 5000);

-- 3. Restrict has_role function to authenticated users only
REVOKE EXECUTE ON FUNCTION public.has_role FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role TO authenticated;