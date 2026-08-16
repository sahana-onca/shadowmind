import { useApp } from '@/context/AppContext';
import { Avatar, Card, Pill, ProgressBar, SectionTitle } from '@/components/ui';
import {
  Brain,
  GraduationCap,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { avatarStages } from '@/data/mockData';

export function ProfilePage() {
  const { profile, credits, avatarStage, badges, weakAreas, goals, mentorUnlocked, setSection } = useApp();
  if (!profile) return null;

  const earned = badges.filter((b) => b.earnedDate);
  const currentStageIdx = avatarStages.findIndex((s) => s.stage === avatarStage);
  const nextStage = avatarStages[currentStageIdx + 1];

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar stage={avatarStage} size="xl" className="animate-floaty" />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h1 className="font-display text-3xl font-bold text-white">{profile.name}</h1>
              <Pill tone="sky"><ShieldCheck className="h-3.5 w-3.5" /> {profile.shadowId}</Pill>
            </div>
            <p className="text-navy-100/70 mt-1 flex items-center justify-center sm:justify-start gap-2">
              <GraduationCap className="h-4 w-4" /> {profile.levelOfStudy}
            </p>
            <p className="text-xs text-navy-100/50 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/70" /> {profile.institution} · Institution Verified
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
              <Pill tone="amber"><Sparkles className="h-3.5 w-3.5" /> {credits.toLocaleString()} SC</Pill>
              <Pill tone="navy"><Brain className="h-3.5 w-3.5" /> {avatarStage}</Pill>
              <Pill tone="green"><Trophy className="h-3.5 w-3.5" /> {earned.length} badges</Pill>
              {mentorUnlocked && <Pill tone="green"><HandHeart className="h-3.5 w-3.5" /> Mentor</Pill>}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar stage track */}
      <Card>
        <SectionTitle eyebrow="Evolve" title="Avatar Stage" />
        <div className="flex items-center gap-6">
          <Avatar stage={avatarStage} size="lg" />
          <div className="flex-1">
            <p className="font-display text-xl font-bold text-white">{avatarStage}</p>
            <p className="text-sm text-navy-100/60">{avatarStages[currentStageIdx]?.blurb}</p>
            {nextStage && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-navy-100/60 mb-1">
                  <span>To {nextStage.stage}</span>
                  <span>{Math.max(0, nextStage.threshold - credits)} SC</span>
                </div>
                <ProgressBar value={Math.min(100, ((credits - avatarStages[currentStageIdx].threshold) / (nextStage.threshold - avatarStages[currentStageIdx].threshold)) * 100)} glow />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Skills + improvement */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <SectionTitle eyebrow="Strengths" title="Skills" />
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <Pill key={s} tone="navy"><Zap className="h-3.5 w-3.5" /> {s}</Pill>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-wider text-navy-300/70 mb-2">Academic goals</p>
            <ul className="space-y-2">
              {profile.academicGoals.map((g) => (
                <li key={g} className="flex items-center gap-2 text-sm text-navy-100/85">
                  <Target className="h-4 w-4 text-navy-300 shrink-0" /> {g}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Edges" title="Areas to Improve" />
          <div className="space-y-3">
            {weakAreas.map((w) => (
              <div key={w.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{w.name}</span>
                  <Pill tone={w.mastered ? 'green' : 'navy'}>{w.mastered ? 'Mastered' : `Level ${w.level}`}</Pill>
                </div>
                <ProgressBar value={w.level} glow={w.level >= 80} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Learning prefs + current goals */}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <SectionTitle eyebrow="How you learn" title="Learning Preferences" />
          <div className="flex flex-wrap gap-2">
            {profile.learningPrefs.map((p) => (
              <Pill key={p} tone="sky">{p}</Pill>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle eyebrow="Now" title="Current Goals" action={<button onClick={() => setSection('skillmind')} className="text-xs text-navy-300 hover:text-white">Open SkillMind</button>} />
          <div className="space-y-2">
            {goals.map((g) => (
              <div key={g.id} className="flex items-center gap-3 rounded-xl bg-navy-900/40 border border-navy-400/15 p-3">
                <Target className={`h-4 w-4 shrink-0 ${g.done ? 'text-emerald-400' : 'text-navy-300'}`} />
                <span className={`text-sm flex-1 ${g.done ? 'text-navy-100/50 line-through' : 'text-white'}`}>{g.title}</span>
                <span className="text-xs text-navy-100/60">{g.progress}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements grid */}
      <Card>
        <SectionTitle eyebrow="Showcase" title="Badges" action={<button onClick={() => setSection('achievements')} className="text-xs text-navy-300 hover:text-white">Badge Cabinet</button>} />
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {badges.map((b) => {
            const earnedBadge = !!b.earnedDate;
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-3 text-center ${earnedBadge ? 'bg-navy-500/15 border-navy-400/30' : 'bg-navy-900/40 border-navy-400/10 opacity-40'}`}
              >
                <p className="text-xs font-semibold text-white truncate">{b.name}</p>
                <p className="text-[10px] text-navy-100/50 mt-1">{earnedBadge ? b.earnedDate : 'Locked'}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Privacy */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
        <div className="flex items-start gap-4">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 shrink-0">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <p className="font-display font-bold text-white">Your privacy</p>
            <p className="text-sm text-navy-100/70 mt-1">
              Others see your <span className="text-white">Shadow ID</span> ({profile.shadowId}) and avatar — not personal details. Growth data is shared with your institution only in aggregate.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Pill tone="green"><ShieldCheck className="h-3.5 w-3.5" /> Institution Verified</Pill>
              <Pill tone="navy"><Users className="h-3.5 w-3.5" /> Aggregate-only sharing</Pill>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
