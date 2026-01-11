import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Sparkles, Eye, EyeOff } from "lucide-react";
import API from "../api/axios";
import logo from "../assets/icons/MindsettlerLogo-removebg-preview.png";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Login_img from "../assets/images/Login_img-removebg-preview.png";

// Illustration Section - Character overlaps to the left like in the reference
const IllustrationSection = ({ illustrationSrc }) => (
  <div className="hidden lg:block lg:w-1/2 relative overflow-visible">
    {/* Pinkish Arch Background - Positioned to the right */}
    <div className="absolute bottom-0 right-50 w-[320px] h-[500px] xl:w-[380px] xl:h-[580px] bg-gradient-to-t from-[#F8D7DA] via-[#FADBD8] to-[#FDF2F0] rounded-t-full" />
    
    {/* Character Image - Overlaps to the left */}
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, x: 50 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute bottom-20 right-20 left-[-80px] xl:left-[-120px] z-10 flex items-end justify-center"
    >
      {illustrationSrc && (
        <img 
          src={illustrationSrc} 
          alt="Login Illustration" 
          className="w-[350px] xl:w-[390px] h-auto object-contain"
        />
      )}
    </motion.div>
  </div>
);

// Mobile Illustration - Smaller version for mobile devices
const MobileIllustration = ({ illustrationSrc }) => (
  <div className="lg:hidden relative w-full flex justify-center items-end mt-8 mb-4">
    {/* Pinkish Arch Background for Mobile */}
    <div className="absolute bottom-0 w-[200px] h-[250px] bg-gradient-to-t from-[#F8D7DA] via-[#FADBD8] to-[#FDF2F0] rounded-t-full" />
    
    {/* Character Image for Mobile */}
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10"
    >
      {illustrationSrc && (
        <img 
          src={illustrationSrc} 
          alt="Login Illustration" 
          className="w-[180px] h-auto object-contain"
        />
      )}
    </motion.div>
  </div>
);

const AuthPage = () => {
  const [view, setView] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Reset errors on view change
  useEffect(() => {
    setErrors([]);
  }, [view]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
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
          setView("success");
          setTimeout(() => {
            setUser(resData.user);
            navigate("/");
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
    <div className="relative min-h-screen w-full flex bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "forgot-success" ? (
          <motion.div
            key="forgot-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#3F2965]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Mail size={32} className="text-[#3F2965] sm:w-10 sm:h-10" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#3F2965] mb-2">
                Check your email
              </h2>
              <p className="text-gray-500 mb-8 text-sm sm:text-base">
                We've sent a password reset link to your inbox. Please check
                your spam folder if you don't see it. 📥
              </p>

              <button
                onClick={() => setView("login")}
                className="text-sm font-bold text-[#DD1764] hover:underline"
              >
                BACK TO LOGIN
              </button>
            </div>
          </motion.div>
        ) : view === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-xl text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-[#DD1764]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles size={32} className="text-[#DD1764] sm:w-10 sm:h-10" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#3F2965] mb-2">
                Success!
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Redirecting you to your dashboard...
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-1 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mt-6"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full flex flex-col lg:flex-row"
          >
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-16 lg:py-12">
              <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="block w-fit mb-6 sm:mb-8">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={logo}
                    alt="Logo"
                    className="h-8 sm:h-10 w-auto"
                  />
                </Link>

                {/* Mobile Illustration - Shows on small screens */}
                <MobileIllustration illustrationSrc={Login_img} />

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 sm:mb-8"
                >
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F2965] mb-2 italic">
                    {view === "login"
                      ? "Welcome Back!!"
                      : view === "signup"
                      ? "Begin Your Journey"
                      : "Recover Access"}
                  </h1>
                  <p className="text-[#6B4D8A]/70 text-sm">
                    {view === "login"
                      ? "Sign in to continue your mental wellness journey."
                      : view === "signup"
                      ? "Create an account to start your journey."
                      : "Enter your email to reset your password."}
                  </p>
                </motion.div>

                {/* Error Messages */}
                <AnimatePresence>
                  {errors.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 sm:mb-6 overflow-hidden"
                    >
                      <div className="p-3 sm:p-4 bg-[#DD1764]/10 border border-[#DD1764]/20 rounded-2xl text-sm text-[#DD1764] font-medium">
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                  {view === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Input
                        icon={<User size={18} className="sm:w-5 sm:h-5" />}
                        placeholder="Full Name"
                        name="name"
                        label="Full Name"
                        required
                      />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Input
                      icon={<Mail size={18} className="sm:w-5 sm:h-5" />}
                      type="email"
                      placeholder="email@gmail.com"
                      name="email"
                      label="Email"
                      required
                    />
                  </motion.div>

                  {view !== "forgot" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        icon={<Lock size={18} className="sm:w-5 sm:h-5" />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        label="Password"
                        required
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-[#6B4D8A]/40 hover:text-[#3F2965] transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} className="sm:w-5 sm:h-5" />
                            ) : (
                              <Eye size={18} className="sm:w-5 sm:h-5" />
                            )}
                          </button>
                        }
                      />
                    </motion.div>
                  )}

                  {/* Forgot Password Link */}
                  {view === "login" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex justify-end"
                    >
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-sm text-[#3F2965] hover:text-[#DD1764] font-medium transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-[#3F2965] to-[#6B4D8A] hover:from-[#2d1d49] hover:to-[#5A3D7A] text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#3F2965]/30 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles size={20} />
                      </motion.div>
                    ) : (
                      <>
                        {view === "login"
                          ? "Login"
                          : view === "signup"
                          ? "Sign Up"
                          : "Send Reset Link"}
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Toggle View Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 sm:mt-8 text-center"
                >
                  <p className="text-[#6B4D8A]/70 text-sm">
                    {view === "login"
                      ? "Don't have an account? "
                      : view === "signup"
                      ? "Already have an account? "
                      : "Remember your password? "}
                    <button
                      onClick={() =>
                        setView(view === "login" ? "signup" : "login")
                      }
                      className="text-[#DD1764] font-bold hover:underline"
                    >
                      {view === "login" ? "Sign up" : "Log in"}
                    </button>
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Section - Illustration (Desktop Only) */}
            <IllustrationSection illustrationSrc={Login_img} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Input Component with responsive styling
const Input = ({ icon, label, rightIcon, ...props }) => (
  <div className="space-y-1.5 sm:space-y-2">
    {label && (
      <label className="block text-[#3F2965] text-sm font-medium">{label}</label>
    )}
    <div className="relative group">
      <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#6B4D8A]/40 group-focus-within:text-[#3F2965] transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white border border-[#3F2965]/20 rounded-full focus:border-[#3F2965] focus:ring-2 focus:ring-[#3F2965]/20 outline-none transition-all text-[#3F2965] placeholder-[#6B4D8A]/40 text-sm sm:text-base"
      />
      {rightIcon && (
        <div className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  </div>
);

export default AuthPage;