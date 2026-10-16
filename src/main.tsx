import React, { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowDown, X, Mail, Copy, Check, ArrowLeft } from 'lucide-react';
import hero from '../assets/hero-cursor.webp';
import moon from '../assets/decor-0.webp';
import smile from '../assets/decor-1.webp';
import brick from '../assets/decor-2.webp';
import cursor from '../assets/decor-3.webp';
import p0 from '../assets/project-0.webp';
import p1 from '../assets/project-1.webp';
import p2 from '../assets/project-2.webp';
import p3 from '../assets/project-3.webp';
import p4 from '../assets/project-4.webp';
import p5 from '../assets/project-5.webp';
import p6 from '../assets/project-6.webp';
import p7 from '../assets/project-7.webp';
import p8 from '../assets/project-8.webp';
import { marqueeAssets } from './marquee-assets';
import './style.css';

const EMAIL = 'julianbuhler9@gmail.com';
const ease = [0.25, 0.1, 0.25, 1] as const;
const projects = [
  { name: 'Nextlevel Studio', category: 'Designreferenz 01', images: [p0, p1, p2], description: 'Organische Formen, satte Farben und eine Bildwelt, die in Erinnerung bleibt. Eine visuelle Studie aus der gewählten Vorlage.' },
  { name: 'Aura Brand Identity', category: 'Designreferenz 02', images: [p3, p4, p5], description: 'Ruhige Flächen, eine violette Farbwelt und große Bilder. Eine visuelle Studie aus der gewählten Vorlage.' },
  { name: 'Solaris Digital', category: 'Designreferenz 03', images: [p6, p7, p8], description: 'Warmes Licht, klare Kontraste und ein mutiger Auftritt. Eine visuelle Studie aus der gewählten Vorlage.' }
];
type Project = typeof projects[number];

function FadeIn({ children, delay = 0, duration = .7, x = 0, y = 30, className = '' }: { children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease }}>{children}</motion.div>;
}

function ContactButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return <button type="button" onClick={onClick} className={'contact-button ' + className}>Lass uns reden <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" /></button>;
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer:fine)').matches) return;
    const el = ref.current!;
    let raf = 0;
    const reset = () => { el.style.transition = 'transform .6s ease-in-out'; el.style.transform = 'translate3d(0,0,0)'; };
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Measure the stationary parent so the magnetic motion cannot feed back on itself.
        const r = el.parentElement!.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        if (Math.abs(x) < r.width / 2 + 150 && Math.abs(y) < r.height / 2 + 150) {
          el.style.transition = 'transform .3s ease-out';
          el.style.transform = `translate3d(${x / 3}px,${y / 3}px,0)`;
        } else reset();
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); };
  }, [reduced]);
  return <div ref={ref} className="magnet">{children}</div>;
}

