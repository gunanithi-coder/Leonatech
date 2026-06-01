import { useState, useEffect } from 'react';
import { SERVICES } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';

// ── Stock photos per service (swap with real Leona photos later) ─────────────
const SERVICE_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
  3: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
  4: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  5: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  6: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80',
  7: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
  8: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80',
  9: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80',
};

// ── Services grouped by category for sidebar ─────────────────────────────────
const GROUPED = [
  { cat: 'Urban Planning',      ids: [1, 2, 3] },
  { cat: 'Infrastructure',      ids: [4, 8]    },
  { cat: 'Water & Environment', ids: [5, 6]    },
  { cat: 'Mining & Volumetric', ids: [7]       },
  { cat: 'Monitoring',          ids: [9]       },
];

// ── Right panel detail ────────────────────────────────────────────────────────
function ServiceDetail({ service, visible }) {
  const col = CAT_COLORS[service.category] || '#E05B2A';
  const rgb = hexToRgb(col);
  const photo = SERVICE_PHOTOS[service.id];

  return (
    <div className={`spl-detail${visible ? ' spl-detail-in' : ' spl-detail-out'}`}>

      {/* Full-width image */}
      <div className="spl-img-wrap">
        <img src={photo} alt={service.title} className="spl-img" />
        <div className="spl-img-overlay" />
        {/* overlaid title on image */}
        <div className="spl-img-content">
          <span
            className="spl-cat-badge"
            style={{ background: `rgba(${rgb},.18)`, color: col, border: `0.5px solid rgba(${rgb},.35)` }}
          >
            {service.icon} {service.category}
          </span>
          <h1 className="spl-img-title">{service.title}</h1>
          <p className="spl-img-sub">{service.sub}</p>
        </div>
      </div>

      {/* Content below image */}
      <div className="spl-content">

        {/* Description */}
        <div className="spl-section">
          <p className="spl-desc">{service.desc}</p>
        </div>

        {/* Process timeline */}
        <div className="spl-section">
          <div className="spl-section-label" style={{ color: col }}>Process Journey</div>
          <div className="spl-timeline">
            {service.process.map((step, i) => {
              const alpha = 1 - i * 0.18;
              return (
                <div key={i} className="spl-tl-step">
                  <div
                    className="spl-tl-dot"
                    style={{
                      background: `rgba(${rgb},${alpha * 0.16})`,
                      borderColor: `rgba(${rgb},${alpha * 0.9})`,
                      color: `rgba(${rgb},${alpha})`,
                    }}
                  >
                    0{i + 1}
                  </div>
                  {i < service.process.length - 1 && (
                    <div className="spl-tl-line" />
                  )}
                  <div className="spl-tl-txt">{step}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables */}
        <div className="spl-section">
          <div className="spl-section-label" style={{ color: col }}>Deliverables</div>
          <div className="spl-deliverables">
            {service.deliverables.map((d, i) => (
              <div
                key={i}
                className="spl-deliv-pill"
                style={{ borderColor: `rgba(${rgb},.18)` }}
              >
                <span className="spl-deliv-num" style={{ color: col }}>
                  0{i + 1}
                </span>
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="spl-cta">
          <button
            className="btn-primary"
            onClick={() => window.dispatchEvent(new CustomEvent('leona-go', { detail: 'contact' }))}
          >
            Request a Quote →
          </button>
          <p className="spl-cta-note">We respond within 24 hours</p>
        </div>

      </div>
    </div>
  );
}

// ── Main ServicesPage ─────────────────────────────────────────────────────────
export default function ServicesPage({ go }) {
  const [activeId, setActiveId]   = useState(1);
  const [visible, setVisible]     = useState(true);
  const [mobileTab, setMobileTab] = useState('All Services');

  // Listen for CTA button click inside detail panel
  useEffect(() => {
    const fn = (e) => go(e.detail);
    window.addEventListener('leona-go', fn);
    return () => window.removeEventListener('leona-go', fn);
  }, [go]);

  // Fade transition when switching service
  const handleSelect = (id) => {
    if (id === activeId) return;
    setVisible(false);
    setTimeout(() => {
      setActiveId(id);
      setVisible(true);
    }, 220);
  };

  const activeService = SERVICES.find(s => s.id === activeId);

  // Mobile: filtered services
  const mobileServices = mobileTab === 'All Services'
    ? SERVICES
    : SERVICES.filter(s => s.category === mobileTab);

  const mobileTabs = ['All Services', ...GROUPED.map(g => g.cat)];

  return (
    <>
      {/* Page hero */}
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">What We Offer</div>
          <h1 className="phero-h">Drone &amp; GIS<br />Solutions</h1>
        </div>
      </div>

      {/* ── DESKTOP: Split screen ── */}
      <div className="spl-wrap">

        {/* LEFT: sticky sidebar */}
        <aside className="spl-sidebar">
          <div className="spl-sidebar-inner">
            {GROUPED.map((group) => {
              const col = CAT_COLORS[group.cat] || '#E05B2A';
              return (
                <div key={group.cat} className="spl-group">
                  <div
                    className="spl-group-label"
                    style={{ color: col }}
                  >
                    {group.cat}
                  </div>
                  {group.ids.map(id => {
                    const s = SERVICES.find(sv => sv.id === id);
                    const isActive = activeId === id;
                    return (
                      <button
                        key={id}
                        className={`spl-item${isActive ? ' active' : ''}`}
                        style={isActive ? {
                          borderLeftColor: col,
                          background: `rgba(${hexToRgb(col)},.07)`,
                          color: '#fff',
                        } : {}}
                        onClick={() => handleSelect(id)}
                      >
                        <span className="spl-item-icon">{s.icon}</span>
                        <span className="spl-item-title">{s.title}</span>
                        {isActive && (
                          <span className="spl-item-arrow" style={{ color: col }}>›</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT: detail panel */}
        <main className="spl-panel">
          {activeService && (
            <ServiceDetail service={activeService} visible={visible} />
          )}
        </main>
      </div>

      {/* ── MOBILE: tabs + cards ── */}
      <div className="spl-mobile">
        {/* Tab bar */}
        <div className="spl-mob-tabs">
          {mobileTabs.map(t => (
            <button
              key={t}
              className={`spl-mob-tab${mobileTab === t ? ' on' : ''}`}
              onClick={() => setMobileTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="spl-mob-cards">
          {mobileServices.map(s => {
            const col = CAT_COLORS[s.category] || '#E05B2A';
            const rgb = hexToRgb(col);
            return (
              <div key={s.id} className="spl-mob-card">
                {/* Image */}
                <div className="spl-mob-img-wrap">
                  <img src={SERVICE_PHOTOS[s.id]} alt={s.title} className="spl-mob-img" />
                  <div className="spl-mob-img-overlay" />
                  <div className="spl-mob-img-content">
                    <span className="spl-mob-cat" style={{ color: col }}>{s.icon} {s.category}</span>
                    <h3 className="spl-mob-title">{s.title}</h3>
                  </div>
                </div>
                {/* Content */}
                <div className="spl-mob-body">
                  <p className="spl-mob-desc">{s.desc}</p>
                  <div className="spl-mob-delivs">
                    {s.deliverables.slice(0, 4).map((d, i) => (
                      <span
                        key={i}
                        className="spl-mob-deliv"
                        style={{ borderColor: `rgba(${rgb},.2)`, color: col }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}