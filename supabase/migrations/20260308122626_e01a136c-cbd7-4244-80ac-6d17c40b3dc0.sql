
-- Fix posts policies: drop restrictive, recreate as permissive
DROP POLICY "Anyone can read published posts" ON public.posts;
DROP POLICY "Admins can do everything with posts" ON public.posts;

CREATE POLICY "Anyone can read published posts" ON public.posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can do everything with posts" ON public.posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix comments policies
DROP POLICY "Anyone can read approved comments" ON public.comments;
DROP POLICY "Anyone can insert comments" ON public.comments;
DROP POLICY "Admins can manage comments" ON public.comments;

CREATE POLICY "Anyone can read approved comments" ON public.comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert comments" ON public.comments
  FOR INSERT WITH CHECK (approved = false);

CREATE POLICY "Admins can manage comments" ON public.comments
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix user_roles policies
DROP POLICY "Admins can manage roles" ON public.user_roles;
DROP POLICY "Users can read own roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());
