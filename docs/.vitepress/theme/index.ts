import { h, nextTick } from "vue"
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
        nextTick(() => mermaidRenderer.renderMermaidDiagrams())
      }
    }
  },
} satisfies Theme