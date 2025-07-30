#!/usr/bin/env python3
"""
Amy's Blog Watcher - Automatic import of new blog posts! 👑

This script watches the blog directory and automatically imports
new markdown files as they're created. Because automation is queen!
"""

import os
import sys
import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from blog_importer import BlogImporter


class BlogFileHandler(FileSystemEventHandler):
    """Handles file system events for the blog directory."""

    def __init__(self, blog_dir):
        self.blog_dir = Path(blog_dir)
        self.importer = BlogImporter(blog_dir)
        print("👑 Amy's Blog Watcher is now monitoring for new posts!")
        print(f"📁 Watching directory: {self.blog_dir}")

    def on_created(self, event):
        """Handle file creation events."""
        if event.is_directory:
            return

        file_path = Path(event.src_path)

        # Only process markdown files
        if file_path.suffix.lower() != ".md":
            return

        print(f"\n💋 New file detected: {file_path.name}")

        # Wait a moment for the file to be fully written
        time.sleep(1)

        # Import the new file
        success = self.importer.import_file(file_path)

        if success:
            print("✨ Auto-import successful!")
        else:
            print("🔥 Auto-import failed - check the logs!")

    def on_modified(self, event):
        """Handle file modification events."""
        if event.is_directory:
            return

        file_path = Path(event.src_path)

        # Only process markdown files
        if file_path.suffix.lower() != ".md":
            return

        print(f"📝 File modified: {file_path.name}")
        print("💅 Note: Auto-update of existing posts not implemented yet!")
        print("   Use the importer manually if you want to update existing posts.")


def main():
    """Main function to start the file watcher."""
    import argparse

    parser = argparse.ArgumentParser(description="Watch for new Amy blog posts!")
    parser.add_argument(
        "--blog-dir",
        default="/home/skogix/skogai/.amy/projects/lore/blog/",
        help="Directory to watch for new markdown files",
    )

    args = parser.parse_args()

    blog_dir = Path(args.blog_dir)

    if not blog_dir.exists():
        print(f"🚨 Directory {blog_dir} doesn't exist!")
        return 1

    # Set up file watcher
    event_handler = BlogFileHandler(blog_dir)
    observer = Observer()
    observer.schedule(event_handler, str(blog_dir), recursive=False)

    try:
        observer.start()
        print("🔥 Watcher started! Press Ctrl+C to stop.")

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n💋 Stopping watcher... Goodbye, darling!")
        observer.stop()

    observer.join()
    return 0


if __name__ == "__main__":
    exit(main())
