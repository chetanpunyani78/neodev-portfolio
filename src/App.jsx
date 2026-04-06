import { useState, useEffect, useRef, useMemo } from "react";
import emailjs from "@emailjs/browser";

// ━━━ EMAILJS CONFIG ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 👇 REPLACE THESE with your real EmailJS credentials
const EMAILJS_SERVICE_ID = "service_rzxzswp";
const EMAILJS_TEMPLATE_ID = "template_ofnxtll";
const EMAILJS_PUBLIC_KEY = "0Uayl275PYEg56Xn9";
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const C = {
  void: "#05050e", panel: "#0f1024", border: "#1a1a3a",
  red: "#ff1744", redGlow: "#ff174433",
  cyan: "#00e5ff", cyanGlow: "#00e5ff22",
  gold: "#ffd740", text: "#e0e0ee", dim: "#6a6a8a", white: "#fff",
};

const FD = "'Orbitron', sans-serif";
const FB = "'Share Tech Mono', monospace";

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:${C.void};color:${C.text};font-family:${FB};overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:${C.red};border-radius:9}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes popBubble{0%{transform:scale(0) rotate(-8deg);opacity:0}60%{transform:scale(1.1) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes stomp{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.94) translateY(3px)}}
@keyframes steam{0%{opacity:0;transform:translateY(0) scale(.4)}50%{opacity:.8}100%{opacity:0;transform:translateY(-20px) scale(1.2)}}
@keyframes slideUp{0%{opacity:0;transform:translateY(50px)}100%{opacity:1;transform:translateY(0)}}
@keyframes scanline{0%{top:-100%}100%{top:100%}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes bikeTrail{0%{stroke-dashoffset:800}100%{stroke-dashoffset:0}}
@keyframes twinkle{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes horizonPulse{0%,100%{opacity:.3}50%{opacity:.7}}
`;

// ─── STARS ────────────────────────────────────────────
function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 2 + 0.5, d: Math.random() * 4 + 2, delay: Math.random() * 4,
    })), []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {stars.map((st, i) => (
        <div key={i} style={{
          position: "absolute", left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s, borderRadius: "50%",
          background: i % 5 === 0 ? C.cyan : i % 7 === 0 ? C.red : "#fff",
          animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
        }} />
      ))}
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: "25vh",
        opacity: 0.15, animation: "horizonPulse 6s ease-in-out infinite",
      }}>
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={20 + i * 12} x2="1200" y2={20 + i * 12} stroke={C.cyan} strokeWidth="0.5" />
        ))}
        {Array.from({ length: 25 }, (_, i) => (
          <line key={`v${i}`} x1={600} y1={0} x2={i * 50} y2={200} stroke={C.red} strokeWidth="0.4" />
        ))}
      </svg>
    </div>
  );
}

// ─── BIKE TRAIL ───────────────────────────────────────
function BikeTrail({ style }) {
  return (
    <svg viewBox="0 0 400 60" style={{ width: 300, height: 45, ...style }}>
      <path d="M 0 50 Q 80 10, 160 30 T 320 20 T 400 40"
        fill="none" stroke={C.red} strokeWidth="3" strokeLinecap="round"
        strokeDasharray="800" style={{ animation: "bikeTrail 2s ease-out forwards" }} />
      <path d="M 0 52 Q 80 12, 160 32 T 320 22 T 400 42"
        fill="none" stroke={C.red} strokeWidth="8" strokeLinecap="round" opacity="0.15"
        strokeDasharray="800" style={{ animation: "bikeTrail 2s ease-out forwards" }} />
    </svg>
  );
}

// ─── ANGRY ASTRONAUT ──────────────────────────────────
function AngryAstronaut() {
  const [showBubble, setShowBubble] = useState(false);
  const [typed, setTyped] = useState("");
  const msg = "YES I MADE THIS WEBSITE WITH AI";

  useEffect(() => { setTimeout(() => setShowBubble(true), 900); }, []);
  useEffect(() => {
    if (!showBubble) return;
    let i = 0;
    const iv = setInterval(() => { i++; setTyped(msg.slice(0, i)); if (i >= msg.length) clearInterval(iv); }, 45);
    return () => clearInterval(iv);
  }, [showBubble]);

  return (
    <div style={{ position: "relative", width: 320, height: 400, margin: "0 auto" }}>
      {showBubble && (
        <div style={{
          position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)",
          background: C.red, color: C.white, fontFamily: FD, padding: "14px 22px",
          borderRadius: 14, fontSize: 14, fontWeight: 900, minWidth: 260,
          textAlign: "center", zIndex: 10, lineHeight: 1.5,
          animation: "popBubble .4s ease-out",
          boxShadow: `0 0 30px ${C.redGlow}, 0 0 60px ${C.redGlow}`,
          border: `2px solid ${C.red}`,
        }}>
          {typed}<span style={{ animation: "blink .5s infinite" }}>▌</span>
          <div style={{
            position: "absolute", bottom: -12, left: "50%", marginLeft: -10,
            width: 0, height: 0,
            borderLeft: "11px solid transparent", borderRight: "11px solid transparent",
            borderTop: `14px solid ${C.red}`,
          }} />
        </div>
      )}
      <svg viewBox="0 0 220 250" style={{
        width: 220, position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        animation: "stomp .7s infinite ease-in-out",
        filter: `drop-shadow(0 0 20px ${C.cyanGlow}) drop-shadow(0 10px 20px rgba(0,0,0,.6))`,
      }}>
        <ellipse cx="110" cy="65" rx="46" ry="48" fill="#1a1a2e" stroke={C.cyan} strokeWidth="2.5"/>
        <ellipse cx="110" cy="65" rx="42" ry="44" fill="#0a0a18" stroke={C.cyan} strokeWidth="1" opacity=".5"/>
        <ellipse cx="96" cy="50" rx="14" ry="8" fill={C.cyan} opacity=".08" transform="rotate(-20 96 50)"/>
        <circle cx="110" cy="68" r="28" fill="#ffcc88"/>
        <line x1="94" y1="55" x2="106" y2="62" stroke="#333" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="126" y1="55" x2="114" y2="62" stroke="#333" strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="102" cy="67" r="3.5" fill="#333"/>
        <circle cx="118" cy="67" r="3.5" fill="#333"/>
        <circle cx="103.5" cy="66" r="1" fill="#fff"/>
        <circle cx="119.5" cy="66" r="1" fill="#fff"/>
        <path d="M 98 82 Q 104 76 110 80 Q 116 76 122 82" fill="none" stroke={C.red} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M 128 42 L 133 36 L 136 43 L 141 38" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="68" cy="40" r="5" fill="none" stroke={C.cyan} strokeWidth="1.5" style={{animation:"steam 1.4s infinite 0s"}}/>
        <circle cx="152" cy="38" r="4" fill="none" stroke={C.cyan} strokeWidth="1.5" style={{animation:"steam 1.4s infinite .5s"}}/>
        <rect x="68" y="110" width="84" height="80" rx="18" fill="#e8e8f0" stroke={C.cyan} strokeWidth="1.5"/>
        <rect x="88" y="118" width="44" height="28" rx="6" fill={C.panel} stroke={C.cyan} strokeWidth="1"/>
        <circle cx="98" cy="128" r="3" fill={C.red} style={{animation:"pulse 1.5s infinite"}}/>
        <circle cx="110" cy="128" r="3" fill={C.cyan} style={{animation:"pulse 1.5s infinite .3s"}}/>
        <circle cx="122" cy="128" r="3" fill={C.gold} style={{animation:"pulse 1.5s infinite .6s"}}/>
        <text x="110" y="142" textAnchor="middle" fill={C.cyan} fontSize="9" fontFamily={FB}>{"~$_deploy"}</text>
        <ellipse cx="60" cy="135" rx="12" ry="8" fill={C.red} opacity=".9" transform="rotate(-10 60 135)"/>
        <text x="60" y="138" textAnchor="middle" fill={C.white} fontSize="6" fontFamily={FD} fontWeight="900">AKR</text>
        <rect x="38" y="115" width="32" height="16" rx="8" fill="#e8e8f0" stroke="#ccc" strokeWidth="1" transform="rotate(-25 54 123)"/>
        <circle cx="36" cy="108" r="9" fill="#ddd" stroke="#bbb" strokeWidth="1"/>
        <rect x="148" y="125" width="30" height="16" rx="8" fill="#e8e8f0" stroke="#ccc" strokeWidth="1" transform="rotate(15 163 133)"/>
        <circle cx="178" cy="132" r="9" fill="#ddd" stroke="#bbb" strokeWidth="1"/>
        <rect x="78" y="188" width="24" height="34" rx="8" fill="#e8e8f0" stroke="#ccc" strokeWidth="1"/>
        <rect x="118" y="188" width="24" height="34" rx="8" fill="#e8e8f0" stroke="#ccc" strokeWidth="1"/>
        <rect x="72" y="218" width="34" height="14" rx="7" fill={C.red} stroke="#cc1133" strokeWidth="1"/>
        <rect x="114" y="218" width="34" height="14" rx="7" fill={C.red} stroke="#cc1133" strokeWidth="1"/>
        <rect x="56" y="118" width="10" height="30" rx="3" fill="#888" stroke="#666" strokeWidth="1"/>
        <rect x="154" y="118" width="10" height="30" rx="3" fill="#888" stroke="#666" strokeWidth="1"/>
        <ellipse cx="61" cy="152" rx="4" ry="8" fill={C.cyan} opacity=".6" style={{animation:"pulse 0.4s infinite"}}/>
        <ellipse cx="159" cy="152" rx="4" ry="8" fill={C.cyan} opacity=".6" style={{animation:"pulse 0.4s infinite .2s"}}/>
      </svg>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────
function Nav() {
  const [s, setS] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Projects", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: s ? "rgba(5,5,14,.92)" : "transparent",
      backdropFilter: s ? "blur(14px)" : "none",
      borderBottom: s ? `1px solid ${C.border}` : "none",
      transition: "all .3s", padding: "14px 36px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <a href="#" style={{ fontFamily: FD, fontSize: 18, color: C.red, fontWeight: 900, letterSpacing: 3, textDecoration: "none" }}>
        NEO<span style={{ color: C.cyan }}>DEV</span>
      </a>
      {/* Mobile hamburger */}
      <button onClick={() => setMob(!mob)} style={{
        display: "none", background: "none", border: "none", color: C.cyan,
        fontSize: 24, cursor: "pointer",
        // Show on small screens via media query workaround
      }} className="mob-toggle">☰</button>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: C.dim, textDecoration: "none", fontSize: 11,
            fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
            transition: "color .2s", fontFamily: FB,
          }}
          onMouseEnter={e => e.target.style.color = C.cyan}
          onMouseLeave={e => e.target.style.color = C.dim}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ─── REUSABLES ────────────────────────────────────────
function Section({ id, children }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: .12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} style={{
      padding: "100px 40px", maxWidth: 1080, margin: "0 auto",
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(50px)",
      transition: "all .8s cubic-bezier(.16,1,.3,1)",
    }}>{children}</section>
  );
}

function Title({ children, sub }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: FD, fontSize: 32, color: C.white, letterSpacing: 3 }}>{children}</h2>
      <div style={{ width: 60, height: 3, background: C.red, marginTop: 12, borderRadius: 2,
        boxShadow: `0 0 12px ${C.redGlow}` }} />
      {sub && <p style={{ color: C.dim, fontSize: 13, marginTop: 12, fontStyle: "italic" }}>{sub}</p>}
    </div>
  );
}

function AkiraDivider() {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <svg viewBox="0 0 600 20" style={{ width: 400, height: 16, opacity: .4 }}>
        <line x1="0" y1="10" x2="250" y2="10" stroke={C.red} strokeWidth="1"/>
        <circle cx="300" cy="10" r="4" fill={C.red}/>
        <line x1="350" y1="10" x2="600" y2="10" stroke={C.red} strokeWidth="1"/>
      </svg>
    </div>
  );
}

// ─── TERMINAL ─────────────────────────────────────────
function Terminal() {
  const lines = [
    { t: "$ ssh astronaut@production", c: C.cyan },
    { t: "> Welcome back, Commander.", c: C.dim },
    { t: "$ kubectl get pods --all-namespaces", c: C.cyan },
    { t: "> All 47 pods running. Zero restarts. Just vibes.", c: C.dim },
    { t: '$ echo "If it works, dont touch it"', c: C.cyan },
    { t: "> ...said no DevOps engineer ever.", c: C.gold },
    { t: "$ cat ~/status.txt", c: C.cyan },
    { t: "> Open to missions. Will mass for mass.", c: C.red },
  ];
  const [vis, setVis] = useState([]);
  useEffect(() => { lines.forEach((_, i) => setTimeout(() => setVis(p => [...p, i]), 350 * i + 400)); }, []);
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`,
      borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 540,
      boxShadow: `0 0 40px ${C.cyanGlow}`,
    }}>
      <div style={{ background: "#0d0d1a", padding: "10px 14px", display: "flex", gap: 7, alignItems: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.red }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.gold }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: C.dim }}>mission-control ~ bash</span>
      </div>
      <div style={{ padding: 18, fontSize: 12.5, lineHeight: 2.1 }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            opacity: vis.includes(i) ? 1 : 0,
            transform: vis.includes(i) ? "translateX(0)" : "translateX(-15px)",
            transition: "all .35s ease", color: l.c,
            fontWeight: l.t.startsWith("$") ? 700 : 400,
          }}>{l.t}</div>
        ))}
        <span style={{ color: C.cyan, animation: "blink 1s infinite" }}>▌</span>
      </div>
    </div>
  );
}

