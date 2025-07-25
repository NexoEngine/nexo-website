# Mermaid Diagram Examples

This page demonstrates various Mermaid diagrams that you can use in your documentation.

## Flow Chart

```mermaid
flowchart TD
    A[User visits NEXO] --> B{Authenticated?}
    B -->|Yes| C[Dashboard]
    B -->|No| D[Login Page]
    D --> E[Enter Credentials]
    E --> F{Valid?}
    F -->|Yes| C
    F -->|No| G[Show Error]
    G --> D
    C --> H[Browse Content]
    C --> I[Create Post]
    C --> J[Manage Profile]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Supabase
    participant Database
    
    User->>Frontend: Click "Create Post"
    Frontend->>Frontend: Validate form data
    Frontend->>Supabase: POST /blog_posts
    Supabase->>Database: INSERT INTO blog_posts
    Database-->>Supabase: Return new post
    Supabase-->>Frontend: Return response
    Frontend-->>User: Show success message
```

## Class Diagram

```mermaid
classDiagram
    class BlogPost {
        +String id
        +String title
        +String content
        +String status
        +String author_id
        +DateTime created_at
        +DateTime updated_at
        +publish()
        +unpublish()
        +update()
    }
    
    class Comment {
        +String id
        +String post_id
        +String content
        +String author_id
        +DateTime created_at
        +delete()
    }
    
    class User {
        +String id
        +String email
        +String full_name
        +String avatar_url
        +updateProfile()
    }
    
    BlogPost "1" --> "*" Comment : has
    User "1" --> "*" BlogPost : writes
    User "1" --> "*" Comment : creates
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Published: Publish
    Published --> Draft: Unpublish
    Published --> Archived: Archive
    Archived --> Published: Restore
    Archived --> [*]: Delete
    
    state Published {
        [*] --> Visible
        Visible --> Featured: Feature
        Featured --> Visible: Unfeature
    }
```

## Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ BLOG_POST : writes
    USER ||--o{ COMMENT : creates
    BLOG_POST ||--o{ COMMENT : has
    
    USER {
        uuid id PK
        string email
        string full_name
        string avatar_url
        timestamp created_at
    }
    
    BLOG_POST {
        uuid id PK
        string title
        text content
        string status
        uuid author_id FK
        timestamp created_at
        timestamp updated_at
    }
    
    COMMENT {
        uuid id PK
        uuid post_id FK
        text content
        uuid author_id FK
        timestamp created_at
    }
```

## Gantt Chart

```mermaid
gantt
    title NEXO Development Roadmap
    dateFormat YYYY-MM-DD
    section Phase 1
    Authentication System    :done,    des1, 2024-01-01, 2024-01-15
    Blog System             :done,    des2, 2024-01-10, 2024-01-25
    Admin Dashboard         :done,    des3, 2024-01-20, 2024-02-05
    
    section Phase 2
    3D Graphics Integration :active,  des4, 2024-02-01, 2024-02-20
    Real-time Features      :         des5, 2024-02-15, 2024-03-01
    Mobile Optimization     :         des6, 2024-02-25, 2024-03-10
    
    section Phase 3
    Analytics Dashboard     :         des7, 2024-03-05, 2024-03-20
    API v2                  :         des8, 2024-03-15, 2024-04-01
    Performance Optimization:         des9, 2024-03-25, 2024-04-10
```

## Pie Chart

```mermaid
pie title Technology Distribution in NEXO
    "React Components" : 35
    "TypeScript" : 25
    "Styling (CSS/Tailwind)" : 20
    "Backend Logic" : 15
    "Testing" : 5
```

## Git Graph

```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add authentication"
    commit id: "Add blog system"
    branch feature/3d-graphics
    checkout feature/3d-graphics
    commit id: "Add Three.js"
    commit id: "Create VR headset"
    checkout develop
    merge feature/3d-graphics
    checkout main
    merge develop
    commit id: "Release v1.0"
```

## Journey Map

```mermaid
journey
    title User Journey in NEXO
    section Landing
      Visit Homepage: 5: User
      View Features: 4: User
      Click Get Started: 5: User
    section Authentication
      Enter Credentials: 3: User
      Wait for Verification: 2: User
      Access Dashboard: 5: User
    section Content Creation
      Click Create Post: 5: User
      Write Content: 4: User
      Add Formatting: 4: User
      Publish Post: 5: User
    section Engagement
      View Analytics: 5: User
      Read Comments: 4: User
      Reply to Feedback: 4: User
```

## Tips for Using Mermaid

1. **Keep it Simple**: Don't overcomplicate diagrams
2. **Use Clear Labels**: Make node labels descriptive
3. **Choose the Right Type**: Select diagram type based on what you're explaining
4. **Test Rendering**: Always preview your diagrams
5. **Responsive Design**: Consider how diagrams look on mobile devices