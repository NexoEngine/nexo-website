import { h, nextTick, onMounted } from "vue"
import DefaultTheme from "vitepress/theme"
import type { Theme } from "vitepress"
import "@catppuccin/vitepress/theme/mocha/blue.css"
import "./custom.css"
import { createMermaidRenderer } from "vitepress-mermaid-renderer"
import "vitepress-mermaid-renderer/dist/style.css"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app, router, siteData }) {
    const mermaidRenderer = createMermaidRenderer()
    mermaidRenderer.initialize()
    
    if (router) {
      router.onAfterRouteChange = () => {
        nextTick(() => {
          mermaidRenderer.renderMermaidDiagrams()
          setupFullscreenHandlers()
        })
      }
    }

    // Setup fullscreen handlers on initial load
    if (typeof window !== 'undefined') {
      onMounted(() => {
        setupFullscreenHandlers()
      })
    }
  },
} satisfies Theme

// Function to setup fullscreen event handlers for mermaid diagrams
function setupFullscreenHandlers() {
  if (typeof document === 'undefined') return

  // Handle fullscreen change events
  const handleFullscreenChange = () => {
    const fullscreenElement = document.fullscreenElement || 
                             (document as any).webkitFullscreenElement || 
                             (document as any).mozFullScreenElement || 
                             (document as any).msFullscreenElement

    // Find all mermaid containers
    const mermaidContainers = document.querySelectorAll('.mermaid-container, div[id^="mermaid-"]')
    
    mermaidContainers.forEach(container => {
      if (fullscreenElement && container.contains(fullscreenElement)) {
        // In fullscreen - enable interactivity
        container.classList.add('fullscreen')
      } else {
        // Not in fullscreen - disable interactivity
        container.classList.remove('fullscreen')
      }
    })
  }

  // Add event listeners for fullscreen changes
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)

  // Also listen for clicks on fullscreen buttons to ensure immediate response
  nextTick(() => {
    const fullscreenButtons = document.querySelectorAll('.desktop-controls button[title="Toggle Fullscreen"]')
    fullscreenButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Small delay to let fullscreen transition happen
        setTimeout(handleFullscreenChange, 100)
      })
    })
  })
}