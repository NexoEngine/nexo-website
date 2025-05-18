import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { CommentWithProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { user, session } = useAuth();
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('comments_with_profiles')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setComments((data as CommentWithProfile[]) || []);
    } catch (err: unknown) {
      console.error("Error fetching comments:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to load comments. An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !newComment.trim()) {
      setError('You must be logged in and write a comment to submit.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: insertedComment, error: insertError } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content: newComment.trim(),
        })
        .select()
        .single();

      if (insertError) throw insertError;

      if (insertedComment) {
        fetchComments(); 
      }
      setNewComment('');
    } catch (err: unknown) {
      console.error("Error submitting comment:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to submit comment. An unknown error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name?: string | null, fallbackName?: string | null) => {
    const displayName = name || fallbackName;
    if (!displayName) return 'U';
    const nameParts = displayName.split(' ');
    if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase();
  };


  return (
    <div className="mt-12 pt-8 border-t border-nexo-blue/30">
      <h3 className="text-xl font-semibold text-nexo-white mb-6">Comments ({comments.length})</h3>
      
      {session && (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="bg-nexo-darkBlue/30 border-nexo-blue/30 focus:ring-nexo-blue mb-3"
            disabled={isSubmitting}
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()} className="nexo-btn">
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      )}
      {!session && (
        <p className="text-muted-foreground mb-8">
          Please <Link to="/auth" className="text-nexo-blue hover:underline">login</Link> to post a comment.
        </p>
      )}

      {isLoading && <p className="text-muted-foreground">Loading comments...</p>}
      {!isLoading && !error && comments.length === 0 && (
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      )}
      {!isLoading && !error && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-3 bg-nexo-darkBlue/20 p-4 rounded-lg">
              <Avatar className="h-10 w-10 border border-nexo-blue/30">
                <AvatarImage src={comment.avatar_url || undefined} alt={comment.full_name || comment.username || 'User'} />
                <AvatarFallback className="bg-nexo-blue text-nexo-black">
                  {getInitials(comment.full_name, comment.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-nexo-white">
                        {comment.full_name || comment.username || 'Anonymous User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleString()}
                    </p>
                </div>
                <p className="text-sm text-nexo-white/90 mt-1 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isLoading && error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CommentsSection; 