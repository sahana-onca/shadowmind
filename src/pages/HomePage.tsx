import { useApp } from '@/context/AppContext';
import { Card, Pill, ProgressBar, SectionTitle, Stat, Avatar } from '@/components/ui';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Flame,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { copilotAnswer } from '@/data/mockData';

export function HomePage() {
  const { profile, credits, avatarStage, weakAreas, goals, projects, riskSignals, insights, setSection } = useApp();
  const firstName = profile?.name.split(' ')[0] || 'Aarav';
  const activeProjects = projects.filter((p) => p.status === 'active');
  const todayFocus = goals.filter((g) => !g.done).slice(0, 3);
  const pulse = 78;
  const focusScore = 64;
  const consistency = 86;
  const workload = 72;
  const growth = 23;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Student Pulse
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Welcome back, {firstName}.
            </h1>
            <p className="mt-2 text-navy-100/70 max-w-xl">
              Your signals are strong this week. One risk flag needs attention — your project workload is tilting.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="green"><CheckCircle2 className="h-3.5 w-3.5" /> Consistency 14 days</Pill>
              <Pill tone="amber"><AlertTriangle className="h-3.5 w-3.5" /> 1 risk signal</Pill>
              <Pill tone="sky"><ShieldCheck className="h-3.5 w-3.5" /> {profile?.shadowId}</Pill>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Avatar stage={avatarStage} size="xl" className="animate-floaty" />
            <div>
              <p className="text-xs uppercase tracking-wider text-navy-100/60">Avatar Stage</p>
              <p className="font-display text-xl font-bold text-white">{avatarStage}</p>
              <p className="text-xs text-navy-100/60">{(2200 - credits) > 0 ? `${2200 - credits} SC to Legacy` : 'Legacy reached'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        <Stat label="Student Pulse" value={`${pulse}`} sub="of 100" icon={<Activity className="h-4 w-4" />} />
        <Stat label="Focus" value={`${focusScore}`} sub="morning-dominant" icon={<Target className="h-4 w-4" />} tone="sky" />
        <Stat label="Consistency" value={`${consistency}%`} sub="14-day streak" icon={<Flame className="h-4 w-4" />} tone="green" />
        <Stat label="Workload" value={`${workload}%`} sub="tilting high" icon={<Zap className="h-4 w-4" />} tone="amber" />
        <Stat label="Growth" value={`+${growth}%`} sub="this month" icon={<TrendingUp className="h-4 w-4" />} tone="green" />
      </div>

      {/* Today's focus + Early signals */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Today" title="Today's Focus" desc="AI-ranked by leverage on your goals." />
          <div className="space-y-3">
            {todayFocus.map((g) => (
              <div key={g.id} className="flex items-center gap-4 rounded-xl bg-navy-900/40 border border-navy-400/15 p-3.5">
                <div className="grid place-items-center h-9 w-9 rounded-lg bg-navy-500/20 text-navy-200 shrink-0">
                  <Target className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{g.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <ProgressBar value={g.progress} className="flex-1" />
                    <span className="text-xs text-navy-100/60 w-10 text-right">{g.progress}%</span>
                  </div>
                </div>
                <Pill tone="navy">{g.dueIn}d</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Detect" title="Early Signals" />
          <div className="space-y-3">
            {riskSignals.map((r) => {
              const tone = r.severity === 'high' ? 'red' : r.severity === 'medium' ? 'amber' : 'green';
              return (
                <div key={r.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <Pill tone={tone}>{r.area}</Pill>
                    <span className={cnTone(r.trend)}>
                      {r.delta > 0 ? '+' : ''}{r.delta}%
                    </span>
                  </div>
                  <p className="text-xs text-navy-100/70 leading-relaxed">{r.message}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Growth summary + Active projects */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <SectionTitle
            eyebrow="Understand"
            title="Growth Summary"
            desc="Where your energy is moving the needle."
            action={<button onClick={() => setSection('skillmind')} className="text-xs text-navy-300 hover:text-white flex items-center gap-1">Open SkillMind <ArrowRight className="h-3 w-3" /></button>}
          />
          <div className="grid sm:grid-cols-3 gap-3">
            {weakAreas.map((w) => (
              <div key={w.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{w.name}</span>
                  <span className="text-xs text-emerald-300">+{w.improvementPct}%</span>
                </div>
                <ProgressBar value={w.level} glow={w.level >= 80} />
                <p className="text-xs text-navy-100/60 mt-2">Level {w.level}{w.mastered ? ' · Mastered' : ''}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle
            eyebrow="Shadow"
            title="Active Projects"
            action={<button onClick={() => setSection('shadow')} className="text-xs text-navy-300 hover:text-white flex items-center gap-1">All <ArrowRight className="h-3 w-3" /></button>}
          />
          <div className="space-y-3">
            {activeProjects.map((p) => (
              <div key={p.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white flex items-center gap-2"><Layers className="h-4 w-4 text-navy-300" /> {p.name}</span>
                  <span className="text-xs text-navy-100/60">{p.team.length} members</span>
                </div>
                <ProgressBar value={p.progress} />
                <p className="text-xs text-navy-100/60 mt-2">{p.progress}% · {p.dueIn}d left</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Shadow credits + Avatar + AI insight */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl" />
          <p className="text-xs uppercase tracking-wider text-navy-100/60 mb-2">Shadow Credits</p>
          <p className="font-display text-4xl font-bold text-white">{credits.toLocaleString()} <span className="text-base text-navy-300">SC</span></p>
          <Pill tone="green" className="mt-3"><TrendingUp className="h-3.5 w-3.5" /> +180 this week</Pill>
          <div className="mt-4 text-xs text-navy-100/60 space-y-1">
            <p>Earned from: goals, consistency, milestones, collaboration.</p>
            <p>Level: <span className="text-white font-semibold">{avatarStage}</span> · {Math.max(0, 1400 - credits)} SC to Innovator</p>
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Evolve" title="Current Avatar Stage" />
          <div className="flex items-center gap-4">
            <Avatar stage={avatarStage} size="lg" />
            <div className="flex-1">
              <p className="font-display text-xl font-bold text-white">{avatarStage}</p>
              <p className="text-xs text-navy-100/60 mt-1">{avatarStage === 'Legacy' ? 'You leave the trail others follow.' : 'Keep mastering to evolve.'}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-navy-100/60 mb-1">
                  <span>Progress to next stage</span>
                  <span>{Math.min(100, Math.round(((credits - 400) / (800 - 400)) * 100))}%</span>
                </div>
                <ProgressBar value={Math.min(100, ((credits - 400) / (800 - 400)) * 100)} glow />
              </div>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-400/20 blur-2xl" />
          <div className="flex items-center gap-2 mb-3">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-navy-500/40 to-navy-700/30 border border-navy-400/30">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <p className="font-display font-bold text-white">AI Copilot — top insight</p>
          </div>
          <p className="text-sm text-navy-100/80 leading-relaxed">
            {copilotAnswer('What should I focus on today?', { name: firstName, weakAreas, projects, credits })}
          </p>
          <button onClick={() => setSection('skillmind')} className="mt-4 text-xs text-navy-300 hover:text-white flex items-center gap-1">
            Open SkillMind <ArrowRight className="h-3 w-3" />
          </button>
        </Card>
      </div>
    </div>
  );
}

function cnTone(trend: 'up' | 'down' | 'flat') {
  if (trend === 'up') return 'text-xs font-semibold text-emerald-300';
  if (trend === 'down') return 'text-xs font-semibold text-rose-300';
  return 'text-xs font-semibold text-navy-100/60';
}
