# src/components - Blog UI Components

<!-- Parent: ../../AGENTS.md -->

## OVERVIEW

Custom blog components + Shadcn/ui library. 6 custom, 49 Shadcn/ui.

## STRUCTURE

```
components/
├── BlogFeed.tsx      # Post listing (BUGGY - see anti-patterns)
├── BlogPost.tsx      # Post card
├── Comments.tsx      # Comment section
├── Header.tsx        # Site header
├── Hero.tsx          # Landing hero
├── Footer.tsx        # Site footer
└── ui/               # Shadcn/ui (49 files) - DON'T MODIFY
```

## CONVENTIONS

- **Custom components**: Direct children of `components/`
- **UI library**: `ui/` subfolder = Shadcn/ui, never edit directly
- **Styling**: Tailwind classes + custom theme vars from parent CSS
- **Props**: Follow existing pattern (BlogPost expects slug, id, title, etc.)

## ANTI-PATTERNS

```tsx
// BlogFeed.tsx - BROKEN PATTERN
const posts = [...];  // Line 6-43: HARDCODED DATA
const { posts, loading, error, formatDate } = useBlogPosts();  // Hook import exists but NOT DESTRUCTURED

// FIX: Replace line 6 with:
const { posts, loading, error, formatDate } = useBlogPosts();
// Then DELETE the hardcoded posts array (lines 7-43)
```

## FOR AI AGENTS

1. **Adding features**: Create in `components/`, NOT in `ui/`
2. **BlogFeed bug**: Hook imported line 2, but line 6 shadows with hardcoded data
3. **Comments.tsx**: UI exists, backend wiring needs verification
4. **Queen theming**: Use `font-serif`, `royal-gradient`, `queen-shadow` classes
