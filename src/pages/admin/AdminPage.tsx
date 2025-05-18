import React, { useState, useEffect } from 'react';
// import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase'; // Import Supabase client
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Post as SharedPost } from '@/types'; // Import shared Post type

// Define an interface for posts in the admin view, extending or using SharedPost
// Supabase returns ISO strings for timestamps (e.g., created_at, updated_at, published_at)
interface AdminPost extends Omit<SharedPost, 'content' | 'tags' | 'author_id' | 'published_at'> {
  // id, title, status are from SharedPost
  created_at: string; 
  updated_at: string;
  // published_at?: string | null; // Already in SharedPost, optional here if not always shown
  // We might not need full content or tags for the admin list view.
}

const AdminPage = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all posts from Supabase, ordered by creation date
      const { data: fetchedPosts, error: supabaseError } = await supabase
        .from('posts')
        .select('id, title, status, created_at, updated_at') // Select specific columns for admin view
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }
      setPosts(fetchedPosts || []);
    } catch (err: any) {
      console.error("Error fetching posts for admin:", err);
      setError(err.message || 'Failed to load posts.');
      toast({ title: "Error", description: "Failed to load posts.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    setDeletingId(postId);
    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (deleteError) {
        throw deleteError;
      }
      
      toast({ title: "Success", description: "Post deleted successfully." });
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast({ title: "Error", description: "Failed to delete post.", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow py-12 sm:py-16">
        <div className="nexo-container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-nexo-white sm:text-4xl chrome-gradient-text">
              Admin Dashboard
            </h1>
            <Button asChild className="nexo-btn-primary">
              <Link to="/admin/blog/new">
                <PlusCircle className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
          </div>

          {loading && <div className="text-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" /> Loading posts...</div>}
          {error && <div className="text-center text-red-500 bg-red-900/30 p-4 rounded-md">{error}</div>}

          {!loading && !error && (
            <div className="chrome-surface rounded-lg overflow-hidden chrome-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-nexo-chromeGray/30 hover:bg-nexo-chromeDark/80">
                    <TableHead className="text-nexo-chrome">Title</TableHead>
                    <TableHead className="text-nexo-chrome">Status</TableHead>
                    <TableHead className="text-nexo-chrome">Created</TableHead>
                    <TableHead className="text-nexo-chrome">Updated</TableHead>
                    <TableHead className="text-right text-nexo-chrome">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No posts found. Create your first post!
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map(post => (
                      <TableRow key={post.id} className="border-nexo-chromeGray/30 hover:bg-nexo-chromeDark/50">
                        <TableCell className="font-medium text-nexo-white">{post.title}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}
                                 className={post.status === 'published' ? 'bg-green-600/70 text-green-100' : 'bg-yellow-600/70 text-yellow-100'}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        {/* Format date strings from Supabase */}
                        <TableCell className="text-muted-foreground text-sm">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{post.updated_at ? new Date(post.updated_at).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm" asChild className="text-nexo-blue hover:bg-nexo-blue/10 hover:text-nexo-blue">
                            <Link to={`/admin/blog/edit/${post.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" disabled={deletingId === post.id} className="text-red-500 hover:bg-red-500/10 hover:text-red-500">
                                {deletingId === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} 
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-nexo-darkBlue border-nexo-blue/30 text-nexo-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  This action cannot be undone. This will permanently delete the post titled "{post.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="nexo-btn-outline">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeletePost(post.id)} className="nexo-btn bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Yes, delete post
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage; 