import { useState } from 'react';
import { SERVICES, SERVICE_TABS, INDUSTRIES } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';
import StatsBar from '../components/StatsBar';

const SectionHeader = ({ label, title, subtitle, centered = false }) => (
  <div className={`sec-hd${centered ? ' center' : ''}`}>
    <div className="sec-label">{label}</div>
    <h2 className="sec-title">{title}</h2>
    {subtitle && <p className="sec-sub">{subtitle}</p>}
  </div>
);

const ServiceCard = ({ s, onClick }) => {
  const col = CAT_COLORS[s.category] || '#E05B2A';

  return (
    <div
      className="expand-card"
      onClick={onClick}
      style={{ borderLeftColor: col }}
    >
      {/* FRONT */}
      <div className="expand-front">
        <div className="expand-num">{s.num}</div>
        <div className="expand-icon">{s.icon}</div>
        <div className="expand-title">{s.title}</div>
        <div className="expand-sub">{s.sub}</div>

        <span
          className="expand-cat-tag"
          style={{
            background: `rgba(${hexToRgb(col)},.14)`,
            color: col
          }}
        >
          {s.category}
        </span>
      </div>

      {/* BACK */}
      <div
        className="expand-back"
        style={{ background: 'var(--bg-mid)' }}
      >
        <div
          className="expand-back-label"
          style={{ color: col }}
        >
          {s.category}
        </div>

        <p className="expand-back-desc">{s.desc}</p>

        <div
          className="expand-back-arrow"
          style={{ color: col }}
        >
          View Details →
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="expand-bar"
        style={{ background: col }}
      />
    </div>
  );
};

const ServicesTabs = ({ go }) => {
  const [tab, setTab] = useState('All Services');

  const visible =
    tab === 'All Services'
      ? SERVICES
      : SERVICES.filter((s) => s.category === tab);

  return (
    <div>
      <div className="svc-tabs-wrap">
        <div className="svc-tabs">
          {SERVICE_TABS.map((c) => (
            <button
              key={c}
              className={`svc-tab${tab === c ? ' on' : ''}`}
              onClick={() => setTab(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-dark)',
          padding: '0 60px 80px'
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            paddingTop: 56
          }}
        >
          <div className="svc-grid">
            {visible.map((s) => (
              <ServiceCard
                key={s.id}
                s={s}
                onClick={() => go('services', s.id)}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              textAlign: 'center'
            }}
          >
            <button
              className="btn-ghost"
              onClick={() => go('services')}
            >
              View All Services & Deliverables →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage({ go }) {
  return (
    <div className="page-transition">

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">

          <div className="hero-eyebrow fu">
            Drone · GIS · Geospatial Intelligence
          </div>

          <h1 className="hero-h1 fu d1">
            <span className="w">Precision from Above.</span>
            <span className="o">Intelligence Below.</span>
          </h1>

          <p className="hero-sub fu d2">
            High-accuracy drone surveying and geospatial solutions for
            infrastructure development, urban planning, and environmental
            assessment across 4 continents.
          </p>

          <div className="hero-actions fu d3">
            <button
              className="btn-primary"
              onClick={() => go('services')}
            >
              Explore Services
            </button>

            <button
              className="btn-ghost"
              onClick={() => go('projects')}
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsBar />

      {/* ABOUT */}
      <section
        className="sec"
        style={{ background: 'var(--bg-dark)' }}
      >
        <div className="sec-inner">

          <div className="about-grid">

            <div>
              <SectionHeader
                label="About Us"
                title="Geospatial Intelligence at Scale"
                subtitle="We integrate state-of-the-art drone systems, DGPS ground control, and advanced GIS methodologies to deliver precise, dependable, and decision-oriented geospatial intelligence."
              />

              <div className="about-pts">
                {[
                  {
                    i: '🚁',
                    h: 'Multi-Platform Fleet',
                    p: 'Multi-coptor, Fixed Wing and VTOL systems with LiDAR, RGB and Oblique payloads.'
                  },
                  {
                    i: '📡',
                    h: 'Centimetre Accuracy',
                    p: 'RTK and Static DGPS methods ensuring sub-5cm positional accuracy across all deliverables.'
                  },
                  {
                    i: '🌍',
                    h: 'Full-Spectrum GIS',
                    p: 'Photogrammetry, LiDAR, bathymetrics, GPR, and satellite imagery in unified GIS workflows.'
                  }
                ].map((pt) => (
                  <div key={pt.h} className="apt">
                    <div className="apt-icon">{pt.i}</div>

                    <div>
                      <div className="apt-h">{pt.h}</div>
                      <p className="apt-p">{pt.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="about-img" />
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        style={{
          background: 'var(--bg-deep)',
          paddingTop: 100
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 60px 56px'
          }}
        >
          <SectionHeader
            centered
            label="What We Do"
            title="Urban Services"
            subtitle="From topographic mapping to volumetric analysis — the full spectrum of geospatial services with uncompromising precision."
          />
        </div>

        <ServicesTabs go={go} />
      </section>

      {/* INDUSTRIES */}
      <section
        className="sec"
        style={{ background: 'var(--bg-dark)' }}
      >
        <div className="sec-inner">

          <SectionHeader
            centered
            label="Industries"
            title="Sectors We Serve"
            subtitle="Geospatial expertise spanning major industries — delivering tailored drone and GIS solutions for every operational context."
          />

          <div className="ind-grid">
            {INDUSTRIES.map((i) => (
              <div
                key={i.n}
                className="ind-card img-card"
                style={{
                  backgroundImage: `url(${i.img})`
                }}
              >
                <div className="ind-overlay"></div>

                <div className="ind-content">
                  <div className="ind-icon">{i.i}</div>
                  <div className="ind-name">{i.n}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <div className="cta-sec">

        <div className="cta-radial" />

        <div style={{ position: 'relative' }}>

          <h2 className="cta-title">
            Ready to Map
            <br />
            <em>Your World?</em>
          </h2>

          <p className="cta-sub">
            Partner with us for precise, dependable geospatial intelligence
            that powers your next infrastructure, urban planning, or
            environmental project.
          </p>

          <div className="cta-btns">

            <button
              className="btn-primary"
              onClick={() => go('contact')}
            >
              Contact Us Today
            </button>

            <button
              className="btn-ghost"
              onClick={() => go('services')}
            >
              Browse All Services
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}