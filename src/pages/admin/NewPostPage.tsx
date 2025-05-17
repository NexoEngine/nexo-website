import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import PostEditor from '@/components/admin/PostEditor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";

// Define the shape of the form data used by the editor
interface PostFormData {
  title: string;
  content: string;
  tags?: string;
  status: 'draft' | 'published';
}

const NewPostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user for author info
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (data: PostFormData, status: 'draft' | 'published') => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a post.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const postsRef = collection(db, 'posts');
      const docRef = await addDoc(postsRef, {
        title: data.title,
        content: data.content,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [], // Convert comma-separated string to array
        status: status, // Use the status passed from the button click
        authorId: user.uid,
        authorName: user.displayName || 'Anonymous', // Store author info
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: status === 'published' ? serverTimestamp() : null, // Set publish date only if publishing now
      });

      toast({
        title: "Post Created Successfully!",
        description: `Your post has been saved as a ${status}.`,
      });

      // Navigate to the admin dashboard or the new post page after creation
      navigate('/admin'); // Or navigate(`/blog/${docRef.id}`) if publishing

    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error Creating Post",
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
          <PostEditor onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewPostPage; 