# Sassy SkogAI Tales - Agent Instructions

## Project Overview
A React blog application showcasing "Amy's Blog" - sassy, personality-filled content from the SkogAI lore collection. The blog displays posts stored in Supabase and features a royal/queen aesthetic.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL database)
- **Routing**: React Router v6
- **State Management**: TanStack Query (@tanstack/react-query)

## Project Structure
```
src/
├── components/      # React components
│   ├── ui/         # Shadcn/ui base components
│   ├── BlogFeed.tsx    # Main blog feed component
│   ├── BlogPost.tsx    # Individual post card
│   ├── Header.tsx      # Site header
│   ├── Hero.tsx        # Hero section
│   ├── Footer.tsx      # Site footer
│   └── Comments.tsx    # Comments section
├── pages/          # Route pages
│   ├── Index.tsx       # Home page (/)
│   ├── PostDetail.tsx  # Single post page (/post/:slug)
│   └── NotFound.tsx    # 404 page
├── hooks/          # Custom React hooks
│   ├── useBlogPosts.ts # Fetch all blog posts
│   ├── usePost.ts      # Fetch single post
│   └── useComments.ts  # Fetch post comments
├── integrations/
│   └── supabase/       # Supabase client & types
└── lib/            # Utility functions

tales-backup/       # Markdown blog content (backup)
├── blog/           # Blog post markdown files
├── amy/            # Amy-specific lore
├── dot/            # Dots-specific lore
└── origins/        # Origin stories
```

## Database Schema (Supabase)
```sql
-- Posts table
posts (
  id: uuid PRIMARY KEY,
  title: text NOT NULL,
  slug: text UNIQUE,
  excerpt: text,
  content: text,
  category: text,
  featured: boolean DEFAULT false,
  published: boolean DEFAULT true,
  created_at: timestamptz,
  updated_at: timestamptz
)

-- Comments table (if implemented)
comments (
  id: uuid PRIMARY KEY,
  post_id: uuid REFERENCES posts(id),
  author: text,
  content: text,
  created_at: timestamptz
)
```

## Build & Run Instructions

### Prerequisites
- Node.js 18+ (for Vite/React)
- Python 3.x (for blog_importer.py script)
- Supabase account with project set up

### Installation
```bash
# Install Node dependencies
npm install

# Install Python dependencies (for importer)
pip install python-frontmatter
```

### Development
```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Import Blog Posts
The `blog_importer.py` script loads markdown files from `tales-backup/blog/` into Supabase:

```bash
# Import all markdown files from blog directory
python blog_importer.py --blog-dir ./tales-backup/blog/

# Import a specific file
python blog_importer.py --file ./tales-backup/blog/my-post.md

# Force import without confirmation
python blog_importer.py --force
```

**Note**: The importer requires a `db.py` module with functions:
- `create_post(title, content)` - Insert post into database
- `get_post_count()` - Get total post count
- `search_posts(query)` - Search for existing posts
- `sassify_content(content)` - Process/transform content

## Environment Variables
Supabase credentials are hardcoded in `src/integrations/supabase/client.ts`:
- `SUPABASE_URL`: https://velythiaxuwrrylpeotx.supabase.co
- `SUPABASE_PUBLISHABLE_KEY`: (public anon key)

For production, move these to `.env`:
```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Known Issues & TODO

### Critical Bugs
1. ~~**BlogFeed.tsx** - Component doesn't use `useBlogPosts` hook properly~~ FIXED
   - Hardcoded posts array instead of fetching from database
   - Need to destructure `{posts, loading, error, formatDate}` from hook

### Missing Components
2. **blog_importer.py** - Missing `db.py` dependency
   - Script imports `db` module that doesn't exist in repo
   - Need to create database interface functions

3. **Slug generation** - Posts need URL-friendly slugs
   - Add slug generation in importer or database trigger

### Features to Implement
4. **Comments system** - `Comments.tsx` exists but not implemented
5. **Search functionality** - Add post search/filter
6. **Categories/tags** - Better category navigation
7. **RSS feed** - Generate RSS for blog
8. **Image handling** - Support for blog post images
9. **Markdown rendering** - Need markdown parser for post content

## Testing Strategy
1. **Unit tests**: Test hooks, utilities, components
2. **Integration tests**: Test post fetching, routing
3. **E2E tests**: Full user flows (browse → click post → read)

## Deployment
```bash
# Build production bundle
npm run build

# Serve with any static host
# - Vercel: `vercel deploy`
# - Netlify: `netlify deploy`
# - GitHub Pages: push `dist/` folder
```

## Notes
- Blog content (markdown files) stored in `tales-backup/` as backup
- Main data source is Supabase `posts` table
- Amy's personality/voice should be preserved in content
- Use royal/queen theming consistently
