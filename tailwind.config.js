/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        titan: {
          bg: '#080D1A',          // Main background
          sidebar: '#0B1220',     // Sidebar
          card: '#111A2E',        // Cards
          elevated: '#17233A',    // Elevated panels
          cyan: '#00D9FF',        // Electric cyan - active retrieval, query flow & primary actions
          blue: '#386BFF',        // Electric blue - search & retrieval operations
          violet: '#9666FF',      // AI violet - reasoning, classification & orchestration
          text: '#EAF2FF',        // Primary text
          secondary: '#94A3B8',   // Secondary text
          success: '#35D6A0',     // Success / high confidence
          warning: '#FFB454',     // Warning / low confidence / fallback
          error: '#FF647C',       // Error / failed retrieval
          border: 'rgba(234, 242, 255, 0.08)',
          borderHover: 'rgba(0, 217, 255, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 217, 255, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(150, 102, 255, 0.35)',
        'glow-blue': '0 0 25px -4px rgba(56, 107, 255, 0.35)',
        'glow-amber': '0 0 20px -4px rgba(255, 180, 84, 0.35)',
        'glow-success': '0 0 20px -4px rgba(53, 214, 160, 0.35)',
        'elevated': '0 14px 40px -8px rgba(3, 7, 18, 0.65)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan-pulse': 'glowCyan 2.4s ease-in-out infinite alternate',
        'flow-dash': 'flowDash 1.2s linear infinite',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)' },
          '100%': { boxShadow: '0 0 28px rgba(0, 217, 255, 0.55)' },
        },
        flowDash: {
          to: { strokeDashoffset: '-24' }
        }
      }
    },
  },
  plugins: [],
}