function Hero({ contact }: { contact: () => void }) {
  const reduced = useReducedMotion();
  return <section className="hero relative flex flex-col" id="start" aria-labelledby="hero-title">
    <FadeIn y={-20} className="hero-nav-wrap">
      <nav className="hero-nav flex items-center justify-between" aria-label="Hauptnavigation">
        <a href="#ueber-mich">Über mich</a><a href="#leistungen">Leistungen</a><a href="#projekte">Projekte</a><a href="#kontakt">Kontakt</a>
      </nav>
    </FadeIn>
    <div className="hero-title-wrap overflow-hidden"><FadeIn delay={.15} y={40}>
      <h1 id="hero-title" className="hero-heading hero-title brand-title">VYFORM</h1>
    </FadeIn></div>
    <div className="hero-object" aria-hidden="true">
      <FadeIn delay={.6} y={30} className="hero-object-enter">
        <Magnet><motion.img className="hero-sculpture" src={hero} alt="" width="1200" height="1200" fetchPriority="high" draggable="false" animate={reduced ? undefined : { y: [0, -14, 0], rotate: [-3, 1, -3] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} /></Magnet>
      </FadeIn>
    </div>
    <div className="hero-bottom flex items-end justify-between">
      <FadeIn delay={.35} y={20}><p className="hero-intro">Webdesign mit Eigencharakter.<br />Gestaltet & entwickelt<br />von Julian.</p></FadeIn>
      <a className="hero-scroll" href="#inspiration" aria-label="Weiter zu den Designwelten"><ArrowDown size={20} strokeWidth={1.4} aria-hidden="true" /><span>Scroll to explore</span></a>
      <FadeIn delay={.5} y={20}><ContactButton onClick={contact} /></FadeIn>
    </div>
  </section>;
}

function MarqueeTile({ asset }: { asset: typeof marqueeAssets[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const active = useInView(ref, { margin: '120px' });
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  return <a ref={ref} href="https://motionsites.ai/" target="_blank" rel="noopener noreferrer" className="marquee-tile" aria-label={`${asset.name} — Designinspiration bei MotionSites (neuer Tab)`}>
    <img src={asset.poster} className="marquee-poster" width="420" height="270" alt="" loading="lazy" decoding="async" />
    {active && !reduced && !failed && asset.video && <video src={asset.video} poster={asset.poster} className="marquee-gif" width="420" height="270" autoPlay muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true" onError={() => setFailed(true)} />}
    <span className="tile-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span>
  </a>;
}

function Marquee() {
  const section = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rows = [marqueeAssets.slice(0, 11), marqueeAssets.slice(11)];
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      const r = section.current!.getBoundingClientRect();
      const offset = (window.innerHeight - r.top) * .3 - 200;
      [row1.current!, row2.current!].forEach((el, i) => {
        // The middle copy keeps the edges filled as the two rows move in opposite directions.
        const cycle = el.scrollWidth / 3;
        el.style.transform = `translate3d(${-cycle + (i === 0 ? offset : -offset)}px,0,0)`;
      });
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [reduced]);
  return <section ref={section} id="inspiration" className="marquee-section" aria-label="Bewegte Designinspiration">
    {rows.map((row, i) => <div className="marquee-window" key={i}><div ref={i === 0 ? row1 : row2} className="marquee-track">
      {[0, 1, 2].map(copy => <div className="marquee-copy" key={copy} aria-hidden={copy !== 1 ? true : undefined} {...(copy !== 1 ? { inert: '' } : {})}>
        {row.map(asset => <MarqueeTile asset={asset} key={asset.url} />)}
      </div>)}
    </div></div>)}
    <p className="inspiration-note">Designinspiration von <a href="https://motionsites.ai/" target="_blank" rel="noopener noreferrer">MotionSites <ArrowUpRight size={12} aria-hidden="true" /></a></p>
  </section>;
}

function Character({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index / total, Math.min(1, (index + 8) / total)], [.2, 1]);
  const reduced = useReducedMotion();
  return <span className="reveal-character"><span className="character-space">{char}</span><motion.span className="character-ink" style={{ opacity: reduced ? 1 : opacity }}>{char}</motion.span></span>;
}

function AnimatedText() {
  const text = 'Hinter VYFORM stehe ich: Julian. Ich gestalte Websites für Menschen, die mit ihrem Business etwas Eigenes aufbauen. Mein Fokus: starke Landingpages, klare Gestaltung und Bewegung mit Gefühl. Von der ersten Idee bis zum fertigen Auftritt arbeitest du direkt mit mir. Lass uns etwas bauen, das zu dir passt.';
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  let index = 0;
  return <p className="about-paragraph" ref={ref} aria-label={text}><span aria-hidden="true">{text.split(' ').map((word, wi) => {
    const start = index;
    index += word.length + 1;
    return <React.Fragment key={wi}><span className="reveal-word">{Array.from(word).map((char, ci) => <Character char={char} index={start + ci} total={text.length} progress={scrollYProgress} key={ci} />)}</span>{' '}</React.Fragment>;
  })}</span></p>;
}

function About({ contact }: { contact: () => void }) {
  const decorations = [{ src: moon, className: 'decor-moon', x: -80, delay: .1 }, { src: smile, className: 'decor-smile', x: -80, delay: .25 }, { src: brick, className: 'decor-brick', x: 80, delay: .15 }, { src: cursor, className: 'decor-cursor', x: 80, delay: .3 }];
  return <section className="about-section relative" id="ueber-mich" aria-labelledby="about-title">
    {decorations.map(item => <FadeIn key={item.className} className={'about-decoration ' + item.className} delay={item.delay} duration={.9} x={item.x} y={0}><img src={item.src} alt="" width="300" height="300" loading="lazy" draggable="false" /></FadeIn>)}
    <div className="about-content">
      <FadeIn y={40}><h2 id="about-title" className="hero-heading section-heading">Über mich</h2></FadeIn>
      <AnimatedText />
      <FadeIn><ContactButton onClick={contact} /></FadeIn>
    </div>
  </section>;
}

const services = [
  ['Webdesign', 'Ein eigenständiger Look für dein Business. Mit klarer Typografie, stimmigen Farben und einem Layout, das deine Geschichte auf den Punkt bringt.'],
  ['Landingpages', 'Eine Seite, ein klares Ziel. Ich strukturiere dein Angebot so, dass Besucher verstehen, was du machst und wie sie mit dir starten können.'],
  ['Motion & 3D', 'Bewegung, die zum Design passt. Mit räumlichen Elementen, feinen Interaktionen und Animationen bekommt dein Auftritt einen eigenen Charakter.'],
  ['Visueller Auftritt', 'Von der Farbwelt bis zur Bildsprache: Ich übersetze deine Idee in ein stimmiges digitales Erscheinungsbild, das sich durch die ganze Website zieht.'],
  ['Entwicklung', 'Vom Entwurf zur funktionierenden Website. Responsiv, mit sauberer Umsetzung und durchdachten Details auf Smartphone, Tablet und Desktop.']
];

function Services() {
  return <section id="leistungen" className="services-section" aria-labelledby="services-title">
    <FadeIn><h2 id="services-title" className="section-heading">Leistungen</h2></FadeIn>
    <div className="services-list">{services.map(([title, description], i) => <FadeIn delay={i * .1} key={title}><article className="service-row">
      <span className="service-number" aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div>
    </article></FadeIn>)}</div>
    <p className="services-note">Jedes Projekt ist individuell. Umfang und Preis klären wir vor dem Start.</p>
  </section>;
}

function ProjectCard({ project, index, progress, open }: { project: Project; index: number; progress: MotionValue<number>; open: () => void }) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / projects.length, 1], [1, 1 - (projects.length - 1 - index) * .03]);
  return <div className="project-layer" style={{ top: `calc(var(--stack-top) + ${index * 28}px)` }}>
    <motion.article className="project-card" style={{ scale: reduced ? 1 : scale, transformOrigin: 'center top' }} aria-labelledby={'project-' + index}>
      <div className="project-top">
        <span className="project-number" aria-hidden="true">0{index + 1}</span>
        <div className="project-name"><p>{project.category}</p><h3 id={'project-' + index}>{project.name}</h3></div>
        <button type="button" className="ghost-button" onClick={open}>Ansicht öffnen <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
      <div className="project-images">
        <div className="project-left"><img src={project.images[0]} alt={`${project.name}: erste Bildstudie`} loading="lazy" width="1280" height="720" /><img src={project.images[1]} alt={`${project.name}: zweite Bildstudie`} loading="lazy" width="1280" height="720" /></div>
        <img src={project.images[2]} className="project-main-image" alt={`${project.name}: atmosphärische Bildwelt`} loading="lazy" width="1280" height="720" />
      </div>
    </motion.article>
  </div>;
}

