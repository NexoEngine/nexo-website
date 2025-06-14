---
title: Quick Start Guide
description: Get up and running with NEXO in under 10 minutes with this comprehensive quick start guide.
---

# Quick Start Guide

Get up and running with NEXO in under 10 minutes! This guide assumes you've already completed the [installation process](/getting-started/installation/).

## 1. Launch NEXO

Put on your VR headset and launch NEXO:

```bash
nexo launch
```

You should see the NEXO welcome environment in VR - a comfortable virtual workspace designed for development.

## 2. Create Your First Project

### Using the VR Interface

1. **Open Project Menu**: Point at the floating "New Project" panel
2. **Select Template**: Choose "VR Scene Template" 
3. **Name Your Project**: Use the virtual keyboard to enter "MyFirstVRGame"
4. **Create**: Point and click the "Create Project" button

### Using Command Line

Alternatively, you can create a project from your computer:

```bash
nexo new MyFirstVRGame --template vr-scene
cd MyFirstVRGame
nexo open
```

## 3. Explore the Interface

### Main Workspace

- **Scene View**: The main 3D environment where you build
- **Inspector Panel**: Properties of selected objects (right hand)
- **Asset Library**: Pre-made objects and materials (left hand)
- **Timeline**: Animation and sequence controls (bottom)

### Navigation

- **Teleport**: Point controller down and squeeze trigger
- **Fly Mode**: Hold both grip buttons and move controllers
- **Scale**: Pinch controllers together/apart to resize view
- **Menu**: Press the menu button for tool palette

## 4. Add Your First Objects

### Create a Cube

1. **Open Asset Library**: Grab the left floating panel
2. **Find Primitives**: Navigate to "Primitives" → "Cube"
3. **Place Object**: Point where you want it and trigger to place
4. **Manipulate**: Grab the cube with trigger to move, rotate, scale

### Add Lighting

1. **Access Lighting**: Menu → "Lighting" → "Point Light"
2. **Position Light**: Place it above your cube
3. **Adjust Properties**: Select light, use Inspector to change color/intensity

### Create Materials

1. **Open Materials**: Asset Library → "Materials"
2. **Choose Material**: Select "Metallic" or "Glass"
3. **Apply**: Drag material onto your cube

## 5. Test Your Scene

### Play Mode

1. **Enter Play Mode**: Menu → "Play" or grip + Y button
2. **Interact**: Walk around, grab objects, test interactions
3. **Exit Play Mode**: Press the same button combination

### Quick Iteration

- Changes are applied in real-time
- No need to compile or reload
- Experiment freely!

## 6. Add Interactivity

### Make Objects Grabbable

1. **Select Object**: Point and trigger on your cube
2. **Add Component**: Inspector → "Add Component" → "Grabbable"
3. **Test**: Enter play mode and try grabbing the cube

### Add Physics

1. **Physics Component**: Inspector → "Add Component" → "Rigidbody"
2. **Collider**: Add "Box Collider" component
3. **Test**: The cube now responds to gravity and collisions

## 7. Save Your Work

### Auto-Save

NEXO automatically saves your work every 30 seconds, but you can manually save:

1. **Quick Save**: Menu → "File" → "Save" or Ctrl+S gesture
2. **Save As**: Create different versions of your project

### Version Control

Enable Git integration:

```bash
nexo git init
nexo git commit -m "My first VR scene"
```

## 8. Build and Share

### Build for Your Platform

1. **Build Menu**: Menu → "Build" → "Build Settings"
2. **Select Platform**: Choose your target (Quest, SteamVR, etc.)
3. **Build**: Click "Build" and wait for completion

### Quick Build

```bash
nexo build --platform quest --output MyGame.apk
```

## What's Next?

Now that you've created your first VR scene, explore these topics:

### Essential Guides
- [VR Setup Configuration](/getting-started/vr-setup/) - Optimize for your headset
- [Creating Your First VR Scene](/guides/first-vr-scene/) - Detailed scene creation
- [VR Interactions](/guides/vr-interactions/) - Advanced interaction systems

### Advanced Topics
- [Physics & Collisions](/guides/physics/) - Realistic object behavior
- [Audio in VR](/guides/audio/) - Spatial sound design
- [Performance Optimization](/guides/performance/) - Keep your game running smoothly

### Community
- Join our [Discord server](https://discord.gg/nexo) for real-time help
- Share your creations on [r/NexoEngine](https://reddit.com/r/NexoEngine)
- Contribute to the project on [GitHub](https://github.com/NexoEngine/game-engine)

## Common First-Time Issues

**Can't see the NEXO interface**
- Ensure your VR headset is properly connected
- Check that your VR runtime is active
- Try restarting NEXO: `nexo restart`

**Performance is choppy**
- Lower the graphics quality: Menu → Settings → Graphics → Quality
- Check system requirements in [installation guide](/getting-started/installation/)
- Close other VR applications

**Controllers not working**
- Verify controller batteries
- Recalibrate in your VR settings
- Restart VR runtime and NEXO

## Tips for Success

1. **Start Small**: Begin with simple scenes and gradually add complexity
2. **Experiment Often**: Use play mode frequently to test ideas
3. **Save Regularly**: Even with auto-save, manual saves are good practice
4. **Join the Community**: Learn from other developers and share your progress
5. **Read Documentation**: Each component has detailed help available

Happy VR developing! 🚀