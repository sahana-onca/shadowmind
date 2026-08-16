import { useApp } from '@/context/AppContext';
import { Button, Card, Pill, ProgressBar, SectionTitle, Stat } from '@/components/ui';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Crown,
  Lightbulb,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

export function SkillMindPage() {
  const { profile, weakAreas, goals, insights, riskSignals, completeGoal, nudgeWeakArea, credits } = useApp();
  const firstName = profile?.name.split(' ')[0] || 'Aarav';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-2">SkillMind</p>
        <h1 className="font-display text-3xl font-bold text-white">Personal growth intelligence for {firstName}.</h1>
        <p className="mt-2 text-navy-100/70 max-w-2xl">
          Detect friction early, understand the why, and turn weaknesses into strengths — one mastery at a time.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="navy"><Brain className="h-3.5 w-3.5" /> {weakAreas.filter((w) => !w.mastered).length} active edges</Pill>
          <Pill tone="green"><Crown className="h-3.5 w-3.5" /> {weakAreas.filter((w) => w.mastered).length} mastered</Pill>
          <Pill tone="amber"><Sparkles className="h-3.5 w-3.5" /> {credits.toLocaleString()} SC</Pill>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Active Goals" value={goals.filter((g) => !g.done).length} icon={<Target className="h-4 w-4" />} />
        <Stat label="Risk Signals" value={riskSignals.length} icon={<AlertTriangle className="h-4 w-4" />} tone="amber" />
        <Stat label="Avg Mastery" value={`${Math.round(weakAreas.reduce((a, w) => a + w.level, 0) / weakAreas.length)}%`} icon={<TrendingUp className="h-4 w-4" />} tone="green" />
        <Stat label="Insights" value={insights.length} icon={<Lightbulb className="h-4 w-4" />} tone="sky" />
      </div>

      {/* My Insights */}
      <Card>
        <SectionTitle eyebrow="Understand" title="My Insights" desc="What your patterns are telling us." />
        <div className="grid sm:grid-cols-2 gap-3">
          {insights.map((i) => {
            const tone =
              i.kind === 'strength' ? 'green' : i.kind === 'signal' ? 'amber' : i.kind === 'milestone' ? 'sky' : 'navy';
            const icon =
              i.kind === 'strength' ? <TrendingUp className="h-4 w-4" /> :
              i.kind === 'signal' ? <AlertTriangle className="h-4 w-4" /> :
              i.kind === 'milestone' ? <Crown className="h-4 w-4" /> :
              <Lightbulb className="h-4 w-4" />;
            return (
              <div key={i.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4 glass-hover">
                <Pill tone={tone as 'green' | 'amber' | 'sky' | 'navy'}>{icon} {i.kind}</Pill>
                <p className="mt-3 text-sm font-semibold text-white">{i.title}</p>
                <p className="mt-1 text-xs text-navy-100/70 leading-relaxed">{i.body}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Risk + Goals */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <SectionTitle eyebrow="Detect" title="Risk Signals" desc="Early warnings, before they become setbacks." />
          <div className="space-y-3">
            {riskSignals.map((r) => {
              const tone = r.severity === 'high' ? 'red' : r.severity === 'medium' ? 'amber' : 'green';
              return (
                <div key={r.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Pill tone={tone as 'red' | 'amber' | 'green'}>{r.severity} · {r.area}</Pill>
                    <span className={`text-xs font-semibold ${r.trend === 'up' ? 'text-emerald-300' : r.trend === 'down' ? 'text-rose-300' : 'text-navy-100/60'}`}>
                      {r.delta > 0 ? '+' : ''}{r.delta}%
                    </span>
                  </div>
                  <p className="text-sm text-navy-100/80">{r.message}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Improve" title="Goals" action={<button className="text-xs text-navy-300 hover:text-white flex items-center gap-1"><Plus className="h-3 w-3" /> New goal</button>} />
          <div className="space-y-3">
            {goals.map((g) => (
              <div key={g.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {g.done ? <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> : <Target className="h-4 w-4 text-navy-300 shrink-0" />}
                    <span className={`text-sm font-medium truncate ${g.done ? 'text-navy-100/50 line-through' : 'text-white'}`}>{g.title}</span>
                  </div>
                  <Pill tone="navy">{g.category}</Pill>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar value={g.progress} className="flex-1" glow={g.progress >= 80} />
                  <span className="text-xs text-navy-100/60 w-10 text-right">{g.progress}%</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-navy-100/60">{g.done ? 'Completed' : `${g.dueIn}d left · +${g.credits} SC`}</span>
                  {!g.done && (
                    <Button variant="ghost" className="!py-1.5 !px-3 !text-xs" onClick={() => completeGoal(g.id)}>
                      Mark done
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weak Areas — the core */}
      <Card>
        <SectionTitle
          eyebrow="Evolve"
          title="Weak Areas → Strengths"
          desc="Each area shows level, progress, and a path to mastery. Hit 100% to evolve your avatar."
        />
        <div className="grid lg:grid-cols-3 gap-4">
          {weakAreas.map((w) => (
            <div
              key={w.id}
              className={`rounded-2xl border p-5 transition-all ${
                w.mastered
                  ? 'bg-emerald-500/10 border-emerald-400/40 shadow-glow-sm'
                  : 'bg-navy-900/40 border-navy-400/15 glass-hover'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-white text-lg">{w.name}</h3>
                {w.mastered ? (
                  <Pill tone="green"><Crown className="h-3.5 w-3.5" /> Mastered</Pill>
                ) : (
                  <Pill tone="navy">Level {w.level}</Pill>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <ProgressBar value={w.level} glow={w.level >= 80} className="flex-1" />
                <span className="text-xs text-white font-semibold w-10 text-right">{w.level}%</span>
              </div>
              <div className="flex items-center justify-between text-xs text-navy-100/60 mt-1 mb-4">
                <span>Improvement +{w.improvementPct}%</span>
                <span>Progress +{w.progress} this week</span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs uppercase tracking-wider text-navy-300/70">Recommended actions</p>
                {w.recommendedActions.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-navy-100/80">
                    <Zap className="h-3.5 w-3.5 text-navy-300 mt-0.5 shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>

              {w.mastered ? (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-3 text-center">
                  <p className="text-xs text-emerald-300 font-semibold">Weakness turned into a strength.</p>
                  {w.nextFrontier && (
                    <p className="text-[11px] text-navy-100/60 mt-1">Next frontier: {w.nextFrontier}</p>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => nudgeWeakArea(w.id, w.level >= 84 ? 100 - w.level : 16)}
                >
                  {w.level >= 84 ? 'Complete mastery' : `Practice (+${w.level >= 84 ? 100 - w.level : 16}%)`}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy-400/15 blur-3xl" />
        <SectionTitle eyebrow="Predict" title="AI Recommendations" desc="What to do next, ranked by leverage." />
        <div className="space-y-3">
          <RecRow
            rank={1}
            title="Master Time Management this week"
            body="You are 32 points from mastery. Two 90-min focus sprints unlock the next avatar stage, a Skill Master badge, and +150 SC."
            action="Go"
          />
          <RecRow
            rank={2}
            title="Move your technical talk up by one week"
            body="Readiness is already at 72%. Shipping earlier frees capacity for DSA before the deadline."
            action="Reschedule"
          />
          <RecRow
            rank={3}
            title="Rebalance the NeuroTutor workload"
            body="You carry 38% of the load. Reassign the analytics dashboard to Maya to protect focus and collaboration health."
            action="Rebalance"
          />
        </div>
      </Card>
    </div>
  );
}

function RecRow({ rank, title, body, action }: { rank: number; title: string; body: string; action: string }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-navy-900/40 border border-navy-400/15 p-4 glass-hover">
      <div className="grid place-items-center h-8 w-8 rounded-lg bg-navy-500/20 text-navy-200 font-bold text-sm shrink-0">
        {rank}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-navy-100/70 mt-1 leading-relaxed">{body}</p>
      </div>
      <Button variant="ghost" className="!py-1.5 !px-3 !text-xs shrink-0">{action}</Button>
    </div>
  );
}
