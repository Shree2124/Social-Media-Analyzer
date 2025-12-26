import {
  Header,
  HeroSection,
  Login,
  Register,
  AuthLayout,
  DashboardLayout,
} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

function App() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <main className="mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
                  <Header />
                  <HeroSection />
                </main>
              </>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <main className="mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
                <Header />
                <Login />
              </main>
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              <main className="mx-auto h-full px-4 sm:px-6 lg:px-8 py-8">
                <Header />
                <Register />
              </main>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <AuthLayout>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<DashboardHomePage />} />
                  </Routes>
                </DashboardLayout>
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