// ─── SKILLS ───────────────────────────────────────────
const SKILLS = [
  { cat: "ORBITAL OPS", icon: "🛰️", items: ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions", "ArgoCD", "Helm"] },
  { cat: "CLOUD NEBULAE", icon: "☁️", items: ["AWS", "GCP", "Azure", "DigitalOcean"] },
  { cat: "JAVA REACTOR", icon: "⚛️", items: ["Spring Boot", "Hibernate", "Maven", "Gradle", "JUnit", "Microservices"] },
  { cat: "RADAR SYSTEMS", icon: "📡", items: ["Prometheus", "Grafana", "ELK Stack", "Datadog"] },
  { cat: "TOOLKIT BAY", icon: "🔧", items: ["Linux", "Bash", "Python", "Git", "PostgreSQL", "Redis", "Kafka", "Nginx"] },
];

function Chip({ name }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? `${C.red}18` : `${C.cyan}08`,
      border: `1px solid ${h ? C.red : C.border}`,
      borderRadius: 6, padding: "9px 14px", fontSize: 12.5, fontWeight: 600,
      cursor: "default", transition: "all .25s",
      color: h ? C.red : C.text,
      transform: h ? "translateY(-2px) scale(1.03)" : "none",
      boxShadow: h ? `0 4px 16px ${C.redGlow}` : "none",
    }}>{name}</div>
  );
}

