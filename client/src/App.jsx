import { Header, HeroSection } from './components'
import './App.css'

function App() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection/>
      </main>
    </div>
  )
}

export default App
