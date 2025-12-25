import { Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { toggleTheme } from '../../../store/slices/themeSlice'
import { motion } from 'framer-motion'

const ThemeToggleButton = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.mode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-700" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggleButton

