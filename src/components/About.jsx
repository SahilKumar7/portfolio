import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, scaleReveal } from "../utils/motion";

const borderGradients = [
  "linear-gradient(135deg, #38bdf8, #0284c7, #7dd3fc)",
  "linear-gradient(135deg, #a855f7, #7c3aed, #c4b5fd)",
  "linear-gradient(135deg, #fb7185, #e11d48, #fda4af)",
  "linear-gradient(135deg, #38bdf8, #a855f7, #fb7185)",
];

const glowShadows = [
  "0 0 25px rgba(56,189,248,0.2)",
  "0 0 25px rgba(168,85,247,0.2)",
  "0 0 25px rgba(251,113,133,0.2)",
  "0 0 25px rgba(56,189,248,0.15), 0 0 20px rgba(168,85,247,0.1)",
];

const iconGlows = [
  "rgba(56,189,248,0.15)",
  "rgba(168,85,247,0.15)",
  "rgba(251,113,133,0.15)",
  "rgba(56,189,248,0.1)",
];

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={scaleReveal(index * 0.12, 0.5)}
    className="group"
  >
    <div
      className="rounded-xl p-[1px] h-full transition-all duration-300 group-hover:scale-[1.03]"
      style={{ background: borderGradients[index % 4] }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = glowShadows[index % 4]; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] h-full px-4 py-5 flex flex-col items-center justify-center gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: iconGlows[index % 4] }}
        >
          <img src={icon} alt={title} className="w-9 h-9 object-contain" />
        </div>
        <h3 className="text-white text-[14px] font-semibold text-center font-display leading-tight">
          {title}
        </h3>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="gradient-text">Overview</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[15px] max-w-2xl leading-[26px] mx-auto text-center"
      >
        Software developer at Amdocs with a focus on building modern web
        applications using React, Python, and Node.js. I specialize in
        frontend development and backend modernization, and I have a
        passion for game development and pixel art on the side — shipping
        titles built in Unity and Godot.
      </motion.p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
