import React from 'react';
import JourneySection from './components/journey/JourneySection.jsx'; // Adjust path if needed
// import Home from './pages/home.jsx';
// Import other parts of your layout
import Navbar from './components/navigation/navbar.jsx'
import HeroSection from './components/hero/heroSection.jsx';
// import Footer from './components/navigation/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* 1. Navigation - It is now absolute, so Hero will slide under it */}
      <Navbar />

      <main>
        {/* 2. Hero Section - Remove the bg-white and the centering section */}
        <HeroSection />
        
        {/* 3. The Animated Journey Section */}
        <JourneySection />
      </main>
    </div>
  );
}

export default App;