// ─── PROJECTS ─────────────────────────────────────────
const PROJECTS = [
  { title: "KANEDA Auto-Scaler", desc: "Predictive HPA controller. Scales before the traffic hits. Like Kaneda — doesn't wait for trouble.", tags: ["Go", "K8s", "Prometheus"], icon: "🏍️", link: "#" },
  { title: "NEO-PIPELINE", desc: "Zero-downtime CI/CD with canary deploys. Rollbacks faster than you can yell 'TETSUOOOO!'", tags: ["Jenkins", "Docker", "AWS"], icon: "🔴", link: "#" },
  { title: "Capsule Chassis", desc: "Spring Boot microservice template. Tracing, circuit breakers, config server. Battery-included.", tags: ["Java", "Spring", "Kafka"], icon: "💊", link: "#" },
  { title: "AKIRA Infra Suite", desc: "Multi-cloud Terraform w/ drift detection. Your infra won't mutate uncontrollably. Unlike Tetsuo.", tags: ["Terraform", "Python", "AWS"], icon: "🌀", link: "#" },
];

function ProjectCard({ p }) {
  const [h, setH] = useState(false);
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "block", textDecoration: "none",
        background: C.panel, border: `1px solid ${h ? C.red : C.border}`,
        borderRadius: 14, padding: 28, cursor: "pointer",
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
        transform: h ? "translateY(-5px)" : "none",
        boxShadow: h ? `0 16px 50px ${C.redGlow}, 0 0 0 1px ${C.red}44` : `0 4px 20px rgba(0,0,0,.3)`,
        position: "relative", overflow: "hidden",
      }}>
      {h && <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${C.red}66, transparent)`,
        animation: "scanline 1.5s linear infinite", zIndex: 0,
      }} />}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
        <h3 style={{ fontFamily: FD, fontSize: 16, marginBottom: 8, color: C.white, letterSpacing: 1.5 }}>{p.title}</h3>
        <p style={{ color: C.dim, fontSize: 12.5, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, color: C.cyan,
              background: `${C.cyan}12`, padding: "3px 9px", borderRadius: 16,
              border: `1px solid ${C.cyan}25`, letterSpacing: 1,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

// ─── CONTACT WITH EMAILJS ─────────────────────────────
function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const is = {
    display: "block", width: "100%", padding: 13,
    background: C.panel, border: `1px solid ${C.border}`,
    borderRadius: 8, color: C.text, fontFamily: FB,
    fontSize: 13, marginBottom: 14, outline: "none", transition: "border-color .3s",
  };
  const focus = e => e.target.style.borderColor = C.cyan;
  const blur = e => e.target.style.borderColor = C.border;

  const btnColors = {
    idle: { bg: C.red, shadow: `0 0 20px ${C.redGlow}` },
    sending: { bg: C.gold, shadow: "none" },
    sent: { bg: "#28c840", shadow: "none" },
    error: { bg: "#ff5555", shadow: "none" },
  };
  const btnText = {
    idle: "LAUNCH MESSAGE →",
    sending: "TRANSMITTING...",
    sent: "✓ TRANSMITTED",
    error: "✗ FAILED — RETRY →",
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <form ref={formRef} style={{ display: "contents" }}>
        <input name="from_name" placeholder="Callsign (Name)" required style={is} onFocus={focus} onBlur={blur} />
        <input name="from_email" type="email" placeholder="Frequency (Email)" required style={is} onFocus={focus} onBlur={blur} />
        <textarea name="message" placeholder="Transmission (Message)" rows={5} required
          style={{ ...is, resize: "vertical" }} onFocus={focus} onBlur={blur} />
      </form>
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        style={{
          background: btnColors[status].bg, color: C.white,
          fontFamily: FD, fontWeight: 700, fontSize: 12,
          padding: "13px 36px", border: "none", borderRadius: 8,
          cursor: status === "sending" ? "wait" : "pointer",
          transition: "all .3s", letterSpacing: 2,
          boxShadow: btnColors[status].shadow,
          opacity: status === "sending" ? 0.7 : 1,
        }}>
        {btnText[status]}
      </button>
      {status === "error" && (
        <p style={{ color: C.red, fontSize: 12, marginTop: 10 }}>
          Houston, we have a problem. Check your EmailJS config or try again.
        </p>
      )}
    </div>
  );
}

// ─── SOCIAL LINKS ─────────────────────────────────────
function Socials() {
  const links = [
    { name: "GitHub", url: "https://github.com/YOUR_USERNAME", icon: "⚡" },
    { name: "LinkedIn", url: "https://linkedin.com/in/YOUR_USERNAME", icon: "🔗" },
    { name: "Twitter", url: "https://x.com/YOUR_USERNAME", icon: "🐦" },
  ];
  return (
    <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
      {links.map(l => (
        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
          style={{
            color: C.dim, textDecoration: "none", fontSize: 12,
            padding: "8px 16px", border: `1px solid ${C.border}`,
            borderRadius: 8, transition: "all .2s", fontFamily: FB,
            display: "flex", alignItems: "center", gap: 6,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.color = C.cyan; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}
        >{l.icon} {l.name}</a>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <StarField />
      <Nav />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* HERO */}
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "120px 20px 60px",
          background: `radial-gradient(ellipse at 50% 30%, ${C.red}0a 0%, transparent 50%)`,
        }}>
          <AngryAstronaut />
          <div style={{ marginTop: 36, animation: "slideUp 1s ease-out .4s both" }}>
            <BikeTrail style={{ margin: "0 auto 20px", opacity: .7 }} />
            <h1 style={{ fontFamily: FD, fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.15, letterSpacing: 4 }}>
              DEVOPS <span style={{ color: C.red }}>ENGINEER</span>
              <br /><span style={{ fontSize: "0.65em", color: C.cyan, letterSpacing: 6 }}>&amp; JAVA ARCHITECT</span>
            </h1>
            <p style={{ color: C.dim, fontSize: 14, maxWidth: 460, margin: "20px auto 32px", lineHeight: 1.8, fontStyle: "italic" }}>
              Building infrastructure that survives re-entry.
              <br />My pipelines have better uptime than my sleep schedule.
            </p>
            <a href="#about" style={{
              display: "inline-block", padding: "12px 32px",
              border: `2px solid ${C.red}`, borderRadius: 8,
              color: C.red, textDecoration: "none", fontWeight: 700,
              fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
              fontFamily: FD, transition: "all .3s",
              boxShadow: `0 0 16px ${C.redGlow}`,
            }}
            onMouseEnter={e => { e.target.style.background = C.red; e.target.style.color = C.white; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.red; }}
            >BEGIN MISSION →</a>
          </div>
        </div>

        <AkiraDivider />
        <Section id="about">
          <Title sub="// establishing comm link...">MISSION BRIEFING</Title>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
            <div>
              <p style={{ color: C.dim, fontSize: 14, lineHeight: 2, marginBottom: 18 }}>
                I'm the person your team calls at 3 AM when production is on fire.
                I put the fire out, write a post-mortem, and automate the prevention — all before
                my coffee gets cold.
              </p>
              <p style={{ color: C.dim, fontSize: 14, lineHeight: 2, marginBottom: 24 }}>
                I architect microservices, wrangle containers, and terraform clouds.
                My Kubernetes clusters have fewer issues than my Spotify playlists.
              </p>
              <div style={{ display: "flex", gap: 28 }}>
                {[{ n: "5+", l: "YEARS" }, { n: "50+", l: "MISSIONS" }, { n: "99.9%", l: "UPTIME" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: FD, fontSize: 26, color: C.red, fontWeight: 900 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: C.dim, marginTop: 4, letterSpacing: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <Socials />
            </div>
            <Terminal />
          </div>
        </Section>

        <AkiraDivider />
        <Section id="skills">
          <Title sub="// scanning arsenal...">WEAPON SYSTEMS</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {SKILLS.map(cat => (
              <div key={cat.cat}>
                <h3 style={{ fontFamily: FD, fontSize: 13, color: C.red, marginBottom: 12, letterSpacing: 3 }}>
                  {cat.icon} {cat.cat}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                  {cat.items.map(s => <Chip key={s} name={s} />)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <AkiraDivider />
        <Section id="projects">
          <Title sub="// declassified operations">MISSION LOG</Title>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {PROJECTS.map(p => <ProjectCard key={p.title} p={p} />)}
          </div>
        </Section>

        <AkiraDivider />
        <Section id="contact">
          <Title sub="// open channel">HAIL FREQUENCY</Title>
          <p style={{ color: C.dim, fontSize: 13, lineHeight: 1.9, marginBottom: 28, maxWidth: 460 }}>
            Need someone to tame your infrastructure chaos? Or argue about
            tabs vs spaces? (It's spaces. Fight me in zero gravity.)
          </p>
          <Contact />
        </Section>

        <footer style={{
          textAlign: "center", padding: "40px 20px",
          borderTop: `1px solid ${C.border}`,
        }}>
          <span style={{ fontFamily: FD, fontSize: 12, color: C.red, letterSpacing: 3 }}>NEO</span>
          <span style={{ fontFamily: FD, fontSize: 12, color: C.cyan, letterSpacing: 3 }}>DEV</span>
          <span style={{ color: C.dim, fontSize: 11, marginLeft: 12 }}>
            — Built with AI, mass, and mass amounts of mass
          </span>
        </footer>
      </div>
    </>
  );
}
