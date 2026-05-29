import { useState } from 'react';
import { PROJECTS, PROJ_CATS } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';


const ProjectHero = ({ p }) => {
  const col = CAT_COLORS[p.cat] || '#E05B2A';
  return (
    <div className="proj-hero-card">
      <div className="proj-hero-inner">
        <div>
          <div style={{ marginBottom:16 }}>
            <span className="g-badge" style={{ background:`rgba(${hexToRgb(col)},.14)`, color:col, padding:'4px 12px', fontSize:'10px' }}>
              {p.icon} {p.cat}
            </span>
          </div>
          <h2 style={{ fontFamily:'var(--font-head)', fontSize:32, fontWeight:800, color:'var(--textPri)', lineHeight:1.05, marginBottom:10 }}>
            {p.title}
          </h2>
          <div style={{ fontSize:12, color:`rgba(${hexToRgb(col)},.75)`, marginBottom:18 }}>
            📍 {p.loc}
          </div>
          <p style={{ fontSize:15, color:'var(--textSec)', lineHeight:1.85, maxWidth:580 }}>
            {p.desc}
          </p>
          <div style={{ marginTop:24, display:'inline-flex', gap:10, alignItems:'center', color:'var(--orange)', fontSize:12, fontWeight:500, letterSpacing:2, textTransform:'uppercase', cursor:'pointer' }}>
            Featured Project <span>→</span>
          </div>
        </div>
        <div className="proj-hero-stats">
          {p.stats.map((st, i) => (
            <div key={i} className="proj-hero-stat">
              <div className="proj-hero-stat-l">{st.l}</div>
              <div className="proj-hero-stat-v">{st.v}</div>
            </div>
          ))}
          <div style={{ background:'var(--bg-light)', border:'0.5px solid var(--border)', borderRadius:4, padding:'14px 18px' }}>
            <div className="proj-hero-stat-l">Service</div>
            <div style={{ fontFamily:'var(--font-head)', fontSize:13, fontWeight:700, color:col }}>{p.tag}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ p }) => {
  const col = CAT_COLORS[p.cat] || '#E05B2A';
  return (
    <div className="proj-card">
      <div className="proj-icon" style={{ background:`rgba(${hexToRgb(col)},.1)`, border:`0.5px solid rgba(${hexToRgb(col)},.22)` }}>
        {p.icon}
      </div>
      <div className="proj-cat" style={{ color:col }}>{p.cat}</div>
      <div className="proj-title">{p.title}</div>
      <div className="proj-loc">📍 {p.loc}</div>
      <p className="proj-desc">{p.desc}</p>
      <span className="proj-tag" style={{ background:`rgba(${hexToRgb(col)},.1)`, color:col, border:`0.5px solid rgba(${hexToRgb(col)},.2)` }}>
        {p.tag}
      </span>
    </div>
  );
};

export default function ProjectsPage({ go }) {
  const [filter, setFilter] = useState('All');
  const hero = PROJECTS.find(p => p.featured);
  const filtered = filter === 'All'
    ? PROJECTS.filter(p => !p.featured)
    : PROJECTS.filter(p => !p.featured && p.cat === filter);

  return (
    <div className="page-transition">
      {/* PAGE HERO */}
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">Our Work</div>
          <h1 className="phero-h">Featured<br />Projects</h1>
        </div>
      </div>

      {/* SHOWCASE */}
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'80px 60px' }} className="proj-wrap2">

        {/* FEATURED */}
        {hero && <ProjectHero p={hero} />}

        {/* FILTERS */}
        <div style={{ marginTop:48, marginBottom:32, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div className="filters">
            {PROJ_CATS.map(c => (
              <button
                key={c}
                className={`filter-btn${filter === c ? ' on' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <span style={{ fontSize:12, color:'var(--textMut)' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* GRID */}
        <div className="proj-grid">
          {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ textAlign:'center', padding:'0 60px 80px' }}>
        <p style={{ color:'var(--textMut)', marginBottom:22, fontSize:15 }}>
          Apart from these, we have successfully completed over{' '}
          <strong style={{ color:'var(--textPri)' }}>200+ projects</strong> worldwide.
        </p>
        <button className="btn-primary" onClick={() => go('contact')}>
          Discuss Your Project
        </button>
      </div>
    </div>
  );
}