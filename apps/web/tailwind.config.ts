import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx,md}',
		'../../packages/ui/src/**/*.{ts,tsx}',
		'../../packages/components/src/**/*.{ts,tsx}',
	],
	safelist: [
		{ pattern: /^(container|flex|grid|inline-flex)$/ },
		{ pattern: /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12)$/ },
		{ pattern: /^(text|bg|border|shadow|rounded|h|max-h|min-h|w|max-w|min-w|gap|justify|items|content|place|top|right|bottom|left|z|aspect|object|overflow|whitespace|truncate)/ },
	],
	theme: {
		extend: {
			borderColor: {
				DEFAULT: 'hsl(var(--border))'
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
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
			fontFamily: {
				sans: [
					'var(--font-inter)',
					'var(--font-geist-sans)'
				],
				mono: [
					'var(--font-geist-mono)'
				],
				inter: [
					'var(--font-inter)'
				],
				'geist-sans': [
					'var(--font-geist-sans)'
				]
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out',
				'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
				'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
				'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
				'fade-in-out': 'fade-in-out 4s ease-in-out',
				progress: 'progress 8s linear',
				'infinite-slider': 'infiniteSlider 20s linear infinite',
				'infinite-slider-reverse': 'infiniteSliderReverse 20s linear infinite',
				'shadow-ping': 'shadow-ping 1.5s ease-in-out infinite',
				'flip-btn': 'flip-btn 6s infinite steps(2, end)',
				'rotate-btn': 'rotate-btn 3s linear infinite both',
				'light-to-right-top': 'light-to-right 4s linear infinite',
				'light-to-right-bottom': 'light-to-right 4s linear infinite',
				marquee: 'marquee 25s linear infinite',
				'slide-to-right': 'slide-to-right 3s linear infinite',
				'slide-to-top': 'slide-to-top 3s linear infinite',
				shine: 'shine var(--duration) infinite linear'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-collapsible-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-collapsible-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'border-beam': {
					'100%': {
						'offset-distance': '100%'
					}
				},
				'shimmer-slide': {
					to: {
						transform: 'translate(calc(100cqw - 100%), 0)'
					}
				},
				'spin-around': {
					'0%': {
						transform: 'translateZ(0) rotate(0)'
					},
					'15%, 35%': {
						transform: 'translateZ(0) rotate(90deg)'
					},
					'65%, 85%': {
						transform: 'translateZ(0) rotate(270deg)'
					},
					'100%': {
						transform: 'translateZ(0) rotate(360deg)'
					}
				},
				'fade-in-out': {
					'0%, 100%': {
						opacity: '0'
					},
					'20%, 80%': {
						opacity: '1'
					}
				},
				progress: {
					from: {
						width: '0%'
					},
					to: {
						width: '100%'
					}
				},
				infiniteSlider: {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(calc(-250px * 5))'
					}
				},
				infiniteSliderReverse: {
					'0%': {
						transform: 'translateX(calc(-250px * 5))'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				marquee: {
					'0%': {
						transform: 'translateX(0%)'
					},
					'100%': {
						transform: 'translateX(-100%)'
					}
				},
				'shadow-ping': {
					'0%': {
						boxShadow: '0 0 0 0px theme("colors.neutral.100")'
					},
					'50%': {
						boxShadow: '0 0 0 12px theme("colors.neutral.300")'
					},
					'100%': {
						boxShadow: '0 0 0 12px transparent'
					}
				},
				'light-to-right': {
					'0%': {
						transform: 'translate(0%)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translate(100%)',
						opacity: '0'
					}
				},
				'slide-to-right': {
					'0%': {
						opacity: '0',
						left: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0',
						left: '80%'
					}
				},
				'slide-to-top': {
					'0%': {
						opacity: '0',
						bottom: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						opacity: '0',
						bottom: '80%'
					}
				},
				shine: {
					'0%': {
						'background-position': '0% 0%'
					},
					'50%': {
						'background-position': '100% 100%'
					},
					to: {
						'background-position': '0% 0%'
					}
				}
			}
		}
	},
	plugins: [require('tailwindcss-animate')],
}
export default config