function Projects({ open }: { open: (project: Project) => void }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  return <section className="projects-section" id="projekte" aria-labelledby="projects-title">
    <FadeIn><h2 id="projects-title" className="hero-heading section-heading">Projekte</h2></FadeIn>
    <p className="projects-note">Ausgewählte Bildwelten aus der Vorlage.<br />Designreferenzen, keine Kundenarbeiten.</p>
    <div className="project-stack" ref={stackRef}>{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.name} progress={scrollYProgress} open={() => open(project)} />)}</div>
  </section>;
}

function Dialog({ children, title, close, className = '' }: { children: ReactNode; title: string; close: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const active = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    el.showModal();
    const onCancel = (e: Event) => { e.preventDefault(); close(); };
    el.addEventListener('cancel', onCancel);
    return () => { el.removeEventListener('cancel', onCancel); el.close(); document.body.style.overflow = old; active?.focus(); };
  }, [close]);
  return <dialog className={'site-dialog ' + className} ref={ref} aria-label={title} onClick={e => { if (e.target === e.currentTarget) close(); }}>
    <div className="dialog-content"><button className="dialog-close" onClick={close} type="button" aria-label="Schließen"><X size={24} aria-hidden="true" /></button>{children}</div>
  </dialog>;
}

function ContactDialog({ close }: { close: () => void }) {
  const [review, setReview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const body = `Hallo Julian,\n\n${values.message}\n\nViele Grüße\n${values.name}\n${values.email}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('VYFORM — Projektanfrage von ' + values.name)}&body=${encodeURIComponent(body)}`;
  const submit = (e: FormEvent) => { e.preventDefault(); setReview(true); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL + '\n\n' + body); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  };
  return <Dialog title="Projekt anfragen" close={close} className="contact-dialog">
    <p className="dialog-eyebrow">VYFORM / Deine nächste Website</p><h2>Gute Idee?<br />Lass sie uns bauen.</h2>
    {!review ? <form onSubmit={submit}>
      <label htmlFor="brief-name">Wie heißt du?<input autoComplete="name" id="brief-name" name="name" required maxLength={100} placeholder="Dein Name" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} /></label>
      <label htmlFor="brief-email">Deine E-Mail<input autoComplete="email" id="brief-email" name="email" required type="email" maxLength={200} placeholder="hallo@deinbusiness.de" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} /></label>
      <label htmlFor="brief-message">Was hast du vor?<textarea id="brief-message" name="message" required maxLength={2500} rows={4} placeholder="Erzähl mir kurz von deinem Business und deiner Idee …" value={values.message} onChange={e => setValues({ ...values, message: e.target.value })} /></label>
      <button className="contact-button" type="submit">Anfrage vorbereiten <ArrowUpRight size={20} aria-hidden="true" /></button>
      <p className="form-note">Im nächsten Schritt öffnest du deinen E-Mail-Entwurf. Deine Angaben werden hier nicht gespeichert oder automatisch versendet.</p>
    </form> : <div className="brief-review" aria-live="polite">
      <p>Dein Entwurf ist bereit. Sende ihn mit deinem E-Mail-Programm an <strong>{EMAIL}</strong>.</p>
      <pre>{body}</pre>
      <a className="contact-button" href={mailto}><Mail size={18} aria-hidden="true" /> E-Mail-Entwurf öffnen</a>
      <div className="review-actions"><button type="button" className="text-button" onClick={() => setReview(false)}><ArrowLeft size={16} aria-hidden="true" /> Bearbeiten</button><button type="button" className="text-button" onClick={copy}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{copied ? 'Kopiert' : 'Text kopieren'}</button></div>
      {copyError && <p className="form-note" role="status">Kopieren ist in diesem Browser nicht verfügbar. Du kannst den Text oben markieren und kopieren.</p>}
    </div>}
  </Dialog>;
}

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const closeContact = React.useCallback(() => setContactOpen(false), []);
  const closeProject = React.useCallback(() => setProject(null), []);
  const contact = () => setContactOpen(true);
  return <>
    <a className="skip-link" href="#leistungen">Zum Inhalt</a>
    <main className="site-wrapper">
      <Hero contact={contact} /><Marquee /><About contact={contact} /><Services /><Projects open={setProject} />
      <footer id="kontakt" className="contact-footer">
        <FadeIn><p className="footer-eyebrow"><span /> Direkt mit mir. Von Idee bis Launch.</p><h2 className="hero-heading">Deine Idee.<br />Nächster Klick.</h2><ContactButton onClick={contact} /></FadeIn>
        <div className="footer-bottom"><a href="#start" className="footer-signature">VYFORM<span>Design & Entwicklung von Julian</span></a><a className="footer-email" href={'mailto:' + EMAIL}>{EMAIL}<ArrowUpRight size={15} aria-hidden="true" /></a><span>© {new Date().getFullYear()} VYFORM</span></div>
      </footer>
    </main>
    {contactOpen && <ContactDialog close={closeContact} />}
    {project && <Dialog title={project.name} close={closeProject} className="project-dialog"><p className="dialog-eyebrow">{project.category} · keine Kundenarbeit</p><h2>{project.name}</h2><p className="project-dialog-description">{project.description}</p><div className="project-dialog-gallery">{project.images.map((src, i) => <img key={src} src={src} alt={`${project.name} — Bildstudie ${i + 1}`} width="1280" height="720" />)}</div><ContactButton onClick={() => { setProject(null); setContactOpen(true); }} /></Dialog>}
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
