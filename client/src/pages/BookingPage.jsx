import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon, Clock, MapPin, Video, Coffee, Info, MessageSquare,
  Loader2, ChevronRight, Check, Search, AlertCircle, Wallet, ArrowRight, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import API from "../api/axios";

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [sessionType, setSessionType] = useState("online");
  const [selectedTherapy, setSelectedTherapy] = useState("Cognitive Behavioural Therapy (CBT)");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availabilityId, setAvailabilityId] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const colors = {
    primary: "#3F2965",
    secondary: "#DD1764",
  };

  const therapies = [
    "Cognitive Behavioural Therapy (CBT)", "Dialectical Behavioural Therapy (DBT)",
    "Acceptance & Commitment Therapy (ACT)", "Schema Therapy", "Emotion-Focused Therapy (EFT)",
    "Emotion-Focused Couples Therapy", "Mindfulness-Based Cognitive Therapy", "Client-Centred Therapy",
  ];

  const formatTo12Hr = (time24) => {
    if (!time24 || typeof time24 !== "string") return time24;
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const fetchSlots = async () => {
    setLoadingSlots(true);
    setErrorMsg("");
    setSelectedSlot(""); 
    setAvailabilityId(""); 
    try {
      const res = await API.get(`/appointment/get-availability?date=${selectedDate}`);
      let fetchedSlots = res.data.data?.slots || [];
      const fetchedId = res.data.data?.availabilityId || "";

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];

      if (selectedDate === todayStr) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        fetchedSlots = fetchedSlots.filter((slot) => {
          const [slotHour, slotMinute] = slot.split(":").map(Number);
          if (slotHour > currentHour) return true;
          if (slotHour === currentHour && slotMinute > currentMinute) return true;
          return false;
        });
      }

      setAvailableSlots(fetchedSlots);
      setAvailabilityId(fetchedId);
      if (fetchedSlots.length === 0 && selectedDate === todayStr) {
        setErrorMsg("No more slots available for today.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error fetching availability");
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => { fetchSlots(); }, []); 

  const morningSlots = availableSlots.filter((slot) => parseInt(slot.split(":")[0]) < 12);
  const eveningSlots = availableSlots.filter((slot) => parseInt(slot.split(":")[0]) >= 12);

  const handleBooking = async () => {
    setErrorMsg("");
    if (!selectedSlot) return setErrorMsg("Please select a time slot first.");
    
    setSubmitting(true);
    try {
      await API.post("/appointment/book", {
        therapyType: selectedTherapy,
        date: selectedDate,
        timeSlot: selectedSlot,
        sessionType: sessionType,
        note: note,
        availabilityRef: availabilityId 
      });
      setShowSuccess(true);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Transaction failed. Insufficient wallet balance.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #3F2965; border-radius: 10px; }
        `}
      </style>

      <Navbar />
      
      <div className="h-screen pt-24 bg-[#FDFCFD] font-sans flex flex-col overflow-hidden relative">
        
        {/* --- SUCCESS OVERLAY --- */}
        {showSuccess && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#3F2965]/90 backdrop-blur-md p-4">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black text-[#3F2965] mb-2">Payment Successful!</h2>
              <p className="text-slate-500 mb-8 font-medium">Money has been deducted from your wallet. Your session is now confirmed.</p>
              
              <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left space-y-3">
                <div className="flex justify-between text-sm font-bold"><span className="text-slate-400">Date:</span><span className="text-[#3F2965]">{selectedDate}</span></div>
                <div className="flex justify-between text-sm font-bold"><span className="text-slate-400">Time:</span><span className="text-[#3F2965]">{formatTo12Hr(selectedSlot)}</span></div>
                <div className="flex justify-between text-sm font-bold"><span className="text-slate-400">Method:</span><span className="text-green-600 font-bold uppercase tracking-tighter">Wallet Paid</span></div>
              </div>

              <button 
                onClick={() => navigate("/profile#bookings")}
                className="w-full py-5 bg-[#3F2965] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Go to My Sessions <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col px-4 md:px-8 pb-6 overflow-hidden">
          <header className="py-4">
            <h1 className="text-3xl font-black tracking-tight" style={{ color: colors.primary }}>Confirm Appointment</h1>
          </header>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
            
            {/* --- LEFT SIDEBAR: THERAPY & DETAILS --- */}
            <aside className="flex flex-col gap-6 overflow-hidden">
              <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-6"><h2 className="font-black text-lg" style={{ color: colors.primary }}>THERAPY TYPE</h2></div>
                <div className="space-y-2">
                  {therapies.map((t) => (
                    <button key={t} onClick={() => setSelectedTherapy(t)} className={`w-full text-left p-4 rounded-2xl text-xs font-bold border transition-all ${selectedTherapy === t ? "bg-pink-50 border-[#Dd1764] text-[#3F2965]" : "border-transparent text-slate-400 hover:bg-slate-50"}`}>{t}</button>
                  ))}
                </div>
              </div>

              {/* DETAILS SECTION RESTORED */}
              <div className="p-6 rounded-4xl bg-white border border-slate-100 shadow-sm shrink-0">
                <h3 className="font-black mb-2 flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: colors.primary }}>
                  <Info size={16} /> Session Info
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Duration:</span>
                    <span style={{ color: colors.primary }}>60 Minutes</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Mode:</span>
                    <span className="text-[#Dd1764] capitalize">{sessionType}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* --- RIGHT PANEL: BOOKING LOGIC --- */}
            <section className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                
                {/* --- ERROR BANNER --- */}
                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-bold flex-1">{errorMsg}</p>
                    <button onClick={() => setErrorMsg("")}><X size={18}/></button>
                  </div>
                )}

                <div className="mb-10">
                  <SectionTitle icon={<CalendarIcon size={18} />} title="Select Date" subtitle="Verify live availability" />
                  <div className="flex flex-col md:flex-row items-center gap-3 mt-3">
                    <input type="date" min={new Date().toISOString().split("T")[0]} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full md:w-72 p-4 rounded-2xl bg-slate-50 font-bold text-[#3F2965] outline-none" />
                    <button onClick={fetchSlots} disabled={loadingSlots} className="w-full md:w-auto px-6 py-4 bg-[#3F2965] text-white rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"><Search size={18} /></button>
                  </div>
                </div>

                <div className="flex gap-4 mb-10">
                  <button onClick={() => setSessionType("online")} className={`flex-1 p-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all font-black text-sm ${sessionType === "online" ? "border-[#3F2965] bg-[#3F2965] text-white shadow-lg" : "border-slate-50 bg-slate-50 text-slate-400"}`}><Video size={20} /> Online Studio</button>
                  <button onClick={() => setSessionType("offline")} className={`flex-1 p-5 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all font-black text-sm ${sessionType === "offline" ? "border-[#3F2965] bg-[#3F2965] text-white shadow-lg" : "border-slate-50 bg-slate-50 text-slate-400"}`}><MapPin size={20} /> Offline Visit</button>
                </div>

                <div className="space-y-10">
                  {loadingSlots ? <div className="flex flex-col items-center py-10 gap-2"><Loader2 className="animate-spin text-[#3F2965]" size={32} /><p className="text-xs font-bold text-slate-300 tracking-widest uppercase">Fetching Available Times</p></div> : 
                   availableSlots.length === 0 ? <div className="text-center py-16 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200"><Clock className="mx-auto text-slate-200 mb-4" size={48} /><p className="text-sm font-black text-slate-400 uppercase">No slots found</p></div> :
                   <>
                    {morningSlots.length > 0 && <SlotGroup title="Morning" icon={<Coffee size={18} />} slots={morningSlots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} formatter={formatTo12Hr} />}
                    {eveningSlots.length > 0 && <SlotGroup title="Evening" icon={<Clock size={18} />} slots={eveningSlots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} formatter={formatTo12Hr} />}
                   </>}
                </div>

                <div className="mt-12">
                  <SectionTitle icon={<MessageSquare size={18} />} title="Special Notes" subtitle="How can we help today?" />
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Share your concerns with the therapist..." className="w-full mt-3 p-5 rounded-3xl bg-slate-50 h-32 resize-none text-sm font-medium outline-none" />
                </div>
              </div>

              {/* --- STICKY FOOTER: CONFIRM & PAY --- */}
              <div className="p-8 border-t border-slate-100 bg-white/80 shrink-0 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Wallet size={24}/></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Payment Mode</p>
                    <p className="text-sm font-bold text-[#3F2965]">Instant Wallet Deduction</p>
                  </div>
                </div>
                <button
                  disabled={submitting || !selectedSlot || !availabilityId}
                  onClick={handleBooking}
                  className="w-full md:w-auto px-12 py-5 bg-[#Dd1764] text-white font-black rounded-2xl shadow-xl shadow-pink-100 hover:opacity-90 active:scale-95 disabled:opacity-30 flex items-center justify-center gap-3 transition-all"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Check size={20}/> Confirm & Pay Now</>}
                </button>
              </div>

            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="p-3 rounded-2xl bg-pink-50 text-[#Dd1764]">{icon}</div>
    <div><h3 className="font-black text-[#3F2965] uppercase tracking-tight">{title}</h3><span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{subtitle}</span></div>
  </div>
);

const SlotGroup = ({ title, icon, slots, selectedSlot, onSelect, formatter }) => (
  <div>
    <SectionTitle icon={icon} title={title} subtitle={`${slots.length} Available`} />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {slots.map((s) => (
        <button key={s} onClick={() => onSelect(s)} className={`py-4 rounded-2xl border-2 text-[11px] font-black transition-all ${selectedSlot === s ? "bg-[#3F2965] border-[#3F2965] text-white shadow-lg" : "bg-white border-slate-50 text-slate-400"}`}>{formatter(s)}</button>
      ))}
    </div>
  </div>
);

export default BookingPage;