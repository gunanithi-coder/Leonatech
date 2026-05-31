import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';

// ── One stock photo per service category (swap with real Leona photos later) ──
const SERVICE_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80',
  2: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
  3: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
  4: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  5: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  6: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
  7: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  8: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
  9: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
};

// ── Equipment pills strip ─────────────────────────────────────────────────────
const EQUIPMENT = [
  'Multi-coptor / Fixed Wing / VTOL',
  'LiDAR · RGB · Oblique',
  'DGPS RTK & Static',
  'Bathymetric Single/Multi Beam',
  'GPR Single & Multi Freq',
  'MLS + Terrestrial LiDAR',
  'Satellite Imagery',
];

// ── Equipment Component ───────────────────────────────────────────────────────
function Equipment() {
  return (
    <section className="eq-section">
      <div className="eq-section-inner">

        <div className="eq-section-left">
          <div className="eq-section-label">
            Equipment Fleet
          </div>

          <h2 className="eq-section-title">
            Survey Grade
            <br />
            Technology Stack
          </h2>

          <p className="eq-section-sub">
            Advanced drone platforms, LiDAR systems,
            DGPS equipment, hydrographic sensors and
            geospatial technologies enabling precise
            surveying, mapping and analytics.
          </p>

          <div className="eq-section-badge">
            <span>RTK</span>
            <span>LiDAR</span>
            <span>UAV</span>
            <span>GIS</span>
          </div>
        </div>

        <div className="eq-section-right">
          {EQUIPMENT.map((item, index) => (
            <div key={index} className="eq-section-item">
              <div className="eq-section-num">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="eq-section-name">
                {item}
              </div>

              <div className="eq-section-tag">
                ACTIVE
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── Single service block ──────────────────────────────────────────────────────
function ServiceBlock({ s, go }) {
  const [visible, setVisible] = useState(false);
const blockRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    { threshold: 0.12 }
  );
  if (blockRef.current) observer.observe(blockRef.current);
  return () => observer.disconnect();
}, []);
  const col = CAT_COLORS[s.category] || '#E05B2A';
  const rgb = hexToRgb(col);
  const photo = SERVICE_PHOTOS[s.id];

  return (
        <div
  className="svb-block"
  ref={blockRef}
  style={{
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 0.65s cubic-bezier(.25,.46,.45,.94), transform 0.65s cubic-bezier(.25,.46,.45,.94)',
  }}
  >      
        <div className="svb-top">
        <div className="svb-left">
          <div className="svb-head">
            <span className="svb-num-bg">{s.num}</span>

            <div className="svb-head-right">
              <span
                className="svb-cat-pill"
                style={{
                  background: `rgba(${rgb},.13)`,
                  color: col,
                  border: `0.5px solid rgba(${rgb},.3)`,
                }}
              >
                {s.category}
              </span>

              <div className="svb-sub">{s.sub}</div>
            </div>
          </div>

          <div className="svb-title-row">
            <div
              className="svb-icon-box"
              style={{
                background: `rgba(${rgb},.1)`,
                border: `0.5px solid rgba(${rgb},.25)`,
              }}
            >
              {s.icon}
            </div>

            <h2 className="svb-title">{s.title}</h2>
          </div>

          <p className="svb-desc">{s.desc}</p>

          <div className="svb-tl-wrap">
            <div className="svb-tl-label">Process Journey</div>

            <div className="svb-tl">
              {s.process.map((step, i) => {
                const alpha = 1 - i * 0.2;

                return (
                  <div key={i} className="svb-tl-step">
                    {i < s.process.length - 1 && (
                      <div className="svb-tl-line" />
                    )}

                    <div
                      className="svb-tl-dot"
                      style={{
                      background: `rgba(${rgb},${alpha * 0.18})`,
                      borderColor: `rgba(${rgb},${alpha * 0.9})`,
                      color: `rgba(${rgb},${alpha})`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'scale(1)' : 'scale(0)',
                      transition: `opacity 0.4s ease ${0.3 + i * 0.1}s, transform 0.4s ease ${0.3 + i * 0.1}s`,
                    }}
                    >
                      0{i + 1}
                    </div>

                    <div
                      className="svb-tl-txt"
                      style={{
                        color: `rgba(180,197,224,${alpha * 0.8})`,
                      }}
                    >
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="svb-img-panel">
          <img
            src={photo}
            alt={s.title}
            className="svb-img"
          />

          <div
            className="svb-img-fade"
            style={{
              background:
                'linear-gradient(to right, #0C1B38 0%, transparent 45%)',
            }}
          />

          <div className="svb-img-fade-bottom" />

          <div
            className="svb-img-label"
            style={{
              color: col,
              borderColor: `rgba(${rgb},.3)`,
            }}
          >
            {s.icon} {s.category}
          </div>
        </div>
      </div>

      <div
        className="svb-bottom"
        style={{
          borderTop: `1px solid rgba(${rgb},.15)`,
        }}
      >
        <div
          className="svb-deliv-hd"
          style={{ color: col }}
        >
          Deliverables
        </div>

        <div className="svb-deliv-grid">
          {s.deliverables.map((d, i) => (
          <div
            key={i}
            className="svb-deliv-item"
            style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.4s ease ${0.5 + i * 0.07}s, transform 0.4s ease ${0.5 + i * 0.07}s`,
          }}
        >
    <span
      className="svb-deliv-num"
      style={{ color: col }}
    >                0{i + 1}
              </span>

              <span className="svb-deliv-txt">
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage({ go ,selectedService}) {

  const serviceRefs = useRef({});

  useEffect(() => {
    if (
      selectedService &&
      serviceRefs.current[selectedService]
    ) {
      setTimeout(() => {
        serviceRefs.current[selectedService]
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
      }, 1500);
    }
  }, [selectedService]);

  return (
    <>
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />

        <div className="phero-inner">
          <div className="phero-tag">
            What We Offer
          </div>

          <h1 className="phero-h">
            Drone &amp; GIS
            <br />
            Solutions
          </h1>
        </div>
      </div>

      <div className="svb-wrap">{
      SERVICES.map((s) => (
        <div
          key={s.id}
          ref={(el) => {
          serviceRefs.current[s.id] = el;
        }}
      >
        <ServiceBlock
          s={s}
          go={go}
        />
      </div>
      ))}

        <div
          style={{
            textAlign: 'center',
            paddingTop: 48,
            paddingBottom: 80,
          }}
        >
          <p
            style={{
              color: 'var(--textMut)',
              marginBottom: 20,
              fontSize: 15,
            }}
          >
            Need a custom solution for your project?
          </p>

          <button
            className="btn-primary"
            onClick={() => go('contact')}
          >
            Request a Custom Quote →
          </button>
        </div>
      </div>

      <Equipment />
    </>
  );
}