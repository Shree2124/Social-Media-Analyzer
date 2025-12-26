import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import AuthReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: AuthReducer
  },
})

