import { motion } from "motion/react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className='absolute inset-0 md:hidden'
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(145,94,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,206,168,0.1) 0%, transparent 50%)',
        }}
      />
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className='max-w-[45%] sm:max-w-[50%] md:max-w-[500px]'>
          <h1
            className={`${styles.heroHeadText} text-white`}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(5,8,22,0.9)' }}
          >
            Hi, I'm <span className='text-[#915EFF]'>Sahil</span>
          </h1>
          <p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8), 0 0 30px rgba(5,8,22,0.9)' }}
          >
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>

      <ErrorBoundary>
        <ComputersCanvas />
      </ErrorBoundary>

      <div className='absolute bottom-10 w-full flex justify-center items-center'>
        <a href='#about' aria-label='Scroll to About section'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
