import { useApp } from '@/context/AppContext';
import { Avatar, Button, Card, Pill, ProgressBar, SectionTitle, Stat } from '@/components/ui';
import { monthlyRecognition, peerFeed } from '@/data/mockData';
import {
  Award,
  CalendarCheck,
  Crown,
  GraduationCap,
  HandHeart,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

export function InstitutionPage() {
  const { projects, profile, credits, avatarStage } = useApp();
  const activeProjects = projects.filter((p) => p.status === 'active');
  const totalMembers = projects.reduce((a, p) => a + p.team.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-2">Institution Recognition</p>
        <h1 className="font-display text-3xl font-bold text-white">Northgate Institute of Technology</h1>
        <p className="mt-2 text-navy-100/70 max-w-2xl">
          Growth that is seen — not just scored. Recognition rewards improvement, consistency, collaboration, and contribution.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="green"><GraduationCap className="h-3.5 w-3.5" /> Institution Verified</Pill>
          <Pill tone="navy"><Users className="h-3.5 w-3.5" /> 1,284 students</Pill>
        </div>
      </div>

      {/* Analytics stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Avg Growth" value="+24%" sub="this month" icon={<TrendingUp className="h-4 w-4" />} tone="green" />
        <Stat label="Engagement" value="81%" sub="active learners" icon={<Zap className="h-4 w-4" />} tone="sky" />
        <Stat label="Active Projects" value={activeProjects.length} sub={`${totalMembers} contributors`} icon={<Users className="h-4 w-4" />} />
        <Stat label="Badges Issued" value="3,142" sub="this semester" icon={<Award className="h-4 w-4" />} tone="amber" />
      </div>

      {/* Improvement trend chart (mock) */}
      <Card>
        <SectionTitle eyebrow="Trends" title="Improvement Trends" desc="Aggregate student growth across the institution." />
        <div className="flex items-end gap-2 sm:gap-3 h-44">
          {[40, 52, 48, 61, 58, 70, 66, 78, 74, 86, 82, 94].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="w-full rounded-t-lg bg-gradient-to-t from-navy-600/40 to-navy-400/70 transition-all group-hover:to-accent-400" style={{ height: `${v}%` }} />
              <span className="text-[9px] text-navy-100/40">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-navy-100/50 mt-3">
          <span>12-month improvement index</span>
          <span className="text-emerald-300">+54% YoY</span>
        </div>
      </Card>

      {/* Monthly recognition */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />
        <SectionTitle
          eyebrow="Contribute"
          title="Monthly Recognition"
          desc="Weighted: 30% improvement · 25% consistency · 25% collaboration · 20% project contribution — not marks alone."
        />
        <div className="grid md:grid-cols-3 gap-4">
          {monthlyRecognition.map((r) => {
            const isYou = r.shadowId === profile?.shadowId;
            const tone = r.rank === 1 ? 'amber' : r.rank === 2 ? 'sky' : 'navy';
            const RankIcon = r.rank === 1 ? Crown : r.rank === 2 ? Star : Award;
            return (
              <div
                key={r.rank}
                className={`rounded-2xl border p-5 relative ${isYou ? 'border-navy-400/50 bg-navy-500/10 shadow-glow-sm' : 'border-navy-400/15 bg-navy-900/40'}`}
              >
                {isYou && <Pill tone="green" className="absolute top-3 right-3">You</Pill>}
                <div className={`grid place-items-center h-10 w-10 rounded-xl mb-2 ${r.rank === 1 ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300' : r.rank === 2 ? 'bg-sky-400/20 border border-sky-400/40 text-sky-300' : 'bg-navy-500/20 border border-navy-400/30 text-navy-200'}`}>
                  <RankIcon className="h-5 w-5" />
                </div>
                <p className={`font-display font-bold text-sm uppercase tracking-wide ${r.rank === 1 ? 'text-amber-300' : r.rank === 2 ? 'text-sky-300' : 'text-navy-200'}`}>{r.title}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Avatar stage={r.rank === 1 ? 'Innovator' : r.rank === 2 ? 'Achiever' : 'Achiever'} size="sm" />
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-navy-100/50">{r.shadowId}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-navy-100/60">Improvement (30%)</span><span className="text-white">{r.breakdown.improvement}</span></div>
                  <ProgressBar value={(r.breakdown.improvement / 300) * 100} />
                  <div className="flex justify-between text-xs"><span className="text-navy-100/60">Consistency (25%)</span><span className="text-white">{r.breakdown.consistency}</span></div>
                  <ProgressBar value={(r.breakdown.consistency / 250) * 100} />
                  <div className="flex justify-between text-xs"><span className="text-navy-100/60">Collaboration (25%)</span><span className="text-white">{r.breakdown.collaboration}</span></div>
                  <ProgressBar value={(r.breakdown.collaboration / 250) * 100} />
                  <div className="flex justify-between text-xs"><span className="text-navy-100/60">Project (20%)</span><span className="text-white">{r.breakdown.project}</span></div>
                  <ProgressBar value={(r.breakdown.project / 200) * 100} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-navy-400/15 pt-3">
                  <span className="text-xs text-navy-100/50">Total score</span>
                  <span className="font-display font-bold text-white">{r.score}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="amber"><Trophy className="h-3.5 w-3.5" /> ShadowMind Champion</Pill>
          <Pill tone="sky"><Star className="h-3.5 w-3.5" /> Rising Star</Pill>
          <Pill tone="navy"><Users className="h-3.5 w-3.5" /> Team Builder</Pill>
          <span className="text-xs text-navy-100/50 self-center">· Top 3 receive special monthly recognition. Every student can earn digital badges.</span>
        </div>
      </Card>

      {/* Collaboration area */}
      <Card>
        <SectionTitle
          eyebrow="Collaborate"
          title="Collaboration"
          desc="Help peers, share resources, review work, and find complementary skills."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {peerFeed.map((p) => (
            <div key={p.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4 glass-hover">
              <div className="flex items-center gap-3 mb-3">
                <Avatar stage={p.avatarStage} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-navy-100/50">{p.shadowId} · {p.topic}</p>
                </div>
                <Pill tone="green">{p.matchScore}% match</Pill>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="rounded-lg bg-navy-900/60 p-2.5">
                  <p className="text-navy-100/50">Needs</p>
                  <p className="text-white">{p.need}</p>
                </div>
                <div className="rounded-lg bg-navy-900/60 p-2.5">
                  <p className="text-navy-100/50">Offers</p>
                  <p className="text-white">{p.offer}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 !py-2 !text-xs"><HandHeart className="h-3.5 w-3.5 mr-1" /> Help peer</Button>
                <Button variant="ghost" className="!py-2 !px-3 !text-xs"><Share2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-400/25 p-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-300" />
          <p className="text-xs text-emerald-200/80">Helping peers earns collaboration credits toward your monthly recognition score.</p>
        </div>
      </Card>

      {/* Your standing */}
      <Card>
        <SectionTitle eyebrow="You" title="Your Standing" />
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60">Your rank</p>
            <p className="font-display text-2xl font-bold text-white">#2</p>
            <p className="text-xs text-emerald-300 mt-1">Rising Star</p>
          </div>
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60">Improvement</p>
            <p className="font-display text-2xl font-bold text-white">292</p>
            <ProgressBar value={97} className="mt-2" />
          </div>
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60">Consistency</p>
            <p className="font-display text-2xl font-bold text-white">198</p>
            <ProgressBar value={79} className="mt-2" />
          </div>
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60">Collaboration</p>
            <p className="font-display text-2xl font-bold text-white">178</p>
            <ProgressBar value={71} className="mt-2" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-navy-100/60">
          <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" /> Recognition resets monthly · {credits.toLocaleString()} SC · {avatarStage} stage
        </div>
      </Card>
    </div>
  );
}
