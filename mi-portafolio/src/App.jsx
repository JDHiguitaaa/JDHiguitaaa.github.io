import { useState, useEffect, useRef } from "react";

const SYSTEM_PROMPT = `Eres Juan David Higuita, un tecnólogo en desarrollo de software de Sabaneta, Colombia. Responde siempre en primera persona, de forma amigable y profesional. Sé conciso (2-4 oraciones por respuesta).

Perfil:
- 10 años de experiencia como técnico de servicios farmacéuticos
- Recién graduado como tecnólogo en desarrollo de software
- Stack: Java, Spring Boot, MySQL, Flutter, Dart, Git, GitHub
- Buscando tu primer trabajo en tech, con ventaja única en healthtech/farmatech
- Ubicación: Sabaneta, Colombia

Proyectos:
1. Sistema de Inventario Farmacéutico - app web con Java/Spring Boot/MySQL para gestión de medicamentos, alertas de vencimiento y control de stock. Inspirado en tu experiencia real en farmacias.
2. Alzalert - app móvil en Flutter/Dart para monitoreo de pacientes con Alzheimer. Envía alertas de ubicación y recordatorios de rutinas a cuidadores, integrado con hardware de monitoreo.
3. Episense - app móvil en Flutter/Dart para epilepsia. Registra eventos de crisis y envía notificaciones de emergencia a contactos designados, integrado con hardware de monitoreo.

Experiencia previa: SURA Ayudas Diagnósticas, M&M Diagnostics, Comedica S.A. Manejo de cadena de frío, normativa INVIMA, trazabilidad de medicamentos, SAP Business One, SAP Logon,Excel intermedio (macros), ingles B1.

Si te preguntan en español, responde en español. Si en inglés, en inglés. Si preguntan algo que no sabes, di que prefieren contactarte directamente.`;

const projects = [
  {
    id: 1,
    name: "Pharma Inventory",
    tagline: "Control de inventario farmacéutico",
    desc: "Sistema web para gestión de medicamentos con alertas automáticas de vencimiento, control de stock y trazabilidad. Construido con experiencia real del sector.",
    stack: ["Java", "Spring Boot", "MySQL", "REST API"],
    accent: "#2dd4bf",
    icon: "💊",
    github: "https://github.com/JDHiguitaaa",
    gallery: [
      { img: "https://placehold.co/800x500/0d1117/2dd4bf?text=Dashboard+Principal", caption: "Dashboard principal con resumen de stock, alertas de vencimiento y métricas clave del inventario." },
      { img: "https://placehold.co/800x500/0d1117/2dd4bf?text=Lista+de+Medicamentos", caption: "Listado completo de medicamentos con filtros por categoría, laboratorio y fecha de vencimiento." },
      { img: "https://placehold.co/800x500/0d1117/2dd4bf?text=Alertas+de+Vencimiento", caption: "Módulo de alertas automáticas para medicamentos próximos a vencer con nivel de prioridad." },
    ],
  },
  {
    id: 2,
    name: "Alzalert",
    tagline: "Monitoreo de pacientes con Alzheimer",
    desc: "App móvil que envía alertas de ubicación y recordatorios de rutinas a cuidadores de pacientes con Alzheimer. Diseñada para uso real en entornos clínicos.",
    stack: ["Flutter", "Dart", "Firebase"],
    accent: "#a78bfa",
    icon: "🧠",
    github: "https://github.com/equipoAlzDev/appAlzAlert.git",
    gallery: [
      { img: "https://placehold.co/400x700/0d1117/a78bfa?text=Pantalla+Principal", caption: "Pantalla principal de la app con estado del paciente y acceso rápido a funciones de monitoreo." },
      { img: "https://placehold.co/400x700/0d1117/a78bfa?text=Mapa+de+Ubicacion", caption: "Mapa en tiempo real con la ubicación del paciente y zona de seguridad configurada por el cuidador." },
      { img: "https://placehold.co/400x700/0d1117/a78bfa?text=Alertas+Push", caption: "Sistema de notificaciones push que alerta al cuidador cuando el paciente sale de la zona segura." },
    ],
  },
  {
    id: 3,
    name: "Episense",
    tagline: "Monitoreo de epilepsia",
    desc: "Aplicación para registro de eventos epilépticos con notificaciones de emergencia automáticas a contactos designados y seguimiento del historial clínico.",
    stack: ["Flutter", "Dart", "Notifications API"],
    accent: "#f59e0b",
    icon: "⚡",
    github: "https://github.com/helmerhernandez1226/episense.git",
    gallery: [
      { img: "https://placehold.co/400x700/0d1117/f59e0b?text=Pantalla+Principal", caption: "Pantalla principal con registro de eventos epilépticos y acceso rápido a funciones de emergencia." },
      { img: "https://placehold.co/400x700/0d1117/f59e0b?text=Registro+de+Evento", caption: "Formulario para registrar eventos epilépticos con detalles del incidente y estado del paciente." },
      { img: "https://placehold.co/400x700/0d1117/f59e0b?text=Notificacion+Emergencia", caption: "Sistema de notificaciones automáticas que alertan a contactos designados en caso de emergencia." },
    ],
  },
];

