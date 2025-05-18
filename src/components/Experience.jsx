import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className='relative flex flex-col sm:flex-row gap-6 sm:gap-10'
    >
      <div className='absolute left-[19px] sm:left-[140px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#915EFF] to-transparent' />

      <div className='hidden sm:flex w-[120px] flex-shrink-0 pt-1 justify-end'>
        <span className='text-secondary text-[14px] font-medium text-right'>
          {experience.date}
        </span>
      </div>

      <div className='relative flex-shrink-0'>
        <div
          className='w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#915EFF] z-10 relative'
          style={{ background: experience.iconBg }}
        >
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      </div>

      <div className='bg-[#1d1836] rounded-2xl p-6 sm:p-8 flex-1 mb-8'>
        <p className='sm:hidden text-secondary text-[13px] font-medium mb-3'>
          {experience.date}
        </p>
        <h3 className='text-white text-[22px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[15px] font-semibold mt-1'>
          {experience.company_name}
        </p>

        <ul className='mt-5 list-disc ml-5 space-y-2'>
          {experience.points.map((point, i) => (
            <li
              key={`experience-point-${i}`}
              className='text-white-100 text-[14px] pl-1 tracking-wider leading-relaxed'
            >
              {point}
            </li>
          ))}
        </ul>
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
          Work Experience
        </h2>
      </motion.div>

      <div className='mt-16 max-w-4xl mx-auto'>
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
