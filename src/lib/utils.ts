import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripMarkdown(markdownText: string): string {
  if (!markdownText) return '';
  // Remove headers
  let text = markdownText.replace(/^#+\s+/gm, '');
  // Remove bold and italics (asterisks and underscores)
  text = text.replace(/(\*\*|\*|__|_)(.*?)\1/g, '$2');
  // Remove strikethrough
  text = text.replace(/~~(.*?)~~/g, '$1');
  // Remove inline code
  text = text.replace(/`(.*?)`/g, '$1');
  // Remove images - keep alt text
  text = text.replace(/!\[(.*?)\]\(.*?\)/g, '$1');
  // Remove links - keep link text
  text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  // Remove horizontal rules
  text = text.replace(/^(-\*_){3,}\s*$/gm, '');
  // Remove blockquotes
  text = text.replace(/^>\s+/gm, '');
  // Remove list items (unordered and ordered)
  text = text.replace(/^\s*([-*+]|\d+\.)\s+/gm, '');
  // Remove code blocks (simple version - doesn't handle nested)
  text = text.replace(/```[\s\S]*?```/g, '');
  // Remove extra newlines
  text = text.replace(/\n{2,}/g, '\n');
  return text.trim();
}
