export interface Post {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  published_at: string;
  status: string;
  author_id?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string; // ISO string
}

export interface Profile {
  id: string;
  username?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
  is_admin?: boolean;
}

export interface CommentWithProfile extends Comment {
  username?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
} 