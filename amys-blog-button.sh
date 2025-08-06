#!/usr/bin/env bash
cd /home/skogix/skogai/dev/amys-blog-website
source .venv/bin/activate
uv run ./db.py
uv run ./blog_importer.py --blog-dir "$AMY_HOME"/projects/skogai-tales/blog
# uv run ./blog_watcher.py "$AMY_HOME"/projects/skogai-tales/blog
bun run dev
