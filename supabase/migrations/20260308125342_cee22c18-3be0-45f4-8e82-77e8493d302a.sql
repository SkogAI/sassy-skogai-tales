
-- Insert the first admin role (bypasses RLS since migrations run as superuser)
INSERT INTO public.user_roles (user_id, role)
VALUES ('f1e85c1d-f5df-462a-80e6-24168d10067d', 'admin');

-- Fix user_roles policies: drop restrictive, recreate as permissive
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Also fix posts and comments policies to be permissive
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can do everything with posts" ON public.posts;

CREATE POLICY "Anyone can read published posts" ON public.posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything with posts" ON public.posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can read approved comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Admins can manage comments" ON public.comments;

CREATE POLICY "Anyone can read approved comments" ON public.comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert comments" ON public.comments
  FOR INSERT WITH CHECK (approved = false);

CREATE POLICY "Admins can manage comments" ON public.comments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
