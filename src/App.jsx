import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  Scale, 
  Activity, 
  ArrowRight, 
  Lock, 
  Search, 
  Calendar, 
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Target,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- PRESET B: MIDNIGHT LUXE CONFIG ---
const THEME = {
  colors: {
    primary: '#0D0D12',
    accent: '#C9A84C',
    ivory: '#FAF8F5',
    slate: '#2A2A35'
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop', // Dark Marble/Gold
    philosophy: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Architectural Shadows
    expert: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop' // Legal/Luxury office
  }
};

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-5xl rounded-full border border-white/5 transition-all duration-700 ${
        isScrolled ? 'bg-primary/60 backdrop-blur-2xl py-3 px-8' : 'bg-transparent py-6 px-4'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          <span className="font-sans font-bold tracking-tighter text-ivory uppercase">Nayara Almeida</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[0.7rem] uppercase tracking-[0.2em] font-medium text-ivory/60">
          <a href="#features" className="hover:text-accent transition-colors">Estratégia</a>
          <a href="#philosophy" className="hover:text-accent transition-colors">Manifesto</a>
          <a href="#protocol" className="hover:text-accent transition-colors">Protocolo</a>
        </div>
        <button className="btn-magnetic group px-6 py-2 bg-accent text-primary text-[0.7rem] font-bold uppercase tracking-wider">
          <span className="relative z-10 flex items-center gap-2">
            Protocolo Imediato <ArrowRight size={14} />
          </span>
          <div className="absolute inset-0 bg-ivory scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      });
      
      gsap.to(".parallax-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-32 px-12 md:px-24">
      <div className="absolute inset-0 z-0">
        <img 
          src={THEME.images.hero} 
          className="parallax-bg w-full h-[120%] object-cover opacity-60 grayscale scale-110" 
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      </div>

      <div ref={textRef} className="relative z-10 max-w-4xl">
        <span className="fade-up inline-block mb-6 px-4 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[0.6rem] uppercase tracking-[0.3em] font-bold">
          Precision Legal Systems // 2026
        </span>
        <h1 className="fade-up text-[4rem] md:text-[7.5rem] leading-[0.85] font-bold tracking-tighter mb-8">
          Patrimônio meets <br />
          <span className="font-drama italic text-accent font-normal block mt-2">Proteção Total.</span>
        </h1>
        <p className="fade-up text-ivory/60 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
          Arquitetamos defesas táticas contra abusividade bancária e busca e apreensão. Quando o sistema falha, nós erguemos a blindagem definitiva.
        </p>
        <div className="fade-up flex flex-wrap gap-6">
          <button className="btn-magnetic px-10 py-5 bg-accent text-primary font-bold uppercase tracking-widest text-xs">
            Ativar Defesa Imediata
          </button>
          <button className="btn-lift px-10 py-5 border border-white/10 text-ivory font-bold uppercase tracking-widest text-xs backdrop-blur-sm">
            Ver Protocolos
          </button>
        </div>
      </div>
    </section>
  );
};

// Feature Card 1: Diagnostic Shuffler
const ShufflerCard = () => {
  const [items, setItems] = useState([
    { id: 1, label: "Auditoria de Contrato", status: "ACTIVE" },
    { id: 2, label: "Cálculo Pericial", status: "PENDING" },
    { id: 3, label: "Identificação de Nulidade", status: "LOCKED" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 w-full flex flex-col justify-center gap-2 overflow-hidden">
      {items.map((item, i) => (
        <div 
          key={item.id}
          className="bg-primary/40 border border-white/5 p-4 rounded-xl flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ 
            opacity: 1 - (i * 0.3),
            transform: `translateY(${i * 10}px) scale(${1 - (i * 0.05)})`,
            zIndex: 10 - i
          }}
        >
          <span className="text-[0.7rem] font-bold text-ivory/80 uppercase">{item.label}</span>
          <span className={`text-[0.5rem] px-2 py-1 rounded bg-accent/10 text-accent font-mono`}>{item.status}</span>
        </div>
      ))}
    </div>
  );
};

