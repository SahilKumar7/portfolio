import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="relative pl-16 sm:pl-20 mb-10 last:mb-0"
    >
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] glow-line" />

      <div
        className="absolute left-[9px] sm:left-[17px] top-1 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center z-10"
        style={{
          background: experience.iconBg,
          border: "2px solid rgba(56,189,248,0.5)",
          boxShadow: "0 0 15px rgba(56,189,248,0.25), 0 0 30px rgba(56,189,248,0.08)",
        }}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[58%] h-[58%] object-contain"
        />
      </div>

      <div
        className="rounded-xl p-[1px] transition-all duration-300 hover:shadow-glow-sky"
        style={{
          background: "linear-gradient(135deg, #38bdf8, #a855f7, #fb7185)",
        }}
      >
        <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="px-3 py-1 text-[11px] sm:text-[12px] font-semibold text-white rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.35), rgba(168,85,247,0.25))",
                border: "1px solid rgba(56,189,248,0.4)",
              }}
            >
              {experience.date}
            </span>
          </div>

          <h3 className="text-white text-[18px] sm:text-[20px] font-bold font-display leading-tight">
            {experience.title}
          </h3>
          <p className="text-secondary text-[13px] sm:text-[14px] font-medium mt-1">
            {experience.company_name}
          </p>

          <ul className="mt-4 space-y-2.5">
            {experience.points.map((point, i) => (
              <li
                key={`exp-${index}-point-${i}`}
                className="text-white-100/80 text-[13px] sm:text-[14px] pl-4 relative leading-relaxed"
              >
                <span
                  className="absolute left-0 top-[8px] w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8, #a855f7)",
                    boxShadow: "0 0 4px rgba(56,189,248,0.4)",
                  }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      <div className="mt-14 max-w-3xl mx-auto relative">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
