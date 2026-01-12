import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

const JourneySection = () => {
  const containerRef = useRef(null);
  const [openBook, setOpenBook] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const milestones = [
    {
      title: "Awareness",
      desc: "Recognizing the patterns of your mind.",
      side: "left",
      icon: "🧘",
      innerContent: {
        title: "Deep Dive into Awareness",
        points: [
          "Understand your thought patterns",
          "Identify emotional triggers",
          "Practice mindful observation",
          "Build self-awareness habits"
        ],
        quote: "The first step toward change is awareness.",
        duration: "2-4 weeks"
      }
    },
    {
      title: "Discovery",
      desc: "Exploring evidence-based tools for you.",
      side: "right",
      icon: "💡",
      innerContent: {
        title: "Tools for Transformation",
        points: [
          "Cognitive behavioral techniques",
          "Meditation practices",
          "Journaling methods",
          "Breathing exercises"
        ],
        quote: "Discovery consists of seeing what everybody has seen.",
        duration: "3-5 weeks"
      }
    },
    {
      title: "Practice",
      desc: "Implementing daily rituals and exercises.",
      side: "left",
      icon: "🌱",
      innerContent: {
        title: "Building Your Practice",
        points: [
          "Morning mindfulness routine",
          "Evening reflection sessions",
          "Weekly progress reviews",
          "Community support circles"
        ],
        quote: "Practice makes progress, not perfection.",
        duration: "4-8 weeks"
      }
    },
    {
      title: "Clarity",
      desc: "Walking forward with renewed purpose.",
      side: "right",
      icon: "✨",
      innerContent: {
        title: "Achieving Mental Clarity",
        points: [
          "Clear decision-making skills",
          "Emotional resilience",
          "Purpose-driven living",
          "Sustainable well-being"
        ],
        quote: "Clarity comes from engagement, not thought.",
        duration: "Ongoing journey"
      }
    },
  ];

  // Book Card Component
  const BookCard = ({ step, index }) => {
    const isOpen = openBook === index;

    return (
      <div
        className="relative w-[320px] h-[420px] cursor-pointer"
        style={{ perspective: "1500px" }}
        onMouseEnter={() => setOpenBook(index)}
        onMouseLeave={() => setOpenBook(null)}
      >
        {/* Book Shadow */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isOpen
              ? "20px 20px 60px rgba(0,0,0,0.3), -5px 5px 30px rgba(0,0,0,0.1)"
              : "10px 10px 30px rgba(0,0,0,0.2)"
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Back Page (Revealed Content) */}
        <div className="absolute inset-0 bg-white rounded-xl overflow-hidden">
          {/* Page texture lines */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="h-px bg-gray-200"
                style={{ marginTop: `${28 + i * 24}px`, marginLeft: '20px', marginRight: '20px' }}
              />
            ))}
          </div>

          {/* Inner Content */}
          <div className="relative p-6 h-full flex flex-col">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.3 : 0, duration: 0.3 }}
              className="text-xl font-bold text-[#3F2965] mb-4 mt-2"
            >
              {step.innerContent.title}
            </motion.h4>

            <motion.ul 
              className="space-y-2 flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.4 : 0, duration: 0.3 }}
            >
              {step.innerContent.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : -10, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: isOpen ? 0.4 + i * 0.1 : 0 }}
                  className="flex items-start gap-2 text-[#3F2965]/70 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#Dd1764] mt-1.5 flex-shrink-0" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.7 : 0 }}
              className="mt-4 p-3 bg-gradient-to-r from-[#3F2965]/5 to-[#Dd1764]/5 rounded-lg border-l-3 border-[#Dd1764]"
            >
              <p className="text-[#3F2965]/60 italic text-xs">
                "{step.innerContent.quote}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.8 : 0 }}
              className="mt-3 text-xs text-[#3F2965]/50"
            >
              <span className="text-[#Dd1764] font-semibold">Duration:</span> {step.innerContent.duration}
            </motion.div>
          </div>
        </div>

        {/* Book Spine */}
        <motion.div
          className="absolute top-0 bottom-0 w-[12px] bg-gradient-to-r from-[#2a1f3d] via-[#3F2965] to-[#2a1f3d] rounded-l-sm z-10"
          style={{
            left: 0,
            transformOrigin: "left center",
          }}
          animate={{
            x: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
        />

        {/* Front Cover (Flips) */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
          }}
          animate={{
            rotateY: isOpen ? -160 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.645, 0.045, 0.355, 1],
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#3F2965] to-[#Dd1764]" />
            
            {/* Icon */}
            <motion.span 
              className="text-6xl mb-6"
              animate={!isOpen ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {step.icon}
            </motion.span>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2 text-center">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-center text-sm mb-6">
              {step.desc}
            </p>

            {/* Hover instruction */}
            <motion.div
              className="flex items-center gap-2 text-[#Dd1764] text-sm font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Hover Me</span>
            </motion.div>

            {/* Step number */}
            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#3F2965] to-[#Dd1764] flex items-center justify-center">
              <span className="text-white font-bold">{index + 1}</span>
            </div>
          </div>

          {/* Back Face (visible when flipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Page lines texture */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-gray-300"
                  style={{ marginTop: `${28 + i * 24}px`, marginLeft: '16px', marginRight: '16px' }}
                />
              ))}
            </div>

            {/* Text on back of flipped page */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400 font-medium transform -scale-x-100">
                {step.title}
              </span>
            </div>

            {/* Bookmark */}
            <div className="absolute top-0 right-6 w-6 h-12 bg-gradient-to-b from-[#Dd1764] to-[#b01350] rounded-b-sm" />
          </div>
        </motion.div>

        {/* Left page fold shadow when opening */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-5"
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[220vh] overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            #faf5ff 0%, 
            #f3e8ff 15%,
            #ede4ff 30%,
            #fce7f3 50%, 
            #fdf2f8 70%,
            #faf5ff 85%,
            #f5f3ff 100%
          )
        `,
      }}
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          animate={{
            x: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-40"
        />
        
        <motion.div
          style={{ y: y2 }}
          animate={{
            x: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
        />

        {/* Floating Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
                fill={i % 2 === 0 ? "rgba(221,23,100,0.3)" : "rgba(63,41,101,0.3)"}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Decorative Top Wave */}
      <svg className="absolute top-0 left-0 w-full h-32 opacity-50" preserveAspectRatio="none" viewBox="0 0 1440 120">
        <path
          fill="url(#topWaveGradient)"
          d="M0,60 C360,120 1080,0 1440,60 L1440,0 L0,0 Z"
        />
        <defs>
          <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(63,41,101,0.1)" />
            <stop offset="50%" stopColor="rgba(221,23,100,0.1)" />
            <stop offset="100%" stopColor="rgba(63,41,101,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto relative px-4 pt-24">
        {/* Section Header */}
        <div className="text-center mb-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3F2965]/10 to-[#Dd1764]/10 border border-[#3F2965]/20 text-[#Dd1764] font-bold tracking-[0.3em] uppercase text-sm">
              The Path Forward
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3F2965] via-[#7c3aed] to-[#Dd1764] mt-4"
          >
            Your Mental Wellness Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#3F2965]/60 text-xl mt-6 max-w-2xl mx-auto font-medium"
          >
            Hover over each milestone to open the book of knowledge
          </motion.p>

          {/* Animated Dots */}
          <motion.div 
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764]"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>

        {/* SVG River Path */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-72 w-full h-[70%] pointer-events-none z-0"
          viewBox="0 0 400 1200"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="riverGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3F2965" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#Dd1764" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3F2965" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background Path */}
          <path
            d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200"
            stroke="rgba(63,41,101,0.1)"
            strokeWidth="40"
            strokeLinecap="round"
          />

          {/* Dashed Guide Path */}
          <path
            d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200"
            stroke="rgba(63,41,101,0.15)"
            strokeWidth="4"
            strokeDasharray="15 15"
          />

          {/* Animated Main Path */}
          <motion.path
            d="M200,0 C350,200 50,400 200,600 C350,800 50,1000 200,1200"
            stroke="url(#riverGradientLight)"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {/* Book Cards */}
        <div className="relative z-10">
          {milestones.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`flex w-full mb-56 ${
                step.side === "left" ? "justify-start pl-8" : "justify-end pr-8"
              }`}
            >
              <div className="relative">
                <BookCard step={step} index={index} />
                
                {/* Connection Line to Path */}
                <motion.div
                  className={`absolute top-1/2 ${step.side === "left" ? "-right-16" : "-left-16"} flex items-center gap-2`}
                >
                  <motion.div
                    className="w-12 h-0.5 bg-gradient-to-r from-[#3F2965]/30 to-[#Dd1764]/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                  <motion.div
                    className="w-4 h-4 rounded-full bg-gradient-to-br from-[#3F2965] to-[#Dd1764] shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(221,23,100,0.4)",
                        "0 0 0 8px rgba(221,23,100,0)",
                        "0 0 0 0 rgba(221,23,100,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center pb-24 relative z-10"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] blur-xl opacity-40"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <button className="relative px-12 py-5 rounded-full bg-gradient-to-r from-[#3F2965] via-[#5a3d7a] to-[#Dd1764] text-white font-bold text-lg shadow-2xl hover:shadow-[#Dd1764]/30 transition-shadow duration-300">
              <span className="flex items-center gap-3">
                Start Your Story
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  📖
                </motion.span>
              </span>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#3F2965]/50 mt-6 text-sm"
          >
            Join thousands on their journey to mental wellness
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;