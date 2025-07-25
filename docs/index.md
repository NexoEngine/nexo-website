---
layout: home

hero:
  name: "NEXO"
  text: "Welcome Portal Documentation"
  tagline: Next-generation immersive experience platform
  image:
    src: /nexo-logo.png
    alt: NEXO Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/nexo

features:
  - icon: 🚀
    title: Fast & Modern
    details: Built with React, TypeScript, and Vite for blazing fast development and optimal performance
  - icon: 🎨
    title: Beautiful UI
    details: Stunning design with Tailwind CSS and shadcn/ui components for a polished user experience
  - icon: 🔐
    title: Secure Authentication
    details: Powered by Supabase for robust authentication and database management
  - icon: 📝
    title: Blog System
    details: Full-featured blog with admin capabilities, markdown support, and syntax highlighting
  - icon: 🌍
    title: 3D Graphics
    details: Immersive 3D experiences with Three.js and React Three Fiber
  - icon: 📱
    title: Responsive Design
    details: Mobile-first approach ensuring perfect display across all devices
---

## Quick Start

Get up and running with NEXO in minutes:

```bash
# Clone the repository
git clone https://github.com/nexo/welcome-portal.git

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env

# Start development server
yarn dev
```

## Architecture Overview

NEXO is built with modern web technologies:

```mermaid
graph TD
    A[React Frontend] --> B[Vite Build Tool]
    A --> C[TypeScript]
    A --> D[Tailwind CSS]
    A --> E[shadcn/ui]
    A --> F[Three.js]
    G[Supabase] --> H[Authentication]
    G --> I[Database]
    G --> J[Storage]
    A --> G
```

## Why NEXO?

NEXO provides a complete solution for building immersive web experiences with:

- **Developer Experience**: Hot module replacement, TypeScript support, and modern tooling
- **Performance**: Optimized builds with code splitting and lazy loading
- **Scalability**: Modular architecture that grows with your needs
- **Security**: Built-in authentication and security best practices