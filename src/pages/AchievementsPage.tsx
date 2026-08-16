import { useApp } from '@/context/AppContext';
import { Avatar, Card, Pill, ProgressBar, SectionTitle, Stat } from '@/components/ui';
import { avatarStages } from '@/data/mockData';
import {
  Award,
  CalendarCheck,
  Crown,
  Hammer,
  HandHeart,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  Sprout: Sparkles,
  CalendarCheck,
  Users,
  Hammer,
  Crown,
  Lightbulb,
  Trophy,
  Star,
  Network,
};

const LEVELS = ['Explorer', 'Learner', 'Builder', 'Achiever', 'Innovator', 'Mentor'] as const;

export function AchievementsPage() {
  const { badges, credits, avatarStage, mentorUnlocked, weakAreas } = useApp();
  const earned = badges.filter((b) => b.earnedDate);
  const locked = badges.filter((b) => !b.earnedDate);

  const currentStageIdx = avatarStages.findIndex((s) => s.stage === avatarStage);
  const nextStage = avatarStages[currentStageIdx + 1];
  const stageProgress = nextStage
    ? Math.min(100, Math.round(((credits - avatarStages[currentStageIdx].threshold) / (nextStage.threshold - avatarStages[currentStageIdx].threshold)) * 100))
    : 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-2">Achievements</p>
        <h1 className="font-display text-3xl font-bold text-white">Your growth, made visible.</h1>
        <p className="mt-2 text-navy-100/70 max-w-2xl">Badges, avatar evolution, and Shadow Credits — every signal of progress in one place.</p>
      </div>

      {/* Credits + level */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/15 blur-2xl" />
          <p className="text-xs uppercase tracking-wider text-navy-100/60 mb-2">Shadow Credits</p>
          <p className="font-display text-4xl font-bold text-white">{credits.toLocaleString()} <span className="text-base text-navy-300">SC</span></p>
          <Pill tone="green" className="mt-3"><Sparkles className="h-3.5 w-3.5" /> +180 this week</Pill>
          <div className="mt-4 text-xs text-navy-100/60 space-y-1">
            <p>Earned for: goals, consistency, milestones, collaboration, helping peers.</p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <SectionTitle eyebrow="Level" title="Credit Levels" />
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {LEVELS.map((l, i) => {
              const reached = credits >= [0, 150, 400, 800, 1400, 2200][i];
              const isCurrent = l === avatarStage || (l === 'Mentor' && avatarStage === 'Legacy');
              return (
                <div
                  key={l}
                  className={cn(
                    'shrink-0 rounded-xl border px-4 py-3 text-center min-w-[100px]',
                    reached ? 'bg-navy-500/15 border-navy-400/35' : 'bg-navy-900/40 border-navy-400/15',
                    isCurrent && 'ring-2 ring-navy-400/50 shadow-glow-sm'
                  )}
                >
                  <p className={cn('text-sm font-bold', reached ? 'text-white' : 'text-navy-100/40')}>{l}</p>
                  <p className="text-[10px] text-navy-100/50 mt-0.5">{[0, 150, 400, 800, 1400, 2200][i]} SC</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Avatar Evolution */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-navy-400/20 blur-3xl" />
        <SectionTitle eyebrow="Evolve" title="Avatar Evolution" desc="Your avatar grows with real progress. Mastery drives evolution." />
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar stage={avatarStage} size="xl" className="animate-floaty" />
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-display text-2xl font-bold text-white">{avatarStage}</p>
                <p className="text-sm text-navy-100/60">{avatarStages[currentStageIdx]?.blurb}</p>
              </div>
              {nextStage && (
                <div className="text-right">
                  <p className="text-xs text-navy-100/50">Next</p>
                  <p className="font-display font-bold text-navy-200">{nextStage.stage}</p>
                </div>
              )}
            </div>
            {nextStage ? (
              <div>
                <div className="flex justify-between text-xs text-navy-100/60 mb-1">
                  <span>Progress to {nextStage.stage}</span>
                  <span>{stageProgress}% · {Math.max(0, nextStage.threshold - credits)} SC to go</span>
                </div>
                <ProgressBar value={stageProgress} glow />
              </div>
            ) : (
              <Pill tone="green"><Crown className="h-3.5 w-3.5" /> Legacy stage reached</Pill>
            )}

            {/* Stage track */}
            <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1">
              {avatarStages.map((s, i) => {
                const reached = credits >= s.threshold;
                return (
                  <div key={s.stage} className="flex items-center gap-1.5 shrink-0">
                    <div className={cn('h-7 w-7 rounded-full grid place-items-center text-[10px] font-bold border', reached ? 'bg-navy-500/30 border-navy-400/50 text-white' : 'bg-navy-900/50 border-navy-400/15 text-navy-100/30')}>
                      {i + 1}
                    </div>
                    <span className={cn('text-xs', reached ? 'text-white' : 'text-navy-100/30')}>{s.stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Mentor Mode */}
      <Card className={cn('relative overflow-hidden', mentorUnlocked ? 'border-emerald-400/30' : 'border-navy-400/15 opacity-90')}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="flex items-start gap-4">
          <div className={cn('grid place-items-center h-12 w-12 rounded-2xl border shrink-0', mentorUnlocked ? 'bg-emerald-500/15 border-emerald-400/40' : 'bg-navy-500/15 border-navy-400/30')}>
            <HandHeart className={cn('h-6 w-6', mentorUnlocked ? 'text-emerald-300' : 'text-navy-200')} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-display font-bold text-white text-lg">Mentor Mode</p>
              {mentorUnlocked ? <Pill tone="green"><ShieldCheck className="h-3.5 w-3.5" /> Unlocked</Pill> : <Pill tone="navy">Locked</Pill>}
            </div>
            <p className="text-sm text-navy-100/80 italic leading-relaxed">
              "You started by looking for help. You grew enough to become someone else's help."
            </p>
            {!mentorUnlocked && (
              <p className="text-xs text-navy-100/60 mt-2">
                Master 2 weak areas to unlock Mentor Mode and help peers in skills you have mastered. ({weakAreas.filter((w) => w.mastered).length}/2 mastered)
              </p>
            )}
            {mentorUnlocked && (
              <p className="text-xs text-emerald-300/80 mt-2">
                You can now offer mentorship in your mastered areas. Visit the Collaboration area to help peers.
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Badge Cabinet */}
      <Card>
        <SectionTitle eyebrow="Collect" title="Badge Cabinet" desc={`${earned.length} of ${badges.length} earned`} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((b) => {
            const Icon = ICONS[b.icon] || Award;
            const isEarned = !!b.earnedDate;
            return (
              <div
                key={b.id}
                className={cn(
                  'rounded-2xl border p-5 text-center transition-all',
                  isEarned
                    ? 'bg-gradient-to-br from-navy-500/15 to-navy-800/20 border-navy-400/35 glass-hover'
                    : 'bg-navy-900/40 border-navy-400/10',
                  isEarned && b.glow && 'shadow-glow-sm'
                )}
              >
                <div
                  className={cn(
                    'mx-auto grid place-items-center h-16 w-16 rounded-2xl border mb-3',
                    isEarned ? 'bg-gradient-to-br from-amber-400/25 to-amber-600/15 border-amber-400/40' : 'bg-navy-900/60 border-navy-400/15 grayscale opacity-50'
                  )}
                >
                  <Icon className={cn('h-8 w-8', isEarned ? 'text-amber-300' : 'text-navy-100/40')} />
                </div>
                <p className={cn('font-display font-bold text-sm', isEarned ? 'text-white' : 'text-navy-100/40')}>{b.name}</p>
                <p className={cn('text-xs mt-1 leading-relaxed', isEarned ? 'text-navy-100/70' : 'text-navy-100/30')}>{b.description}</p>
                {isEarned ? (
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <Pill tone="green"><ShieldCheck className="h-3 w-3" /> Verified</Pill>
                  </div>
                ) : (
                  <p className="mt-3 text-[10px] uppercase tracking-wider text-navy-100/30">Locked</p>
                )}
                {isEarned && <p className="text-[10px] text-navy-100/40 mt-2">Earned {b.earnedDate}</p>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Achievements summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Badges Earned" value={`${earned.length}/${badges.length}`} icon={<Award className="h-4 w-4" />} tone="amber" />
        <Stat label="Mastered Areas" value={weakAreas.filter((w) => w.mastered).length} icon={<Crown className="h-4 w-4" />} tone="green" />
        <Stat label="Avatar Stage" value={avatarStage} icon={<Sparkles className="h-4 w-4" />} />
        <Stat label="Total Credits" value={credits.toLocaleString()} icon={<Trophy className="h-4 w-4" />} tone="sky" />
      </div>
    </div>
  );
}
