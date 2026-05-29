import { useState, useEffect, useRef } from 'react';
import './index.css'
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
  const pendingPage = useRef(null);

  // Scroll → solid navbar
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Page transition: fade out → swap → fade in
  const go = (p) => {
    if (p === page) return;
    pendingPage.current = p;
    setTransitioning(true); // triggers fade-out CSS class

    setTimeout(() => {
      setPage(pendingPage.current);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransitioning(false); // triggers fade-in
    }, 260); // must match CSS transition duration
  };

  return (
    <>
      <Navbar page={page} solid={solid} go={go} />

      {/* Page wrapper — fade transition */}
      <main className={`page-transition${transitioning ? ' fade-out' : ' fade-in'}`}>
        {page === 'home'     && <HomePage go={go} />}
        {page === 'services' && <ServicesPage go={go} />}
        {page === 'projects' && <ProjectsPage go={go} />}
        {page === 'contact'  && <ContactPage />}
      </main>

      <Footer go={go} />

      {/* Floating UI — always present */}
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}