---
layout: home

hero:
  name: NEXO Engine
  text: Welcome Portal Documentation
  tagline: Open-source game engine for desktop and virtual reality development
  image:
    src: /nexo-logo.png
    alt: NEXO Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/NexoEngine/game-engine

features:
  - icon: 🎮
    title: Game Engine Core
    details: Modern C++ game engine with Entity Component System (ECS) architecture for efficient game development
  - icon: 🖥️
    title: Integrated Editor
    details: Built-in editor powered by ImGui for scene creation and game object management
  - icon: 🎨
    title: Advanced Rendering
    details: OpenGL 4.0+ renderer with batch rendering, 2D/3D support, and shader customization
  - icon: 🌐
    title: Cross-Platform
    details: Supports desktop and VR platforms with CMake build system
  - icon: 📜
    title: C# Scripting
    details: Integrated .NET SDK 9.0 support for game logic scripting
  - icon: 🚀
    title: Welcome Portal
    details: React-based web portal with authentication, blog system, and 3D visualization
---

## Quick Start

### Engine Installation

```bash
# Clone the game engine repository
git clone https://github.com/NexoEngine/game-engine.git
cd game-engine

# Initialize submodules
git submodule init
git pull --recurse-submodules

# Build with CMake
cmake --workflow --preset=build-debug
```

### Welcome Portal Setup

```bash
# Clone the welcome portal
git clone https://github.com/nexo/welcome-portal.git
cd welcome-portal

# Install dependencies
yarn install

# Configure environment
cp .env.example .env

# Start development
yarn dev
```

## Architecture Overview

NEXO Engine combines a powerful C++ game engine with a modern web portal:

```mermaid
graph TB
    subgraph "NEXO Engine Core"
        A[C++ Game Engine] --> B[Entity Component System]
        A --> C[OpenGL Renderer]
        A --> D[Physics Engine]
        A --> E[C# Scripting]
        F[ImGui Editor] --> A
    end
    
    subgraph "Welcome Portal"
        G[React Frontend] --> H[Authentication]
        G --> I[Blog System]
        G --> J[3D Visualization]
        H --> K[Supabase Backend]
    end
    
    A --> L[Game Export]
    L --> G
```

## Why NEXO Engine?

NEXO Engine is an innovative game development platform created by five EPITECH Strasbourg students:

- **Modern Architecture**: Entity Component System for flexible game development
- **Integrated Tools**: Built-in editor with scene management and object creation
- **Cross-Platform**: Desktop and VR support with optimized rendering
- **Open Source**: MIT licensed with active community development
- **Web Integration**: Welcome Portal for showcasing and distributing games