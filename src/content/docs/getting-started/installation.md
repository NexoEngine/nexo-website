---
title: Installation Guide
description: Complete guide to installing NEXO VR Game Engine on your system.
---

# Installation Guide

This guide will walk you through installing NEXO VR Game Engine on your system.

## Prerequisites

Before installing NEXO, ensure you have:

1. **VR Headset**: A compatible VR headset (Meta Quest 2/3, SteamVR device, etc.)
2. **VR Runtime**: The appropriate VR runtime for your headset
3. **Development Environment**: Basic familiarity with VR development concepts

## Step 1: Download NEXO

### Option A: Download Pre-built Release

1. Visit the [NEXO GitHub Releases](https://github.com/NexoEngine/game-engine/releases) page
2. Download the latest stable release for your operating system:
   - `nexo-windows-x64.zip` for Windows
   - `nexo-macos-universal.dmg` for macOS
   - `nexo-linux-x64.tar.gz` for Linux

### Option B: Build from Source

If you want to build from source or contribute to development:

```bash
git clone https://github.com/NexoEngine/game-engine.git
cd game-engine
git submodule update --init --recursive
```

## Step 2: System-Specific Installation

### Windows Installation

1. **Extract the Archive**
   - Right-click the downloaded `.zip` file
   - Select "Extract All..."
   - Choose your installation directory (e.g., `C:\NEXO\`)

2. **Run the Installer**
   ```cmd
   cd C:\NEXO\
   .\install.bat
   ```

3. **Add to PATH** (Optional)
   - Add the NEXO installation directory to your system PATH
   - This allows running `nexo` from any command prompt

### macOS Installation

1. **Mount the DMG**
   - Double-click the downloaded `.dmg` file
   - Drag NEXO to your Applications folder

2. **Grant Permissions**
   - System Preferences → Security & Privacy
   - Allow NEXO to access camera and microphone for VR tracking

3. **Command Line Tools** (Optional)
   ```bash
   sudo ln -s /Applications/NEXO.app/Contents/MacOS/nexo /usr/local/bin/nexo
   ```

### Linux Installation

1. **Extract the Archive**
   ```bash
   tar -xzf nexo-linux-x64.tar.gz
   sudo mv nexo /opt/
   ```

2. **Install Dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install libvulkan1 libgl1-mesa-glx libasound2-dev

   # Fedora
   sudo dnf install vulkan-loader mesa-libGL alsa-lib-devel

   # Arch Linux
   sudo pacman -S vulkan-icd-loader mesa alsa-lib
   ```

3. **Create Symlink**
   ```bash
   sudo ln -s /opt/nexo/bin/nexo /usr/local/bin/nexo
   ```

## Step 3: VR Runtime Setup

### SteamVR Setup

1. Install Steam and SteamVR
2. Connect and set up your VR headset
3. Ensure SteamVR is running before launching NEXO

### Meta Quest Setup

1. Install the Meta Quest app on your PC
2. Enable Developer Mode on your Quest device
3. Connect via USB-C or use Air Link for wireless development

### PlayStation VR Setup

1. Install PlayStation VR drivers
2. Ensure your PSVR is properly connected
3. Run the PSVR setup utility

## Step 4: Verify Installation

1. **Launch NEXO**
   ```bash
   nexo --version
   ```

2. **Test VR Connection**
   ```bash
   nexo --test-vr
   ```

3. **Create Test Project**
   ```bash
   nexo new-project --template hello-vr MyFirstProject
   cd MyFirstProject
   nexo run
   ```

## Troubleshooting

### Common Issues

**"VR headset not detected"**
- Ensure your VR runtime is running
- Check USB connections
- Restart the VR service
- Try running NEXO as administrator

**"Permission denied" errors on Linux**
- Add your user to the `dialout` group: `sudo usermod -a -G dialout $USER`
- Logout and login again
- Check udev rules for your VR device

**Performance issues**
- Update your GPU drivers
- Close unnecessary applications
- Lower VR rendering resolution temporarily
- Check system requirements

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](/troubleshooting/)
2. Search [GitHub Issues](https://github.com/NexoEngine/game-engine/issues)
3. Ask for help on our [Discord server](https://discord.gg/nexo)
4. Create a new issue on GitHub with detailed information

## Next Steps

Once NEXO is installed:

1. Complete the [Quick Start Guide](/getting-started/quick-start/)
2. Configure your [VR Setup](/getting-started/vr-setup/)
3. Create your [First VR Scene](/guides/first-vr-scene/)

Welcome to the NEXO community! 🥽