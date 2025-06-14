---
title: VR Setup Configuration
description: Configure NEXO for optimal performance with your specific VR headset and system.
---

# VR Setup Configuration

Configure NEXO for optimal performance with your specific VR headset and system. This guide covers setup for all major VR platforms.

## General VR Settings

### Performance Configuration

Access VR settings through the NEXO interface:

1. **Open Settings**: Menu → "Settings" → "VR Configuration"
2. **Performance Profile**: Choose based on your system:
   - **Ultra**: RTX 3080+ / RX 6800 XT+
   - **High**: RTX 3070 / RX 6700 XT
   - **Medium**: RTX 2070 / RX 5700 XT
   - **Low**: GTX 1060 / RX 580

### Rendering Settings

```yaml
# Example VR config (nexo.config.yml)
vr:
  renderScale: 1.2          # Supersampling (1.0 = native)
  refreshRate: 90           # Target frame rate
  foveatedRendering: true   # Reduce peripheral rendering
  asyncSpaceWarp: true      # Motion smoothing
  multiview: true           # Stereo rendering optimization
```

## Platform-Specific Setup

### Meta Quest 2/3 Configuration

#### Quest Link Setup

1. **USB Connection**:
   - Use USB 3.0+ cable
   - Enable "Quest Link" in Quest settings
   - Allow USB debugging

2. **Air Link Setup** (Wireless):
   - Connect Quest and PC to same 5GHz WiFi
   - Enable Air Link in Quest settings
   - Configure bandwidth: 200 Mbps (wired) / 100 Mbps (wireless)

3. **NEXO Quest Settings**:
   ```bash
   nexo config --platform quest
   nexo config --set vr.refreshRate 120  # Quest 3 only
   nexo config --set vr.handTracking true
   ```

#### Quest Development

Enable development features:
- **Developer Mode**: Meta Quest app → Settings → Developer Mode
- **USB Debugging**: Allow when prompted on headset
- **Guardian Bypass**: For development comfort

### SteamVR Configuration

#### Initial Setup

1. **SteamVR Installation**:
   - Install Steam and SteamVR
   - Run Room Setup for your headset
   - Configure play area boundaries

2. **NEXO Integration**:
   ```bash
   nexo config --platform steamvr
   nexo config --set vr.steamvr.overlay true
   nexo config --set vr.steamvr.dashboard true
   ```

#### Advanced SteamVR Settings

```yaml
# steamvr.vrsettings (in SteamVR config)
"steamvr": {
  "supersampleScale": 1.2,
  "allowReprojection": true,
  "reprojectionMode": 2,
  "motionSmoothing": true
}
```

### Valve Index Optimization

```bash
# Index-specific settings
nexo config --set vr.refreshRate 120
nexo config --set vr.fingerTracking true
nexo config --set vr.eyeTracking false  # Not available yet
```

### HTC Vive Setup

```bash
# Vive configuration
nexo config --platform vive
nexo config --set vr.lighthouse.version 1  # or 2 for Vive Pro
nexo config --set vr.tracking.roomScale true
```

### PlayStation VR Configuration

```bash
# PSVR setup (experimental)
nexo config --platform psvr
nexo config --set vr.refreshRate 60
nexo config --set vr.tracking.method pscamera
```

## Hand Tracking Setup

### Quest Hand Tracking

1. **Enable in Quest Settings**:
   - Settings → Device → Hand Tracking
   - Switch to "Auto" or "Hands"

2. **NEXO Configuration**:
   ```bash
   nexo config --set vr.handTracking true
   nexo config --set vr.handTracking.confidence 0.7
   nexo config --set vr.handTracking.gestures true
   ```

### Leap Motion Integration

```bash
# For Leap Motion controllers
nexo install leap-motion-driver
nexo config --set vr.leapMotion.enabled true
nexo config --set vr.leapMotion.tracking.hands true
```

## Comfort & Safety Settings

### Locomotion Options

Configure movement systems for comfort:

```yaml
comfort:
  snapTurn: true           # Snap turning vs smooth
  snapTurnAngle: 30        # Degrees per snap
  teleportation: true      # Enable teleport locomotion
  smoothLocomotion: false  # Disable if motion sick
  vignetteOnMovement: true # Reduce FOV during movement
```

### Accessibility Features

```yaml
accessibility:
  colorBlindFriendly: true
  highContrast: false
  largeFonts: false
  audioDescription: true
  subtitles: true
```

## Performance Optimization

### Automatic Optimization

Let NEXO optimize settings automatically:

```bash
nexo optimize --auto
nexo benchmark --duration 60  # Run 60-second performance test
```

### Manual Tuning

#### CPU Optimization
```bash
nexo config --set performance.cpuPriority high
nexo config --set performance.backgroundTasks minimal
```

#### GPU Optimization
```bash
nexo config --set graphics.shadowQuality medium
nexo config --set graphics.textureQuality high
nexo config --set graphics.antiAliasing msaa4x
```

#### Memory Management
```bash
nexo config --set memory.garbageCollection aggressive
nexo config --set memory.preloadAssets true
```

## Troubleshooting VR Issues

### Common Problems

**Tracking Loss**
1. Check lighting conditions (not too bright/dark)
2. Clean headset cameras/sensors
3. Remove reflective surfaces from play area
4. Restart tracking: `nexo restart-tracking`

**Frame Rate Drops**
1. Lower render scale: `nexo config --set vr.renderScale 0.8`
2. Disable unnecessary visual effects
3. Check task manager for background processes
4. Update GPU drivers

**Controller Issues**
1. Check battery levels
2. Re-pair controllers in VR settings
3. Reset controller calibration: `nexo calibrate-controllers`

### Diagnostic Tools

```bash
# Check VR system status
nexo vr-doctor

# Monitor performance in real-time
nexo monitor --vr

# Generate diagnostic report
nexo diagnose --output vr-report.txt
```

## Advanced Configuration

### Custom VR Profiles

Create profiles for different use cases:

```bash
# Development profile (lower quality, better performance)
nexo profile create development
nexo profile set development vr.renderScale 0.8
nexo profile set development graphics.shadowQuality low

# Presentation profile (highest quality)
nexo profile create presentation
nexo profile set presentation vr.renderScale 1.4
nexo profile set presentation graphics.quality ultra
```

### Multi-User Setup

Configure for multiple developers:

```yaml
multiUser:
  enabled: true
  profiles:
    - name: "developer1"
      height: 1.75
      ipd: 64
      handSize: medium
    - name: "developer2"  
      height: 1.65
      ipd: 59
      handSize: small
```

## Next Steps

With your VR setup optimized:

1. **Create Your First Scene**: [First VR Scene Guide](/guides/first-vr-scene/)
2. **Learn VR Interactions**: [VR Interactions Guide](/guides/vr-interactions/)
3. **Optimize Performance**: [Performance Guide](/guides/performance/)

## Getting Help

If you need assistance with VR setup:

- **Hardware Issues**: Consult your headset manufacturer's support
- **NEXO Configuration**: Check our [Discord](https://discord.gg/nexo) #vr-support channel
- **Performance Problems**: Use the [Performance Guide](/guides/performance/)
- **Bug Reports**: Create an issue on [GitHub](https://github.com/NexoEngine/game-engine/issues)