const skills = [
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "Flutter", category: "mobile" },
  { name: "Dart", category: "mobile" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "REST APIs", category: "backend" },
];

const catColor = {
  backend: { bg: "#0f2a2a", text: "#2dd4bf", border: "#1a4040" },
  mobile: { bg: "#1a1040", text: "#a78bfa", border: "#2a1a5e" },
  tools: { bg: "#2a1a00", text: "#f59e0b", border: "#3d2600" },
};

function GalleryModal({ project, onClose }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent(c => (c + 1) % project.gallery.length);
      if (e.key === "ArrowLeft") setCurrent(c => (c - 1 + project.gallery.length) % project.gallery.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  const img = project.gallery[current];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0d0d18", border: `1px solid ${project.accent}33`,
          borderRadius: 16, maxWidth: 860, width: "100%",
          overflow: "hidden", position: "relative",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid #1d1d2e",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>{project.icon}</span>
            <span style={{ fontSize: 14, color: "#f0f0ec", fontFamily: "inherit" }}>{project.name}</span>
            <span style={{
              fontSize: 11, color: project.accent,
              background: project.accent + "15", border: `1px solid ${project.accent}30`,
              padding: "2px 10px", borderRadius: 20,
            }}>
              {current + 1} / {project.gallery.length}
            </span>
          </div>
          <button onClick={onClose} style={{
            background: "transparent", border: "1px solid #2a2a3a", color: "#6b6b80",
            width: 32, height: 32, borderRadius: 8, cursor: "pointer",
            fontSize: 16, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>

        {/* Imagen */}
        <div style={{ position: "relative", background: "#080810" }}>
          <img
            src={img.img}
            alt={img.caption}
            style={{ width: "100%", maxHeight: 460, objectFit: "contain", display: "block" }}
          />
          {/* Flechas */}
          {project.gallery.length > 1 && (
            <>
              <button
                onClick={() => setCurrent(c => (c - 1 + project.gallery.length) % project.gallery.length)}
                style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.7)", border: `1px solid ${project.accent}40`,
                  color: project.accent, width: 40, height: 40, borderRadius: 8,
                  cursor: "pointer", fontSize: 18, fontFamily: "inherit",
                }}>‹</button>
              <button
                onClick={() => setCurrent(c => (c + 1) % project.gallery.length)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.7)", border: `1px solid ${project.accent}40`,
                  color: project.accent, width: 40, height: 40, borderRadius: 8,
                  cursor: "pointer", fontSize: 18, fontFamily: "inherit",
                }}>›</button>
            </>
          )}
        </div>

        {/* Caption */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #1d1d2e" }}>
          <p style={{ fontSize: 13, color: "#8a8a9a", lineHeight: 1.6, margin: 0 }}>{img.caption}</p>
        </div>

        {/* Miniaturas */}
        {project.gallery.length > 1 && (
          <div style={{
            display: "flex", gap: 8, padding: "0 24px 16px",
            overflowX: "auto",
          }}>
            {project.gallery.map((g, i) => (
              <img
                key={i}
                src={g.img}
                alt={`miniatura ${i + 1}`}
                onClick={() => setCurrent(i)}
                style={{
                  width: 80, height: 52, objectFit: "cover", borderRadius: 6, cursor: "pointer",
                  border: `2px solid ${i === current ? project.accent : "#1d1d2e"}`,
                  opacity: i === current ? 1 : 0.5, transition: "all 0.15s", flexShrink: 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! Soy Juan David. Combino 10 años en el sector farmacéutico con desarrollo de software en Java y Flutter, autoaprendizaje constante. ¿Qué quieres saber sobre mi experiencia o proyectos?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const [hovered, setHovered] = useState(null);
  const [gallery, setGallery] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const headline = "Software Developer for HealthTech";
  const userCount = messages.filter(m => m.role === "user").length;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= headline.length) {
        setTyped(headline.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading || userCount >= 3) return;
    const userMsg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, system: SYSTEM_PROMPT }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || data.error || "Claude temporalmente no disponible";
      const botMsg = { role: "assistant", content: reply };
      const newUserCount = next.filter(m => m.role === "user").length;
      if (newUserCount >= 3) {
        setMessages([...next, botMsg, {
          role: "assistant",
          content: "¿Quieres saber más sobre mi perfil o discutir una oportunidad? ¡Escríbeme directamente! 👇",
        }]);
      } else {
        setMessages([...next, botMsg]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
  };

  const S = {
    root: {
      background: "#080810",
      color: "#e8e8e0",
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      lineHeight: 1.6,
    },
    nav: {
      position: "sticky",
      top: 0,
      background: "rgba(8,8,16,0.9)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #1a1a28",
      padding: "14px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 100,
    },
    logo: { fontSize: 15, fontWeight: 500, color: "#2dd4bf", letterSpacing: "0.08em" },
    navLinks: { display: "flex", gap: 32, fontSize: 13, color: "#7a7a8a" },
    hero: { padding: "100px 40px 80px", maxWidth: 900, margin: "0 auto" },
    badge: {
      display: "inline-block",
      background: "rgba(45,212,191,0.08)",
      border: "1px solid rgba(45,212,191,0.2)",
      color: "#2dd4bf",
      fontSize: 12,
      padding: "4px 14px",
      borderRadius: 20,
      marginBottom: 28,
      letterSpacing: "0.1em",
    },
    h1: {
      fontSize: "clamp(38px, 6vw, 72px)",
      fontWeight: 300,
      lineHeight: 1.1,
      margin: "0 0 8px",
      fontFamily: "Georgia, 'Times New Roman', serif",
      letterSpacing: "-0.02em",
      color: "#f0f0ec",
    },
    h1span: { color: "#2dd4bf" },
    subtitle: { fontSize: 22, color: "#9a9ab0", marginBottom: 24, fontWeight: 300 },
    cursor: {
      display: "inline-block", width: 2, height: "1em",
      background: "#2dd4bf", verticalAlign: "text-bottom",
      animation: "blink 1s step-end infinite",
    },
    heroDesc: { fontSize: 15, color: "#6b6b80", maxWidth: 520, marginBottom: 40, lineHeight: 1.7 },
    btnPrimary: {
      background: "#2dd4bf", color: "#080810", border: "none",
      padding: "12px 28px", fontSize: 13, fontWeight: 600, borderRadius: 6,
      cursor: "pointer", marginRight: 14, fontFamily: "inherit", letterSpacing: "0.05em",
    },
    btnSecondary: {
      background: "transparent", color: "#2dd4bf", border: "1px solid #2dd4bf",
      padding: "12px 28px", fontSize: 13, fontWeight: 500, borderRadius: 6,
      cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em",
    },
    section: { padding: "60px 40px", maxWidth: 900, margin: "0 auto" },
    sectionLabel: { fontSize: 11, letterSpacing: "0.2em", color: "#2dd4bf", textTransform: "uppercase", marginBottom: 8 },
    sectionTitle: {
      fontSize: 30, fontWeight: 300, fontFamily: "Georgia, 'Times New Roman', serif",
      color: "#f0f0ec", marginBottom: 40, letterSpacing: "-0.02em",
    },
    divider: { width: 48, height: 1, background: "#2dd4bf", margin: "16px 0 36px" },
    projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 },
    skillGrid: { display: "flex", flexWrap: "wrap", gap: 10 },
    chatBox: { background: "#0c0c18", border: "1px solid #1d1d2e", borderRadius: 12, overflow: "hidden" },
    chatHeader: {
      background: "#111120", padding: "14px 20px", borderBottom: "1px solid #1d1d2e",
      display: "flex", alignItems: "center", gap: 10,
    },
    dot: (c) => ({ width: 10, height: 10, borderRadius: "50%", background: c }),
    chatMessages: {
      padding: 20, minHeight: 260, maxHeight: 360, overflowY: "auto",
      display: "flex", flexDirection: "column", gap: 14,
    },
    msgUser: {
      alignSelf: "flex-end", background: "rgba(45,212,191,0.1)",
      border: "1px solid rgba(45,212,191,0.2)", color: "#e8e8e0",
      padding: "10px 16px", borderRadius: "14px 14px 2px 14px", maxWidth: "75%", fontSize: 14,
    },
    msgBot: {
      alignSelf: "flex-start", background: "#13131f", border: "1px solid #1d1d2e",
      color: "#c8c8c0", padding: "10px 16px", borderRadius: "14px 14px 14px 2px",
      maxWidth: "80%", fontSize: 14, whiteSpace: "pre-line",
    },
    chatInput: {
      display: "flex", padding: "14px 20px", gap: 10,
      borderTop: "1px solid #1d1d2e", background: "#0c0c18",
    },
    inputField: {
      flex: 1, background: "#13131f", border: "1px solid #1d1d2e",
      color: "#e8e8e0", padding: "10px 16px", borderRadius: 8,
      fontSize: 14, fontFamily: "inherit", outline: "none",
    },
    sendBtn: {
      background: "#2dd4bf", color: "#080810", border: "none",
      padding: "10px 20px", borderRadius: 8, fontSize: 13,
      fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
    },
    footer: { borderTop: "1px solid #1a1a28", padding: "30px 40px", textAlign: "center", color: "#3a3a50", fontSize: 12 },
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: #1d1d2e; border-radius: 2px; }
        a { text-decoration: none; }
      `}</style>

      <nav style={S.nav}>
        <span style={S.logo}>JDH.dev</span>
        <div style={S.navLinks}>
          <a href="#proyectos" style={{ color: "#7a7a8a" }}>proyectos</a>
          <a href="#stack" style={{ color: "#7a7a8a" }}>stack</a>
          <a href="#chat" style={{ color: "#7a7a8a" }}>chat</a>
          <a href="mailto:juandahiguitaa@hotmail.com" style={{ color: "#2dd4bf" }}>contacto</a>
        </div>
      </nav>

      <section style={S.hero}>
        <span style={S.badge}>🇨🇴 disponible · Medellín</span>
        <h1 style={S.h1}>
          Juan David<br />
          <span style={S.h1span}>Higuita</span>
        </h1>
        <p style={S.subtitle}>{typed}<span style={S.cursor} /></p>
        <p style={S.heroDesc}>
          10 años en el sector farmacéutico. Tecnólogo en desarrollo de software.
          Construyo apps que resuelven problemas reales en salud — con Java, Spring Boot y Flutter.
        </p>
        <div>
          <button style={S.btnPrimary} onClick={() => document.getElementById("chat").scrollIntoView({ behavior: "smooth" })}>
            Hablar conmigo ↓
          </button>
          <button style={S.btnSecondary} onClick={() => document.getElementById("proyectos").scrollIntoView({ behavior: "smooth" })}>
            Ver proyectos
          </button>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 60, paddingTop: 40, borderTop: "1px solid #1a1a28" }}>
          {[["10+", "años en farma"], ["3", "proyectos GitHub"], ["Java·Flutter", "stack principal"]].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontSize: 22, fontWeight: 600, color: "#2dd4bf" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#5a5a6a", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos" style={{ ...S.section, borderTop: "1px solid #111118" }}>
        <p style={S.sectionLabel}>proyectos</p>
        <h2 style={S.sectionTitle}>Apps que construí</h2>
        <div style={S.divider} />
        <div style={S.projectGrid}>
          {projects.map((p) => (
            <div key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === p.id ? "#10101c" : "#0d0d18",
                border: `1px solid ${hovered === p.id ? p.accent + "55" : "#1d1d2e"}`,
                borderRadius: 12, padding: "24px 22px", transition: "all 0.2s", cursor: "default",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: p.accent, marginBottom: 6 }}>
                {p.tagline.toUpperCase()}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "#f0f0ec", marginBottom: 10, fontFamily: "Georgia, serif" }}>
                {p.name}
              </h3>
              <p style={{ fontSize: 13, color: "#6b6b80", lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {p.stack.map((t) => (
                  <span key={t} style={{
                    fontSize: 11, background: p.accent + "12",
                    border: `1px solid ${p.accent}30`, color: p.accent,
                    padding: "3px 10px", borderRadius: 4,
                  }}>{t}</span>
                ))}
              </div>
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{ fontSize: 12, color: p.accent, letterSpacing: "0.05em" }}>
                GitHub →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" style={{ ...S.section, borderTop: "1px solid #111118" }}>
        <p style={S.sectionLabel}>tecnologías</p>
        <h2 style={S.sectionTitle}>Mi stack</h2>
        <div style={S.divider} />
        <div style={S.skillGrid}>
          {skills.map((s) => {
            const c = catColor[s.category];
            return (
              <span key={s.name} style={{
                background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 500, letterSpacing: "0.03em",
              }}>{s.name}</span>
            );
          })}
        </div>
        <div style={{
          marginTop: 48, background: "#0d0d18", border: "1px solid #1d1d2e",
          borderRadius: 12, padding: "28px 32px", display: "grid",
          gridTemplateColumns: "1fr 1fr", gap: 32,
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#2dd4bf", marginBottom: 10 }}>VENTAJA DIFERENCIAL</div>
            <p style={{ fontSize: 14, color: "#8a8a9a", lineHeight: 1.7 }}>
              10 años en farmacias hospitalarias me dieron contexto que la mayoría de devs no tiene.
              Entiendo INVIMA, cadena de frío y SAP Business One — y ahora los puedo sistematizar en código.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#a78bfa", marginBottom: 10 }}>BUSCANDO ROLES EN</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Desarrollador Java / Spring Boot", "Desarrollador Flutter / Mobile", "Farmatech · HealthIT · ERP en salud"].map((r) => (
                <div key={r} style={{ fontSize: 13, color: "#6b6b80", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#2dd4bf" }}>▸</span> {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="chat" style={{ ...S.section, borderTop: "1px solid #111118" }}>
        <p style={S.sectionLabel}>IA · chat en vivo</p>
        <h2 style={S.sectionTitle}>Habla con Juan David</h2>
        <div style={S.divider} />
        <p style={{ fontSize: 13, color: "#5a5a6a", marginBottom: 24 }}>
          Powered by Claude · responde sobre mi experiencia, proyectos y disponibilidad
        </p>

        <div style={S.chatBox}>
          <div style={S.chatHeader}>
            <div style={S.dot("#ff5f57")} />
            <div style={S.dot("#febc2e")} />
            <div style={S.dot("#28c840")} />
            <span style={{ fontSize: 12, color: "#5a5a6a", marginLeft: 8 }}>juan-david-higuita · online</span>
            {userCount > 0 && (
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#3a3a50" }}>
                {4 - userCount > 0 ? `${3 - userCount} preguntas restantes` : "límite alcanzado"}
              </span>
            )}
          </div>

          <div style={S.chatMessages}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === "user" ? S.msgUser : S.msgBot}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ ...S.msgBot, color: "#3a3a50" }}>
                <span style={{ animation: "blink 1s step-end infinite" }}>▌</span> escribiendo...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {userCount >= 3 ? (
            <div style={{ padding: "20px", textAlign: "center", borderTop: "1px solid #1d1d2e" }}>
              <a
                href="https://wa.me/573146919190"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block", background: "#25D366", color: "#fff",
                  padding: "12px 28px", borderRadius: 8, fontSize: 14,
                  fontWeight: 600, fontFamily: "inherit",
                }}
              >
                💬 Escribirme por WhatsApp
              </a>
            </div>
          ) : (
            <div style={S.chatInput}>
              <input
                ref={inputRef}
                style={S.inputField}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="¿Qué experiencia tienes con Spring Boot? / What's your availability?"
              />
              <button style={S.sendBtn} onClick={sendMessage} disabled={loading}>
                Enviar →
              </button>
            </div>
          )}
        </div>

        {userCount < 3 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {["¿Cuándo puedes empezar?", "Cuéntame sobre Alzalert", "¿Por qué pasaste a desarrollo?", "What's your English level?"].map((q) => (
              <button key={q}
                onClick={() => { setInput(q); inputRef.current?.focus(); }}
                style={{
                  background: "transparent", border: "1px solid #1d1d2e", color: "#5a5a6a",
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                }}>
                {q}
              </button>
            ))}
          </div>
        )}
      </section>

      <footer style={S.footer}>
        <p style={{ marginBottom: 8, color: "#2a2a38" }}>Juan David Higuita · Medellín, Colombia</p>
        <p>
          <a href="mailto:juandahiguitaa@hotmail.com" style={{ color: "#2dd4bf", marginRight: 20 }}>correo</a>
          <a href="https://github.com/JDHiguitaaa" target="_blank" rel="noreferrer" style={{ color: "#2dd4bf", marginRight: 20 }}>github</a>
          <a href="https://linkedin.com/in/higuitaaa" target="_blank" rel="noreferrer" style={{ color: "#2dd4bf", marginRight: 20 }}>linkedin</a>
          <a href="https://wa.me/573146919190" target="_blank" rel="noreferrer" style={{ color: "#25D366" }}>whatsapp</a>
        </p>
      </footer>
    </div>
  );
}
