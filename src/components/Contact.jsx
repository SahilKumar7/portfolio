import { motion } from "motion/react";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../utils/motion";
import ErrorBoundary from "./ErrorBoundary";

const Contact = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(56,189,248,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(168,85,247,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(251,113,133,0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative z-10">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-1"
        >
          <div className="gradient-border-multi">
            <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] p-8 sm:p-10">
              <p className={`${styles.sectionSubText} text-center`}>Get in touch</p>
              <h3 className={`${styles.sectionHeadText} text-center`}>
                <span className="gradient-text">Contact</span>
              </h3>

              <p className="mt-4 text-secondary text-[15px] leading-[26px] text-center max-w-md mx-auto">
                Have a question or want to work together? Feel free to reach out!
              </p>

              <div className="mt-8 flex justify-center">
                <a
                  href="mailto:sahilkumar7@example.com"
                  className="group relative inline-flex items-center gap-3 rounded-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 animate-gradient-rotate"
                    style={{
                      background: "linear-gradient(135deg, #38bdf8, #a855f7, #fb7185, #38bdf8)",
                      backgroundSize: "300% 300%",
                      animation: "gradientShift 3s ease-in-out infinite alternate",
                    }}
                  />
                  <div className="relative m-[2px] px-8 py-4 rounded-full bg-[#0c1222] group-hover:bg-transparent transition-all duration-500 flex items-center gap-3">
                    <span className="font-semibold text-white text-[16px]">Email Me</span>
                    <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(56,189,248,0.3), transparent)" }} />

                {[
                  {
                    href: "https://github.com/sahilkumar7",
                    label: "GitHub",
                    color: "#38bdf8",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://linkedin.com/in/sahilkumar7",
                    label: "LinkedIn",
                    color: "#a855f7",
                    icon: (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    href: "/resume.pdf",
                    label: "Download Resume",
                    color: "#fb7185",
                    download: true,
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.download ? undefined : "_blank"}
                    rel={social.download ? undefined : "noopener noreferrer"}
                    download={social.download || undefined}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full p-[1px] flex items-center justify-center text-secondary hover:text-white transition-all duration-300 hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}40, ${social.color}20)`,
                      border: `1px solid ${social.color}50`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${social.color}30`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {social.icon}
                  </a>
                ))}

                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.3), transparent)" }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-[0.75] xl:h-auto md:h-[550px] h-[350px]"
        >
          <ErrorBoundary>
            <EarthCanvas />
          </ErrorBoundary>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
