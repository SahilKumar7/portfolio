import { useState, useEffect } from "react";

const LoadingBar = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const timeout = setTimeout(() => {
      setProgress(100);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-[3px] transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className='h-full bg-gradient-to-r from-[#00cea8] to-[#bf61ff] transition-all duration-300 ease-out'
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
};

export default LoadingBar;
