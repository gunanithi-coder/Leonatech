import { SERVICES } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';


const GradientBadge = ({ label, color, size = 'md' }) => {
  const sz = size === 'sm' ? { padding:'3px 9px', fontSize:'9px' } :
                             { padding:'4px 12px', fontSize:'10px' };
  return (
    <span className="g-badge" style={{ background:`rgba(${hexToRgb(color)},.14)`, color, ...sz }}>
      {label}
    </span>
  );
};

export default function ServicesPage({ go }) {
  return (
    <div className="page-transition">
      {/* PAGE HERO */}
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">What We Offer</div>
          <h1 className="phero-h">Drone &amp; GIS<br />Solutions</h1>
        </div>
      </div>
      
      {/* SERVICES DETAIL */}
      <div className="svcd-inner">
        {SERVICES.map(s => {
          const col = CAT_COLORS[s.category] || '#E05B2A';
          return (
            <div key={s.id} className="svcd-item">
              <div>
                <div style={{ marginBottom:10 }}>
                  <GradientBadge label={s.category} color={col} size="m" />
                </div>
                <div className="svcd-sub">{s.num} — {s.sub}</div>
                <h2 className="svcd-title">{s.title}</h2>
                <p className="svcd-desc">{s.desc}</p>
                <div className="proc-strip">
                  {s.process.map((p, i) => (
                    <div key={i} className="proc-step">
                      <div className="proc-n">0{i + 1}</div>
                      <div className="proc-t">{p}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="deliv-hd">Deliverables</div>
                <div className="deliv-list">
                  {s.deliverables.map((d, i) => (
                    <div key={i} className="deliv-row">
                      <div className="deliv-dot" />{d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ textAlign:'center', paddingTop:32 }}>
          <button className="btn-primary" onClick={() => go('contact')}>
            Request a Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
}