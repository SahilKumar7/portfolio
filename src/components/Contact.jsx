import { motion } from "motion/react";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import ErrorBoundary from "./ErrorBoundary";

const Contact = () => {
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-1 bg-black-100 p-8 rounded-2xl'
      >
        <p className={`${styles.sectionSubText} text-center`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} text-center`}>Contact</h3>

        <p className='mt-4 text-secondary text-[17px] leading-[30px] text-center'>
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className='mt-8 flex justify-center'>
          <div className='green-pink-gradient p-[1px] rounded-xl inline-block'>
          <a
            href='mailto:sahilkumar7@example.com'
            className='inline-flex items-center gap-3 bg-tertiary py-4 px-10 rounded-xl text-white font-bold text-[18px] hover:bg-tertiary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
          >
            Email Me
          </a>
          </div>
        </div>

        <div className='mt-8 border-t border-white/10 pt-6 flex items-center justify-center gap-4'>
          <a
            href='https://github.com/sahilkumar7'
            target='_blank'
            rel='noopener noreferrer'
            title='GitHub'
            className='w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            aria-label='GitHub'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
            </svg>
          </a>

          <a
            href='https://linkedin.com/in/sahilkumar7'
            target='_blank'
            rel='noopener noreferrer'
            title='LinkedIn'
            className='w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            aria-label='LinkedIn'
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </a>

          <a
            href='/resume.pdf'
            download
            title='Download Resume'
            className='w-11 h-11 rounded-full bg-tertiary flex items-center justify-center text-secondary hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            aria-label='Download Resume'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={2} aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-[0.75] xl:h-auto md:h-[550px] h-[350px]'
      >
        <ErrorBoundary>
          <EarthCanvas />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
