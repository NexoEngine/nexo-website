---
title: Creating Your First VR Scene
description: Learn how to build an immersive VR environment from scratch using NEXO's intuitive tools.
---

# Creating Your First VR Scene

Learn how to build an immersive VR environment from scratch using NEXO's intuitive tools. This comprehensive guide will take you through creating a complete VR scene with interactions, lighting, and audio.

## Overview

In this tutorial, you'll create:
- A realistic VR environment (outdoor scene)
- Interactive objects with physics
- Spatial audio effects
- Comfort features for VR

**Estimated Time**: 30-45 minutes  
**Difficulty**: Beginner  
**Prerequisites**: Completed [Quick Start Guide](/getting-started/quick-start/)

## Step 1: Project Setup

### Create New Scene Project

```bash
nexo new VRSceneDemo --template empty-scene
cd VRSceneDemo
nexo open
```

Or use the VR interface:
1. Put on your headset
2. Menu → "New Project" → "Empty Scene Template"
3. Name it "VRSceneDemo"

### Scene Configuration

Set up basic scene properties:

1. **Scene Settings**: Menu → "Scene" → "Settings"
2. **Environment**: Select "Outdoor" → "Forest Clearing"
3. **Time of Day**: Set to "Golden Hour" for warm lighting
4. **Weather**: Clear skies with light wind

## Step 2: Building the Environment

### Terrain Creation

1. **Add Terrain**:
   - Asset Library → "Terrain" → "Hilly Terrain"
   - Place in center of scene
   - Scale to 100x100 units

2. **Terrain Sculpting** (In VR):
   - Select terrain with trigger
   - Sculpt Tool → "Raise/Lower"
   - Create hills and valleys with hand gestures

3. **Texture Painting**:
   - Switch to Paint Tool
   - Apply grass, dirt, and rock textures
   - Blend naturally using controller movements

### Adding Vegetation

```javascript
// Script: VegetationPlacer.cs
using NEXO;
using NEXO.Environment;

public class VegetationPlacer : MonoBehaviour 
{
    public GameObject[] treePrefabs;
    public int treeCount = 50;
    
    void Start() 
    {
        PlaceVegetation();
    }
    
    void PlaceVegetation() 
    {
        for (int i = 0; i < treeCount; i++) 
        {
            Vector3 position = GetRandomPosition();
            Quaternion rotation = GetRandomRotation();
            
            GameObject tree = Instantiate(treePrefabs[Random.Range(0, treePrefabs.Length)]);
            tree.transform.position = position;
            tree.transform.rotation = rotation;
        }
    }
}
```

### Manual Tree Placement

1. **Asset Library** → "Nature" → "Trees"
2. **Select Tree Type**: Oak, Pine, or Birch
3. **Place Trees**: Point and trigger to place around scene
4. **Vary Rotation**: Grab trees and rotate for natural look

## Step 3: Lighting Setup

### Sun Light Configuration

1. **Main Light**: Already present in outdoor template
2. **Sun Angle**: Adjust for golden hour (45° elevation)
3. **Color Temperature**: Warm orange (3200K)
4. **Intensity**: Medium-high for outdoor scene

### Additional Lighting

```yaml
# Lighting Configuration
lights:
  sun:
    type: directional
    intensity: 1.2
    color: "#FFE4B5"  # Warm white
    shadows: true
    cascades: 4
    
  fill:
    type: hemisphere
    skyColor: "#87CEEB"   # Sky blue
    groundColor: "#8B4513" # Brown earth
    intensity: 0.3
    
  rim:
    type: directional
    intensity: 0.5
    color: "#FFB347"  # Peach
    angle: 135        # Behind player
```

### Real-time Lighting

1. **Global Illumination**: Enable real-time GI
2. **Light Probes**: Auto-place for dynamic objects
3. **Reflection Probes**: Add near water/reflective surfaces

## Step 4: Interactive Objects

### Campfire Setup

Create an interactive campfire:

1. **Base Structure**:
   - Asset Library → "Props" → "Stone Ring"
   - Add logs inside the ring

2. **Fire Effect**:
   - Effects → "Fire" → "Campfire"
   - Adjust particle size and intensity

3. **Interaction Script**:
   ```csharp
   using NEXO.Interaction;
   
   public class Campfire : InteractableObject 
   {
       public ParticleSystem fireEffect;
       public AudioSource crackling;
       public Light fireLight;
       
       private bool isLit = false;
       
       public override void OnHandHover(Hand hand) 
       {
           // Show "Light Fire" prompt
           ShowTooltip("Light Fire");
       }
       
       public override void OnTriggerPressed(Hand hand) 
       {
           ToggleFire();
       }
       
       void ToggleFire() 
       {
           isLit = !isLit;
           fireEffect.Play(isLit);
           crackling.enabled = isLit;
           fireLight.enabled = isLit;
       }
   }
   ```

