import { useState } from 'react';
import { PROJECTS, PROJ_CATS } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';

const ProjectHero = ({ p }) => {
  const col = CAT_COLORS[p.cat] || '#E05B2A';

  return (
    <div className="project-showcase">

      {/* IMAGE SIDE */}
      <div className="project-image-wrap">
        <div className="project-image">
          
          <img
              src={p.image}
              alt={p.title}
              className="project-image-img"
          />
          <div className="project-overlay" />
          <div className="project-image-content">
            <span
              className="g-badge"
              style={{
                background: `rgba(${hexToRgb(col)},.15)`,
                color: col
              }}
            >
              {p.icon} {p.cat}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT SIDE */}
      <div className="project-content">

        <h2>{p.title}</h2>

        <div className="project-location">
          📍 {p.loc}
        </div>

        <div className="project-section">
          <h4>Challenge</h4>
          <p>
            Large-scale mapping requirements with high accuracy,
            tight deadlines and multi-source spatial datasets.
          </p>
        </div>

        <div className="project-section">
          <h4>Solution</h4>
          <p>{p.tag}</p>
        </div>

        <div className="project-section">
          <h4>Results</h4>

          <ul className="results-list">
            <li>✔ 25% Faster Planning</li>
            <li>✔ 1000+ Acres Mapped</li>
            <li>✔ High Accuracy Outputs</li>
          </ul>
        </div>

        <button className="case-study-btn">
          View Case Study →
        </button>

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