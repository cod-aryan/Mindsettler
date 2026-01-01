import { useState, useEffect } from "react";
import Logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { useNavigate, Link } from "react-router";
import {
  CalendarCheck,
  Clock,
  Wallet,
  LogOut,
  X,
  Check,
  Plus,
  Loader2,
  UserCircle,
  Bell,
  Mail,
  Edit3,
  Camera,
  User,
  Phone,
  KeyRound,
  Save,
  Lock,
  TrendingUp
} from "lucide-react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// --- 1. ADMIN PROFILE VIEW ---
const AdminProfileView = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.patch("/users/profile", formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#3F2965] tracking-tight">Account Settings</h2>
          <p className="text-slate-500 font-medium text-sm">Manage your administrative identity</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            isEditing ? "bg-slate-100 text-slate-600" : "bg-[#3F2965] text-white shadow-lg"
          }`}
        >
          {isEditing ? <X size={18} /> : <Edit3 size={18} />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex flex-col items-center text-center h-fit">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-linear-to-tr from-[#3F2965] to-[#Dd1764] flex items-center justify-center text-white text-5xl font-black shadow-2xl ring-4 ring-white">
              {formData.name?.charAt(0)}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <h3 className="mt-6 text-xl font-black text-[#3F2965]">{formData.name}</h3>
          <p className="text-xs font-black text-[#Dd1764] uppercase tracking-widest mt-1">{user?.role}</p>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="name" disabled={!isEditing} value={formData.name} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="email" disabled={!isEditing} value={formData.email} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input name="phone" disabled={!isEditing} value={formData.phone} onChange={handleChange} className="w-full pl-12 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965] disabled:opacity-60 transition-all" />
                  </div>
                </div>
              </div>
              {isEditing && (
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-4 bg-[#Dd1764] text-white rounded-2xl font-black shadow-xl hover:opacity-90 disabled:opacity-50 transition-all">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Changes
                </button>
              )}
            </form>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border shadow-sm">
            <h4 className="text-lg font-black text-[#3F2965] mb-6 flex items-center gap-2"><Lock size={20} className="text-[#Dd1764]" /> Password & Security</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="password" placeholder="New Password" className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965]" />
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                <KeyRound size={18} /> Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. WALLET REQUESTS VIEW ---
const WalletRequestsView = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [procId, setProcId] = useState(null);

  useEffect(() => {
    API.get("/transactions/").then(res => {
      setRequests(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAction = async (id, status) => {
    setProcId(id);
    try {
      await API.patch(`/transactions/${status}-topup/${id}`);
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (e) { alert("Error processing request"); }
    finally { setProcId(null); }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#3F2965]" size={40} /></div>;

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in duration-500">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">#</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">User</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">Amount</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={req._id} className="border-b last:border-0 hover:bg-slate-50/50 transition-all">
              <td className="p-5 text-sm font-bold text-slate-400">{idx + 1}</td>
              <td className="p-5 font-bold text-slate-800">{req.user?.name}</td>
              <td className="p-5 font-black text-[#Dd1764]">₹{req.amount}</td>
              <td className="p-5 flex justify-center gap-2">
                <button disabled={procId === req._id} onClick={() => handleAction(req._id, "reject")} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                  {procId === req._id ? <Loader2 size={18} className="animate-spin" /> : <X size={18} />}
                </button>
                <button disabled={procId === req._id} onClick={() => handleAction(req._id, "approve")} className="p-2 text-white bg-[#3F2965] rounded-lg hover:opacity-90">
                  {procId === req._id ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- 3. APPOINTMENTS VIEW ---
const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    API.get("/admin/pending-appointments").then(res => {
      setAppointments(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    setActionId(id);
    try {
      await API.patch(`/appointment/status/${id}`, { status });
      setAppointments(prev => prev.filter(app => app._id !== id));
    } catch (e) { alert("Failed to update status"); }
    finally { setActionId(null); }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#Dd1764]" size={40} /></div>;

  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in duration-500">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">#</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">Client</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase">Schedule</th>
            <th className="p-5 text-xs font-black text-slate-500 uppercase text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app, idx) => (
            <tr key={app._id} className="border-b last:border-0 hover:bg-slate-50/50">
              <td className="p-5 text-sm font-bold text-slate-400">{idx + 1}</td>
              <td className="p-5 font-bold text-slate-800">{app.user?.name}</td>
              <td className="p-5 text-xs font-bold text-[#3F2965]">{app.date} | {app.timeSlot}</td>
              <td className="p-5 flex justify-center gap-2">
                <button disabled={actionId === app._id} onClick={() => updateStatus(app._id, "rejected")} className="px-4 py-2 text-[10px] font-black uppercase text-red-600 bg-red-50 rounded-xl hover:bg-red-100">
                    {actionId === app._id ? <Loader2 size={14} className="animate-spin" /> : "Reject"}
                </button>
                <button disabled={actionId === app._id} onClick={() => updateStatus(app._id, "completed")} className="px-4 py-2 text-[10px] font-black uppercase text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600">
                    {actionId === app._id ? <Loader2 size={14} className="animate-spin" /> : "Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- 4. TIME SLOTS VIEW ---
const TimeSlotsView = () => {
  const [date, setDate] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      setSlots([...slots, newSlot].sort());
      setNewSlot("");
    }
  };

  const publishAvailability = async () => {
    setLoading(true);
    try {
      await API.post("/admin/set-availability", { date, slots });
      setShowSuccess(true);
      setSlots([]); setDate("");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) { alert("Error: " + (e.response?.data?.message || "Failed")); }
    finally { setLoading(false); }
  };

  return (
    <div className="relative bg-white p-8 rounded-3xl border shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      {showSuccess && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-100">
            <Check size={40} strokeWidth={3} className="animate-bounce" />
          </div>
          <h3 className="text-2xl font-black text-[#3F2965]">Schedule Live!</h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965]" />
        <div className="flex gap-2">
          <input type="time" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} className="flex-1 p-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-[#3F2965]" />
          <button onClick={addSlot} className="p-4 bg-[#3F2965] text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"><Plus size={20} /></button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 p-6 bg-slate-50 rounded-2xl border-2 border-dashed min-h-25">
        {slots.map(s => (
          <div key={s} className="bg-white text-[#3F2965] px-5 py-2 rounded-2xl font-black border shadow-sm flex items-center gap-3">
            {s} <X size={14} className="cursor-pointer text-red-300 hover:text-red-500" onClick={() => setSlots(slots.filter(t => t !== s))} />
          </div>
        ))}
      </div>

      <button disabled={loading || slots.length === 0 || !date} onClick={publishAvailability} className="w-full py-5 bg-[#Dd1764] text-white font-black rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:opacity-90 disabled:opacity-30 transition-all">
        {loading ? <Loader2 className="animate-spin" size={24} /> : <><TrendingUp size={20} /> Broadcast To Client Portal</>}
      </button>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { name: "Profile", icon: UserCircle },
    { name: "Wallet Requests", icon: Wallet },
    { name: "Appointments", icon: CalendarCheck },
    { name: "Time Slots", icon: Clock },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-8">
        <Link to='/' className="mb-12 self-center">
          <img src={Logo} className="w-48 transition-transform hover:scale-105" alt="Mindsettler" />
        </Link>
        <nav className="flex-1 space-y-3">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.name} onClick={() => setActiveTab(item.name)} 
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${activeTab === item.name ? "bg-[#3F2965] text-white shadow-xl translate-x-2" : "text-slate-400 hover:bg-slate-50 hover:text-[#3F2965]"}`}>
                <Icon size={20} strokeWidth={2.5} /> {item.name}
              </button>
            )
          })}
        </nav>
        <button onClick={() => navigate("/logout")} className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all group">
          <LogOut size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" /> Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-12 z-10">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-purple-50 rounded-2xl text-[#3F2965]">
                {(() => {
                    const activeItem = navItems.find(i => i.name === activeTab);
                    const ActiveIcon = activeItem ? activeItem.icon : UserCircle;
                    return <ActiveIcon size={24} />;
                })()}
             </div>
             <h1 className="text-2xl font-black text-[#3F2965] uppercase tracking-tighter">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-6">
            <Bell size={22} className="text-slate-300" />
            <div className="w-10 h-10 rounded-full bg-[#3F2965] border-2 border-white shadow-sm" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            {activeTab === "Profile" && <AdminProfileView user={user} />}
            {activeTab === "Wallet Requests" && <WalletRequestsView />}
            {activeTab === "Appointments" && <AppointmentsView />}
            {activeTab === "Time Slots" && <TimeSlotsView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;