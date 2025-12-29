import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle,
  Video,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Heart,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState("10:10 AM");
  const [sessionType, setSessionType] = useState("online");
  const [selectedTherapy, setSelectedTherapy] = useState("Cognitive Behavioural Therapy (CBT)");

  // Color Palette Constants
  const colors = {
    primary: "#3F2965", // Deep Purple
    secondary: "#DD1764", // Pink/Magenta
    accentLight: "#FCE8EF", // Very Light Pink
    purpleLight: "#E9E4F0", // Light Purple shade
  };

  const therapies = [
    "Cognitive Behavioural Therapy (CBT)",
    "Dialectical Behavioural Therapy (DBT)",
    "Acceptance & Commitment Therapy (ACT)",
    "Schema Therapy",
    "Emotion-Focused Therapy (EFT)",
    "Emotion-Focused Couples Therapy",
    "Mindfulness-Based Cognitive Therapy",
    "Client-Centred Therapy",
  ];

  const morningSlots = [
    "9:00 AM", "9:10 AM", "9:20 AM", "9:30 AM", "9:40 AM",
    "9:50 AM", "10:00 AM", "10:10 AM", "10:20 AM", "10:30 AM",
  ];
  
  const eveningSlots = [
    "5:00 PM", "5:10 PM", "5:20 PM", "5:30 PM", "5:40 PM",
    "5:50 PM", "6:00 PM", "6:10 PM", "6:20 PM",
  ];

  const handleBooking = () => {
    const bookingData = {
      therapy: selectedTherapy,
      time: selectedSlot,
      type: sessionType,
      status: "Pending Confirmation",
    };
    alert(
      `Request Sent for ${selectedTherapy} at ${selectedSlot}! Please complete payment via UPI to confirm.`
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-25 bg-slate-50 font-sans text-slate-700 flex flex-col">
        <main className="p-4 md:p-8 pt-24">
          <header className="mb-8 max-w-6xl mx-auto">
            <h1
              className="text-4xl font-bold"
              style={{ color: colors.primary }}
            >
              MindSettler Appointments
            </h1>
            <p className="text-md text-slate-500">Home &gt; Appointments</p>
          </header>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Therapy Selection */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="mb-4">
                  <h2 className="font-bold text-lg mb-1" style={{ color: colors.primary }}>
                    PERSONALIZED THERAPY
                  </h2>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Designed Around You
                  </p>
                </div>
                
                <div className="space-y-2">
                  {therapies.map((therapy) => (
                    <button
                      key={therapy}
                      onClick={() => setSelectedTherapy(therapy)}
                      className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
                        selectedTherapy === therapy
                          ? "border-magenta-500 bg-pink-50 font-semibold"
                          : "border-slate-100 hover:bg-slate-50 text-slate-600"
                      }`}
                      style={
                        selectedTherapy === therapy
                          ? { borderColor: colors.secondary, color: colors.primary, backgroundColor: colors.accentLight }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div 
                           className={`w-2 h-2 rounded-full ${selectedTherapy === therapy ? "opacity-100" : "opacity-0"}`}
                           style={{ backgroundColor: colors.secondary }}
                        />
                        {therapy}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Info Box */}
              <div
                className="p-6 rounded-2xl shadow-lg text-white"
                style={{ backgroundColor: colors.primary }}
              >
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <Heart size={18} /> Professional Support
                </h3>
                <p className="text-sm opacity-90">
                  Select the therapy style that best fits your needs. Not sure? Choose CBT for a balanced introductory approach.
                </p>
              </div>
            </div>

            {/* Right Column: Slot Selection */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              {/* Session Type Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setSessionType("online")}
                  className="flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-semibold"
                  style={
                    sessionType === "online"
                      ? {
                          borderColor: colors.primary,
                          backgroundColor: colors.purpleLight,
                          color: colors.primary,
                        }
                      : { borderColor: "#f1f5f9" }
                  }
                >
                  <Video size={20} /> Online Studio
                </button>
                <button
                  onClick={() => setSessionType("offline")}
                  className="flex-1 p-4 rounded-xl border-2 flex items-center justify-center gap-2 transition-all font-semibold"
                  style={
                    sessionType === "offline"
                      ? {
                          borderColor: colors.primary,
                          backgroundColor: colors.purpleLight,
                          color: colors.primary,
                        }
                      : { borderColor: "#f1f5f9" }
                  }
                >
                  <MapPin size={20} /> Offline Studio
                </button>
              </div>

              {/* Morning Slots */}
              <SectionTitle
                icon={<Coffee size={18} />}
                title="Morning"
                subtitle="9:00 AM to 12:00 PM"
                accentColor={colors.secondary}
                lightAccent={colors.accentLight}
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                {morningSlots.map((slot) => (
                  <SlotButton
                    key={slot}
                    time={slot}
                    selected={selectedSlot === slot}
                    onClick={() => setSelectedSlot(slot)}
                    primaryColor={colors.primary}
                  />
                ))}
              </div>

              {/* Evening Slots */}
              <SectionTitle
                icon={<Clock size={18} />}
                title="Evening"
                subtitle="5:00 PM to 09:00 PM"
                accentColor={colors.secondary}
                lightAccent={colors.accentLight}
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                {eveningSlots.map((slot) => (
                  <SlotButton
                    key={slot}
                    time={slot}
                    selected={selectedSlot === slot}
                    onClick={() => setSelectedSlot(slot)}
                    primaryColor={colors.primary}
                  />
                ))}
              </div>

              <hr className="my-8 border-slate-100" />

              {/* Payment & Action */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-sm text-slate-500">Selected: <span className="font-semibold" style={{color: colors.primary}}>{selectedTherapy}</span></p>
                  <p className="font-bold text-slate-800">
                    UPI ID: mindsettler@upi
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: colors.secondary }}
                  >
                    * Manual confirmation after payment
                  </p>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full md:w-auto px-10 py-4 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95"
                  style={{ backgroundColor: colors.primary }}
                >
                  Request Appointment
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="h-40 bg-gradient-to-b from-[#f9fafc] to-[#fdfcf8]"></div>
      <Footer />
    </>
  );
};

// Helper Components
const SectionTitle = ({ icon, title, subtitle, accentColor, lightAccent }) => (
  <div className="flex justify-between items-end mb-4">
    <div className="flex items-center gap-3">
      <div
        className="p-2 rounded-lg"
        style={{ backgroundColor: lightAccent, color: accentColor }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-bold leading-none text-slate-800">{title}</h3>
        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  </div>
);

const SlotButton = ({ time, selected, onClick, primaryColor }) => (
  <button
    onClick={onClick}
    className={`py-3 px-2 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2
      ${
        selected
          ? "text-white shadow-md"
          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
      }`}
    style={
      selected
        ? { backgroundColor: primaryColor, borderColor: primaryColor }
        : {}
    }
  >
    {selected && <span className="text-lg">→</span>}
    {time}
  </button>
);

export default BookingPage;