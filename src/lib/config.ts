// Configuration for environment-specific URLs

export const getDocumentationUrl = () => {
  // In development, use the VitePress dev server port
  if (import.meta.env.DEV) {
    return 'http://localhost:5173';
  }
  
  // In production, use the production domain
  return 'https://www.nexo-engine.com/docs';
};

export const config = {
  documentationUrl: getDocumentationUrl(),
};