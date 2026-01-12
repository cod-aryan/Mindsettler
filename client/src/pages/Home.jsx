import Navbar from "../components/common/Navbar.jsx";
import JourneySection from "../components/journey/JourneySection.jsx";
import HeroSection from "../components/hero/HeroSection.jsx";
import FAQ from "../components/common/FAQ.jsx";
import Footer from "../components/common/Footer.jsx";
import MindSettlerSection from "../components/common/MindSettlerSection.jsx";
import StatsSection from "../components/common/StatsSection.jsx";



function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <HeroSection />
      {/* <div class="h-20 bg-linear-to-b from-[#6b5e5a]/30 to-[#f3f1ff]"></div> */}
      <JourneySection />
      {/* <div class="bg-linear-to-b from-[#f3f1ff] to-[#f2f0f5] h-20"></div> */}
      <MindSettlerSection />
      <StatsSection />
      <FAQ />
      <Footer/>
    </div>
    </>
  );
}

export default Home;
