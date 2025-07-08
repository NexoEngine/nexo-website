import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { doc, getDoc, Timestamp as FirebaseTimestamp } from 'firebase/firestore'; // Import Timestamp
// import { db } from '@/lib/firebase';
import { supabase } from '@/lib/supabase'; // Import Supabase client
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// Import common languages
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CommentsSection from "@/components/CommentsSection";
import { Post } from '@/types'; // Import the Post interface

// Register languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('docker', docker);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('xml', html);

// Remove the local Post interface, as it's now imported
/*
interface Post {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  publishedAt: FirebaseTimestamp; // Use Firestore Timestamp type
  status: string;
}
*/

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom components for ReactMarkdown
  const components = {
    pre({ children }: any) {
      // Return children directly without any wrapper to avoid extra styling
      return <>{children}</>;
    },
    code({ node, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const inline = !match;
      
      if (inline) {
        return (
          <code className="text-nexo-blue bg-nexo-darkBlue/50 px-1.5 py-0.5 rounded text-sm" {...props}>
            {children}
          </code>
        );
      }

      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            backgroundColor: 'rgba(21, 29, 60, 0.5)', // nexo-darkBlue/50
            borderRadius: '0.5rem',
            padding: '1.25rem',
            fontSize: '0.875rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    }
  };

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
        // Fetch post from Supabase
        const { data: fetchedPost, error: supabaseError } = await supabase
          .from('posts')
          .select('*') // Select all columns or specify needed ones
          .eq('id', postId)
          .eq('status', 'published') // Ensure only published posts are fetched by ID directly
          .single(); // Expect a single record

        if (supabaseError && supabaseError.code !== 'PGRST116') { // PGRST116: Row to be converted not found (0 rows)
          throw supabaseError;
        }

        if (fetchedPost) {
          setPost(fetchedPost as Post); // Cast if necessary
        } else {
          setError('Post not found or not published.');
        }
      } catch (err: unknown) {
        console.error("Error fetching post:", err);
        if (err instanceof Error) {
            setError(err.message);
        } else if (typeof err === 'string') {
            setError(err);
        } else {
            setError('Failed to load the blog post. An unknown error occurred.');
        }
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
                Published on {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Date not available'}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-nexo-blue/20 text-nexo-blue hover:bg-nexo-blue/30">{tag}</Badge>
                ))}
              </div>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          )}
          
          {/* Comments Section (Phase 5) */}
          {!loading && !error && post && postId && (
              <CommentsSection postId={postId} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage; 