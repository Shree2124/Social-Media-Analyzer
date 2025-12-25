import { useState, useEffect } from "react";

const HeroSection = ({ mode }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
    }, []);
  
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-500">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-180px)]">
            {/* Left Content */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                The intuitive{" "}<p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">social media</p>{" "}
                analytics platform
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Analyze your social media performance with advanced analytics,
                sentiment analysis, and AI-powered insights to grow your audience.
              </p>
  
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-4 mb-8">
                <FeaturePill
                  icon="⚡"
                  text="Real-time analytics"
                  delay={200}
                  isVisible={isVisible}
                />
                <FeaturePill
                  icon="🎯"
                  text="Track engagement"
                  delay={400}
                  isVisible={isVisible}
                />
                <FeaturePill
                  icon="📊"
                  text="Growth insights"
                  delay={600}
                  isVisible={isVisible}
                />
              </div>
  
              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
              >
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get started free
                </button>
                <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all duration-200">
                  Watch demo
                </button>
              </div>
  
              {/* Social Proof */}
              <div
                className={`mt-8 flex items-center gap-4 transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl">★★★★★</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    5-STAR RATING
                  </span>
                </div>
              </div>
  
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                No credit card required
              </p>
            </div>
  
            {/* Right Content - Dashboard Preview */}
            <div
              className={`relative transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              <DashboardPreview mode={mode} />
            </div>
          </div>
        </div>
  
        <style>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
    );
  };
  
  // Feature Pill Component
  const FeaturePill = ({ icon, text, delay, isVisible }) => {
    return (
      <div
        className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 transform transition-all duration-1000`}
        style={{
          transitionDelay: `${delay}ms`,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {text}
        </span>
      </div>
    );
  };
  
  // Dashboard Preview Component
  const DashboardPreview = ({ mode }) => {
    return (
      <div className="relative">
        {/* Main Dashboard Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
  
          {/* Chart Preview */}
          <div className="mb-6">
            <div className="flex items-end gap-2 h-32">
              <ChartBar height="60%" delay={100} />
              <ChartBar height="80%" delay={200} />
              <ChartBar height="70%" delay={300} />
              <ChartBar height="90%" delay={400} />
              <ChartBar height="75%" delay={500} />
              <ChartBar height="95%" delay={600} />
              <ChartBar height="85%" delay={700} />
            </div>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Total Followers"
              value="24,891"
              change="+12.5%"
              positive={true}
              delay={800}
            />
            <StatCard
              label="Engagement"
              value="8.2%"
              change="+2.4%"
              positive={true}
              delay={900}
            />
            <StatCard
              label="Reach"
              value="125K"
              change="+18.7%"
              positive={true}
              delay={1000}
            />
            <StatCard
              label="Posts"
              value="342"
              change="+5"
              positive={true}
              delay={1100}
            />
          </div>
        </div>
  
        {/* Floating Profile Card */}
        <div
          className="absolute -top-8 -right-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform hover:scale-110 transition-all duration-300 animate-float"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"></div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Sarah Johnson
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Social Media Manager
              </p>
            </div>
          </div>
        </div>
  
        {/* Floating Metric Card */}
        <div
          className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 transform hover:scale-110 transition-all duration-300 animate-float-delayed"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Growth Rate
              </p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                +23.5%
              </p>
            </div>
          </div>
        </div>
  
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 3s ease-in-out infinite;
            animation-delay: 1s;
          }
        `}</style>
      </div>
    );
  };
  
  // Chart Bar Component
  const ChartBar = ({ height, delay }) => {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setAnimate(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
  
    return (
      <div
        className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-1000 ease-out"
        style={{
          height: animate ? height : "0%",
        }}
      ></div>
    );
  };
  
  // Stat Card Component
  const StatCard = ({ label, value, change, positive, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);
  
    return (
      <div
        className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition-all duration-500`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        <p
          className={`text-xs font-semibold ${
            positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {change}
        </p>
      </div>
    );
  };

export default HeroSection