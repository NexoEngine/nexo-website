import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import AnimatedHeader from '@/components/AnimatedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from '@/types';
import { stripMarkdown } from '@/lib/utils';

const BlogListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: fetchedPosts, error: supabaseError } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        if (fetchedPosts) {
          setPosts(fetchedPosts as Post[]);
        }

      } catch (err: unknown) {
        console.error("Error fetching posts:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        } else {
          setError('Failed to load blog posts. An unknown error occurred.');
        }
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <AnimatedHeader />
      <main className="flex-grow py-12 sm:py-16 bg-nexo-darkBlue/10">
        <div className="nexo-container">
          <h1 className="text-3xl font-bold tracking-tight text-nexo-white sm:text-4xl mb-8 text-center chrome-gradient-text">
            NEXO Blog
          </h1>

          {loading && <div className="text-center text-muted-foreground">Loading posts...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length === 0 ? (
                <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3">No blog posts found.</p>
              ) : (
                posts.map(post => (
                  <Card key={post.id} className="nexo-card flex flex-col">
                    <CardHeader>
                      <CardTitle className="hover:text-nexo-blue transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription>
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Date not available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {stripMarkdown(post.content).substring(0, 150)}{stripMarkdown(post.content).length > 150 ? '...' : ''}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2 pt-4">
                      {post.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-nexo-blue/20 text-nexo-blue hover:bg-nexo-blue/30">{tag}</Badge>
                      ))}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage; 