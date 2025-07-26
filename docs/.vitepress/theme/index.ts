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
        // Not in fullscreen - disable interactivity and reset view
        container.classList.remove('fullscreen')
        resetDiagramView(container)
      }
    })
  }

  // Function to reset diagram view to original state
  const resetDiagramView = (container: Element) => {
    // Find the SVG element within the container
    const svg = container.querySelector('svg')
    if (!svg) return

    // Reset SVG transformations
    const svgGroup = svg.querySelector('g')
    if (svgGroup) {
      // Remove transform attribute
      svgGroup.removeAttribute('transform')
      
      // Reset any inline styles that might affect positioning
      svgGroup.style.transform = ''
      svgGroup.style.transition = ''
    }

    // Reset SVG viewBox to original if it was modified
    const originalViewBox = svg.getAttribute('data-original-viewbox')
    if (originalViewBox) {
      svg.setAttribute('viewBox', originalViewBox)
    }

    // Clear any inline styles on the SVG that might have been added
    svg.style.transform = ''
    svg.style.cursor = ''
    
    // Reset container styles that might have been modified
    const innerContainer = container.querySelector('.mermaid-svg-container, .mermaid')
    if (innerContainer instanceof HTMLElement) {
      innerContainer.style.transform = ''
      innerContainer.style.transformOrigin = ''
    }

    // Force a reflow to ensure changes are applied
    void container.offsetHeight
  }

  // Store original viewBox values when diagrams are first rendered
  const storeOriginalViewBox = () => {
    const svgs = document.querySelectorAll('.mermaid-container svg, div[id^="mermaid-"] svg')
    svgs.forEach(svg => {
      if (!svg.hasAttribute('data-original-viewbox')) {
        const viewBox = svg.getAttribute('viewBox')
        if (viewBox) {
          svg.setAttribute('data-original-viewbox', viewBox)
        }
      }
    })
  }

  // Add event listeners for fullscreen changes
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)

  // Store original viewBox values after a short delay to ensure SVGs are rendered
  setTimeout(storeOriginalViewBox, 500)

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