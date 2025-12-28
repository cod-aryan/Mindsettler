import React, {
  useState,
  useEffect,
  useRef
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import API from "../api/axios";
import logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link } from "react-router";


// Using RequestAnimationFrame properly and lowering CPU overhead
const MindDustBackground = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: set alpha false if bg is solid
    let particles = [];
    let animationFrameId;
    let mouse = { x: -1000, y: -1000, radius: 150 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
        this.color = Math.random() > 0.6 ? "#3F2965" : "#DD1764";
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }
    }

    const init = () => {
      particles = Array.from({ length: 1500 }, () => new Particle()); // 1500 is the sweet spot for density vs performance
    };

    const animate = () => {
      ctx.fillStyle = "#fcfaff"; // Match your background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.3;
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
});

const AuthPage = () => {
  const [view, setView] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  // Reset errors on view change
  useEffect(() => {
    setErrors([]);
  }, [view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setErrors([]);
    setIsSubmitting(true);

    const data = Object.fromEntries(new FormData(e.target));
    const endpoint =
      view === "login"
        ? "login"
        : view === "signup"
        ? "signup"
        : "forgot-password";

    try {
      const { data: resData } = await API.post(`/user/${endpoint}`, data);

      if (resData.success) {
        if (endpoint === "forgot-password") {
          setView("forgot-success");
        } else {
          // Delay the redirect to let the user feel the "Success"
          setView("success");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.errors || [
          err.response?.data?.message,
        ] || ["Service unavailable"];
      setErrors(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fcfaff] overflow-hidden p-6">
      <MindDustBackground />

      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#3F2965]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-[#DD1764]/5 rounded-full blur-[120px]" />
      </div>

      <AnimatePresence mode="wait">
{view === "forgot-success" ? (
  <motion.div
    key="forgot-success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-2xl border border-white/50 text-center"
  >
    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
      <Mail size={40} className="text-blue-500" />
    </div>
    
    <h2 className="text-3xl font-bold text-[#3F2965] mb-2">Check your email</h2>
    <p className="text-gray-500 mb-8">
      We've sent a password reset link to your inbox. Please check your spam folder if you don't see it. 📥
    </p>

    <button
      onClick={() => setView('login')}
      className="text-sm font-bold text-[#DD1764] hover:underline"
    >
      BACK TO LOGIN
    </button>
  </motion.div>
) : (view === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-2xl border border-white/50 text-center"
          >
            {/* 🚀 Step 1: Add your Success Icon and Message here */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-[#3F2965] mb-2 text-center">
              Success!
            </h2>
            <p className="text-gray-500 text-center">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50"
          >
            <Link to="/" className="block w-fit mx-auto mb-8">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto hover:scale-105 transition-transform"
              />
            </Link>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#3F2965] tracking-tight">
                {view === "login"
                  ? "Welcome Back"
                  : view === "signup"
                  ? "Begin Journey"
                  : "Recover Access"}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Secure your mental well-being journey.
              </p>
            </div>

            {/* Error List Component */}
            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-3 bg-red-50 border border-red-100 rounded-2xl text-[13px] text-red-600 font-medium">
                    {errors.map((err, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>•</span>
                        {err}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {view === "signup" && (
                <Input
                  icon={<User size={18} />}
                  placeholder="Full Name"
                  name="name"
                  required
                />
              )}
              <Input
                icon={<Mail size={18} />}
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
              {view !== "forgot" && (
                <Input
                  icon={<Lock size={18} />}
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              )}

              <button
                disabled={isSubmitting}
                className="w-full bg-[#3F2965] hover:bg-[#2d1d49] text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#3F2965]/20 disabled:opacity-70 mt-4"
              >
                {isSubmitting ? (
                  <Sparkles className="animate-spin" />
                ) : (
                  "CONTINUE"
                )}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-8 text-center space-y-3">
              <button
                onClick={() => setView(view === "login" ? "signup" : "login")}
                className="text-sm font-bold text-[#DD1764] hover:underline"
              >
                {view === "login"
                  ? "NEW HERE? CREATE ACCOUNT"
                  : "HAVE AN ACCOUNT? LOG IN"}
              </button>
              {view === "login" && (
                <button
                  onClick={() => setView("forgot")}
                  className="block mx-auto text-xs text-gray-400 hover:text-[#3F2965] transition-colors"
                >
                  Forgot your password?
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3F2965] transition-colors">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-4 bg-gray-50/50 rounded-2xl border border-transparent focus:border-[#3F2965]/20 focus:bg-white outline-none transition-all text-[#3F2965] font-medium"
    />
  </div>
);

export default AuthPage;
