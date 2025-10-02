import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const sectionIds = navLinks.map((nav) => nav.id);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const manualClick = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualClick.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = navLinks.find((nav) => nav.id === entry.target.id);
            if (match) setActive(match.title);
          }
        }
      },
      { threshold: 0.3 }
    );

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    sections.forEach((el) => observer.observe(el));
    return () => sections.forEach((el) => observer.unobserve(el));
  }, []);

  const handleNavClick = useCallback((title) => {
    setActive(title);
    manualClick.current = true;
    setTimeout(() => { manualClick.current = false; }, 1000);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-500 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-2xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      style={scrolled ? {
        borderBottom: "1px solid transparent",
        borderImage: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), rgba(168,85,247,0.3), transparent) 1",
      } : undefined}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
          />
          <p className="text-white text-[17px] font-semibold tracking-tight">
            Sahil
            <span className="sm:inline hidden text-secondary font-normal"> | Developer</span>
          </p>
        </a>

        <ul className="list-none hidden sm:flex flex-row gap-1 relative">
          {navLinks.map((nav) => (
            <li key={nav.id} className="relative" onClick={() => handleNavClick(nav.title)}>
              <a
                href={`#${nav.id}`}
                className={`relative z-10 px-4 py-2 text-[14px] font-medium transition-colors duration-200 rounded-full ${
                  active === nav.title ? "text-white" : "text-secondary hover:text-white"
                }`}
              >
                {nav.title}
              </a>
              {active === nav.title && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.15))",
                    border: "1px solid rgba(56,189,248,0.3)",
                    boxShadow: "0 0 15px rgba(56,189,248,0.15)",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex items-center">
          <button
            type="button"
            aria-label={toggle ? "Close menu" : "Open menu"}
            onClick={() => setToggle(!toggle)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/30 bg-accent/5"
          >
            <img src={toggle ? close : menu} alt="" className="w-5 h-5 object-contain" />
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-16 left-4 right-4 z-30"
              >
                <div className="gradient-border">
                  <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] p-5">
                    <ul className="flex flex-col gap-1">
                      {navLinks.map((nav) => (
                        <li key={nav.id}>
                          <a
                            href={`#${nav.id}`}
                            className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                              active === nav.title
                                ? "text-white bg-accent/10"
                                : "text-secondary hover:text-white hover:bg-white/[0.03]"
                            }`}
                            onClick={() => {
                              setToggle(false);
                              handleNavClick(nav.title);
                            }}
                          >
                            {nav.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
