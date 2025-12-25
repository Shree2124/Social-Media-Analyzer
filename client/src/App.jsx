import { Header, HeroSection, Login, Register } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main className="mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
                  <HeroSection />
                </main>
              </>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