// Feature Card 2: Telemetry Typewriter
const TelemetryCard = () => {
  const [text, setText] = useState("");
  const fullText = "Iniciando recalculo de juros abusivos... Verificando taxas médias do BACEN... Nulidade detectada na cláusula 4.2. Preparando petição de urgência...";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black/40 p-4 rounded-xl border border-white/5 h-48 font-mono text-[0.65rem] text-accent/80 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-white/40 uppercase tracking-widest text-[0.5rem]">Live Intel Feed</span>
      </div>
      {text}<span className="inline-block w-1 h-3 bg-accent ml-1 animate-pulse" />
    </div>
  );
};

// Feature Card 3: Cursor Protocol Scheduler
const SchedulerCard = () => {
  return (
    <div className="bg-primary/40 border border-white/5 p-4 rounded-xl h-48 overflow-hidden relative">
      <div className="grid grid-cols-7 gap-1 h-full opacity-30">
        {[...Array(28)].map((_, i) => (
          <div key={i} className={`border border-white/5 rounded ${i === 12 ? 'bg-accent/20 border-accent/40' : ''}`} />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <Zap className="text-accent mb-2 animate-bounce" size={24} />
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ivory">Monitoramento 24h</span>
        <div className="mt-4 flex gap-2">
          <div className="w-12 h-1 bg-white/5 overflow-hidden rounded-full">
            <div className="h-full bg-accent w-full -translate-x-full animate-[progress_2s_infinite_linear]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 px-12 md:px-24 bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* CARD 1 */}
        <div className="feature-card group bg-slate/10 border border-white/5 rounded-cinematic p-10 hover:border-accent/20 transition-all duration-500">
          <div className="mb-10 text-accent"><Shield size={32} strokeWidth={1} /></div>
          <h3 className="font-sans font-bold text-2xl mb-4 text-ivory">Bloqueio Tático</h3>
          <p className="text-ivory/40 text-sm leading-relaxed mb-10">Intervenção imediata para suspender mandados de busca e apreensão através de nulidades processuais.</p>
          <ShufflerCard />
        </div>

        {/* CARD 2 */}
        <div className="feature-card group bg-slate/10 border border-white/5 rounded-cinematic p-10 hover:border-accent/20 transition-all duration-500">
          <div className="mb-10 text-accent"><Scale size={32} strokeWidth={1} /></div>
          <h3 className="font-sans font-bold text-2xl mb-4 text-ivory">Reversão de Juros</h3>
          <p className="text-ivory/40 text-sm leading-relaxed mb-10">Recalculamos o passivo bancário sob a ótica do teto legal, eliminando cobranças predatórias.</p>
          <TelemetryCard />
        </div>

        {/* CARD 3 */}
        <div className="feature-card group bg-slate/10 border border-white/5 rounded-cinematic p-10 hover:border-accent/20 transition-all duration-500">
          <div className="mb-10 text-accent"><Activity size={32} strokeWidth={1} /></div>
          <h3 className="font-sans font-bold text-2xl mb-4 text-ivory">Monitoramento 24h</h3>
          <p className="text-ivory/40 text-sm leading-relaxed mb-10">Vigilância constante sobre o sistema judiciário para ativação de liminares em tempo recorde.</p>
          <SchedulerCard />
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".split-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-48 px-12 md:px-24 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={THEME.images.philosophy} className="w-full h-full object-cover" alt="Philosophy background" />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="split-text text-ivory/40 text-lg md:text-xl mb-12 font-light tracking-wide italic">
          "A maioria da advocacia foca no processo. Nós focamos na estratégia de guerra contra o sistema financeiro."
        </p>
        <h2 className="split-text text-4xl md:text-7xl font-bold leading-tight tracking-tighter text-ivory">
          Tratamos o seu direito como um <br />
          <span className="font-drama italic text-accent font-normal">Ativo Inviolável.</span>
        </h2>
      </div>
    </section>
  );
};

const ProtocolSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top center",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Auditoria de Risco",
      desc: "Mapeamento completo do contrato e identificação de cláusulas nulas ou abusivas.",
      icon: <Search className="text-accent" />
    },
    {
      num: "02",
      title: "Bloqueio Imediato",
      desc: "Ativação de protocolos judiciais para impedir a apreensão física do bem.",
      icon: <Lock className="text-accent" />
    },
    {
      num: "03",
      title: "Retomada de Controle",
      desc: "Negociação estratégica baseada em cálculos periciais para quitação justa.",
      icon: <Target className="text-accent" />
    }
  ];

  return (
    <div id="protocol" ref={containerRef} className="bg-primary">
      {steps.map((step, i) => (
        <section key={i} className="protocol-card sticky top-0 h-screen w-full flex items-center justify-center px-12 md:px-24 bg-primary border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center max-w-6xl">
            <div>
              <span className="font-mono text-accent text-sm mb-6 block tracking-widest">PHASE {step.num}</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">{step.title}</h2>
              <p className="text-ivory/60 text-lg leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="relative aspect-square bg-slate/5 border border-white/5 rounded-cinematic flex items-center justify-center">
              <div className="absolute inset-0 overflow-hidden rounded-cinematic">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)] animate-pulse" />
              </div>
              <div className="z-10 scale-[3]">
                {step.icon}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const Pricing = () => {
  return (
    <section className="py-32 px-12 md:px-24 bg-primary border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Inicie a sua <span className="text-accent italic font-drama font-normal">Blindagem.</span></h2>
        <p className="text-ivory/40 text-lg">Selecione o nível de intervenção necessário para o seu caso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate/10 p-10 rounded-cinematic border border-white/5 hover:border-white/20 transition-all">
          <h4 className="font-bold text-xl mb-2">Essential</h4>
          <p className="text-ivory/40 text-sm mb-8">Auditoria contratual e parecer técnico.</p>
          <div className="text-3xl font-bold mb-8">Consultar</div>
          <button className="w-full py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">Solicitar Diagnóstico</button>
        </div>

        <div className="bg-accent text-primary p-12 rounded-cinematic scale-105 shadow-2xl shadow-accent/20 z-10">
          <h4 className="font-bold text-xl mb-2">Performance</h4>
          <p className="opacity-60 text-sm mb-8">Defesa total contra busca e apreensão.</p>
          <div className="text-4xl font-bold mb-8">Estratégico</div>
          <button className="w-full py-5 rounded-full bg-primary text-ivory hover:scale-[1.02] transition-all text-xs font-bold uppercase tracking-widest">Ativar Agora</button>
        </div>

        <div className="bg-slate/10 p-10 rounded-cinematic border border-white/5 hover:border-white/20 transition-all">
          <h4 className="font-bold text-xl mb-2">Enterprise</h4>
          <p className="text-ivory/40 text-sm mb-8">Gestão de frotas e passivos bancários.</p>
          <div className="text-3xl font-bold mb-8">Custom</div>
          <button className="w-full py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">Falar com Especialista</button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-24 px-12 md:px-24 rounded-t-[4rem]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-2">
          <span className="text-2xl font-bold tracking-tighter uppercase mb-6 block">Nayara Almeida</span>
          <p className="text-ivory/40 max-w-sm">Especialistas em proteção patrimonial e direito bancário estratégico. O teto legal é o nosso ponto de partida.</p>
        </div>
        <div>
          <h5 className="font-bold text-xs uppercase tracking-widest mb-6 text-accent">Navegação</h5>
          <ul className="space-y-4 text-sm text-ivory/60">
            <li><a href="#" className="hover:text-ivory transition-colors">Estratégia</a></li>
            <li><a href="#" className="hover:text-ivory transition-colors">Manifesto</a></li>
            <li><a href="#" className="hover:text-ivory transition-colors">Protocolo</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-xs uppercase tracking-widest mb-6 text-accent">Status</h5>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[0.6rem] uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[0.6rem] text-ivory/20 uppercase tracking-[0.2em] font-medium">
        <span>© 2026 NAYARA ALMEIDA // TACTICAL LEGAL SYSTEMS</span>
        <div className="flex gap-8">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

const App = () => {
  return (
    <main className="bg-primary selection:bg-accent selection:text-primary">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <ProtocolSection />
      <Pricing />
      <Footer />
    </main>
  );
};

export default App;