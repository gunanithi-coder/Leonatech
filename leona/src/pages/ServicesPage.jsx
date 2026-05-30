import { SERVICES } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';

// ── One stock photo per service category (swap with real Leona photos later) ──
const SERVICE_PHOTOS = {
  1: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&q=80', // topo drone
  2: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', // 3d city
  3: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80', // door survey
  4: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', // underground pipe
  5: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', // water lake
  6: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', // flood aerial
  7: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', // mining
  8: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80', // roads cadastral
  9: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80', // drone monitoring
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

// ── Single service block (Option B layout) ────────────────────────────────────
function ServiceBlock({ s, go }) {
  const col      = CAT_COLORS[s.category] || '#E05B2A';
  const rgb      = hexToRgb(col);
  const photo    = SERVICE_PHOTOS[s.id];

  return (
    <div className="svb-block">

      {/* ── TOP: content left | image right ── */}
      <div className="svb-top">

        {/* LEFT — info + timeline */}
        <div className="svb-left">

          {/* Number + badge row */}
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

          {/* Icon + title */}
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

          {/* Description */}
          <p className="svb-desc">{s.desc}</p>

          {/* ── TIMELINE PROCESS ── */}
          <div className="svb-tl-wrap">
            <div className="svb-tl-label">Process Journey</div>
            <div className="svb-tl">
              {s.process.map((step, i) => {
                const alpha = 1 - i * 0.2;
                return (
                  <div key={i} className="svb-tl-step">
                    {/* connecting line */}
                    {i < s.process.length - 1 && (
                      <div className="svb-tl-line" />
                    )}
                    {/* dot */}
                    <div
                      className="svb-tl-dot"
                      style={{
                        background: `rgba(${rgb},${alpha * 0.18})`,
                        borderColor: `rgba(${rgb},${alpha * 0.9})`,
                        color: `rgba(${rgb},${alpha})`,
                      }}
                    >
                      0{i + 1}
                    </div>
                    {/* label */}
                    <div
                      className="svb-tl-txt"
                      style={{ color: `rgba(180,197,224,${alpha * 0.8})` }}
                    >
                      {step}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — image panel */}
        <div className="svb-img-panel">
          <img
            src={photo}
            alt={s.title}
            className="svb-img"
          />
          {/* gradient bleeds into left panel */}
          <div
            className="svb-img-fade"
            style={{
              background: `linear-gradient(to right, #0C1B38 0%, transparent 45%)`,
            }}
          />
          {/* bottom fade into deliverables strip */}
          <div className="svb-img-fade-bottom" />

          {/* category label watermark on image */}
          <div
            className="svb-img-label"
            style={{ color: col, borderColor: `rgba(${rgb},.3)` }}
          >
            {s.icon} {s.category}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: deliverables strip ── */}
      <div
        className="svb-bottom"
        style={{ borderTop: `1px solid rgba(${rgb},.15)` }}
      >
        <div
          className="svb-deliv-hd"
          style={{ color: col }}
        >
          Deliverables
        </div>
        <div className="svb-deliv-grid">
          {s.deliverables.map((d, i) => (
            <div key={i} className="svb-deliv-item">
              <span
                className="svb-deliv-num"
                style={{ color: col }}
              >
                0{i + 1}
              </span>
              <span className="svb-deliv-txt">{d}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage({ go }) {
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

      {/* Equipment strip */}
      <div className="eq-strip">
        <div className="eq-row2">
          <span className="eq-label2">Equipment</span>
          {EQUIPMENT.map(e => (
            <span key={e} className="eq-pill">{e}</span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="svb-wrap">
        {SERVICES.map(s => (
          <ServiceBlock key={s.id} s={s} go={go} />
        ))}

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingTop: 48, paddingBottom: 80 }}>
          <p style={{ color: 'var(--textMut)', marginBottom: 20, fontSize: 15 }}>
            Need a custom solution for your project?
          </p>
          <button className="btn-primary" onClick={() => go('contact')}>
            Request a Custom Quote →
          </button>
        </div>
      </div>
    </>
  );
}