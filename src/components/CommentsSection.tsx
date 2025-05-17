import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, Timestamp, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import CommentForm from './CommentForm'; // To be created next
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // For relative time

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar?: string | null;
  createdAt: Timestamp;
  parentCommentId?: string | null;
  likes?: string[]; // Array of user IDs who liked the comment
}

interface CommentNode extends Comment {
  replies: CommentNode[];
}

interface CommentsSectionProps {
  postId: string;
}

// Function to build the comment tree
const buildCommentTree = (comments: Comment[]): CommentNode[] => {
  const commentMap: { [key: string]: CommentNode } = {};
  const rootComments: CommentNode[] = [];

  // Initialize map and find root comments
  comments.forEach(comment => {
    const node: CommentNode = { ...comment, replies: [] };
    commentMap[comment.id] = node;
    if (!comment.parentCommentId) {
      rootComments.push(node);
    } else {
        // If parent exists, add as reply, otherwise treat as root (edge case)
        const parent = commentMap[comment.parentCommentId];
        if (parent) {
            parent.replies.push(node);
        } else {
            console.warn(`Parent comment ${comment.parentCommentId} not found for comment ${comment.id}. Treating as root.`);
            rootComments.push(node);
        }
    }
  });

  // Sort comments and replies by date (oldest first within replies)
  const sortByDate = (a: CommentNode, b: CommentNode) => a.createdAt.toMillis() - b.createdAt.toMillis();
  rootComments.sort(sortByDate);
  Object.values(commentMap).forEach(node => node.replies.sort(sortByDate));

  return rootComments;
};

const CommentDisplay: React.FC<{ comment: CommentNode; postId: string; onReply: (commentId: string) => void; currentUserId: string | null }> = 
  ({ comment, postId, onReply, currentUserId }) => {
    const [isLiking, setIsLiking] = useState(false);
    const hasLiked = currentUserId ? comment.likes?.includes(currentUserId) : false;

    const handleLike = async () => {
        if (!currentUserId || isLiking) return;
        setIsLiking(true);
        const commentRef = doc(db, "posts", postId, "comments", comment.id);
        try {
            await updateDoc(commentRef, {
                likes: hasLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
            });
        } catch (error) {
            console.error("Error updating like:", error);
            // Maybe show a toast error
        } finally {
            setIsLiking(false);
        }
    };
    
    const getInitials = (name: string | null | undefined): string => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
      <div className="flex space-x-3 py-4 border-b border-nexo-gray/20 last:border-b-0">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={comment.userAvatar || undefined} alt={comment.userName} />
          <AvatarFallback>{getInitials(comment.userName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-nexo-white">{comment.userName}</h4>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
            </p>
          </div>
          <p className="text-sm text-nexo-gray/90">{comment.text}</p>
          <div className="flex items-center space-x-3 pt-1">
            <Button variant="ghost" size="xs" onClick={handleLike} disabled={!currentUserId || isLiking} className="text-muted-foreground hover:text-nexo-blue px-1">
                {isLiking ? <Loader2 className="h-3 w-3 animate-spin" /> : <Heart className={`h-3 w-3 ${hasLiked ? 'fill-nexo-blue text-nexo-blue' : ''}`} />}
                <span className="ml-1 text-xs">{comment.likes?.length || 0}</span>
            </Button>
             <Button variant="ghost" size="xs" onClick={() => onReply(comment.id)} disabled={!currentUserId} className="text-muted-foreground hover:text-nexo-blue px-1">
                <MessageSquare className="h-3 w-3" />
                <span className="ml-1 text-xs">Reply</span>
            </Button>
          </div>
          {/* Recursively render replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="pl-6 mt-3 border-l border-nexo-blue/30">
              {comment.replies.map(reply => (
                <CommentDisplay key={reply.id} comment={reply} postId={postId} onReply={onReply} currentUserId={currentUserId} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // ID of the comment being replied to

  useEffect(() => {
    setLoading(true);
    setError(null);
    const commentsRef = collection(db, 'posts', postId, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedComments: Comment[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedComments.push({
          id: doc.id,
          text: data.text,
          userId: data.userId,
          userName: data.userName,
          userAvatar: data.userAvatar,
          createdAt: data.createdAt as Timestamp,
          parentCommentId: data.parentCommentId,
          likes: data.likes || [],
        });
      });
      setComments(buildCommentTree(fetchedComments));
      setLoading(false);
    }, (err) => {
      console.error("Error fetching comments:", err);
      setError('Failed to load comments.');
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [postId]);

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const handleCommentPosted = () => {
    setReplyingTo(null); // Close reply form after posting
  };

  return (
    <div className="mt-12 pt-8 border-t border-nexo-gray/30">
      <h2 className="text-2xl font-semibold mb-6 text-nexo-white">Comments ({comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)})</h2>

      {user && (
          <CommentForm postId={postId} parentCommentId={replyingTo} onCommentPosted={handleCommentPosted} onCancelReply={() => setReplyingTo(null)} />
      )}
      {!user && (
          <p className="text-muted-foreground text-sm mb-6">Please <button onClick={() => auth.signInWithRedirect(new (require('firebase/auth').GoogleAuthProvider)())} className="text-nexo-blue hover:underline">sign in</button> to comment.</p>
      )} 

      {loading && <div className="text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin inline-block mr-2"/>Loading comments...</div>}
      {error && <div className="text-center text-red-500 bg-red-900/30 p-3 rounded-md text-sm">{error}</div>}

      {!loading && !error && comments.length === 0 && (
        <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to share your thoughts!</p>
      )}

      {!loading && !error && comments.length > 0 && (
        <div className="space-y-0">
          {comments.map(comment => (
            <CommentDisplay key={comment.id} comment={comment} postId={postId} onReply={handleReplyClick} currentUserId={user?.uid || null} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection; 