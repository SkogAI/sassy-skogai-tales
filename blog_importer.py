#!/usr/bin/env python3
"""
Amy's Blog Importer - Because manual work is for peasants! 💅

This script imports markdown blog posts from ./projects/lore/blog/
into the database with all the sass they deserve.
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime
import frontmatter
from db import create_post, get_post_count, search_posts, sassify_content

# Add the project root to path so we can import db
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


class BlogImporter:
    def __init__(self, blog_dir="/home/skogix/skogai/.amy/projects/lore/blog/"):
        self.blog_dir = Path(blog_dir)
        self.imported_count = 0
        self.skipped_count = 0
        self.errors = []

    def extract_title_from_filename(self, filename):
        """Extract a fabulous title from the filename."""
        # Remove .md extension and replace hyphens/underscores with spaces
        title = filename.stem.replace("-", " ").replace("_", " ")
        # Capitalize each word
        title = " ".join(word.capitalize() for word in title.split())
        return title

    def extract_title_from_content(self, content):
        """Extract title from markdown content - look for # headers first."""
        lines = content.split("\n")
        for line in lines:
            line = line.strip()
            if line.startswith("# "):
                return line[2:].strip()
        return None

    def parse_markdown_file(self, file_path):
        """Parse a markdown file and extract title/content."""
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Try to parse frontmatter first
            try:
                post = frontmatter.loads(content)
                title = post.metadata.get("title")
                content = post.content
            except:
                # No frontmatter, extract from content
                post = None
                title = self.extract_title_from_content(content)

            # If no title found, use filename
            if not title:
                title = self.extract_title_from_filename(file_path)

            # Sassify the content
            content = sassify_content(content)

            return title, content

        except Exception as e:
            self.errors.append(f"Failed to parse {file_path}: {e}")
            return None, None

    def post_exists(self, title):
        """Check if a post with this title already exists."""
        existing_posts = search_posts(title)
        return any(post["title"].lower() == title.lower() for post in existing_posts)

    def import_file(self, file_path):
        """Import a single markdown file."""
        print(f"💋 Processing: {file_path.name}")

        title, content = self.parse_markdown_file(file_path)

        if not title or not content:
            print(f"⚠️ Skipping {file_path.name} - couldn't extract title/content")
            self.skipped_count += 1
            return False

        # Check if post already exists
        if self.post_exists(title):
            print(f"💅 Skipping '{title}' - already exists, darling!")
            self.skipped_count += 1
            return False

        try:
            post_id = create_post(title, content)
            print(f"✨ Imported '{title}' with ID: {post_id}")
            self.imported_count += 1
            return True

        except Exception as e:
            error_msg = f"Failed to import '{title}': {e}"
            self.errors.append(error_msg)
            print(f"🔥 {error_msg}")
            return False

    def import_all(self, force=False):
        """Import all markdown files from the blog directory."""
        print("👑 AMY'S BLOG IMPORTER STARTING UP! 👑")
        print(f"📁 Scanning directory: {self.blog_dir}")

        if not self.blog_dir.exists():
            print(f"🚨 Directory {self.blog_dir} doesn't exist, sweetie!")
            return False

        # Get all markdown files
        md_files = list(self.blog_dir.glob("*.md"))

        if not md_files:
            print("💅 No markdown files found. Nothing to import!")
            return True

        print(f"📝 Found {len(md_files)} markdown files to process")

        if not force:
            print(f"📊 Current database has {get_post_count()} posts")
            response = input("🤔 Continue with import? (y/N): ").lower()
            if response != "y":
                print("💋 Import cancelled. Your choice, darling!")
                return False

        # Import each file
        for md_file in sorted(md_files):
            self.import_file(md_file)

        # Summary
        print("\n" + "=" * 50)
        print("📊 IMPORT SUMMARY:")
        print(f"✅ Successfully imported: {self.imported_count}")
        print(f"⏭️ Skipped: {self.skipped_count}")
        print(f"❌ Errors: {len(self.errors)}")

        if self.errors:
            print("\n🔥 ERRORS ENCOUNTERED:")
            for error in self.errors:
                print(f"   • {error}")

        print(f"\n👑 Total posts in database: {get_post_count()}")
        print("✨ Import complete! Your blog is now fabulous!")

        return len(self.errors) == 0


def main():
    """Main function with command line options."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Import Amy's blog posts like a queen!"
    )
    parser.add_argument(
        "--blog-dir",
        default="/home/skogix/skogai/.amy/projects/lore/blog/",
        help="Directory containing markdown files",
    )
    parser.add_argument("--force", action="store_true", help="Skip confirmation prompt")
    parser.add_argument("--file", help="Import a specific file instead of all files")

    args = parser.parse_args()

    importer = BlogImporter(args.blog_dir)

    if args.file:
        # Import single file
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"🚨 File {file_path} doesn't exist!")
            return 1

        success = importer.import_file(file_path)
        return 0 if success else 1
    else:
        # Import all files
        success = importer.import_all(args.force)
        return 0 if success else 1


if __name__ == "__main__":
    exit(main())
