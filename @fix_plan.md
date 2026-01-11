# Ralph Fix Plan - Sassy SkogAI Tales Blog

## Project Overview
This is a Vite + React + TypeScript + Shadcn/UI blog application for the SkogAI community. The blog displays content from a Supabase database and showcases "tales" about AI agents, royal proclamations, and community updates.

## High Priority ✅
- [x] Understand project structure and technology stack
- [x] Fix BlogFeed component to use useBlogPosts hook (was using hardcoded data)
- [x] Add slug column to database migration
- [x] Add auto-slug generation functions and triggers
- [x] Add sample blog posts with full content to migration
- [ ] Run Supabase migrations to set up database
- [ ] Test application in browser
- [ ] Verify blog post listing works
- [ ] Verify individual post pages work

## Medium Priority
- [ ] Create data import script for tales-backup content (convert markdown to database records)
- [ ] Add markdown rendering for blog posts (currently using simple string split)
- [ ] Implement Comments component (currently exists but may need backend)
- [ ] Add search functionality for blog posts
- [ ] Add category filtering
- [ ] Add featured posts section
- [ ] Test responsive design on mobile

## Low Priority
- [ ] Add pagination for blog posts
- [ ] Add RSS feed
- [ ] Add social media sharing buttons
- [ ] Add analytics
- [ ] Add admin panel for post management
- [ ] Add image upload for blog posts
- [ ] Add draft/scheduled publishing
- [ ] SEO optimization (meta tags, structured data)

## Completed ✨
- [x] Project initialization
- [x] Basic UI components (Header, Hero, Footer, BlogPost, BlogFeed)
- [x] Routing setup (Index, PostDetail, NotFound pages)
- [x] Supabase integration
- [x] Custom hooks (useBlogPosts, usePost, useComments)
- [x] Fixed BlogFeed to actually fetch from database instead of using hardcoded data
- [x] Added slug column and auto-generation to database schema

## Technical Details

### Technology Stack
- **Frontend**: Vite, React 18, TypeScript 5.5
- **UI Framework**: Shadcn/UI (Radix UI + Tailwind CSS)
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with custom configuration
- **Build**: Vite with SWC

### Key Files
- `src/pages/Index.tsx` - Main page with blog feed
- `src/pages/PostDetail.tsx` - Individual post page
- `src/components/BlogFeed.tsx` - Blog post listing (FIXED)
- `src/hooks/useBlogPosts.ts` - Hook to fetch all posts
- `src/hooks/usePost.ts` - Hook to fetch single post by slug or ID
- `supabase/migrations/` - Database schema migrations (UPDATED)

### Recent Fixes (Loop #1)
1. **BlogFeed Component**: Was importing useBlogPosts hook but not using it. Had hardcoded posts array instead. Fixed to actually call the hook and use real data from Supabase.

2. **Database Migration**: Missing `slug` column that code was referencing. Added:
   - `slug TEXT UNIQUE` column
   - `generate_slug()` function to create URL-friendly slugs from titles
   - `auto_generate_slug()` trigger to auto-populate slugs on insert/update
   - Updated sample posts with actual meaningful content instead of placeholders

### Next Steps
1. Ensure Supabase migrations are applied to the database
2. Run `npm run dev` and test in browser
3. Verify posts load correctly from database
4. Check individual post pages work with slug routing
5. Consider migrating content from `tales-backup/` directory

### Notes
- The tales-backup directory contains markdown files with blog content that could be imported
- Current implementation uses simple string splitting for markdown - could be enhanced with proper markdown rendering library
- Supabase instance is already configured (see .env file)
- Comments component exists but functionality not verified yet
