# API Reference

NEXO provides APIs for both the game engine (C++) and the Welcome Portal (Web).

## Engine API (C++)

The NEXO Engine exposes a comprehensive C++ API for game development:

### Core Systems

```cpp
#include <nexo/core.h>

// Initialize the engine
Nexo::Engine engine;
engine.Initialize();

// Access core systems
auto& coordinator = engine.GetCoordinator();
auto& renderer = engine.GetRenderer();
auto& physics = engine.GetPhysics();
```

### Entity Management

```cpp
// Create entities
Entity player = coordinator.CreateEntity();
Entity enemy = coordinator.CreateEntity();

// Add components
coordinator.AddComponent<Transform>(player, 
    Transform{.position = {0, 0, 0}, .rotation = {0, 0, 0}, .scale = {1, 1, 1}});
coordinator.AddComponent<RigidBody>(player, 
    RigidBody{.mass = 75.0f, .velocity = {0, 0, 0}});
```

### Rendering API

```cpp
// Begin rendering
renderer.BeginScene(camera);

// Draw primitives
renderer.DrawQuad({0, 0}, {100, 100}, Color::Red);
renderer.DrawModel(model, transform, material);

// End rendering
renderer.EndScene();
```

## Portal API (REST)

The Welcome Portal uses Supabase, providing a RESTful API:

### Base URL

```
https://[YOUR_PROJECT_REF].supabase.co/rest/v1/
```

### Authentication

All API requests require authentication:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Authentication

### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password',
  options: {
    data: {
      full_name: 'John Doe'
    }
  }
})
```

### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password'
})
```

### Sign Out

```typescript
const { error } = await supabase.auth.signOut()
```

## Database Operations

### Blog Posts

#### Get All Posts

```typescript
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('status', 'published')
  .order('created_at', { ascending: false })
```

#### Get Single Post

```typescript
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('id', postId)
  .single()
```

#### Create Post

```typescript
const { data, error } = await supabase
  .from('blog_posts')
  .insert({
    title: 'New Post',
    content: 'Post content...',
    status: 'draft',
    author_id: userId
  })
  .select()
```

#### Update Post

```typescript
const { data, error } = await supabase
  .from('blog_posts')
  .update({
    title: 'Updated Title',
    content: 'Updated content...',
    status: 'published'
  })
  .eq('id', postId)
  .select()
```

### Comments

#### Get Comments for Post

```typescript
const { data, error } = await supabase
  .from('comments')
  .select(`
    *,
    author:author_id (
      id,
      email
    )
  `)
  .eq('post_id', postId)
  .order('created_at', { ascending: true })
```

#### Add Comment

```typescript
const { data, error } = await supabase
  .from('comments')
  .insert({
    post_id: postId,
    content: 'Great post!',
    author_id: userId
  })
  .select()
```

## Real-time Subscriptions

### Subscribe to New Posts

```typescript
const subscription = supabase
  .channel('posts')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'blog_posts'
    },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()
```

### Subscribe to Comments

```typescript
const subscription = supabase
  .channel('comments')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'comments',
      filter: `post_id=eq.${postId}`
    },
    (payload) => {
      console.log('Comment change:', payload)
    }
  )
  .subscribe()
```

## Storage

### Upload File

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`public/${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true
  })
```

### Get Public URL

```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`public/${userId}/avatar.png`)
```

## Error Handling

All API calls return an error object when something goes wrong:

```typescript
interface Error {
  message: string
  status: number
  code: string
}
```

Example error handling:

```typescript
try {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
  
  if (error) throw error
  
  // Use data
} catch (error) {
  console.error('Error fetching posts:', error.message)
  // Handle error appropriately
}
```

## Rate Limiting

Supabase implements rate limiting to prevent abuse:

- **Anonymous requests**: 60 requests per minute
- **Authenticated requests**: 300 requests per minute

## Response Format

All successful responses follow this format:

```json
{
  "data": [...],
  "error": null
}
```

Error responses:

```json
{
  "data": null,
  "error": {
    "message": "Error description",
    "status": 400,
    "code": "ERROR_CODE"
  }
}
```