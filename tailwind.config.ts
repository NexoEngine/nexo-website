import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				nexo: {
					blue: '#088bd8',
					darkBlue: '#2f0e52',
					black: '#2f0e52',
					gray: '#7d37c6',
					lightGray: '#F1F0FB',
					chrome: '#bd35cb',
					chromeGray: '#7d37c6',
					chromeDark: '#2f0e52',
					chromeMetal: '#bd35cb',
					teal: '#03b4d1',
					magenta: '#bd35cb',
					purple: '#7d37c6',
					violet: '#2f0e52',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 10px rgba(8, 139, 216, 0.5), 0 0 20px rgba(8, 139, 216, 0.3), 0 0 30px rgba(8, 139, 216, 0.1)' 
					},
					'50%': { 
						boxShadow: '0 0 15px rgba(8, 139, 216, 0.6), 0 0 30px rgba(8, 139, 216, 0.4), 0 0 45px rgba(8, 139, 216, 0.2)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'vr-pulse': {
					'0%, 100%': { opacity: '0.7' },
					'50%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'vr-pulse': 'vr-pulse 3s infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23088bd8\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
				'chrome-grid': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
				'chrome-radial': 'radial-gradient(circle, rgba(50, 50, 56, 0.8) 0%, rgba(20, 20, 24, 1) 100%)',
				'nexo-gradient-primary': 'linear-gradient(135deg, #2f0e52 0%, #7d37c6 100%)',
				'nexo-gradient-secondary': 'linear-gradient(135deg, #7d37c6 0%, #03b4d1 100%)',
				'nexo-gradient-accent': 'linear-gradient(135deg, #bd35cb 0%, #03b4d1 100%)',
				'nexo-gradient-dark': 'linear-gradient(180deg, #2f0e52 0%, #0A0D14 100%)',
				'nexo-gradient-radial': 'radial-gradient(circle at center, #03b4d1 0%, #2f0e52 100%)',
				'nexo-gradient-glow': 'radial-gradient(circle at center, #bd35cb 0%, transparent 70%)',
				'nexo-gradient-mesh': 'conic-gradient(from 180deg at 50% 50%, #2f0e52 0deg, #bd35cb 90deg, #03b4d1 180deg, #7d37c6 270deg, #2f0e52 360deg)',
				'nexo-gradient-subtle': 'linear-gradient(180deg, rgba(47, 14, 82, 0.4) 0%, rgba(10, 13, 20, 0.8) 100%)',
			}
		}
	},
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("tailwindcss-animate"), 
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require("@tailwindcss/typography")
	],
} satisfies Config;
