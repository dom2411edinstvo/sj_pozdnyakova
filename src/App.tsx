import { useEffect, useRef, useState } from "react";

const IMG1 = "img/1.png";
const IMG2 = "img/2.png";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navCta, setNavCta] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setNavCta(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".feat-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(20px)";
      (card as HTMLElement).style.transition =
        "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s";
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalSrc("");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    formRef.current?.reset();
    setTimeout(() => setFormSuccess(false), 5000);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0f", color: "#e8e8f0", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
        .grad { background: linear-gradient(135deg, #a78bfa, #7c3aed, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .grad-gold { background: linear-gradient(135deg, #fbbf24, #f59e0b, #fcd34d); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .glass { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.5); color: #c084fc; }
        .sec-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7c3aed; }
        .sec-title { font-size: clamp(1.6rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.15; margin-top: 10px; }
        .sec-sub { color: #9999bb; margin-top: 12px; font-size: 1rem; line-height: 1.6; }
        .feat-card { background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 28px; transition: transform .3s, border-color .3s, box-shadow .3s; }
        .feat-card:hover { transform: translateY(-5px) !important; border-color: rgba(124,58,237,0.4); box-shadow: 0 12px 40px rgba(124,58,237,0.15); }
        .tag { display: inline-flex; padding: 4px 12px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); border-radius: 99px; font-size: 12px; color: #a78bfa; }
        .photo-frame { position: relative; border-radius: 24px; overflow: hidden; border: 2px solid rgba(124,58,237,0.4); box-shadow: 0 0 60px rgba(124,58,237,0.25); }
        .photo-pill { display: flex; align-items: center; gap: 8px; background: rgba(10,10,15,0.9); border: 1px solid rgba(124,58,237,0.4); border-radius: 12px; padding: 10px 16px; backdrop-filter: blur(10px); }
        .stat-box { background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25); border-radius: 16px; padding: 20px; text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 900; }
        .contact-btn { display: flex; align-items: center; gap: 14px; padding: 18px 28px; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 15px; transition: transform .2s, box-shadow .2s; border: none; cursor: pointer; }
        .contact-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
        .btn-tg { background: linear-gradient(135deg, #229ED9, #1a7ab0); color: #fff; }
        .btn-wa { background: linear-gradient(135deg, #25D366, #128C7E); color: #fff; }
        .btn-vk { background: linear-gradient(135deg, #4C75A3, #375785); color: #fff; }
        .btn-yt { background: linear-gradient(135deg, #FF0000, #cc0000); color: #fff; }
        .btn-primary { background: linear-gradient(135deg, #7c3aed, #9333ea); color: #fff; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent); }
        .glow-dot { width: 6px; height: 6px; border-radius: 50%; background: #7c3aed; box-shadow: 0 0 10px #7c3aed; display: inline-block; margin-right: 8px; }
        .partner-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
        .partner-img-box { height: 240px; border-radius: 14px; overflow: hidden; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; color: #555; font-size: 2rem; }
        .partner-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
        .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 999; align-items: center; justify-content: center; }
        .modal-overlay.open { display: flex; }
        .modal-overlay img { max-width: 90vw; max-height: 90vh; border-radius: 12px; box-shadow: 0 0 60px rgba(0,0,0,0.8); }
        .hero-photo-wrap { height: 520px; }
        @media (max-width: 640px) { .hero-photo-wrap { height: 360px; } }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 18px rgba(124,58,237,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(124,58,237,0); }
        }
        .pulse { animation: pulse-ring 2.5s infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .float { animation: float 5s ease-in-out infinite; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        .fade-up { animation: fadeUp .8s ease forwards; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .about-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 48px; align-items: start; }
        .what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .partner-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 50px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        @media (max-width: 768px) {
          .hero-grid, .about-grid, .what-grid, .partner-info-grid, .contact-grid { grid-template-columns: 1fr; }
        }
        .nav-links-wrap { display: flex; gap: 28px; }
        .mob-menu { display: none; flex-direction: column; gap: 0; background: rgba(10,10,15,0.98); border-top: 1px solid rgba(255,255,255,0.08); }
        .mob-menu.open { display: flex; }
        .mob-menu a { padding: 16px 24px; font-size: 16px; color: #ccc; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .mob-menu a:hover { color: #c084fc; background: rgba(124,58,237,0.08); }
        #menuBtn { display: none; background: none; border: none; cursor: pointer; color: #ccc; }
        @media (max-width: 768px) {
          .nav-links-wrap { display: none; }
          #menuBtn { display: block; }
        }
        section.page-section { padding: 90px 24px; max-width: 1200px; margin: 0 auto; }
        .review-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 28px; }
        .review-card:hover { border-color: rgba(124,58,237,0.3); }
      `}</style>

      {/* ===== NAV ===== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 900 }}>
          <span className="grad">Super</span><span style={{ color: "#fff" }}>Jump</span>
        </div>
        <div className="nav-links-wrap">
          {["#what", "#results", "#about", "#partner", "#contact"].map((href, i) => (
            <a key={i} onClick={() => scrollTo(href)} href={href} style={{ fontSize: 14, color: "#aaa", textDecoration: "none", cursor: "pointer" }}
              onMouseOver={e => (e.currentTarget.style.color = "#c084fc")}
              onMouseOut={e => (e.currentTarget.style.color = "#aaa")}>
              {["О методике", "Результаты", "О тренере", "Партнёрство", "Контакты"][i]}
            </a>
          ))}
        </div>
        {navCta && (
          <a onClick={() => scrollTo("#contact")} href="#contact" style={{ padding: "9px 22px", background: "linear-gradient(135deg, #7c3aed, #9333ea)", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", transition: "opacity .2s, transform .2s" }}>
            Записаться
          </a>
        )}
        <button id="menuBtn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`} style={{ position: "fixed", top: 57, left: 0, right: 0, zIndex: 99 }}>
        {["#what", "#results", "#about", "#partner", "#contact"].map((href, i) => (
          <a key={i} onClick={() => scrollTo(href)} href={href}>
            {["О методике", "Результаты", "О тренере", "Партнёрство", "Контакты"][i]}
          </a>
        ))}
      </div>

      {/* ===== HERO ===== */}
      <div style={{ background: "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(124,58,237,0.35) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 0% 80%, rgba(168,85,247,0.2) 0%, transparent 60%), #0a0a0f", paddingTop: 80 }}>
        <section className="page-section" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div className="hero-grid">
            {/* LEFT */}
            <div className="fade-up">
              <div className="badge" style={{ marginBottom: 20 }}>
                <span>🌍</span> Онлайн-тренировки по всему миру
              </div>
              <h1 style={{ fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 18 }}>
                Раскрой потенциал<br />своего разума<br /><span className="grad">с Super Jump</span>
              </h1>
              <p style={{ color: "#9999bb", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 30 }}>
                Комплекс интеллектуальных упражнений — решаем психологические проблемы, улучшаем здоровье, создаём состояние счастья в моменте, достигаем жизненные цели.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
                {["💻 Онлайн", "🎯 Работа с первопричиной", "🤲 Личное сопровождение", "🧠 Повышение интеллекта", "👥 Сильное сообщество", "🌍 Из любой точки мира", "🗣️ Живое общение"].map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a onClick={() => scrollTo("#contact")} href="#contact" className="contact-btn btn-primary pulse" style={{ fontSize: 15, padding: "16px 32px", borderRadius: 14 }}>
                  🚀 Записаться на занятие
                </a>
                <a onClick={() => scrollTo("#what")} href="#what" style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, color: "#ccc", textDecoration: "none", fontWeight: 600, fontSize: 14, transition: "border-color .2s" }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                  onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                  ▶ Узнать подробнее
                </a>
              </div>
            </div>
            {/* RIGHT PHOTO */}
            <div className="float" style={{ position: "relative" }}>
              <div className="photo-frame hero-photo-wrap">
                <img
                  src={IMG1}
                  alt="Вера Позднякова — интеллект-тренер Super Jump"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", width: "calc(100% - 20px)" }}>
                <div className="photo-pill">
                  <span style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Статус</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#c084fc" }}>Интеллект-тренер</span>
                </div>
                <div className="photo-pill">
                  <span style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Формат</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#c084fc" }}>Онлайн</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== О МЕТОДИКЕ ===== */}
      <div id="what" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(124,58,237,0.08) 0%, transparent 70%), #0a0a0f" }}>
        <section className="page-section">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">О методике</p>
            <h2 className="sec-title">Что такое <span className="grad">Super Jump</span>?</h2>
            <p className="sec-sub">Уникальная система интеллектуальных упражнений, открытая для людей по всему миру</p>
          </div>
          <div className="what-grid">
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16 }}>Инструмент глубинного преобразования личности</h3>
              <p style={{ color: "#9999bb", lineHeight: 1.75, marginBottom: 16 }}>Большинство наших проблем — со здоровьем, в отношениях, в финансах — уходят корнями в деструктивные программы, сформированные в детстве и закреплённые жизненным опытом. Эти программы работают автоматически, управляя нашими реакциями и решениями без нашего ведома.</p>
              <p style={{ color: "#9999bb", lineHeight: 1.75, marginBottom: 30 }}>Super Jump — авторская система упражнений, позволяющая перезаписать разрушительные установки подсознания на созидательные. Занятия проходят онлайн под руководством сертифицированного тренера — доступно из любой точки мира.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "🧠", title: "Работа с подсознанием", desc: "Прямое воздействие на глубинные программы, формирующие поведение и результаты" },
                  { icon: "💡", title: "Комплексная трансформация", desc: "Одновременное улучшение здоровья, мышления, эмоционального состояния и качества жизни" },
                  { icon: "⚡", title: "Ощутимый эффект быстро", desc: "Первые изменения заметны уже после нескольких занятий — в самочувствии и мышлении" },
                ].map((item, i) => (
                  <div key={i} className="feat-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                      <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass" style={{ borderRadius: 24, padding: 40, textAlign: "center" }}>
              <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,#7c3aed,#c084fc)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 20px" }}>✨</div>
              <h4 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 12 }}>Новый уровень жизни</h4>
              <p style={{ color: "#888", lineHeight: 1.7, marginBottom: 28 }}>Трансформируй себя изнутри — через разум к результату</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                {[["∞", "Возможностей"], ["100%", "Онлайн"], ["🌍", "Весь мир"], ["🏆", "Результат"]].map(([n, l], i) => (
                  <div key={i} className="stat-box">
                    <div className="stat-num grad">{n}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <a onClick={() => scrollTo("#contact")} href="#contact" className="contact-btn btn-primary" style={{ justifyContent: "center", fontSize: 14, padding: "14px 24px", borderRadius: 12, width: "100%" }}>Начать сейчас</a>
            </div>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== КТО ТАКОЙ ТРЕНЕР ===== */}
      <div id="intellect" style={{ background: "#0a0a0f" }}>
        <section className="page-section">
          <div className="glass" style={{ borderRadius: 24, padding: 40, maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎓</div>
            <h3 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: 16 }}>Кто такой интеллект-тренер?</h3>
            <p style={{ color: "#9999bb", lineHeight: 1.8, fontSize: "1rem" }}>
              Интеллект-тренер — это сертифицированный специалист, обучающий практике интеллектуальных упражнений и сопровождающий клиента в процессе глубинных изменений. В отличие от психолога или коуча, он работает непосредственно с подсознательными механизмами, запуская системные перемены в мышлении, поведении, здоровье и жизненных результатах. <strong style={{ color: "#c084fc" }}>Вера Позднякова</strong> — интеллект-тренер Super Jump, ведущая онлайн-занятия для участников по всему миру.
            </p>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== РЕЗУЛЬТАТЫ ===== */}
      <div id="results" style={{ background: "#0a0a0f" }}>
        <section className="page-section">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">Результаты</p>
            <h2 className="sec-title">Что меняется после <span className="grad">занятий</span></h2>
            <p className="sec-sub">Реальные трансформации участников программы Super Jump</p>
          </div>
          <div className="results-grid">
            {[
              { icon: "💪", title: "Физическое здоровье", desc: "Снижение хронических болей, улучшение сна, рост энергии и витальности" },
              { icon: "🧠", title: "Ясность мышления", desc: "Улучшение концентрации, памяти, скорости принятия решений" },
              { icon: "❤️", title: "Отношения", desc: "Гармонизация отношений с собой и близкими, выход из токсичных паттернов" },
              { icon: "💰", title: "Финансы", desc: "Устранение внутренних блоков, мешающих росту дохода и достижению целей" },
              { icon: "😌", title: "Эмоциональное состояние", desc: "Снижение тревожности, депрессии, обретение внутренней устойчивости" },
              { icon: "🎯", title: "Достижение целей", desc: "Чёткое понимание своих целей и системный путь к их реализации" },
            ].map((item, i) => (
              <div key={i} className="feat-card">
                <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 700, marginBottom: 8, fontSize: "1.05rem" }}>{item.title}</h4>
                <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== О ТРЕНЕРЕ ===== */}
      <div id="about" style={{ background: "radial-gradient(ellipse 70% 50% at 70% 50%, rgba(124,58,237,0.08) 0%, transparent 70%), #0a0a0f" }}>
        <section className="page-section">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">О тренере</p>
            <h2 className="sec-title">Вера <span className="grad">Позднякова</span></h2>
            <p className="sec-sub">Интеллект-тренер Super Jump · Онлайн по всему миру</p>
          </div>
          <div className="about-grid">
            {/* PHOTO */}
            <div style={{ position: "relative" }}>
              <div className="photo-frame" style={{ height: 480 }}>
                <img
                  src={IMG2}
                  alt="Вера Позднякова"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
              </div>
            </div>
            {/* TEXT */}
            <div>
              <div className="glass" style={{ borderRadius: 20, padding: 32, marginBottom: 24, lineHeight: 1.8, color: "#9999bb", fontSize: "0.98rem" }}>
                <p style={{ marginBottom: 16 }}>Я пришла к интеллектуальным упражнениям не из любопытства, а из острой жизненной необходимости. В какой-то момент жизни накопилось столько внутреннего напряжения, что привычные способы справляться перестали работать. Интеллектуальные упражнения стали для меня не просто инструментом — они изменили то, как я воспринимаю себя и мир вокруг.</p>
                <p>Сегодня я помогаю людям по всему миру проходить тот же путь — от ощущения тупика к ясности, энергии и настоящим результатам. Принцип, которым я живу: <strong style={{ color: "#c084fc" }}>«Сегодня лучше, чем вчера. Завтра — лучше, чем сегодня».</strong></p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
                {[
                  { icon: "🏅", val: "Тренер", label: "Super Jump" },
                  { icon: "🌍", val: "Online", label: "По всему миру" },
                  { icon: "💯", val: "100%", label: "Онлайн-формат" },
                ].map((s, i) => (
                  <div key={i} className="stat-box">
                    <div style={{ fontSize: "1.8rem" }}>{s.icon}</div>
                    <div className="stat-num grad" style={{ fontSize: "1.1rem", margin: "6px 0" }}>{s.val}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <a onClick={() => scrollTo("#contact")} href="#contact" className="contact-btn btn-primary" style={{ display: "inline-flex", justifyContent: "center", fontSize: 15 }}>🚀 Записаться на занятие</a>
            </div>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== ОТЗЫВЫ ===== */}
      <div style={{ background: "#0a0a0f" }}>
        <section className="page-section">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">Отзывы</p>
            <h2 className="sec-title">Что говорят <span className="grad">участники</span></h2>
          </div>
          <div className="results-grid">
            {[
              { name: "Анна, 34 года", text: "После 3 месяцев занятий ушла хроническая тревога, которая мучила меня годами. Я снова чувствую себя живой!", stars: 5 },
              { name: "Михаил, 41 год", text: "Скептик по природе, но результаты говорят сами за себя — доход вырос в 2 раза, отношения с женой восстановились.", stars: 5 },
              { name: "Светлана, 28 лет", text: "Вера — невероятный тренер. Мягко, но уверенно ведёт через самые глубокие внутренние блоки.", stars: 5 },
              { name: "Дмитрий, 37 лет", text: "Работаем онлайн из разных часовых поясов — это вообще не проблема. Занятия встраиваются в любой график.", stars: 5 },
              { name: "Ольга, 45 лет", text: "Спина болела 10 лет. После 2 месяцев занятий боль ушла почти полностью. Теперь понимаю — это было психосоматикой.", stars: 5 },
              { name: "Екатерина, 31 год", text: "Super Jump — это не магия, это наука о разуме. Вера объясняет всё понятно и с реальными примерами.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="review-card">
                <div style={{ color: "#f59e0b", fontSize: 16, letterSpacing: 2, marginBottom: 12 }}>{"★".repeat(r.stars)}</div>
                <p style={{ color: "#bbb", lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ color: "#7c3aed", fontWeight: 700, fontSize: 13 }}>— {r.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== ПАРТНЁРСТВО ===== */}
      <div id="partner" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%), #0a0a0f" }}>
        <section className="page-section">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">Партнёрство</p>
            <h2 className="sec-title">Партнёрский бизнес с <span className="grad">Super Jump</span></h2>
            <p className="sec-sub">Уникальная возможность строить доходный бизнес онлайн, помогая людям по всему миру</p>
          </div>
          <div className="partner-info-grid">
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 16 }}>Почему партнёрство с Super Jump — это серьёзно?</h3>
              <p style={{ color: "#9999bb", lineHeight: 1.75, marginBottom: 14 }}>Super Jump — это не просто продукт, это глобальная миссия трансформации людей. За каждым занятием стоит реальный результат человека, а значит — репутация, которая работает на вас.</p>
              <p style={{ color: "#9999bb", lineHeight: 1.75, marginBottom: 14 }}>Партнёрская система Super Jump построена так, что ваш доход растёт вместе с командой. Вы не просто привлекаете клиентов — вы создаёте сеть тренеров, которые работают, а вы получаете результат с каждого уровня своей структуры.</p>
              <p style={{ color: "#9999bb", lineHeight: 1.75 }}>Я прошла путь от первого занятия и точно знаю: здесь работают те, кто искренне верит в продукт.</p>
            </div>
            <div className="glass" style={{ borderRadius: 20, padding: 32 }}>
              <h4 style={{ fontWeight: 700, marginBottom: 18, fontSize: "1rem", color: "#c084fc" }}>💼 Что вы получаете как партнёр:</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Готовый продукт с доказанным спросом — интеллект-тренировки нужны миллионам",
                  "Обучение от действующих амбассадоров и наставников системы",
                  "Многоуровневый пассивный доход с вашей партнёрской структуры",
                  "Работа полностью онлайн — без привязки к месту и графику",
                  "Активное сообщество, которое ускоряет ваш рост в разы",
                  "Личный бренд и экспертная репутация в нише саморазвития",
                  "Инструменты продвижения и готовые материалы для старта",
                  "Бонусы и вознаграждения за достижение ранговых показателей",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, color: "#bbb", fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: "#7c3aed", flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glass" style={{ borderRadius: 20, padding: 40, textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 14 }}>Готовы начать партнёрский путь?</h3>
            <p style={{ color: "#9999bb", lineHeight: 1.7, marginBottom: 24 }}>Если вы хотите выстроить собственный бизнес в нише интеллектуального развития — напишите мне. Расскажу всё о системе, условиях и первых шагах. Вход в партнёрство открыт для людей по всему миру.</p>
            <a onClick={() => scrollTo("#contact")} href="#contact" className="contact-btn btn-primary" style={{ display: "inline-flex", justifyContent: "center", fontSize: 15 }}>Узнать подробнее</a>
          </div>
        </section>
      </div>

      <div className="divider" />

      {/* ===== КОНТАКТЫ ===== */}
      <div id="contact" style={{ background: "#0a0a0f" }}>
        <section className="page-section" style={{ paddingBottom: 60 }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 60px" }}>
            <p className="sec-label">Начните сейчас</p>
            <h2 className="sec-title">Запишитесь на <span className="grad">занятие</span></h2>
            <p className="sec-sub">Оставьте заявку — Вера свяжется с вами и подберёт удобное время для первого занятия онлайн</p>
          </div>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="contact-grid">
              <a href="https://t.me/vera_poz" target="_blank" rel="noreferrer" className="contact-btn btn-tg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.487c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.412 14.84l-2.95-.924c-.642-.2-.655-.642.136-.953l11.527-4.444c.537-.194 1.006.131.837.729z" /></svg>
                Telegram
              </a>
              <a href="https://wa.me/79001234567" target="_blank" rel="noreferrer" className="contact-btn btn-wa">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                WhatsApp
              </a>
              <a href="https://vk.com/vera_poz" target="_blank" rel="noreferrer" className="contact-btn btn-vk">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.032-1.01-1.49-.932-1.745-.932-.356 0-.458.102-.458.593v1.566c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.454 2.268 4.605 2.844 4.605.22 0 .322-.102.322-.66V9.932c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z" /></svg>
                ВКонтакте
              </a>
              <a href="https://youtube.com/@vera_poz" target="_blank" rel="noreferrer" className="contact-btn btn-yt">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                YouTube
              </a>
            </div>
            {/* FORM */}
            <div className="glass" style={{ borderRadius: 20, padding: 36, marginTop: 10 }}>
              <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: "1.2rem" }}>Оставьте заявку</h3>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ display: "grid", gap: 14 }}>
                  <input type="text" placeholder="Ваше имя" required style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: 15, outline: "none", width: "100%" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  <input type="tel" placeholder="Телефон или мессенджер" required style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: 15, outline: "none", width: "100%" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  <textarea placeholder="Ваш вопрос или пожелание (необязательно)" rows={3} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px", color: "#fff", fontSize: 15, outline: "none", resize: "none", width: "100%" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(124,58,237,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  <button type="submit" className="contact-btn btn-primary" style={{ justifyContent: "center", fontSize: 16, padding: 18, borderRadius: 14, width: "100%" }}>
                    🚀 Отправить заявку
                  </button>
                  {formSuccess && (
                    <div style={{ textAlign: "center", color: "#a78bfa", padding: 12, background: "rgba(124,58,237,0.1)", borderRadius: 10, border: "1px solid rgba(124,58,237,0.3)", fontWeight: 600 }}>
                      ✅ Заявка отправлена! Вера свяжется с вами в ближайшее время.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "#070709", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: 8 }}>
          <span className="grad">Super</span><span style={{ color: "#fff" }}>Jump</span>
        </div>
        <p style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>Интеллект-тренер · Вера Позднякова</p>
        <p style={{ color: "#333", fontSize: 13 }}>© 2025 Все права защищены</p>
      </footer>

      {/* ===== MODAL ===== */}
      {modalSrc && (
        <div className="modal-overlay open" onClick={() => setModalSrc("")}>
          <img src={modalSrc} alt="" />
        </div>
      )}
    </div>
  );
}
