import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import LoadingBar from "./components/LoadingBar";

const App = () => {
  return (
    <>
      <LoadingBar />
      <a
        href='#about'
        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded'
      >
        Skip to content
      </a>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <div className='section-divider' />
        <Experience />
        <div className='section-divider' />
        <Tech />
        <div className='section-divider' />
        <Works />
        <div className='section-divider' />
        <div className='relative z-0'>
          <Contact />
          <ErrorBoundary>
            <StarsCanvas />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
