import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar({ page, solid, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [page]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = ['home','about', 'services', 'projects', 'contact'];

  const handleGo = (p) => {
    setMenuOpen(false);
    go(p);
  };

  return (
    <>
      {/* ── MAIN NAV BAR ── */}
      <nav className={`nav${solid ? ' solid' : ''}`}>

        {/* Brand */}
        <div className="nav-brand" onClick={() => handleGo('home')}>
          <Logo size={64} />
          {/* ✅ REMOVED nav-wordmark div — Logo already shows shield + text */}
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map(p => (
            <li key={p}>
              <button
                className={`nav-btn${page === p ? ' active' : ''}`}
                onClick={() => handleGo(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <button className="nav-btn nav-cta" onClick={() => handleGo('contact')}>
              Get a Quote
            </button>
          </li>
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="mob-overlay visible"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <div className={`mob-drawer${menuOpen ? ' open' : ''}`}>
        <div className="mob-drawer-head">
          <div className="nav-brand" onClick={() => handleGo('home')} style={{ cursor:'pointer' }}>
            <Logo size={54} />
            {/* ✅ REMOVED nav-wordmark div here too */}
          </div>
          <button className="mob-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <nav className="mob-nav">
          {navItems.map((p, i) => (
            <button
              key={p}
              className={`mob-nav-btn${page === p ? ' active' : ''}`}
              onClick={() => handleGo(p)}
              style={{ animationDelay: menuOpen ? `${i * 0.07 + 0.1}s` : '0s' }}
            >
              <span className="mob-nav-num">0{i + 1}</span>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </nav>

        <div className="mob-drawer-foot">
          <button className="btn-primary mob-cta-btn" onClick={() => handleGo('contact')}>
            Get a Quote →
          </button>
          <div className="mob-contact-info">
            <a href="tel:+919945482812">📞 +91 99454 82812</a>
            <a href="mailto:support@ilinkdev.in">✉ support@ilinkdev.in</a>
          </div>
        </div>
      </div>
    </>
  );
}