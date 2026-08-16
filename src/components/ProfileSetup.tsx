import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui';
import { ArrowLeft, ArrowRight, Check, Brain, Sparkles, UserRound } from 'lucide-react';
import type { UserProfile } from '@/data/types';
import { cn } from '@/lib/utils';

const STEPS = ['Identity', 'Study', 'Goals & Skills', 'Preferences'] as const;

const SKILL_OPTIONS = [
  'Python', 'React', 'TensorFlow', 'Data Analysis', 'Git', 'Java', 'C++', 'Figma', 'Node', 'PyTorch', 'SQL', 'AWS',
];
const IMPROVE_OPTIONS = ['DSA', 'Time Management', 'Communication', 'System Design', 'Machine Learning', 'Leadership'];
const PREF_OPTIONS = ['Hands-on projects', 'Visual explanations', 'Spaced repetition', 'Pair learning', 'Reading', 'Video tutorials'];
const LEVEL_OPTIONS = [
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  '1st Year, B.Tech',
  '2nd Year, B.Tech',
  '3rd Year, B.Tech',
  '4th Year, B.Tech',
  'Masters',
];

export function ProfileSetup() {
  const { completeProfile } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(LEVEL_OPTIONS[8]);
  const [goals, setGoals] = useState<string[]>(['Land a top-tier software internship']);
  const [skills, setSkills] = useState<string[]>(['Python', 'React']);
  const [improve, setImprove] = useState<string[]>(['DSA', 'Time Management']);
  const [prefs, setPrefs] = useState<string[]>(['Hands-on projects', 'Visual explanations']);
  const [currentGoals, setCurrentGoals] = useState<string[]>([
    'Solve 40 DSA problems this month',
    'Lead one team project end-to-end',
  ]);
  const [generating, setGenerating] = useState(false);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const canNext = useMemo(() => {
    if (step === 0) return name.trim().length > 1;
    if (step === 1) return level.length > 0;
    if (step === 2) return skills.length > 0 && improve.length > 0;
    return prefs.length > 0;
  }, [step, name, level, skills, improve, prefs]);

  const finish = () => {
    setGenerating(true);
    setTimeout(() => {
      const profile: UserProfile = {
        name: name.trim() || 'Aarav Mehta',
        levelOfStudy: level,
        academicGoals: goals,
        skills,
        improveAreas: improve,
        learningPrefs: prefs,
        currentGoals,
        shadowId: 'SM-' + Math.floor(1000 + Math.random() * 9000),
        institution: 'Northgate Institute of Technology',
      };
      completeProfile(profile);
    }, 2200);
  };

  if (generating) return <GeneratingAvatar name={name || 'Aarav Mehta'} />;

  return (
    <div className="min-h-screen app-bg px-4 py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-radial-glow opacity-60" />
      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-navy-500 to-navy-800 border border-navy-400/30">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-white tracking-wide">Build your profile</p>
            <p className="text-xs text-navy-100/60">One profile powers SkillMind + Shadow</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  'h-8 w-8 rounded-full grid place-items-center text-xs font-bold border transition-all',
                  i < step && 'bg-navy-500/30 border-navy-400 text-white',
                  i === step && 'bg-navy-500 border-navy-300 text-white shadow-glow-sm',
                  i > step && 'bg-navy-900/60 border-navy-400/20 text-navy-100/40'
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  'text-xs hidden sm:block',
                  i === step ? 'text-white font-medium' : 'text-navy-100/50'
                )}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-navy-400/20 mx-1 hidden sm:block">
                  <div
                    className="h-full bg-navy-400 transition-all duration-500"
                    style={{ width: i < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="glass p-6 sm:p-8 animate-slide-up" key={step}>
          {step === 0 && (
            <div className="space-y-5">
              <Field label="What should we call you?">
                <input
                  className="field"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Field>
              <p className="text-xs text-navy-100/50 flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5" /> Your real name stays private. Others see your Shadow ID.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <Field label="Level of study">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LEVEL_OPTIONS.map((l) => (
                    <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                      {l}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Academic goals (optional)">
                <input
                  className="field"
                  placeholder="e.g. Land a software internship"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      e.preventDefault();
                      setGoals([...goals, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {goals.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-2 rounded-lg bg-navy-500/15 border border-navy-400/25 px-3 py-1.5 text-xs text-navy-100"
                    >
                      {g}
                      <button
                        onClick={() => setGoals(goals.filter((x) => x !== g))}
                        className="text-navy-100/50 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field label="Skills you bring">
                <Chips options={SKILL_OPTIONS} selected={skills} onToggle={(v) => toggle(skills, setSkills, v)} />
              </Field>
              <Field label="Areas you want to improve">
                <Chips options={IMPROVE_OPTIONS} selected={improve} onToggle={(v) => toggle(improve, setImprove, v)} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Field label="How do you learn best?">
                <Chips options={PREF_OPTIONS} selected={prefs} onToggle={(v) => toggle(prefs, setPrefs, v)} />
              </Field>
              <Field label="Current goals">
                <div className="space-y-2">
                  {currentGoals.map((g, i) => (
                    <input
                      key={i}
                      className="field"
                      value={g}
                      onChange={(e) => {
                        const next = [...currentGoals];
                        next[i] = e.target.value;
                        setCurrentGoals(next);
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setCurrentGoals([...currentGoals, ''])}
                    className="text-xs text-navy-300 hover:text-white"
                  >
                    + Add goal
                  </button>
                </div>
              </Field>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => (step === 0 ? null : setStep(step - 1))}
              className={cn(step === 0 && 'opacity-0 pointer-events-none')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => canNext && setStep(step + 1)} disabled={!canNext}>
                Continue <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={finish}>
                <Sparkles className="h-4 w-4 mr-1" /> Generate my avatar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-3">{label}</label>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border px-3 py-2.5 text-sm text-left transition-all',
        active
          ? 'bg-navy-500/25 border-navy-400/50 text-white shadow-glow-sm'
          : 'bg-navy-900/40 border-navy-400/15 text-navy-100/70 hover:border-navy-400/35'
      )}
    >
      {children}
    </button>
  );
}

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
              active
                ? 'bg-navy-500/25 border-navy-400/50 text-white'
                : 'bg-navy-900/40 border-navy-400/15 text-navy-100/60 hover:border-navy-400/35'
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function GeneratingAvatar({ name }: { name: string }) {
  const lines = [
    'Reading your signals…',
    'Mapping your growth edges…',
    'Calibrating your Shadow ID…',
    'Materializing your avatar…',
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(lines.length - 1, x + 1)), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen app-bg grid place-items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-radial-glow opacity-70" />
      <div className="relative flex flex-col items-center text-center animate-scale-in">
        <div className="relative grid place-items-center h-32 w-32 rounded-3xl bg-gradient-to-br from-navy-500/50 to-navy-800/70 border border-navy-400/40 shadow-glow animate-glow-pulse">
          <div className="absolute inset-0 rounded-3xl border-2 border-navy-400/30 border-t-navy-300 animate-spin-slow" />
          <Brain className="h-12 w-12 text-white" />
        </div>
        <p className="mt-8 font-display text-xl font-bold text-white">Hello, {name.split(' ')[0]}.</p>
        <p className="mt-2 text-sm text-navy-100/70 min-h-[1.25rem] transition-all">{lines[i]}</p>
        <div className="mt-6 h-1 w-48 rounded-full bg-navy-900/70 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-navy-400 to-accent-400 animate-shimmer" style={{ width: `${((i + 1) / lines.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
