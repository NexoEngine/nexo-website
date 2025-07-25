import DefaultTheme from "vitepress/theme"
import type { Theme } from "vitepress"
import "@catppuccin/vitepress/theme/mocha/blue.css"
import "./custom.css"

export default {
  extends: DefaultTheme
} satisfies Theme