import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import PostEditor from '@/components/admin/PostEditor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Post as SharedPost } from '@/types';

interface PostFormData {
  title: string;
  content: string;
  tags?: string;
  status: 'draft' | 'published';
}

const EditPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [initialData, setInitialData] = useState<Partial<PostFormData> & { id?: string } | null>(null);
  const [postExists, setPostExists] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('Post ID is missing.');
        setLoading(false);
        setPostExists(false);
        return;
      }
      if (authLoading) return;

      if (!user || !isAdmin) {
          setError('Unauthorized to edit this post.');
          setLoading(false);
          setPostExists(false);
          return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data: postData, error: fetchError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('Post not found.');
            setPostExists(false);
            toast({ title: "Error", description: "Post not found.", variant: "destructive" });
            navigate('/admin');
          } else {
            throw fetchError;
          }
        } else if (postData) {
          setInitialData({
            id: postData.id,
            title: postData.title,
            content: postData.content,
            tags: Array.isArray(postData.tags) ? postData.tags.join(', ') : '',
            status: postData.status as 'draft' | 'published',
          });
          setPostExists(true);
        } else {
            setError('Post not found.');
            setPostExists(false);
            toast({ title: "Error", description: "Post not found.", variant: "destructive" });
            navigate('/admin');
        }
      } catch (err: unknown) {
        console.error("Error fetching post for edit:", err);
        const message = err instanceof Error ? err.message : typeof err === 'string' ? err : 'Failed to load the post data.';
        setError(message);
        toast({ title: "Error", description: message, variant: "destructive" });
        setPostExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, user, isAdmin, authLoading, navigate]);

  const handleUpdatePost = async (data: PostFormData, status: 'draft' | 'published') => {
    if (!postId || !user || !isAdmin) {
      toast({ title: "Error", description: "Cannot update post. Missing ID or authorization.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: currentPost, error: currentPostError } = await supabase
        .from('posts')
        .select('status, published_at')
        .eq('id', postId)
        .single();

      if (currentPostError) throw currentPostError;
      if (!currentPost) throw new Error("Could not retrieve current post status before update.");
      
      const currentStatus = currentPost.status;
      let publishedAtToSet = currentPost.published_at;

      if (status === 'published' && (currentStatus !== 'published' || !publishedAtToSet)) {
        publishedAtToSet = new Date().toISOString();
      } else if (status === 'draft') {
        // No specific action needed for draft status here regarding published_at
        // It will retain its current published_at value or remain null
      }

      const postUpdateData: Partial<SharedPost> & { updated_at?: string } = {
        title: data.title,
        content: data.content,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        status: status,
        published_at: publishedAtToSet,
        updated_at: new Date().toISOString(),
      };
      
      const { error: updateError } = await supabase
        .from('posts')
        .update(postUpdateData)
        .eq('id', postId);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Post Updated Successfully!",
        description: `Your post has been updated to ${status}.`,
      });

      navigate('/admin');

    } catch (error: unknown) {
      console.error("Error updating post:", error);
      const message = error instanceof Error ? error.message : typeof error === 'string' ? error : 'Something went wrong. Please try again.';
      toast({
        title: "Error Updating Post",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-nexo-black text-white">
        <Header />
        <main className="flex-grow py-12 sm:py-16">
          <div className="nexo-container max-w-4xl mx-auto">
            <div className="space-y-6 p-6 nexo-card border-nexo-blue/30 bg-nexo-darkBlue/70">
              <Skeleton className="h-10 w-1/2 bg-nexo-darkBlue/30" />
              <Skeleton className="h-4 w-3/4 bg-nexo-darkBlue/30" />
              <Skeleton className="h-8 w-full bg-nexo-darkBlue/30" />
              <Skeleton className="h-8 w-full bg-nexo-darkBlue/30" />
              <Skeleton className="h-40 w-full bg-nexo-darkBlue/30" />
              <div className="flex justify-end gap-4">
                <Skeleton className="h-10 w-24 bg-nexo-darkBlue/30" />
                <Skeleton className="h-10 w-24 bg-nexo-darkBlue/30" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-nexo-black text-white">
        <Header />
        <main className="flex-grow py-12 sm:py-16">
          <div className="nexo-container max-w-4xl mx-auto">
            <div className="text-center text-red-500 bg-red-900/30 p-4 rounded-md">{error}</div>
            <Button onClick={() => navigate('/admin')} className="mt-4 nexo-btn-primary">Back to Admin</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!postExists || !initialData) {
    return (
      <div className="min-h-screen flex flex-col bg-nexo-black text-white">
        <Header />
        <main className="flex-grow py-12 sm:py-16">
          <div className="nexo-container max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground">Post not found or could not be loaded.</p>
            <Button onClick={() => navigate('/admin')} className="mt-4 nexo-btn-primary">Back to Admin</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow py-12 sm:py-16">
        <div className="nexo-container max-w-4xl mx-auto">
          <PostEditor
            initialData={initialData}
            onSubmit={handleUpdatePost}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPostPage; 