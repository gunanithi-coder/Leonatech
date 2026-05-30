import { useState, useEffect, useRef } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [solid, setSolid] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // NEW
  const [selectedService, setSelectedService] = useState(null);

  const pendingPage = useRef(null);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // UPDATED
  const go = (p, serviceId = null) => {
    setSelectedService(serviceId);

    if (p === page && serviceId === null) return;

    pendingPage.current = p;
    setTransitioning(true);

    setTimeout(() => {
      setPage(pendingPage.current);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitioning(false);
    }, 800);
  };

  return (
    <>
      <Navbar page={page} solid={solid} go={go} />

      <main
        className={`page-transition${
          transitioning ? ' fade-out' : ' fade-in'
        }`}
      >
        {page === 'home' && <HomePage go={go} />}

        {page === 'services' && (
          <ServicesPage
            go={go}
            selectedService={selectedService}
          />
        )}

        {page === 'projects' && <ProjectsPage go={go} />}

        {page === 'contact' && <ContactPage />}
      </main>

      <Footer go={go} />

      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}