import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

type Step = 'statement' | 'brand' | 'done';

export function OpeningSequence() {
  const { setPhase } = useApp();
  const [step, setStep] = useState<Step>('statement');
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 3200);
    const t2 = setTimeout(() => {
      setHide(false);
      setStep('brand');
    }, 4200);
    const t3 = setTimeout(() => setHide(true), 7400);
    const t4 = setTimeout(() => setStep('done'), 8400);
    const t5 = setTimeout(() => setPhase('auth'), 9000);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [setPhase]);

  if (step === 'done') return null;

  return (
    <div className="fixed inset-0 app-bg grid place-items-center overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-radial-glow opacity-70" />

      {step === 'statement' && (
        <h1
          key="statement"
          className={`relative px-6 text-center font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl transition-opacity duration-1000 ${
            hide ? 'opacity-0' : 'opacity-100'
          }`}
        >
          See the struggle before it becomes the setback.
        </h1>
      )}

      {step === 'brand' && (
        <div
          key="brand"
          className={`relative flex flex-col items-center transition-opacity duration-1000 ${
            hide ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-[0.12em] text-white animate-scale-in">
            Shadow<span className="text-navy-300">Mind</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-navy-200/80 tracking-[0.4em] uppercase animate-fade-in delay-500">
            Detect · Understand · Predict · Improve · Evolve
          </p>
          <div className="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-navy-400 to-transparent animate-fade-in delay-700" />
        </div>
      )}
    </div>
  );
}
