# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-15 17:20  
**Commit:** fb0085f  
**Branch:** develop

## OVERVIEW

React blog platform ("Amy's Blog") for SkogAI community. Supabase backend, Shadcn/ui components, royal/queen theming.

## STRUCTURE

```
sassy-skogai-tales/
├── src/
│   ├── components/     # Blog components + Shadcn/ui (49 files)
│   ├── hooks/          # Data fetching (useBlogPosts, usePost, useComments)
│   ├── pages/          # Routes (Index, PostDetail, NotFound)
│   ├── integrations/   # Supabase client (auto-generated)
│   └── lib/            # Utility (cn function)
├── supabase/           # DB migrations
├── tales-backup/       # Markdown content source
└── @fix_plan.md        # Development roadmap
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add blog feature | `src/components/` | Follow existing pattern |
| Data fetching | `src/hooks/` | TanStack Query NOT used in hooks (manual fetch) |
| Routing | `src/App.tsx` | React Router v6 |
| Styling | `tailwind.config.ts` | Custom royal theming |
| Database schema | `src/integrations/supabase/types.ts` | Auto-generated, edit Supabase instead |
| Import content | `blog_importer.py` | Requires missing `db.py` module |

## CODE MAP

### Entry Points
- `src/main.tsx` - React DOM render
- `src/App.tsx` - QueryClientProvider, Routing

### Key Components
| Component | Purpose | Quirks |
|-----------|---------|--------|
| `BlogFeed.tsx` | Post listing | Has HARDCODED posts array (line 6-43), hook imported but unused |
| `BlogPost.tsx` | Single post card | Expects `slug` for navigation |
| `Hero.tsx` | Landing hero | Queen portrait asset |
| `Comments.tsx` | Comment section | UI only, backend unverified |

### Hooks (Manual State, NOT React Query)
| Hook | Returns | Notes |
|------|---------|-------|
| `useBlogPosts` | `{ posts, loading, error, formatDate }` | Fetches all published posts |
| `usePost(slug)` | `{ post, loading, error, formatDate }` | Slug OR id lookup |
| `useComments` | `{ comments, loading, addComment }` | May not be wired |

### Database (Supabase)
| Table | Key Columns | Notes |
|-------|-------------|-------|
| `posts` | id, title, content, slug, category, featured | slug auto-generated via `slugify()` function |
| `comments` | id, post_id, author_name, content, approved | RLS may block inserts |

## CONVENTIONS

- **UI**: Shadcn/ui (Radix) components in `src/components/ui/` - DON'T modify
- **Styling**: Tailwind + CSS variables (`--primary`, `--royal-gradient`)
- **Imports**: Path alias `@/*` maps to `src/*`
- **Types**: Strict mode OFF (`noImplicitAny: false`, `strictNullChecks: false`)

## ANTI-PATTERNS (THIS PROJECT)

- **BlogFeed.tsx bug**: Hook imported but not destructured, hardcoded data rendered
- **Missing db.py**: `blog_importer.py` imports nonexistent module
- **No tests**: Test framework not configured
- **Exposed credentials**: Supabase key hardcoded in client.ts

## UNIQUE STYLES

- **Royal theming**: Queen aesthetic, serif fonts (Playfair Display)
- **Custom shadows**: `queen-shadow`, `soft-glow`
- **Gradients**: `royal-gradient`, `elegant-gradient`

## COMMANDS

```bash
# Development
npm run dev           # Start dev server (localhost:5173)
npm run build         # Production build
npm run lint          # ESLint

# Content import (BROKEN - needs db.py)
python blog_importer.py --blog-dir ./tales-backup/blog/
```

## NOTES

- **Priority bug**: `BlogFeed.tsx` doesn't use fetched data - fix by destructuring hook
- **Supabase types**: Auto-generated, modify schema in Supabase dashboard
- **Content**: Markdown files in `tales-backup/` need import pipeline
- **Ralph workflow**: Check `@fix_plan.md`, follow `PROMPT.md` conventions
