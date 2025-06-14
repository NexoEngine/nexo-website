# NEXO VR Game Engine - Documentation Website

Built with [Astro Starlight](https://starlight.astro.build) for fast, accessible documentation.

## 🎯 Project Overview

This is the official documentation and marketing website for NEXO VR Game Engine - the next generation open-source game engine built specifically for VR headset developers.

### Features
- 📚 Comprehensive VR development documentation
- 📝 Developer blog with VR insights and tutorials  
- 🎨 NEXO-branded design system with VR theming
- ⚡ Fast static site generation with Astro
- 📱 Mobile-responsive design
- 🔍 Built-in search functionality

## 🚀 Project Structure

```
.
├── public/                 # Static assets (favicons, images)
├── src/
│   ├── assets/            # Project assets (logos, hero images)
│   ├── content/           # Content collections
│   │   ├── docs/          # Documentation pages
│   │   └── blog/          # Blog posts
│   ├── layouts/           # Astro layouts
│   ├── pages/             # Custom pages (blog system)
│   └── styles/            # Global CSS and design system
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📝 Content Management

### Documentation
- Add new docs in `src/content/docs/`
- Organize with folders (getting-started, guides, reference)
- Use frontmatter for titles and descriptions

### Blog Posts  
- Create new posts in `src/content/blog/`
- Include frontmatter: title, description, author, publishedAt, tags
- Supports featured posts and related content

## 🎨 Design System

The site uses a custom NEXO design system with:
- VR-themed color palette (nexo-blue, nexo-chrome, etc.)
- Chrome and metallic UI elements
- Responsive grid layouts
- Custom animations and effects

## 🔧 Development

This project was migrated from a React/Vite application to Astro Starlight for better performance and SEO. The migration includes:

- ✅ Static site generation 
- ✅ Content collections for blog management
- ✅ NEXO design system preservation
- ✅ VR development documentation structure
- ✅ SEO optimization and meta tags

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)
- [NEXO Engine Repository](https://github.com/NexoEngine/game-engine)