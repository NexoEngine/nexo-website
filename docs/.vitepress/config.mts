import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid"

export default withMermaid(
  defineConfig({
    title: "NEXO",
    description: "Welcome Portal Documentation",
    lang: 'en-US',
    lastUpdated: true,

    head: [
      ['link', { rel: 'icon', href: '/nexo-logo.png' }]
    ],

    themeConfig: {
      logo: '/nexo-logo.png',
      
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/getting-started' },
        { text: 'API', link: '/api/' },
        { text: 'Examples', link: '/examples/diagrams' }
      ],

      sidebar: [
        {
          text: 'Introduction',
          items: [
            { text: 'What is NEXO?', link: '/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Engine Features', link: '/guide/engine-features' }
          ]
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Blog System', link: '/api/blog' }
          ]
        },
        {
          text: 'Examples',
          items: [
            { text: 'Mermaid Diagrams', link: '/examples/diagrams' },
            { text: 'Code Snippets', link: '/examples/code' }
          ]
        }
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/NexoEngine/game-engine' }
      ],

      search: {
        provider: 'local'
      },

      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present NEXO'
      }
    },

    markdown: {
      theme: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha'
      },
      lineNumbers: true
    },

    mermaid: {
      theme: 'dark'
    }
  })
)