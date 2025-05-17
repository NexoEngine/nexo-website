import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const commentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty.").max(1000, "Comment cannot exceed 1000 characters."),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  parentCommentId?: string | null; // ID of the comment being replied to, if any
  onCommentPosted: () => void; // Callback after posting
  onCancelReply?: () => void; // Callback to cancel replying state
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, parentCommentId, onCommentPosted, onCancelReply }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentFormData> = async (data) => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to comment.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const commentsRef = collection(db, 'posts', postId, 'comments');
      await addDoc(commentsRef, {
        text: data.text,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userAvatar: user.photoURL,
        createdAt: serverTimestamp(),
        parentCommentId: parentCommentId || null,
        likes: [], // Initialize likes array
      });
      reset(); // Clear the form
      onCommentPosted(); // Trigger callback (e.g., to close reply form)
      toast({ title: "Success", description: parentCommentId ? "Reply posted." : "Comment posted." });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({ title: "Error", description: "Failed to post comment. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`mb-6 ${parentCommentId ? 'ml-10 p-4 border border-nexo-blue/30 rounded-md bg-nexo-darkBlue/30' : ''}`}>
        {parentCommentId && <p className="text-xs text-muted-foreground mb-2">Replying...</p>} 
      <div className="space-y-3">
        <Textarea
          {...register('text')}
          placeholder={parentCommentId ? "Write your reply..." : "Add a comment..."}
          rows={3}
          className="bg-nexo-darkBlue/50 border-nexo-gray/50 focus:border-nexo-blue focus:ring-nexo-blue"
        />
        {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
        <div className="flex justify-end items-center gap-2">
            {parentCommentId && onCancelReply && (
                <Button type="button" variant="ghost" size="sm" onClick={onCancelReply} className="text-muted-foreground hover:text-nexo-white">Cancel</Button>
            )}
            <Button type="submit" disabled={isSubmitting} className="nexo-btn-primary">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {parentCommentId ? 'Post Reply' : 'Post Comment'}
            </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm; 