import { useApp } from '@/context/AppContext';
import type { Section } from '@/context/AppContext';
import { Avatar } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  Brain,
  Home,
  Layers,
  Trophy,
  UserRound,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const NAV: { id: Section; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'skillmind', label: 'SkillMind', icon: Brain },
  { id: 'shadow', label: 'Shadow', icon: Layers },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'institution', label: 'Institution', icon: GraduationCap },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { section, setSection, profile, avatarStage, credits, dualMode, setDualMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (s: Section) => {
    setSection(s);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen app-bg relative">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-64 bg-radial-glow opacity-60 pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-30 border-b border-navy-400/10 bg-navy-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button onClick={() => go('home')} className="flex items-center gap-2.5 shrink-0">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-navy-500 to-navy-800 border border-navy-400/30 shadow-glow-sm">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-extrabold uppercase tracking-[0.15em] text-white hidden sm:block">
              Shadow<span className="text-navy-300">Mind</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <NavItem key={n.id} active={section === n.id} icon={n.icon} label={n.label} onClick={() => go(n.id)} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-navy-500/10 border border-navy-400/20 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-sm font-semibold text-white">{credits.toLocaleString()}</span>
              <span className="text-[10px] text-navy-100/60 uppercase tracking-wider">SC</span>
            </div>
            <button onClick={() => go('profile')} className="hidden sm:block">
              <Avatar stage={avatarStage} size="sm" />
            </button>
            <button
              className="lg:hidden grid place-items-center h-9 w-9 rounded-xl bg-navy-500/10 border border-navy-400/20 text-white"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-navy-400/10 bg-navy-950/80 backdrop-blur-xl px-4 py-3 grid grid-cols-3 gap-2 animate-slide-down">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl py-3 text-xs',
                  section === n.id ? 'bg-navy-500/20 text-white' : 'text-navy-100/60'
                )}
              >
                <n.icon className="h-5 w-5" />
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Dual switcher */}
      {(section === 'home' || section === 'skillmind' || section === 'shadow') && (
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <DualSwitcher mode={dualMode} onChange={(m) => {
            setDualMode(m);
            setSection(m === 'skillmind' ? 'skillmind' : 'shadow');
          }} />
        </div>
      )}

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24">{children}</main>

      {/* Footer privacy strip */}
      <footer className="relative z-10 border-t border-navy-400/10 bg-navy-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy-100/50">
          <p>ShadowMind — see yourself grow.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/70" /> Privacy-first ·{' '}
            <span className="text-emerald-300/70">Institution Verified</span> · {profile?.institution}
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Home;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-all',
        active ? 'text-white' : 'text-navy-100/60 hover:text-white'
      )}
    >
      {active && <span className="absolute inset-0 rounded-xl bg-navy-500/20 border border-navy-400/30 shadow-glow-sm" />}
      <Icon className="relative h-4 w-4" />
      <span className="relative">{label}</span>
    </button>
  );
}

function DualSwitcher({
  mode,
  onChange,
}: {
  mode: 'skillmind' | 'shadow';
  onChange: (m: 'skillmind' | 'shadow') => void;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex p-1.5 rounded-2xl bg-navy-900/60 border border-navy-400/20 backdrop-blur-xl">
        {(['skillmind', 'shadow'] as const).map((m) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={cn(
              'relative z-10 px-5 sm:px-8 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all',
              mode === m ? 'text-white' : 'text-navy-100/50 hover:text-white'
            )}
          >
            {m === 'skillmind' ? 'SkillMind' : 'Shadow'}
            {mode === m && (
              <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 shadow-glow-sm" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
