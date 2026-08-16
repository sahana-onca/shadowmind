import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';
import { Brain, ShieldCheck, Sparkles } from 'lucide-react';

type Mode = 'login' | 'signup';

export function AuthScreen() {
  const { setPhase } = useApp();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('profile-setup');
  };

  return (
    <div className="min-h-screen app-bg flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-radial-glow opacity-70" />

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-800 border border-navy-400/30 shadow-glow animate-glow-pulse">
            <Brain className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-[0.15em] text-white">
            Shadow<span className="text-navy-300">Mind</span>
          </h1>
          <p className="mt-2 text-sm text-navy-100/70 text-center">
            See yourself grow.
          </p>
        </div>

        <div className="glass p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-navy-900/60 border border-navy-400/15 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                mode === 'login' ? 'bg-navy-500/30 text-white shadow-glow-sm' : 'text-navy-100/60'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                mode === 'signup' ? 'bg-navy-500/30 text-white shadow-glow-sm' : 'text-navy-100/60'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <div className="animate-slide-down">
                <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">
                  Full name
                </label>
                <input
                  className="field"
                  placeholder="Aarav Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">
                Email
              </label>
              <input
                type="email"
                className="field"
                placeholder="you@institute.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">
                Password
              </label>
              <input
                type="password"
                className="field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {mode === 'login' ? 'Enter ShadowMind' : 'Create your profile'}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-navy-100/50">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Privacy-first
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered growth
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-navy-100/40">
          Institution Verified · Northgate Institute of Technology
        </p>
      </div>
    </div>
  );
}
