import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface Stanza {
  id: number;
  planetName: string;
  theme: 'b612' | 'rose' | 'sahara' | 'fox';
  lines: string[];
  illustration: 'b612' | 'rose' | 'desert' | 'fox';
}

const POEM_STANZAS: Stanza[] = [
  {
    id: 1,
    planetName: "Asteroid B-612",
    theme: "b612",
    lines: [
      "Todos los descubrimientos",
      "tienen muchas ganas de encontrarte.",
      "Hasta las estrellas usan telescopios",
      "para buscarte."
    ],
    illustration: "b612"
  },
  {
    id: 2,
    planetName: "The Rose's Glass Dome",
    theme: "rose",
    lines: [
      "De todas las curvas de tu cuerpo,",
      "tu sonrisa es la favorita del universo,",
      "tan brillante y tan única",
      "como una estrella en el cielo."
    ],
    illustration: "rose"
  },
  {
    id: 3,
    planetName: "The Golden Desert",
    theme: "sahara",
    lines: [
      "Haces que cualquier lugar brille",
      "con solo tu forma de mirar,",
      "como una estrella que nunca se apaga",
      "y enseña al cielo a brillar."
    ],
    illustration: "desert"
  },
  {
    id: 4,
    planetName: "The Fox's Secret",
    theme: "fox",
    lines: [
      "No hace falta buscar muy lejos",
      "para saber lo especial que eres:",
      "porque lo más bonito que tienes",
      "siempre se siente con el corazón."
    ],
    illustration: "fox"
  }
];

interface ConstellationPoemViewerProps {
  onThemeChange: (theme: 'b612' | 'rose' | 'sahara' | 'fox') => void;
}

export const ConstellationPoemViewer: React.FC<ConstellationPoemViewerProps> = ({ onThemeChange }) => {
  const [activeStanzaIndex, setActiveStanzaIndex] = React.useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollY } = useScroll();

  // Parallax vectors drift speed
  const parallaxOffset = useTransform(scrollY, [0, 2000], [0, -180]);

  // Observer to update theme as user scrolls past sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            if (activeStanzaIndex !== index) {
              setActiveStanzaIndex(index);
              onThemeChange(POEM_STANZAS[index].theme);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStanzaIndex, onThemeChange]);

  const scrollToStanza = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-12 max-w-2xl mx-auto z-20 relative">
      {/* Minimal Header Space & Scroll Down Indicator */}
      <header className="flex flex-col items-center text-center my-12 sm:my-16">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="pt-4 text-amber-400/60"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path d="M12 5 v14 M5 12 l7 7 l7 -7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </header>

      {/* Floating Parallax Background Elements */}
      <motion.div
        style={{ y: parallaxOffset }}
        className="fixed inset-0 pointer-events-none z-10 opacity-20 flex flex-col justify-around items-center"
      >
        <svg viewBox="0 0 100 100" className="w-32 h-32 sm:w-48 sm:h-48 text-amber-300 fill-current ml-[60vw]">
          <polygon points="50,10 63,35 90,38 70,57 75,85 50,72 25,85 30,57 10,38 37,35" />
        </svg>
        <svg viewBox="0 0 100 100" className="w-28 h-28 sm:w-40 sm:h-40 text-rose-400 fill-current mr-[60vw]">
          <circle cx="50" cy="50" r="30" fillOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Vertical Stanza Sections */}
      <div className="w-full flex flex-col space-y-20 sm:space-y-32 my-8">
        {POEM_STANZAS.map((stanza, idx) => (
          <section
            key={stanza.id}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className="w-full min-h-[50vh] flex flex-col items-center justify-center scroll-mt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.35, once: false }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl bg-slate-900/40 border border-slate-800/80 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center text-center transition-all duration-700"
            >
              {/* Subtle Stanza SVG Backdrop Vector */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none select-none">
                {stanza.illustration === 'b612' && (
                  <svg viewBox="0 0 200 200" className="w-72 h-72 text-amber-400 fill-current">
                    <circle cx="100" cy="150" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                    <polygon points="100,20 105,35 120,38 108,48 112,63 100,53 88,63 92,48 80,38 95,35" />
                  </svg>
                )}
                {stanza.illustration === 'rose' && (
                  <svg viewBox="0 0 200 200" className="w-72 h-72 text-rose-500 fill-current">
                    <circle cx="100" cy="90" r="30" fillOpacity="0.3" />
                    <path d="M100 120 C100 160, 95 170, 100 190" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {stanza.illustration === 'desert' && (
                  <svg viewBox="0 0 200 200" className="w-72 h-72 text-amber-500 fill-current">
                    <path d="M0 160 Q50 120 100 150 T200 140 L200 200 L0 200 Z" fillOpacity="0.2" />
                    <circle cx="150" cy="60" r="16" fillOpacity="0.4" />
                  </svg>
                )}
                {stanza.illustration === 'fox' && (
                  <svg viewBox="0 0 200 200" className="w-72 h-72 text-orange-400 fill-current">
                    <polygon points="100,60 70,120 130,120" fillOpacity="0.25" />
                  </svg>
                )}
              </div>

              {/* Poem Verses */}
              <div className="flex flex-col items-center justify-center space-y-4 text-center z-10 my-4">
                {stanza.lines.map((line, i) => (
                  <p
                    key={i}
                    className="font-serif text-xl sm:text-3xl text-slate-100 leading-relaxed tracking-wide selection:bg-amber-400 selection:text-slate-950"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Footer Closing Quote */}
      <footer className="my-20 text-center flex flex-col items-center space-y-3">
        <p className="font-serif text-slate-400 text-sm sm:text-base italic">
          "Lo esencial es invisible a los ojos."
        </p>
      </footer>

      {/* Floating Mobile Scroll Tracker Pill */}
      <div className="fixed bottom-6 z-30 flex items-center gap-3 px-4 py-2 rounded-full border border-slate-700 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2">
          {POEM_STANZAS.map((stanza, idx) => {
            const isActive = idx === activeStanzaIndex;
            return (
              <button
                key={stanza.id}
                onClick={() => scrollToStanza(idx)}
                aria-label={`Scroll to stanza ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isActive ? 'w-7 bg-amber-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            );
          })}
        </div>
        <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest pl-2 border-l border-slate-800">
          0{activeStanzaIndex + 1} / 04
        </span>
      </div>
    </div>
  );
};
