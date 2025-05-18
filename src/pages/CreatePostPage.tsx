import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CreatePostPage = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string for tags
  const [status, setStatus] = useState('draft'); // Default to draft
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Redirect if not logged in (though ProtectedRoute should handle this)
  useEffect(() => {
    if (!session) {
      // navigate('/auth'); // Ideally handled by a ProtectedRoute component
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const postData = {
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Split string into array, trim, remove empty
      status: status, // 'published' or 'draft'
      // published_at will be set by Supabase (e.g. now() or a trigger) or can be set here if publishing directly
    };

    try {
      const { error: insertError } = await supabase.from('posts').insert([postData]);

      if (insertError) {
        throw insertError;
      }

      setSuccessMessage(`Post "${title}" created successfully as ${status}!`);
      setTitle('');
      setContent('');
      setTags('');
      setStatus('draft');
      // Optionally navigate to the new post or blog list
      // navigate(`/blog`); 
    } catch (err: unknown) {
      console.error("Error creating post:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to create post.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
        <div className="min-h-screen flex flex-col bg-nexo-black text-white">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <p>Please <Link to="/auth" className="text-nexo-blue hover:underline">login</Link> to create a post.</p>
            </main>
            <Footer />
        </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-nexo-darkBlue/10">
        <div className="nexo-container max-w-3xl mx-auto">
          <Card className="nexo-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold chrome-gradient-text">Create New Blog Post</CardTitle>
              <CardDescription>Fill in the details below to publish a new article.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">Title</label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter post title"
                    className="bg-nexo-darkBlue/30 border-nexo-blue/30 focus:ring-nexo-blue"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium text-muted-foreground">Content (Markdown Supported)</label>
                  <Textarea 
                    id="content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Write your blog post content here...\nSupports Markdown syntax."
                    rows={10}
                    className="bg-nexo-darkBlue/30 border-nexo-blue/30 focus:ring-nexo-blue"
                    required
                  />
                </div>
                
                <div className="prose prose-invert prose-sm max-w-none p-4 border border-dashed border-nexo-blue/30 rounded-md bg-nexo-darkBlue/20 min-h-[100px]">
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">Live Preview:</h4>
                  {content ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> : <p className="text-xs text-muted-foreground italic">Start typing to see a preview...</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="block text-sm font-medium text-muted-foreground">Tags (comma-separated)</label>
                  <Input 
                    id="tags" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                    placeholder="e.g., tech, programming, nexo"
                    className="bg-nexo-darkBlue/30 border-nexo-blue/30 focus:ring-nexo-blue"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-muted-foreground">Status</label>
                  <select 
                    id="status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 rounded-md bg-nexo-darkBlue/30 border-nexo-blue/30 focus:ring-nexo-blue text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {error && <p className="text-red-500 text-sm">Error: {error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting} className="nexo-btn w-full sm:w-auto">
                  {isSubmitting ? 'Submitting...' : (status === 'published' ? 'Publish Post' : 'Save Draft')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePostPage; 