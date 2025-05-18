import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import NewPostPage from "./pages/admin/NewPostPage";
import EditPostPage from "./pages/admin/EditPostPage";
import AdminPage from "./pages/admin/AdminPage";
import AuthPage from "@/pages/AuthPage";

// Placeholder imports for new pages (will be created later)
// const BlogListPage = () => <div>Blog List Page Placeholder</div>;
// const BlogPostPage = () => <div>Blog Post Page Placeholder</div>;
// const AdminPage = () => <div>Admin Dashboard Placeholder</div>;
// const NewPostPage = () => <div>New Post Page Placeholder</div>;
// const EditPostPage = () => <div>Edit Post Page Placeholder</div>;
// Placeholder for ProtectedRoute (will be created later)
// const ProtectedRoute = ({ children }) => children;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route 
              path="/blog/create" 
              element={ 
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/new"
              element={
                <ProtectedRoute>
                  <NewPostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/edit/:postId"
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes */}
            <Route path="/auth" element={<AuthPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