### Grabbable Objects

Add objects players can pick up:

1. **Add Rocks**:
   - Place several rocks around scene
   - Add "Grabbable" component to each
   - Enable physics with Rigidbody

2. **Throwable Configuration**:
   ```csharp
   // On each rock object
   var grabbable = rock.GetComponent<Grabbable>();
   grabbable.throwMultiplier = 1.5f;
   grabbable.rotationMode = GrabRotationMode.LookAt;
   ```

## Step 5: Spatial Audio

### Ambient Soundscape

1. **Background Audio**:
   - Audio → "Ambience" → "Forest Sounds"
   - Set to 3D with wide range
   - Loop indefinitely

2. **Positional Sounds**:
   ```csharp
   // Wind through trees
   var windSource = AddAudioSource("wind_trees.wav");
   windSource.spatialBlend = 1.0f;  // Fully 3D
   windSource.rolloffMode = AudioRolloffMode.Logarithmic;
   windSource.maxDistance = 50f;
   ```

### Interactive Audio

1. **Footstep System**:
   - Detect ground material type
   - Play appropriate footstep sounds
   - Vary pitch and volume based on movement speed

2. **Physics Audio**:
   - Rocks hitting ground
   - Wood collision sounds
   - Water splash effects

## Step 6: Player Comfort

### Locomotion Settings

Configure comfortable movement:

```yaml
playerSettings:
  locomotion:
    type: "teleport"          # Primary movement
    smoothTurn: false         # Use snap turning
    snapAngle: 30            # Degrees per turn
    fadeOnTeleport: true     # Reduce motion sickness
    
  comfort:
    vignette: true           # Reduce FOV during movement
    groundPlane: true        # Show valid teleport areas
    heightOffset: 0.1        # Slight elevation for comfort
```

### Boundary System

1. **Play Area Visualization**:
   - Show boundaries when player approaches edge
   - Fade out when in safe zone
   - Use familiar grid pattern

2. **Safe Zone Indicators**:
   ```csharp
   public class SafeZoneManager : MonoBehaviour 
   {
       public float warningDistance = 1.0f;
       public GameObject boundaryEffect;
       
       void Update() 
       {
           float distanceToEdge = GetDistanceToPlayAreaEdge();
           
           if (distanceToEdge < warningDistance) 
           {
               ShowBoundaryWarning();
           }
           else 
           {
               HideBoundaryWarning();
           }
       }
   }
   ```

## Step 7: Testing and Iteration

### Play Testing

1. **Enter Play Mode**: Grip + Y or Menu → "Play"
2. **Test Interactions**:
   - Try grabbing and throwing objects
   - Test locomotion system
   - Check audio positioning

3. **Comfort Check**:
   - Move around for 5-10 minutes
   - Note any discomfort
   - Adjust settings as needed

### Performance Monitoring

```bash
# Monitor frame rate and performance
nexo monitor --scene

# Check VR-specific metrics
nexo profile --vr --duration 60
```

### Common Issues

**Frame Rate Drops**:
- Reduce draw calls by combining meshes
- Use LOD system for distant objects
- Optimize texture sizes

**Tracking Issues**:
- Ensure good lighting in play area
- Check for reflective surfaces
- Calibrate tracking if needed

## Step 8: Building and Sharing

### Build Configuration

```bash
# Build for Quest
nexo build --platform quest --optimization release

# Build for SteamVR
nexo build --platform steamvr --quality ultra

# Build for multiple platforms
nexo build --platforms quest,steamvr,psvr
```

### Optimization for Target Platform

**Quest Optimization**:
- Reduce polygon count
- Use mobile-friendly shaders
- Limit simultaneous particle effects

**PC VR Optimization**:
- Higher quality textures
- Advanced lighting effects
- More complex interactions

## Next Steps

Congratulations! You've created your first VR scene. Continue learning with:

### Advanced Tutorials
- [VR Interactions](/guides/vr-interactions/) - Complex interaction systems
- [Physics & Collisions](/guides/physics/) - Advanced physics simulation
- [Audio in VR](/guides/audio/) - Professional spatial audio
- [Performance Optimization](/guides/performance/) - Keep frames smooth

### Community Resources
- Share your scene on [Discord](https://discord.gg/nexo)
- Get feedback from other developers
- Contribute to the [NEXO Asset Store](https://assets.nexoengine.com)

### Expanding Your Scene

Ideas to enhance your forest scene:
- **Wildlife**: Add animated animals with AI
- **Weather**: Dynamic weather system
- **Day/Night Cycle**: Time progression system
- **Quests**: Simple objectives for players
- **Multiplayer**: Share the space with others

You now have the foundation to create amazing VR experiences with NEXO! 🌲🔥