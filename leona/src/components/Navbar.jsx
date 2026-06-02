import { useState, useEffect } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ page, solid, go, introDone }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const navItems = ["home", "about", "services", "projects", "contact"];

  // ---------------- SCROLL LOCK RESET ----------------
  useEffect(() => {
    if (introDone) {
      const t = setTimeout(() => {
        setShowItems(true);
      }, 600); // slight delay after morph completes

      return () => clearTimeout(t);
    }
  }, [introDone]);

  useEffect(() => {
    setMenuOpen(false);
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const handleGo = (p) => {
    setMenuOpen(false);
    go(p);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`nav ${solid ? "solid" : ""}`}>

        {/* BRAND */}
        <div
          id="navbar-logo-anchor"
          className="nav-brand"
          onClick={() => handleGo("home")}
        >
          <Logo size={50} />
        </div>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          {navItems.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: -10 }}
              animate={
                showItems
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -10 }
              }
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                className={`nav-btn ${
                  page === p ? "active" : ""
                }`}
                onClick={() => handleGo(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            </motion.li>
          ))}

          {/* CTA */}
          <motion.li
            initial={{ opacity: 0, y: -10 }}
            animate={
              showItems
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -10 }
            }
            transition={{
              delay: navItems.length * 0.12,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              className="nav-btn nav-cta"
              onClick={() => handleGo("contact")}
            >
              Get a Quote
            </button>
          </motion.li>
        </ul>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mob-overlay visible"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <div className={`mob-drawer ${menuOpen ? "open" : ""}`}>
        <div className="mob-drawer-head">
          <div
            className="nav-brand"
            onClick={() => handleGo("home")}
          >
            <Logo size={45} />
          </div>
          <button
            className="mob-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="mob-nav">
          {navItems.map((p, i) => (
            <motion.button
              key={p}
              className={`mob-nav-btn ${
                page === p ? "active" : ""
              }`}
              onClick={() => handleGo(p)}
              initial={{ opacity: 0, x: -10 }}
              animate={
                showItems
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="mob-nav-num">
                0{i + 1}
              </span>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </motion.button>
          ))}
        </nav>

        <div className="mob-drawer-foot">
          <button
            className="btn-primary mob-cta-btn"
            onClick={() => handleGo("contact")}
          >
            Get a Quote →
          </button>
        </div>
      </div>
    </>
  );
}