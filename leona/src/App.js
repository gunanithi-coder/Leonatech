import { useState, useEffect, useRef } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import LogoIntro from './components/LogoIntro';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [solid, setSolid] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Intro animation state
  const [introDone, setIntroDone] = useState(false);

  const pendingPage = useRef(null);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);

    window.addEventListener('scroll', fn);

    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (p, serviceId = null) => {
    setSelectedService(serviceId);

    if (p === page && serviceId === null) return;

    pendingPage.current = p;

    setTransitioning(true);

    setTimeout(() => {
      setPage(pendingPage.current);
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      setTransitioning(false);
    }, 800);
  };

  return (
    <>
      {!introDone && (
        <LogoIntro
          onComplete={() => setIntroDone(true)}
        />
      )}

      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: introDone ? 'auto' : 'none'
        }}
      >
        <Navbar
          page={page}
          solid={solid}
          go={go}
          introDone={introDone}
        />

        <main
          className={`page-transition ${
            transitioning
              ? 'fade-out'
              : 'fade-in'
          }`}
        >
          {page === 'home' && (
            <HomePage go={go} />
          )}

          {page === 'about' && (
            <AboutPage go={go} />
          )}

          {page === 'services' && (
            <ServicesPage
              go={go}
              selectedService={selectedService}
            />
          )}

          {page === 'projects' && (
            <ProjectsPage go={go} />
          )}

          {page === 'contact' && (
            <ContactPage />
          )}
        </main>

        <Footer go={go} />
        <BackToTop />
        <WhatsAppFloat />
      </div>
    </>
  );
}