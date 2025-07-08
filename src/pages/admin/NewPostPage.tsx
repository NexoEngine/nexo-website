import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase'; // Import Supabase client
// import { useAuth } from '@/hooks/useAuth'; // Old Firebase auth hook
import { useAuth } from '@/contexts/AuthContext'; // Use Supabase AuthContext
import PostEditor from '@/components/admin/PostEditor'; // Assuming this component is generic enough
import AnimatedHeader from '@/components/AnimatedHeader';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";

// Define the shape of the form data used by the editor
// This should align with what PostEditor provides and what Supabase expects
interface PostFormData {
  title: string;
  content: string;
  tags?: string; // Comma-separated string from editor
  status: 'draft' | 'published'; // Status from editor/buttons
}

const NewPostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get Supabase user from AuthContext
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (data: PostFormData, editorStatus: 'draft' | 'published') => {
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
      const postDataToInsert = {
        user_id: user.id, // Correct field name for Supabase table
        title: data.title,
        content: data.content,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        status: editorStatus,
        // created_at and updated_at will be set by default by Supabase (DEFAULT now())
        // published_at can be set by a trigger in Supabase when status becomes 'published',
        // or set explicitly here if needed:
        published_at: editorStatus === 'published' ? new Date().toISOString() : null,
      };

      const { error: insertError } = await supabase
        .from('posts')
        .insert([postDataToInsert])
        .select(); // .select() can be useful to get the inserted data back if needed

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Post Created Successfully!",
        description: `Your post has been saved as a ${editorStatus}.`,
      });

      navigate('/admin');

    } catch (err: any) {
      console.error("Error creating post:", err);
      toast({
        title: "Error Creating Post",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <AnimatedHeader />
      <main className="flex-grow py-12 sm:py-16">
        <div className="nexo-container max-w-4xl mx-auto">
          {/* Ensure PostEditor component calls onSubmit with (formData, status) */}
          <PostEditor onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewPostPage; 