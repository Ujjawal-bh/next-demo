module.exports = {
  theme: {
    fontFamily: {
    //  sans: ['Inter var', 'system-ui', 'sans-serif'],
    //
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],   
      serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Fira Code', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    extend: {
      colors: {
        brand: {
          light: '#fff',
          DEFAULT: '#3498db',
          dark: '#1a202c'
        },
        theme: {
          light: '#f7fafc',
          DEFAULT: '#e2e8f0',
          dark: '#4a5568'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
