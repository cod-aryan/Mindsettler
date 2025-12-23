import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const journeySteps = [
  {
    title: "Self-Discovery",
    description: "Understand your unique mental landscape and identify the challenges you wish to navigate.",
    side: "left"
  },
  {
    title: "Guided Exploration",
    description: "Partner with our experts in a safe space to explore deep-rooted patterns and behaviors.",
    side: "right"
  },
  {
    title: "Building Resilience",
    description: "Equip yourself with structured tools and psycho-education to handle life's ups and downs.",
    side: "left"
  },
  {
    title: "Personalized Growth",
    description: "Develop a custom roadmap for long-term well-being and emotional balance.",
    side: "right"
  },
  {
    title: "Thriving Mindset",
    description: "Live a fulfilling, balanced life with the confidence to settle your mind independently.",
    side: "left"
  }
];

const JourneySection = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth out the scroll progress for the drawing line
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-32">
        <h2 className="text-4xl font-serif text-slate-800 mb-4">Your Path to Peace</h2>
        <p className="text-slate-600">Scroll to explore the MindSettler journey</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* The Animated Path (SVG Line) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-full">
          <svg width="100%" height="100%" viewBox="0 0 20 1000" fill="none" preserveAspectRatio="none">
            {/* Background Path */}
            <path 
              d="M10 0 C 20 100, 0 200, 10 300 C 20 400, 0 500, 10 600 C 20 700, 0 800, 10 900 C 20 1000, 0 1100, 10 1200" 
              stroke="#e2e8f0" 
              strokeWidth="2" 
            />
            {/* Animated Progress Path */}
            <motion.path 
              d="M10 0 C 20 100, 0 200, 10 300 C 20 400, 0 500, 10 600 C 20 700, 0 800, 10 900 C 20 1000, 0 1100, 10 1200" 
              stroke="#94a3b8" 
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Journey Steps */}
        <div className="space-y-64">
          {journeySteps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
      
      {/* Call to Action at the end */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-32"
      >
        <button className="bg-slate-800 text-white px-8 py-4 rounded-full hover:bg-slate-700 transition-colors">
          Start Your First Session
        </button>
      </motion.div>
    </div>
  );
};

const StepCard = ({ step, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: step.side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex w-full items-center ${step.side === 'left' ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`w-full md:w-5/12 p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-default`}>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step 0{index + 1}</span>
        <h3 className="text-2xl font-serif text-slate-800 mt-2 mb-3">{step.title}</h3>
        <p className="text-slate-600 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
};

export default JourneySection;