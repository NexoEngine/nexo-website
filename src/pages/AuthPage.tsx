import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/');
        }
      }
    );

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkSession();

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 sm:py-16 bg-muted/30">
        <div className="w-full max-w-md px-4">
          <Card className="overflow-hidden shadow-lg">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 mx-auto">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground text-sm text-center mb-6">
                Sign in to your account or create a new one
              </p>
              
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  extend: false,
                  className: {
                    container: 'auth-container-custom',
                    button: 'auth-button-custom',
                    input: 'auth-input-custom',
                    label: 'auth-label-custom',
                    anchor: 'auth-anchor-custom',
                    message: 'auth-message-custom',
                  }
                }}
                providers={['google', 'github']}
                redirectTo={window.location.origin}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'Email address',
                      password_label: 'Password',
                      button_label: 'Sign in',
                      social_provider_text: 'Continue with {{provider}}',
                      link_text: 'Already have an account? Sign in',
                    },
                    sign_up: {
                      email_label: 'Email address',
                      password_label: 'Create a password',
                      button_label: 'Create account',
                      social_provider_text: 'Sign up with {{provider}}',
                      link_text: 'Don\'t have an account? Sign up',
                    },
                    forgotten_password: {
                      email_label: 'Email address',
                      button_label: 'Send reset instructions',
                      link_text: 'Forgot your password?',
                    },
                    update_password: {
                      password_label: 'New password',
                      button_label: 'Update password',
                    }
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </main>
      <Footer />
      
      <style>
        {`
          /* Base styling for the auth container */
          .auth-container-custom {
            font-family: inherit;
          }
          
          /* Button styling */
          .auth-button-custom {
            position: relative;
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1.25rem;
            overflow: hidden;
            transition: all 0.2s ease;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
          }
          
          .auth-button-custom:hover {
            opacity: 0.9;
          }
          
          /* Social auth buttons */
          .auth-container-custom [data-provider] {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            border: 1px solid hsl(var(--border));
          }
          
          .auth-container-custom [data-provider]:hover {
            background: hsl(var(--muted));
          }
          
          /* Input styling */
          .auth-input-custom {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-top: 0.25rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            border: 1px solid hsl(var(--border));
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          
          .auth-input-custom:focus {
            outline: none;
            border-color: hsl(var(--ring));
            box-shadow: 0 0 0 2px hsla(var(--ring) / 0.2);
          }
          
          /* Label styling */
          .auth-label-custom {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
            color: hsl(var(--foreground));
          }
          
          /* Link styling */
          .auth-anchor-custom {
            font-size: 0.875rem;
            color: hsl(var(--primary));
            text-decoration: none;
          }
          
          .auth-anchor-custom:hover {
            text-decoration: underline;
          }
          
          /* Divider styling */
          .auth-container-custom [data-supabase-auth-ui-divider="true"] {
            display: flex;
            align-items: center;
            margin: 1rem 0;
            color: hsl(var(--muted-foreground));
            font-size: 0.875rem;
          }
          
          .auth-container-custom [data-supabase-auth-ui-divider="true"]::before,
          .auth-container-custom [data-supabase-auth-ui-divider="true"]::after {
            content: "";
            flex: 1;
            height: 1px;
            background: hsl(var(--border));
          }
          
          .auth-container-custom [data-supabase-auth-ui-divider="true"]::before {
            margin-right: 0.75rem;
          }
          
          .auth-container-custom [data-supabase-auth-ui-divider="true"]::after {
            margin-left: 0.75rem;
          }
          
          /* Error message styling */
          .auth-message-custom[data-supabase-auth-ui-message="true"] {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding: 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            background: hsl(var(--destructive) / 0.1);
            color: hsl(var(--destructive));
            border: 1px solid hsl(var(--destructive) / 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage; 