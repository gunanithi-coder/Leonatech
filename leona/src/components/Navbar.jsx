import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Navbar({ page, solid, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on page change
  useEffect(() => { setMenuOpen(false); }, [page]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = ['home', 'services', 'projects', 'contact'];

  const handleGo = (p) => {
    setMenuOpen(false);
    go(p);
  };

  return (
    <>
      <nav className={`nav${solid ? ' solid' : ''}`}>
        {/* Brand */}
        <div className="nav-brand" onClick={() => handleGo('home')}>
          <Logo size={42} />
          <div className="nav-wordmark">
            <span className="t1">LEONA TECH & GEO SOLUTIONS PRIVATE LTD</span>
          </div>
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

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`mob-overlay${menuOpen ? ' visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile slide-in drawer */}
      <div className={`mob-drawer${menuOpen ? ' open' : ''}`}>
        {/* Drawer header */}
        <div className="mob-drawer-head">
          <div className="nav-brand" onClick={() => handleGo('home')}>
            <Logo size={36} />
            <div className="nav-wordmark">
              <span className="t1">LEONA Tech &amp; Geo Solutions Pvt Ltd</span>
            </div>
          </div>
          <button className="mob-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* Drawer nav items */}
        <nav className="mob-nav">
          {navItems.map((p, i) => (
            <button
              key={p}
              className={`mob-nav-btn${page === p ? ' active' : ''}`}
              onClick={() => handleGo(p)}
              style={{ animationDelay: menuOpen ? `${i * 0.07}s` : '0s' }}
            >
              <span className="mob-nav-num">0{i + 1}</span>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </nav>

        {/* Drawer CTA */}
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