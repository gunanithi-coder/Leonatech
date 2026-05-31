import { useState } from 'react';
import { PROJECTS, PROJ_CATS } from '../data/content';
import { CAT_COLORS, hexToRgb } from '../tokens/colors';

const ProjectHero = ({ p, go }) => {
  const col = CAT_COLORS[p.cat] || '#FF6B35';
  return (
    <div className="project-showcase">
      <div className="project-image-wrap">
        <div className="project-image">
          <img src={p.image} alt={p.title} className="project-image-img" />
          <div className="project-overlay" />
          <div className="project-image-content">
            <span className="g-badge" style={{ background:`rgba(${hexToRgb(col)},.2)`, color:col }}>
              {p.icon} {p.cat}
            </span>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h2>{p.title}</h2>
        <div className="project-location">📍 {p.loc}</div>
        <div className="project-section">
          <h4>Challenge</h4>
          <p>Large-scale mapping requirements with high accuracy, tight deadlines and multi-source spatial datasets.</p>
        </div>
        <div className="project-section">
          <h4>Solution</h4>
          <p>{p.tag}</p>
        </div>
        <div className="project-section">
          <h4>Results</h4>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginTop:8 }}>
            {p.stats.map((st,i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.05)',
                border:'0.5px solid rgba(255,255,255,0.1)',
                borderRadius:6, padding:'14px 20px', minWidth:100,
                borderTop:`2px solid ${col}`
              }}>
                <div style={{ fontSize:9, fontWeight:600, letterSpacing:2, textTransform:'uppercase', color:'var(--textMut)', marginBottom:6 }}>{st.l}</div>
                <div style={{ fontFamily:'var(--font-head)', fontSize:24, fontWeight:800, color:'var(--textPri)' }}>{st.v}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="case-study-btn" onClick={() => go('contact')}>
          Discuss This Project →
        </button>
      </div>
    </div>
  );
};

const ProjectCard = ({ p }) => {
  const col = CAT_COLORS[p.cat] || '#FF6B35';
  return (
    <div className="proj-card" style={{ position:'relative', overflow:'hidden', padding:0 }}>

      {/* IMAGE THUMBNAIL */}
      {p.image && (
        <div style={{
          width:'100%', height:160, overflow:'hidden', position:'relative', flexShrink:0
        }}>
          <img
            src={p.image}
            alt={p.title}
            style={{
              width:'100%', height:'100%', objectFit:'cover',
              filter:'brightness(0.55) saturate(0.8)',
              transition:'filter 0.5s ease, transform 0.6s ease',
            }}
            onMouseEnter={e => { e.target.style.filter='brightness(0.75) saturate(0.9)'; e.target.style.transform='scale(1.05)'; }}
            onMouseLeave={e => { e.target.style.filter='brightness(0.55) saturate(0.8)'; e.target.style.transform='scale(1)'; }}
          />
          {/* category badge on image */}
          <div style={{
            position:'absolute', top:12, left:12,
            background:`rgba(${hexToRgb(col)},.2)`,
            border:`0.5px solid rgba(${hexToRgb(col)},.4)`,
            color:col, padding:'3px 10px', borderRadius:3,
            fontSize:9, fontWeight:600, letterSpacing:1.5, textTransform:'uppercase',
            backdropFilter:'blur(4px)'
          }}>
            {p.icon} {p.cat}
          </div>
          {/* bottom fade */}
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, height:60,
            background:'linear-gradient(to bottom, transparent, var(--bg-dark))'
          }}/>
        </div>
      )}

      {/* CARD CONTENT */}
      <div style={{ padding:'20px 24px 24px' }}>
        {/* top color bar */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg, rgba(${hexToRgb(col)},0.9), transparent)`
        }}/>

        <div className="proj-title" style={{ marginBottom:6 }}>{p.title}</div>
        <div className="proj-loc">📍 {p.loc}</div>
        <p className="proj-desc">{p.desc}</p>

        {/* STATS BADGES */}
        <div style={{ display:'flex', gap:6, marginTop:14, flexWrap:'wrap' }}>
          {p.stats.map((st,i) => (
            <div key={i} style={{
              padding:'4px 10px',
              background:'rgba(255,255,255,0.04)',
              border:'0.5px solid rgba(255,255,255,0.07)',
              borderRadius:3
            }}>
              <span style={{ fontSize:9, color:'var(--textMut)', letterSpacing:1, textTransform:'uppercase' }}>{st.l}: </span>
              <span style={{ fontSize:11, fontWeight:700, color:'var(--textSec)' }}>{st.v}</span>
            </div>
          ))}
        </div>

        <span className="proj-tag" style={{
          background:`rgba(${hexToRgb(col)},.1)`,
          color:col,
          border:`0.5px solid rgba(${hexToRgb(col)},.25)`,
          marginTop:14, display:'inline-block'
        }}>
          {p.tag}
        </span>
      </div>
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
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">Our Work</div>
          <h1 className="phero-h">Featured<br />Projects</h1>
        </div>
      </div>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'60px 60px 0' }} className="proj-wrap2">

        {/* FEATURED HERO */}
        {hero && <ProjectHero p={hero} go={go} />}

        {/* STATS STRIP */}
        <div style={{
          display:'flex', gap:2,
          background:'rgba(255,255,255,0.03)',
          border:'0.5px solid rgba(255,255,255,0.07)',
          borderRadius:6, overflow:'hidden',
          marginTop:52, marginBottom:40
        }}>
          {[
            { n:'8',    l:'Projects Showcased' },
            { n:'5',    l:'Service Categories' },
            { n:'200+', l:'Total Completed' },
            { n:'4',    l:'Continents' },
          ].map((st,i) => (
            <div key={i} style={{
              flex:1, padding:'24px 20px', textAlign:'center',
              borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.06)' : 'none'
            }}>
              <div style={{ fontFamily:'var(--font-head)', fontSize:36, fontWeight:800, color:'var(--orange)' }}>{st.n}</div>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:2, textTransform:'uppercase', color:'var(--textMut)', marginTop:6 }}>{st.l}</div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
          <div className="filters">
            {PROJ_CATS.map(c => {
              const isOn = filter === c;
              const col = c === 'All' ? 'var(--orange)' :
                c === 'Urban Planning' ? '#FF6B35' :
                c === 'Water & Environment' ? '#06B6D4' :
                c === 'Infrastructure' ? '#7B5EA7' :
                c === 'Mining & Volumetric' ? '#C49A28' :
                c === 'Monitoring' ? '#4AAE8F' : 'var(--orange)';
              return (
                <button
                  key={c}
                  className={`filter-btn${isOn ? ' on' : ''}`}
                  onClick={() => setFilter(c)}
                  style={isOn ? {
                    borderColor: col,
                    color: col,
                    background: `rgba(${hexToRgb(col === 'var(--orange)' ? '#FF6B35' : col)},.08)`,
                    fontWeight: 700,
                  } : {}}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <span style={{ fontSize:12, color:'var(--textMut)', fontWeight:500 }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* PROJECT GRID */}
        <div className="proj-grid" style={{ background:'rgba(255,255,255,0.03)', gap:3 }}>
          {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ textAlign:'center', padding:'64px 60px 80px' }}>
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