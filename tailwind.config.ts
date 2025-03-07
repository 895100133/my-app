// @ts-expect-error - nativewind/tailwind is not typed
import { createTailwindcssConfig } from 'nativewind/tailwind'

export default createTailwindcssConfig({
  content: {
    files: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
})
