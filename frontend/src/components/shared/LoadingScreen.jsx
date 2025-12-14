import { motion } from 'framer-motion';
import logo2 from "../../assets/logo2.svg";
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 95);
        return newProgress;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-16 h-20">
            <img
              src={logo2}
              alt="Hirees Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-3xl font-bold text-white mb-4">Hirees</span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-80 space-y-2">
          {/* Progress Bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {/* Progress Percentage */}
          <div className="flex justify-end">
            <span className="text-white/80 text-sm font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <p className="text-white text-lg font-medium">
            Loading your experience
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ...
            </motion.span>
          </p>
          <p className="text-white/80 text-sm">
            {progress < 30 && "Preparing your workspace..."}
            {progress >= 30 && progress < 60 && "Loading resources..."}
            {progress >= 60 && progress < 90 && "Almost there..."}
            {progress >= 90 && "Finalizing..."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 