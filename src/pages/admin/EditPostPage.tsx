import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import PostEditor from '@/components/admin/PostEditor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// Define the shape of the form data used by the editor
interface PostFormData {
  title: string;
  content: string;
  tags?: string; // Comma-separated string from the editor
  status: 'draft' | 'published';
}

// Define the shape of the data fetched from Firestore
interface FetchedPostData {
    title: string;
    content: string;
    tags?: string[]; // Array in Firestore
    status: 'draft' | 'published';
    // Add other fields if necessary
}

const EditPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [initialData, setInitialData] = useState<Partial<PostFormData> & { id?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('Post ID is missing.');
        setLoading(false);
        return;
      }
      if (!user || !isAdmin) { // Extra check, though ProtectedRoute should handle this
          setError('Unauthorized');
          setLoading(false);
          return;
      }

      setLoading(true);
      setError(null);
      try {
        const postDocRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(postDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as FetchedPostData;
          // TODO: Add check if user is the author or admin if needed
          setInitialData({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            tags: data.tags?.join(', ') || '', // Convert array back to comma-separated string for the input
            status: data.status,
          });
        } else {
          setError('Post not found.');
          toast({ title: "Error", description: "Post not found.", variant: "destructive" });
          navigate('/admin'); // Redirect if post doesn't exist
        }
      } catch (err) {
        console.error("Error fetching post for edit:", err);
        setError('Failed to load the post data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, user, isAdmin, navigate]);

  const handleUpdatePost = async (data: PostFormData, status: 'draft' | 'published') => {
    if (!postId || !user || !isAdmin) {
      toast({ title: "Error", description: "Cannot update post. Missing ID or authorization.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const postDocRef = doc(db, 'posts', postId);
      const currentDoc = await getDoc(postDocRef);
      const currentStatus = currentDoc.data()?.status;

      await updateDoc(postDocRef, {
        title: data.title,
        content: data.content,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        status: status,
        updatedAt: serverTimestamp(),
        // Only update publishedAt if changing status *to* published
        ...(status === 'published' && currentStatus !== 'published' && { publishedAt: serverTimestamp() }),
      });

      toast({
        title: "Post Updated Successfully!",
        description: `Your post has been updated to ${status}.`,
      });

      navigate('/admin'); // Navigate back to admin dashboard after update

    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error Updating Post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow py-12 sm:py-16">
        <div className="nexo-container max-w-4xl mx-auto">
          {loading && (
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
          )}
          {error && <div className="text-center text-red-500 bg-red-900/30 p-4 rounded-md">{error}</div>}
          {!loading && !error && initialData && (
            <PostEditor
              initialData={initialData}
              onSubmit={handleUpdatePost}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPostPage; 