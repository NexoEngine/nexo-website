import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore'; // Import Timestamp
import { db } from '@/lib/firebase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import CommentsSection from "@/components/CommentsSection"; // Import CommentsSection

// Reusing the Post interface (consider moving to a shared types file)
interface Post {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  publishedAt: Timestamp; // Use Firestore Timestamp type
  status: string;
  // Add other relevant fields
}

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('Post ID is missing.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const postDocRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(postDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Basic check if post is published (or maybe allow admins to see drafts?)
          if (data.status !== 'published') {
             setError('This post is not published.');
          } else {
            setPost({
              id: docSnap.id,
              title: data.title,
              content: data.content,
              tags: data.tags || [],
              publishedAt: data.publishedAt as Timestamp, // Cast to Timestamp
              status: data.status,
            });
          }
        } else {
          setError('Post not found.');
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError('Failed to load the blog post.');
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
      <main className="flex-grow py-12 sm:py-16 bg-nexo-darkBlue/10">
        <div className="nexo-container max-w-4xl mx-auto">
          {loading && (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 bg-nexo-darkBlue/30" />
              <Skeleton className="h-4 w-1/4 bg-nexo-darkBlue/30" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 bg-nexo-darkBlue/30" />
                <Skeleton className="h-6 w-24 bg-nexo-darkBlue/30" />
              </div>
              <Skeleton className="h-64 w-full bg-nexo-darkBlue/30" />
            </div>
          )}
          {error && <div className="text-center text-red-500 bg-red-900/30 p-4 rounded-md">{error}</div>}

          {!loading && !error && post && (
            <article className="prose prose-invert lg:prose-xl max-w-none prose-headings:text-nexo-white prose-a:text-nexo-blue hover:prose-a:text-nexo-blue/80 prose-strong:text-nexo-white prose-code:text-nexo-blue prose-code:bg-nexo-darkBlue/50 prose-code:p-1 prose-code:rounded prose-blockquote:border-nexo-blue prose-blockquote:text-muted-foreground">
              <h1>{post.title}</h1>
              <div className="mb-4 text-sm text-muted-foreground">
                Published on {post.publishedAt?.toDate().toLocaleDateString()}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-nexo-blue/20 text-nexo-blue hover:bg-nexo-blue/30">{tag}</Badge>
                ))}
              </div>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          )}
          
          {/* Comments Section (Phase 5) */}
          {!loading && !error && post && postId && (
              <CommentsSection postId={postId} /> // Render CommentsSection
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage; 