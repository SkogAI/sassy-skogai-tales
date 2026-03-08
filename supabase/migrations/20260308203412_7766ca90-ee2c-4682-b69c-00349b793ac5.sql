ALTER TABLE public.comments
  ADD CONSTRAINT comments_author_name_length CHECK (char_length(author_name) <= 100),
  ADD CONSTRAINT comments_author_email_length CHECK (char_length(author_email) <= 254),
  ADD CONSTRAINT comments_content_length CHECK (char_length(content) <= 5000);