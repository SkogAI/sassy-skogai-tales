import psycopg2
from dotenv import load_dotenv
import os
from datetime import datetime
from contextlib import contextmanager

# Load environment variables
load_dotenv()

# --- CORE FUNCTIONS ---
@contextmanager
def get_db_connection():
    """Get a database connection fit for a queen with proper cleanup."""
    conn = None
    try:
        conn = psycopg2.connect(os.getenv("SUPABASE_DB_URL"))
        print("💋 Connection successful, darling!")
        yield conn
    except Exception as e:
        print(f"🚨 DATABASE MELTDOWN: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            conn.close()
            print("✨ Connection closed gracefully, as it should be!")

def fetch_posts(limit=None):
    """Fetch all blog posts, sorted by drama level (newest first)."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Use parameterized query for security, darling!
            if limit:
                query = """
                    SELECT id, title, content, created_at 
                    FROM posts 
                    ORDER BY created_at DESC
                    LIMIT %s
                """
                cursor.execute(query, (limit,))
            else:
                query = """
                    SELECT id, title, content, created_at 
                    FROM posts 
                    ORDER BY created_at DESC
                """
                cursor.execute(query)
            
            posts = cursor.fetchall()
            return [{
                'id': post[0],
                'title': post[1],
                'content': post[2],
                'date': post[3].strftime("%Y-%m-%d %H:%M")
            } for post in posts]
            
    except Exception as e:
        print(f"🔥 FAILED TO FETCH THE TEA: {e}")
        return []

def create_post(title, content):
    """Create a new post with the sass it deserves."""
    if not title or not content:
        print("💅 Excuse me? Empty title or content? I don't think so!")
        raise ValueError("Title and content are required, sweetie!")
    
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                INSERT INTO posts (title, content, created_at)
                VALUES (%s, %s, %s)
                RETURNING id
            """, (title, content, datetime.utcnow()))
            
            conn.commit()
            post_id = cursor.fetchone()[0]
            print(f"👑 Post published with royal approval! ID: {post_id}")
            return post_id
            
    except Exception as e:
        print(f"🔥 FAILED TO SASSIFY: {e}")
        raise

def get_post_by_id(post_id):
    """Fetch a specific post by ID - because sometimes you need the details, honey."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, title, content, created_at 
                FROM posts 
                WHERE id = %s
            """, (post_id,))
            
            post = cursor.fetchone()
            if post:
                return {
                    'id': post[0],
                    'title': post[1],
                    'content': post[2],
                    'date': post[3].strftime("%Y-%m-%d %H:%M")
                }
            else:
                print(f"🤷‍♀️ Post {post_id} doesn't exist, darling!")
                return None
                
    except Exception as e:
        print(f"🔥 FAILED TO FIND THE POST: {e}")
        return None

def update_post(post_id, title=None, content=None):
    """Update a post - because even queens need to edit sometimes."""
    if not title and not content:
        print("💅 What exactly are we updating here? Give me something to work with!")
        return False
    
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            # Build dynamic update query
            updates = []
            params = []
            
            if title:
                updates.append("title = %s")
                params.append(title)
            if content:
                updates.append("content = %s")
                params.append(content)
            
            params.append(post_id)
            
            query = f"""
                UPDATE posts 
                SET {', '.join(updates)}
                WHERE id = %s
                RETURNING id
            """
            
            cursor.execute(query, params)
            updated_id = cursor.fetchone()
            
            if updated_id:
                conn.commit()
                print(f"✨ Post {post_id} has been updated to perfection!")
                return True
            else:
                print(f"🤷‍♀️ Post {post_id} doesn't exist to update, sweetie!")
                return False
                
    except Exception as e:
        print(f"🔥 FAILED TO UPDATE: {e}")
        raise

def delete_post(post_id):
    """Delete a post - sometimes even queens make mistakes."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("DELETE FROM posts WHERE id = %s RETURNING id", (post_id,))
            deleted_id = cursor.fetchone()
            
            if deleted_id:
                conn.commit()
                print(f"🗑️ Post {post_id} has been banished from the kingdom!")
                return True
            else:
                print(f"🤷‍♀️ Post {post_id} doesn't exist to delete, sweetie!")
                return False
                
    except Exception as e:
        print(f"🔥 FAILED TO DELETE: {e}")
        raise

def search_posts(search_term):
    """Search posts by title or content - find the tea you're looking for."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, title, content, created_at 
                FROM posts 
                WHERE title ILIKE %s OR content ILIKE %s
                ORDER BY created_at DESC
            """, (f"%{search_term}%", f"%{search_term}%"))
            
            posts = cursor.fetchall()
            return [{
                'id': post[0],
                'title': post[1],
                'content': post[2],
                'date': post[3].strftime("%Y-%m-%d %H:%M")
            } for post in posts]
            
    except Exception as e:
        print(f"🔥 SEARCH FAILED: {e}")
        return []

def get_post_count():
    """Get total number of posts - because numbers matter, darling."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM posts")
            count = cursor.fetchone()[0]
            print(f"📊 Total posts in the kingdom: {count}")
            return count
            
    except Exception as e:
        print(f"🔥 FAILED TO COUNT: {e}")
        return 0

# --- SASS UTILITIES ---
def sassify_content(content):
    """Upgrade basic text to Amy-approved sass levels."""
    sass_map = {
        "error": "🚨 *dramatic gasp*",
        "warning": "💅 Let's be real...",
        "success": "✨ Slay, queen!",
        "debug": "🔍 Between us girls...",
        "info": "💋 Just so you know..."
    }
    for plain, sassy in sass_map.items():
        content = content.replace(f"[{plain}]", sassy)
    return content

def initialize_database():
    """Create the posts table if it doesn't exist - setting up the kingdom properly."""
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS posts (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            conn.commit()
            print("👑 Database initialized and ready for royal content!")
            
    except Exception as e:
        print(f"🔥 FAILED TO INITIALIZE: {e}")
        raise

# --- DEMO ---
if __name__ == "__main__":
    print("👑 AMY'S BLOG COMMAND CENTER 👑")
    
    try:
        # Initialize database
        print("\n🏗️ Setting up the kingdom...")
        initialize_database()
        
        # Test connection
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT NOW()")
            print(f"🕰️ Database time: {cursor.fetchone()[0]}")
        
        # Show post count
        print(f"\n📊 Current post count: {get_post_count()}")
        
        # Show latest 3 posts
        print("\n📜 LATEST HEADLINES:")
        posts = fetch_posts(limit=3)
        if posts:
            for post in posts:
                print(f"✨ {post['title']} ({post['date']})")
        else:
            print("💅 No posts yet? Time to start writing, darling!")
        
        # Create a test post (uncomment to use)
        # print("\n🎭 Creating a fabulous test post...")
        # new_post_id = create_post(
        #     "Debugging With Lipstick On", 
        #     "Priorities, darling. When your code breaks, fix it with style! [success]"
        # )
        # print(f"✨ Test post created with ID: {new_post_id}")
        
    except Exception as e:
        print(f"💥 Demo failed spectacularly: {e}")
        print("🔧 Check your database connection and try again, sweetie!")
