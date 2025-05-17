import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import Header from '@/components/Header'; // Assuming a reusable Header
import Footer from '@/components/Footer'; // Assuming a reusable Footer
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define a type for the blog post structure
interface Post {
  id: string;
  title: string;
  content: string; // Or maybe just a summary for the list view
  tags?: string[];
  publishedAt: any; // Firestore timestamp, consider using Timestamp type from firebase/firestore
  status: string;
  // Add other relevant fields like author, summary, etc.
}

const BlogListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const postsRef = collection(db, 'posts');
        // Query for posts that are 'published' and order by published date descending
        const q = query(postsRef, where('status', '==', 'published'), orderBy('publishedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts: Post[] = [];
        querySnapshot.forEach((doc) => {
          // Extract data and add the document ID
          const data = doc.data();
          fetchedPosts.push({
            id: doc.id,
            title: data.title,
            content: data.content, // Keep full content or create a summary field
            tags: data.tags || [],
            publishedAt: data.publishedAt, // Handle timestamp conversion if needed
            status: data.status,
          });
        });
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError('Failed to load blog posts.');
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-nexo-black text-white">
      <Header />
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
                        {post.publishedAt?.toDate().toLocaleDateString()} {/* Format date */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      {/* Optional: Show a summary instead of full content */} 
                      <p className="text-sm text-muted-foreground line-clamp-3"> 
                        {/* Placeholder for summary or start of content */}
                        {post.content.substring(0, 150)}{post.content.length > 150 ? '...' : ''}
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