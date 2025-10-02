import { useEffect, useRef } from "react";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import SplashLoader from "./components/LoadingBar";

const App = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <SplashLoader />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
      >
        Skip to content
      </a>

      <div ref={glowRef} className="cursor-glow" />

      <div className="relative z-0 bg-primary overflow-x-hidden">
        <div className="relative">
          <Navbar />
          <Hero />
        </div>

        <div className="section-ambient ambient-purple">
          <About />
        </div>

        <div className="section-divider" />

        <div className="section-ambient ambient-cyan">
          <Experience />
        </div>

        <div className="section-divider" />

        <div className="section-ambient ambient-pink">
          <Tech />
        </div>

        <div className="section-divider" />

        <div className="section-ambient ambient-mixed">
          <Works />
        </div>

        <div className="section-divider" />

        <div className="relative z-0">
          <Contact />
          <ErrorBoundary>
            <StarsCanvas />
          </ErrorBoundary>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
