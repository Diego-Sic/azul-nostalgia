import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Stanza {
  id: number;
  planetName: string;
  subtitle: string;
  theme: 'b612' | 'rose' | 'sahara' | 'fox';
  lines: string[];
  illustration: 'b612' | 'rose' | 'desert' | 'fox';
}

const POEM_STANZAS: Stanza[] = [
  {
    id: 1,
    planetName: "Asteroid B-612",
    subtitle: "Stanza I",
    theme: "b612",
    lines: [
      "Lorem ipsum dolor sit amet,",
      "consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt",
      "ut labore et dolore magna aliqua."
    ],
    illustration: "b612"
  },
  {
    id: 2,
    planetName: "The Rose's Glass Dome",
    subtitle: "Stanza II",
    theme: "rose",
    lines: [
      "Ut enim ad minim veniam,",
      "quis nostrud exercitation ullamco",
      "laboris nisi ut aliquip ex ea",
      "commodo consequat duis aute."
    ],
    illustration: "rose"
  },
  {
    id: 3,
    planetName: "The Golden Desert",
    subtitle: "Stanza III",
    theme: "sahara",
    lines: [
      "Duis aute irure dolor in",
      "reprehenderit in voluptate velit",
      "esse cillum dolore eu fugiat",
      "nulla pariatur excepteur sint."
    ],
    illustration: "desert"
  },
  {
    id: 4,
    planetName: "The Fox's Secret",
    subtitle: "Stanza IV",
    theme: "fox",
    lines: [
      "Occaecat cupidatat non proident,",
      "sunt in culpa qui officia",
      "deserunt mollit anim id est",
      "laborum et dolorum fuga."
    ],
    illustration: "fox"
  }
];

interface ConstellationPoemViewerProps {
  onThemeChange: (theme: 'b612' | 'rose' | 'sahara' | 'fox') => void;
}

export const ConstellationPoemViewer: React.FC<ConstellationPoemViewerProps> = ({ onThemeChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStanza = POEM_STANZAS[currentIndex];

  const handleSelectStanza = (index: number) => {
    setCurrentIndex(index);
    onThemeChange(POEM_STANZAS[index].theme);
  };

  const handleNext = () => {
    if (currentIndex < POEM_STANZAS.length - 1) {
      handleSelectStanza(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelectStanza(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[75vh] px-4 py-8 max-w-xl mx-auto z-20">
      {/* Header Badge */}
      <motion.div
        key={currentStanza.planetName}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-amber-400/20 bg-slate-900/60 backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-amber-300 font-mono text-xs uppercase tracking-widest">
          {currentStanza.planetName}
        </span>
      </motion.div>

      {/* Main Glass Stanza Card */}
      <div className="w-full rounded-3xl p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl bg-slate-900/40 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-[340px] flex flex-col items-center justify-between transition-all duration-700">
        {/* Subtle SVG Background Vector */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none select-none">
          {currentStanza.illustration === 'b612' && (
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-amber-400 fill-current">
              <circle cx="100" cy="150" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <polygon points="100,20 105,35 120,38 108,48 112,63 100,53 88,63 92,48 80,38 95,35" />
            </svg>
          )}
          {currentStanza.illustration === 'rose' && (
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-rose-500 fill-current">
              <circle cx="100" cy="90" r="30" fillOpacity="0.3" />
              <path d="M100 120 C100 160, 95 170, 100 190" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M85 120 Q100 70 115 120 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
          {currentStanza.illustration === 'desert' && (
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-amber-500 fill-current">
              <path d="M0 160 Q50 120 100 150 T200 140 L200 200 L0 200 Z" fillOpacity="0.2" />
              <circle cx="150" cy="60" r="16" fillOpacity="0.4" />
            </svg>
          )}
          {currentStanza.illustration === 'fox' && (
            <svg viewBox="0 0 200 200" className="w-64 h-64 text-orange-400 fill-current">
              <polygon points="100,60 70,120 130,120" fillOpacity="0.25" />
              <polygon points="70,60 60,100 80,90" fillOpacity="0.3" />
              <polygon points="130,60 140,100 120,90" fillOpacity="0.3" />
            </svg>
          )}
        </div>

        {/* Stanza Subtitle */}
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-6">
          {currentStanza.subtitle}
        </p>

        {/* Animated Poem Verses */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center space-y-3 text-center z-10 my-auto"
          >
            {currentStanza.lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="font-serif text-lg sm:text-xl text-slate-100 leading-relaxed tracking-wide selection:bg-amber-400 selection:text-slate-950"
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stanza Quote / Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 w-full flex items-center justify-between text-xs font-serif text-slate-400 italic">
          <span>Stanza {currentIndex + 1} of {POEM_STANZAS.length}</span>
          <span>"Lo esencial es invisible a los ojos."</span>
        </div>
      </div>

      {/* Constellation Navigation Controls */}
      <div className="flex flex-col items-center gap-6 mt-8 w-full">
        {/* Constellation Planet Dots */}
        <div className="flex items-center gap-4 sm:gap-6">
          {POEM_STANZAS.map((stanza, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={stanza.id}
                onClick={() => handleSelectStanza(idx)}
                className="group relative flex flex-col items-center focus:outline-none"
                aria-label={stanza.planetName}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    boxShadow: isActive ? '0 0 15px rgba(250,204,21,0.6)' : 'none'
                  }}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isActive
                      ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                      : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    {idx === 0 && <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />}
                    {idx === 1 && <circle cx="12" cy="12" r="6" />}
                    {idx === 2 && <path d="M12 2 L22 22 L2 22 Z" />}
                    {idx === 3 && <rect x="6" y="6" width="12" height="12" rx="2" />}
                  </svg>
                </motion.div>
                <span className={`text-[10px] font-mono uppercase tracking-widest mt-2 transition-colors duration-300 ${
                  isActive ? 'text-amber-400' : 'text-slate-600 group-hover:text-slate-400'
                }`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-slate-800 bg-slate-900/40 text-slate-300 hover:border-amber-400/40 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === POEM_STANZAS.length - 1}
            className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border border-slate-800 bg-slate-900/40 text-slate-300 hover:border-amber-400/40 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
