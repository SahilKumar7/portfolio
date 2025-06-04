import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingBar from "./components/LoadingBar";

const App = () => {
  return (
    <>
      <LoadingBar />
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <ErrorBoundary>
            <StarsCanvas />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default App;
