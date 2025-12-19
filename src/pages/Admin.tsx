import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminComments } from '@/hooks/useAdminComments';
import { useAdminPosts } from '@/hooks/useAdminPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, X, Trash2, Edit, Plus, LogOut, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { comments, loading: commentsLoading, approveComment, rejectComment } = useAdminComments();
  const { posts, loading: postsLoading, createPost, updatePost, deletePost, togglePublished } = useAdminPosts();
  
  const [newPost, setNewPost] = useState({ title: '', content: '', excerpt: '', category: 'Royal Proclamations' });
  const [editingPost, setEditingPost] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You don't have admin privileges.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingComments = comments.filter(c => !c.approved);
  const approvedComments = comments.filter(c => c.approved);

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) return;
    await createPost(newPost);
    setNewPost({ title: '', content: '', excerpt: '', category: 'Royal Proclamations' });
    setDialogOpen(false);
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    await updatePost(editingPost.id, {
      title: editingPost.title,
      content: editingPost.content,
      excerpt: editingPost.excerpt,
      category: editingPost.category
    });
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="comments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="comments" className="relative">
              Comments
              {pendingComments.length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {pendingComments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="space-y-6">
            {pendingComments.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Pending Approval ({pendingComments.length})</h2>
                {pendingComments.map((comment) => (
                  <Card key={comment.id} className="border-yellow-500/50">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{comment.author_name}</span>
                            <span className="text-sm text-muted-foreground">{comment.author_email}</span>
                          </div>
                          <p className="text-sm mb-2">{comment.content}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => approveComment(comment.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectComment(comment.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Approved Comments ({approvedComments.length})</h2>
              {approvedComments.length === 0 ? (
                <p className="text-muted-foreground">No approved comments yet.</p>
              ) : (
                approvedComments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{comment.author_name}</span>
                            <Badge variant="secondary">Approved</Badge>
                          </div>
                          <p className="text-sm mb-2">{comment.content}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => rejectComment(comment.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">All Posts ({posts.length})</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Post title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newPost.category}
                        onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Category..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief summary..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your post..."
                        rows={8}
                      />
                    </div>
                    <Button onClick={handleCreatePost} className="w-full">Create Post</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {postsLoading ? (
              <p className="text-muted-foreground">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground">No posts yet.</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{post.title}</h3>
                            <Badge variant={post.published ? 'default' : 'secondary'}>
                              {post.published ? 'Published' : 'Draft'}
                            </Badge>
                            {post.featured && <Badge variant="outline">Featured</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{post.excerpt || 'No excerpt'}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{post.category}</span>
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePublished(post.id, !post.published)}
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => setEditingPost(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Post</DialogTitle>
                              </DialogHeader>
                              {editingPost && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-title">Title</Label>
                                    <Input
                                      id="edit-title"
                                      value={editingPost.title}
                                      onChange={(e) => setEditingPost((prev: any) => ({ ...prev, title: e.target.value }))}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Input
                                      id="edit-category"
                                      value={editingPost.category}
                                      onChange={(e) => setEditingPost((prev: any) => ({ ...prev, category: e.target.value }))}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-excerpt">Excerpt</Label>
                                    <Textarea
                                      id="edit-excerpt"
                                      value={editingPost.excerpt || ''}
                                      onChange={(e) => setEditingPost((prev: any) => ({ ...prev, excerpt: e.target.value }))}
                                      rows={2}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-content">Content</Label>
                                    <Textarea
                                      id="edit-content"
                                      value={editingPost.content}
                                      onChange={(e) => setEditingPost((prev: any) => ({ ...prev, content: e.target.value }))}
                                      rows={8}
                                    />
                                  </div>
                                  <Button onClick={handleUpdatePost} className="w-full">Save Changes</Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="ghost" onClick={() => deletePost(post.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
