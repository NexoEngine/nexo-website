import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast"; // Or Sonner if preferred
import { Loader2 } from 'lucide-react';

// Define the shape of the form data
const postSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters long." }),
  tags: z.string().optional(), // Comma-separated tags for simplicity
  status: z.enum(['draft', 'published'])
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  initialData?: Partial<PostFormData> & { id?: string }; // Include id if editing
  onSubmit: (data: PostFormData, status: 'draft' | 'published') => Promise<void>;
  isSubmitting: boolean;
}

const PostEditor: React.FC<PostEditorProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      tags: initialData?.tags || '', // Expecting comma-separated string
      status: initialData?.status || 'draft',
    },
  });

  // Reset form if initialData changes (e.g., when navigating between edit pages)
  useEffect(() => {
    reset({
      title: initialData?.title || '',
      content: initialData?.content || '',
      tags: initialData?.tags || '',
      status: initialData?.status || 'draft',
    });
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<PostFormData> = async (data) => {
    // The status will be set by the button clicked
    // This handler might not be directly used if buttons trigger onSubmit directly
    console.log("Form submitted with data:", data);
  };

  const triggerSubmit = async (status: 'draft' | 'published') => {
    // Manually set the status field before validation and submission
    setValue('status', status);
    
    handleSubmit(async (data) => {
      await onSubmit(data, status);
      // Optionally reset form after successful submission
      // if (!initialData?.id) { // Only reset fully on create, not edit
      //   reset(); 
      // }
    })(); // Immediately invoke the handler returned by handleSubmit
  };

  return (
    <Card className="nexo-card border-nexo-blue/30 bg-nexo-darkBlue/70">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Edit Post' : 'Create New Post'}</CardTitle>
        <CardDescription>
          Fill in the details for your blog post. Use Markdown for formatting.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}> { /* Prevent default form submission */ }
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter post title"
              className="bg-nexo-darkBlue/50 border-nexo-gray/50 focus:border-nexo-blue focus:ring-nexo-blue"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="e.g., vr, development, update"
              className="bg-nexo-darkBlue/50 border-nexo-gray/50 focus:border-nexo-blue focus:ring-nexo-blue"
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="Write your post content here using Markdown..."
              rows={15}
              className="bg-nexo-darkBlue/50 border-nexo-gray/50 focus:border-nexo-blue focus:ring-nexo-blue"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            type="button" // Important: type="button" to prevent default form submission
            variant="outline"
            onClick={() => triggerSubmit('draft')}
            disabled={isSubmitting}
            className="nexo-btn-outline"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Draft
          </Button>
          <Button
            type="button" // Important: type="button"
            onClick={() => triggerSubmit('published')}
            disabled={isSubmitting}
            className="nexo-btn-primary"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {initialData?.status === 'published' ? 'Update Published Post' : 'Publish'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostEditor; 