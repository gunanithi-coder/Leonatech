import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function AboutPage() {
  /* Reveal refs for each section */
  const [storyRef,  storyVis]  = useReveal();
  const [mvRef,     mvVis]     = useReveal();
  const [valRef,    valVis]    = useReveal();
  const [teamRef,   teamVis]   = useReveal();
  const [whyRef,    whyVis]    = useReveal();
  const [certRef,   certVis]   = useReveal();

  /* ── DATA ── */
 
  const values = [
    { cls: "c1", icon: "🎯", title: "Precision First",      body: "Every dataset we deliver meets rigorous accuracy standards. We operate with centimetre-grade GPS control and multi-return LiDAR to ensure your decisions are based on ground truth." },
    { cls: "c2", icon: "🔬", title: "Technology-Led",       body: "We deploy the latest multi-copter, fixed-wing, and VTOL platforms with LiDAR, RGB, oblique, and thermal payloads — matched to the exact needs of each project." },
    { cls: "c3", icon: "🌏", title: "Scalable Reach",       body: "From single-site surveys to multi-state corridor mapping, our operations scale across the Asian Subcontinent, Middle East, Africa, and South East Asia." },
    { cls: "c4", icon: "🤝", title: "Client Partnership",   body: "We don't just deliver data — we deliver insight. Our GIS analysts work alongside your teams to translate spatial datasets into actionable intelligence." },
  ];

  const team = [
    { name: "Dr. Arjun Menon",    role: "Founder & CEO",               exp: "Remote Sensing · GIS Policy · Strategic Planning",        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: "Priya Nair",         role: "Head of Survey Operations",    exp: "UAV Photogrammetry · LiDAR · Ground Control",             img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Rahul Krishnan",     role: "Lead GIS Analyst",             exp: "ArcGIS · QGIS · Spatial Modelling · DEMs",               img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80" },
    { name: "Meera Suresh",       role: "Project Delivery Manager",     exp: "Infrastructure · Urban Planning · Client Success",        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  ];

  const whyUs = [
    { num: "01", title: "END TO END CAPABILITY",     body: "From flight planning to final GIS deliverable — we handle the entire geospatial pipeline in-house with zero outsourcing." },
    { num: "02", title: "MULTI-SENSOR FLEET",        body: "LiDAR, RGB, oblique, thermal, bathymetric — we match the right sensor to every terrain type and project requirement." },
    { num: "03", title: "REGULATORY COMPLIANCE",     body: "DGCA-certified pilots, NPNT-ready drones, and full compliance with airspace regulations across all operating regions." },
    { num: "04", title: "RAPID MOBILISATION",        body: "Field-ready teams deployable within 48 hours. Pan-India presence with regional hubs for immediate response." },
    { num: "05", title: "DATA SECURITY",             body: "Encrypted data pipelines, NDA-standard project confidentiality, and secure cloud delivery for government and enterprise clients." },
    { num: "06", title: "POST-PROCESSING EXCELLENCE",body: "Advanced photogrammetry, point cloud classification, and GIS analysis using industry-leading software stacks." },
  ];

  const certs = [
    { icon: "✈️", name: "DGCA Certified",     sub: "Drone Operations India"    },
    { icon: "🏅", name: "ISO 9001:2015",       sub: "Quality Management"        },
    { icon: "🗺️", name: "NSDI Member",         sub: "National Spatial Data"     },
    { icon: "🔭", name: "ISPRS Member",        sub: "Photogrammetry Society"    },
    { icon: "🌐", name: "Esri Partner",        sub: "GIS Software Alliance"     },
    { icon: "🏛️", name: "MoSPI Empanelled",   sub: "Govt. Survey Body"         },
  ];

  return (
    <div className="page-transition">

      {/* ══════ HERO ══════ */}
      <section className="phero">
        <div className="phero-grid" />
        <div className="phero-line" />
        <div className="phero-inner">
          <div className="phero-tag">Who We Are</div>
          <h1 className="phero-h">
            Mapping India's<br />
            <span style={{ color: "var(--orange)" }}>Future from Above.</span>
          </h1>
          <p className="hero-sub" style={{ marginTop: "24px" }}>
            Leona Tech & Geo Solutions is a precision drone surveying and geospatial intelligence company —
            trusted by government bodies, infrastructure developers, and environmental agencies across
            Asia, the Middle East, and Africa.
          </p>
        </div>
      </section>

            

      {/* ══════ OUR STORY ══════ */}
      <section className={`sec reveal${storyVis ? " visible" : ""}`} ref={storyRef}>
        <div className="sec-inner">
          <div className="ab-story">
            {/* Image */}
            <div className="ab-story-img-wrap">
              
            <div
                 className="ab-story-img"
                    style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1000&q=85')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "380px",
                            borderRadius: "12px"
                    }}
            />
              <div className="ab-story-badge">
                <div className="ab-story-badge-yr">2017</div>
                <div className="ab-story-badge-lbl">Founded in India</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="sec-hd">
                <div className="sec-label">Our Story</div>
                <h2 className="sec-title" style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, lineHeight: 1.1 }}>
                  Built on the Belief That Better Data Builds Better Nations
                </h2>
              </div>
              <div className="ab-story-body">
                <p>
                  Founded in 2017 by a team of remote sensing engineers and GIS specialists, Leona Tech & Geo Solutions
                  emerged from a simple conviction: India's infrastructure boom needed a surveying partner that could
                  match its ambition with precision.
                </p>
                <p>
                  We began with topographical surveys for rural road development in South India. Within three years,
                  we were delivering LiDAR corridor surveys for national highway projects, bathymetric mapping for
                  irrigation networks, and 3D city models for smart city missions.
                </p>
                <p>
                  Today, Leona operates across 4 continents with a fleet of multi-copter, fixed-wing, and VTOL
                  platforms — backed by a full-spectrum GIS processing lab and a team of 40+ certified professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ MISSION / VISION ══════ */}
      <section className={`sec reveal${mvVis ? " visible" : ""}`} ref={mvRef} style={{ paddingTop: 0 }}>
        <div className="sec-inner">
          <div className="ab-mv-grid">
            <div className="ab-mv-card orange">
              <div className="ab-mv-label">Our Mission</div>
              <div className="ab-mv-title">
                To deliver spatial intelligence that transforms how the world plans, builds, and manages its resources.
              </div>
              <div className="ab-mv-body">
                We integrate state-of-the-art drone systems, DGPS ground control, and advanced GIS methodologies
                to deliver precise, dependable, and decision-oriented geospatial intelligence.
              </div>
            </div>
            <div className="ab-mv-card blue">
              <div className="ab-mv-label">Our Vision</div>
              <div className="ab-mv-title">
                To be the most trusted geospatial partner for infrastructure and environmental decision-making across emerging economies.
              </div>
              <div className="ab-mv-body">
                We envision a future where every infrastructure project and urban plan begins with data you can trust —
                captured precisely, processed rigorously, and delivered with insight.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CORE VALUES ══════ */}
      <section className={`sec reveal${valVis ? " visible" : ""}`} ref={valRef} style={{ paddingTop: 0 }}>
        <div className="sec-inner">
          <div className="sec-hd center">
            <div className="sec-label">Core Values</div>
            <h2 className="sec-title" style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800 }}>What We Stand For</h2>
          </div>
          <div className="ab-values-grid">
            {values.map((v, i) => (
              <div className={`ab-val-card ${v.cls}`} key={i}>
                <div className="ab-val-icon">{v.icon}</div>
                <div className="ab-val-title">{v.title}</div>
                <div className="ab-val-body">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TEAM ══════ */}
      <section className={`sec reveal${teamVis ? " visible" : ""}`} ref={teamRef} style={{ paddingTop: 0 }}>
        <div className="sec-inner">
          <div className="sec-hd center">
            <div className="sec-label">Our People</div>
            <h2 className="sec-title" style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800 }}>The Experts Behind the Data</h2>
            <p className="sec-sub" style={{ margin: "0 auto" }}>
              A multidisciplinary team of drone pilots, remote sensing engineers, GIS analysts, and project managers.
            </p>
          </div>
          <div className="ab-team-grid">
            {team.map((m, i) => (
              <div className="ab-team-card" key={i}>
                <img className="ab-team-img" src={m.img} alt={m.name} />
                <div className="ab-team-info">
                  <div className="ab-team-name">{m.name}</div>
                  <div className="ab-team-role">{m.role}</div>
                  <div className="ab-team-exp">{m.exp}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="ab-team-note">+ 35 certified drone pilots, GIS technicians, and field survey engineers across India.</p>
        </div>
      </section>

      {/* ══════ WHY LEONA ══════ */}
      <section className={`sec reveal${whyVis ? " visible" : ""}`} ref={whyRef} style={{ paddingTop: 0 }}>
        <div className="sec-inner">
          <div className="sec-hd center">
            <div className="sec-label">Why Choose Us</div>
            <h2 className="sec-title" style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800 }}>The Leona Difference</h2>
          </div>
          <div className="ab-why-grid">
            {whyUs.map((w, i) => (
              <div className="ab-why-card" key={i}>
                <div className="ab-why-ghost">{w.num}</div>
                <div className="ab-why-title">{w.title}</div>
                <div className="ab-why-body">{w.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CERTIFICATIONS ══════ */}
      <section className={`sec reveal${certVis ? " visible" : ""}`} ref={certRef} style={{ paddingTop: 0 }}>
        <div className="sec-inner">
          <div className="sec-hd center">
            <div className="sec-label">Credentials</div>
            <h2 className="sec-title" style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800 }}>Certifications & Memberships</h2>
          </div>
          <div className="ab-cert-grid">
            {certs.map((c, i) => (
              <div className="ab-cert-card" key={i}>
                <div className="ab-cert-icon">{c.icon}</div>
                <div>
                  <div className="ab-cert-name">{c.name}</div>
                  <div className="ab-cert-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-sec ab-cta">
        <div className="cta-radial ab-cta-radial" />
        <div className="ab-cta-inner">
          <h2 className="ab-cta-title">
            Ready to Work<br />
            <em>With Our Team?</em>
          </h2>
          <p className="ab-cta-sub">
            Tell us about your project. We'll match the right team, technology, and methodology to your requirements.
          </p>
          <div className="ab-cta-btns">
            <button
              className="btn-primary"
              onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "contact" }))}
            >
              CONTACT OUR TEAM →
            </button>
            <button
              className="btn-ghost"
              onClick={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "projects" }))}
            >
              VIEW OUR PROJECTS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}