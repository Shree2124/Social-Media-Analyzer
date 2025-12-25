import { createSlice } from '@reduxjs/toolkit'

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

const initialState = {
  mode: getInitialTheme(),
}

// Initialize theme class on HTML element
if (typeof window !== 'undefined') {
  const initialTheme = getInitialTheme()
  document.documentElement.classList.toggle('dark', initialTheme === 'dark')
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

