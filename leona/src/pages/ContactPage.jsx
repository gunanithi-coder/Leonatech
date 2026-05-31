import { useState } from 'react';
import { SERVICES } from '../data/content';

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', org:'', service:'', msg:'' });
  const [sent, setSent] = useState(false);
  const upd = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const send = () => { if (form.name && form.email && form.msg) setSent(true); };

  return (
    <div className="page-transition">
      {/* PAGE HERO */}
      <div className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">Get In Touch</div>
          <h1 className="phero-h">Contact<br />Our Team</h1>
        </div>
      </div>

      <div className="contact-wrap">

        {/* LEFT — INFO */}
        <div>
<div style={{ marginBottom:32 }}>
  <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:12, fontSize:10, fontWeight:600, letterSpacing:4, textTransform:'uppercase', color:'var(--orange)' }}>
    <span style={{ width:28, height:2, background:'var(--orange)', display:'block' }}></span>
    Our Information
  </div>
  <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(28px,3vw,42px)', fontWeight:700, color:'var(--textPri)', lineHeight:1.1, letterSpacing:'-0.5px' }}>
    Talk to an Expert
  </h2>
</div>          {[
            { i:'📧', l:'Email',           v:'support@ilinkdev.in' },
            { i:'📞', l:'Phone',           v:'+91 9876543210' },
            { i:'🌐', l:'Website',         v:'www.ilinkdevelopmentservices.com' },
            { i:'🌍', l:'Global Coverage', v:'Asian Subcontinent · Middle East · Africa · South East Asia' },
          ].map(ci => (
            <div key={ci.l} className="ci-item">
              <div className="ci-icon">{ci.i}</div>
              <div>
                <div className="ci-lbl">{ci.l}</div>
                <div className="ci-val">{ci.v}</div>
              </div>
            </div>
          ))}

          <div className="eq-box2">
            <div className="eq-box2-h">Equipment We Operate</div>
            {[
              'Multi-coptor, Fixed Wing & VTOL Drones',
              'LiDAR, RGB & Oblique Camera Payloads',
              'DGPS Equipment — RTK & Static Method',
              'Bathymetric Equipment — Single & Multi Beam',
              'GPR Equipment — Single & Multi Frequency',
              'MLS Instrument & Terrestrial LiDAR Scanner',
              'Satellite Imagery Analysis Platforms',
            ].map(e => (
              <div key={e} className="eq-row3">
                <div className="eq-dot" />{e}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div>
         <div style={{ marginBottom:32 }}>
  <div style={{ display:'inline-flex', alignItems:'center', gap:12, marginBottom:12, fontSize:10, fontWeight:600, letterSpacing:4, textTransform:'uppercase', color:'var(--orange)' }}>
    <span style={{ width:28, height:2, background:'var(--orange)', display:'block' }}></span>
    Send a Message
  </div>
  <h2 style={{ fontFamily:'var(--font-head)', fontSize:'clamp(28px,3vw,42px)', fontWeight:700, color:'var(--textPri)', lineHeight:1.1, letterSpacing:'-0.5px' }}>
    Request a Quote
  </h2>
</div>
          {sent ? (
            <div className="success-box">
              <div style={{ fontSize:42, marginBottom:14 }}>✅</div>
              <h3 style={{ fontFamily:'var(--font-head)', fontSize:24, fontWeight:800, color:'var(--textPri)', marginBottom:10 }}>
                Message Sent!
              </h3>
              <p style={{ color:'var(--textSec)', fontSize:15 }}>
                Our team will respond within 24 hours with a detailed project proposal.
              </p>
            </div>
          ) : (
            <>
              {[
                { k:'name',  l:'Full Name *',      t:'text',  ph:'Your full name' },
                { k:'email', l:'Email Address *',  t:'email', ph:'you@organization.com' },
                { k:'org',   l:'Organisation',     t:'text',  ph:'Company or Government Body' },
              ].map(f => (
                <div key={f.k} className="form-g">
                  <label className="form-lbl">{f.l}</label>
                  <input
                    className="form-i"
                    type={f.t}
                    placeholder={f.ph}
                    value={form[f.k]}
                    onChange={e => upd(f.k, e.target.value)}
                  />
                </div>
              ))}

              <div className="form-g">
                <label className="form-lbl">Service Required</label>
                <select className="form-i" value={form.service} onChange={e => upd('service', e.target.value)}>
                  <option value="">Select a Service</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Other">Other / Multiple Services</option>
                </select>
              </div>

              <div className="form-g">
                <label className="form-lbl">Project Details *</label>
                <textarea
                  className="form-i"
                  placeholder="Location, area coverage, timeline, key requirements..."
                  value={form.msg}
                  onChange={e => upd('msg', e.target.value)}
                />
              </div>

              <button className="btn-primary" style={{ width:'100%', marginTop:6 }} onClick={send}>
                Send Message →
              </button>
              <p style={{ fontSize:11, color:'var(--textMut)', marginTop:12, textAlign:'center' }}>
                * Required fields. We respond within 24 hours.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}