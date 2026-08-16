import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';
import { Crown, Sparkles, X, ArrowRight } from 'lucide-react';

export function MasteryOverlay() {
  const { masteryEvent, clearMasteryEvent, acceptFrontier, weakAreas } = useApp();

  useEffect(() => {
    if (masteryEvent) {
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && clearMasteryEvent();
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [masteryEvent, clearMasteryEvent]);

  if (!masteryEvent) return null;

  // find the newly mastered area id (the one flagged mastered)
  const mastered = weakAreas.find((w) => w.mastered && w.name === masteryEvent.areaName);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      {/* burst rays */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
        <div className="h-40 w-40 rounded-full bg-navy-400/30 animate-burst" />
      </div>

      <div className="relative glass p-8 max-w-md w-full text-center animate-scale-in shadow-glow">
        <button
          onClick={clearMasteryEvent}
          className="absolute top-4 right-4 text-navy-100/50 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto grid place-items-center h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-400/30 to-amber-600/20 border border-amber-400/40 shadow-glow-sm animate-glow-pulse">
          <Crown className="h-9 w-9 text-amber-300" />
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-amber-300/80">Weakness → Strength</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-white leading-snug">
          You turned a weakness into a strength.
        </h2>
        <p className="mt-3 text-sm text-navy-100/70">
          {masteryEvent.areaName} mastered. You earned{' '}
          <span className="text-white font-semibold">+{masteryEvent.credits} Shadow Credits</span>, unlocked the{' '}
          <span className="text-amber-300 font-semibold">{masteryEvent.badgeName}</span> badge, and your avatar
          evolved.
        </p>

        <div className="mt-6 rounded-2xl bg-navy-900/50 border border-navy-400/20 p-4 text-left">
          <p className="text-xs uppercase tracking-wider text-navy-300/80 mb-1">Next Frontier</p>
          <p className="text-white font-display font-bold text-lg">{masteryEvent.nextFrontier}</p>
          <p className="text-xs text-navy-100/60 mt-1">
            Your AI recommends this as the next edge to sharpen.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            onClick={() => {
              if (mastered) acceptFrontier(mastered.id);
              clearMasteryEvent();
            }}
          >
            <Sparkles className="h-4 w-4 mr-1" /> Accept Recommendation
          </Button>
          <Button variant="ghost" onClick={clearMasteryEvent}>
            Choose my own goal <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
