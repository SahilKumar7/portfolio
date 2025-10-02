import React from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { play } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, scaleReveal } from "../utils/motion";

const tagColors = {
  "blue-text-gradient": "rgba(168,85,247,0.3)",
  "green-text-gradient": "rgba(16,185,129,0.3)",
  "pink-text-gradient": "rgba(251,113,133,0.3)",
  "orange-text-gradient": "rgba(245,158,11,0.3)",
  "purple-text-gradient": "rgba(56,189,248,0.3)",
};

const FeaturedCard = ({ name, description, tags, image, source_code_link }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0, 0.75)}
    className="group"
  >
    <div className="gradient-border-multi">
      <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="relative lg:w-[55%] h-[250px] lg:h-[350px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 transition-opacity duration-500 opacity-50 group-hover:opacity-70"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(168,85,247,0.2), transparent)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0c1222]" />
            {source_code_link && (
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(168,85,247,0.3))",
                  border: "1px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.2)",
                }}
                aria-label={`View ${name} demo`}
              >
                <img src={play} alt="" className="w-4 h-4 object-contain" />
              </a>
            )}
          </div>
          <div className="p-6 lg:p-8 lg:w-[45%] flex flex-col justify-center">
            <h3 className="text-white font-display font-bold text-[24px] lg:text-[28px]">{name}</h3>
            <p className="mt-3 text-secondary text-[14px] leading-[24px]">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="text-[12px] font-medium px-3 py-1 rounded-full"
                  style={{
                    background: tagColors[tag.color] || "rgba(56,189,248,0.15)",
                    border: `1px solid ${tagColors[tag.color]?.replace("0.3", "0.5") || "rgba(56,189,248,0.3)"}`,
                    color: "#e2e8f0",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const hoverTint = Object.values(tagColors)[index % Object.values(tagColors).length];

  return (
    <motion.div
      variants={scaleReveal(index * 0.12, 0.5)}
      className="group"
    >
      <div className="gradient-border">
        <div className="gradient-border-inner overflow-hidden">
          <div className="relative w-full h-[200px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${hoverTint}, transparent)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/30 to-transparent" />
            {source_code_link && (
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(56,189,248,0.5), rgba(168,85,247,0.3))",
                  border: "1px solid rgba(56,189,248,0.4)",
                  boxShadow: "0 0 15px rgba(56,189,248,0.3)",
                }}
                aria-label={`View ${name} demo`}
              >
                <img src={play} alt="" className="w-3.5 h-3.5 object-contain" />
              </a>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-white font-display font-bold text-[18px]">{name}</h3>
            <p className="mt-2 text-secondary text-[13px] leading-[22px] line-clamp-3">{description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    background: tagColors[tag.color] || "rgba(56,189,248,0.15)",
                    border: `1px solid ${tagColors[tag.color]?.replace("0.3", "0.4") || "rgba(56,189,248,0.25)"}`,
                    color: "#e2e8f0",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [featured, ...rest] = projects;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="gradient-text">Projects</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[15px] max-w-2xl leading-[26px] text-center mx-auto"
      >
        A mix of full-stack web applications and games built with Unity
        and Godot. Each project links to a live demo or playable build.
      </motion.p>

      <div className="mt-14">
        <FeaturedCard {...featured} />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {rest.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
