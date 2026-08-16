import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar, Button } from '@/components/ui';
import { X, Sparkles } from 'lucide-react';

export function EvolveOverlay() {
  const { evolveEvent, clearEvolveEvent } = useApp();

  useEffect(() => {
    if (evolveEvent) {
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && clearEvolveEvent();
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [evolveEvent, clearEvolveEvent]);

  if (!evolveEvent) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
        <div className="h-40 w-40 rounded-full bg-navy-400/30 animate-burst" />
      </div>

      <div className="relative glass p-8 max-w-md w-full text-center animate-scale-in shadow-glow">
        <button
          onClick={clearEvolveEvent}
          className="absolute top-4 right-4 text-navy-100/50 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-6">Avatar Evolved</p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="opacity-40 grayscale">
            <Avatar stage={evolveEvent.fromStage} size="lg" />
          </div>
          <Sparkles className="h-6 w-6 text-amber-300 animate-glow-pulse" />
          <div className="animate-scale-in">
            <Avatar stage={evolveEvent.toStage} size="lg" />
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-white">
          You evolved to {evolveEvent.toStage}.
        </h2>
        <p className="mt-3 text-sm text-navy-100/70">
          Your growth crossed a new threshold. Your avatar now reflects the progress you have earned through
          consistency, mastery, and collaboration.
        </p>

        <div className="mt-6">
          <Button onClick={clearEvolveEvent}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
