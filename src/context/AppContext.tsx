import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultProfile,
  initialBadges,
  initialGoals,
  initialInsights,
  initialProjects,
  initialRiskSignals,
  initialWeakAreas,
  joinableProjects as seedJoinable,
} from '@/data/mockData';
import type {
  AvatarStage,
  Badge,
  Goal,
  Insight,
  Project,
  RiskSignal,
  UserProfile,
  WeakArea,
} from '@/data/types';

export type Phase = 'opening' | 'auth' | 'profile-setup' | 'app';
export type Section = 'home' | 'skillmind' | 'shadow' | 'achievements' | 'profile' | 'institution';
export type DualMode = 'skillmind' | 'shadow';

interface MasteryEvent {
  areaName: string;
  badgeName: string;
  credits: number;
  nextFrontier: string;
}

interface EvolveEvent {
  fromStage: AvatarStage;
  toStage: AvatarStage;
}

interface AppState {
  phase: Phase;
  section: Section;
  dualMode: DualMode;
  profile: UserProfile | null;
  weakAreas: WeakArea[];
  goals: Goal[];
  badges: Badge[];
  projects: Project[];
  joinable: Project[];
  insights: Insight[];
  riskSignals: RiskSignal[];
  credits: number;
  avatarStage: AvatarStage;
  masteryEvent: MasteryEvent | null;
  evolveEvent: EvolveEvent | null;
  mentorUnlocked: boolean;

  setPhase: (p: Phase) => void;
  setSection: (s: Section) => void;
  setDualMode: (m: DualMode) => void;
  completeProfile: (p: UserProfile) => void;
  completeGoal: (id: string) => void;
  nudgeWeakArea: (id: string, amount?: number) => void;
  acceptFrontier: (id: string) => void;
  createProject: (p: Project) => void;
  joinProject: (id: string) => void;
  archiveProject: (id: string) => void;
  addBadge: (b: Badge) => void;
  awardCredits: (n: number) => void;
  clearMasteryEvent: () => void;
  clearEvolveEvent: () => void;
}

const AppContext = createContext<AppState | null>(null);

const STAGE_ORDER: AvatarStage[] = ['Starter', 'Explorer', 'Builder', 'Achiever', 'Innovator', 'Legacy'];
const STAGE_THRESHOLDS = [0, 150, 400, 800, 1400, 2200];

function stageForCredits(credits: number): AvatarStage {
  let stage: AvatarStage = 'Starter';
  for (let i = 0; i < STAGE_THRESHOLDS.length; i++) {
    if (credits >= STAGE_THRESHOLDS[i]) stage = STAGE_ORDER[i];
  }
  return stage;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('opening');
  const [section, setSection] = useState<Section>('home');
  const [dualMode, setDualMode] = useState<DualMode>('skillmind');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>(initialWeakAreas);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [joinable, setJoinable] = useState<Project[]>(seedJoinable);
  const [insights] = useState<Insight[]>(initialInsights);
  const [riskSignals] = useState<RiskSignal[]>(initialRiskSignals);
  const [credits, setCredits] = useState(560);
  const [masteryEvent, setMasteryEvent] = useState<MasteryEvent | null>(null);
  const [evolveEvent, setEvolveEvent] = useState<EvolveEvent | null>(null);
  const [mentorUnlocked, setMentorUnlocked] = useState(false);

  const avatarStage = useMemo(() => stageForCredits(credits), [credits]);
  const prevStageRef = useRef<AvatarStage>(avatarStage);

  useEffect(() => {
    if (avatarStage !== prevStageRef.current) {
      setEvolveEvent({ fromStage: prevStageRef.current, toStage: avatarStage });
      prevStageRef.current = avatarStage;
    }
  }, [avatarStage]);

  const completeProfile = useCallback((p: UserProfile) => {
    setProfile(p);
    setPhase('app');
    setSection('home');
  }, []);

  const awardCredits = useCallback((n: number) => {
    setCredits((c) => c + n);
  }, []);

  const addBadge = useCallback((b: Badge) => {
    setBadges((prev) => {
      if (prev.some((x) => x.id === b.id)) {
        return prev.map((x) => (x.id === b.id ? { ...x, earnedDate: b.earnedDate, verified: true } : x));
      }
      return [...prev, b];
    });
  }, []);

  const completeGoal = useCallback(
    (id: string) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id && !g.done ? { ...g, done: true, progress: 100 } : g))
      );
      const g = goals.find((x) => x.id === id);
      if (g && !g.done) {
        awardCredits(g.credits);
      }
    },
    [goals, awardCredits]
  );

  const nudgeWeakArea = useCallback(
    (id: string, amount = 16) => {
      setWeakAreas((prev) =>
        prev.map((w) => {
          if (w.id !== id || w.mastered) return w;
          const nextLevel = Math.min(100, w.level + amount);
          const mastered = nextLevel >= 100;
          if (mastered) {
            awardCredits(150);
            addBadge({
              id: `b-master-${w.id}`,
              name: 'Skill Master',
              description: `Turned ${w.name} into a strength.`,
              earnedDate: new Date().toISOString().slice(0, 10),
              verified: true,
              icon: 'Crown',
              glow: true,
            });
            setMasteryEvent({
              areaName: w.name,
              badgeName: 'Skill Master',
              credits: 150,
              nextFrontier: w.nextFrontier || 'a new challenge',
            });
            // mentor unlock after 2 masteries
            setWeakAreas((cur) => {
              const masteredCount = cur.filter((x) => x.id === id || x.mastered).length;
              if (masteredCount >= 2) setMentorUnlocked(true);
              return cur;
            });
          }
          return {
            ...w,
            level: nextLevel,
            progress: w.progress + amount,
            improvementPct: w.improvementPct + amount,
            mastered,
          };
        })
      );
    },
    [awardCredits, addBadge]
  );

  const acceptFrontier = useCallback((id: string) => {
    setWeakAreas((prev) =>
      prev.map((w) => {
        if (w.id !== id || !w.mastered || !w.nextFrontier) return w;
        return {
          ...w,
          id: `frontier-${w.id}`,
          name: w.nextFrontier,
          level: 20,
          progress: 0,
          improvementPct: 0,
          mastered: false,
          nextFrontier: frontierFor(w.nextFrontier),
          recommendedActions: frontierActions(w.nextFrontier),
        };
      })
    );
  }, []);

  const createProject = useCallback((p: Project) => {
    setProjects((prev) => [p, ...prev]);
  }, []);

  const joinProject = useCallback((id: string) => {
    setJoinable((prev) => {
      const found = prev.find((p) => p.id === id);
      if (!found) return prev;
      setProjects((cur) => [
        {
          ...found,
          team: [
            ...found.team,
            {
              id: 'me',
              name: 'Aarav Mehta',
              shadowId: 'SM-4821',
              role: 'Contributor',
              skills: ['Python', 'React', 'TensorFlow'],
              contribution: 10,
              avatarStage: 'Achiever',
            },
          ],
        },
        ...cur,
      ]);
      return prev.filter((p) => p.id !== id);
    });
    awardCredits(40);
  }, [awardCredits]);

  const archiveProject = useCallback((id: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'archived' } : p)));
    awardCredits(120);
  }, [awardCredits]);

  const clearMasteryEvent = useCallback(() => setMasteryEvent(null), []);
  const clearEvolveEvent = useCallback(() => setEvolveEvent(null), []);

  const value: AppState = {
    phase,
    section,
    dualMode,
    profile,
    weakAreas,
    goals,
    badges,
    projects,
    joinable,
    insights,
    riskSignals,
    credits,
    avatarStage,
    masteryEvent,
    evolveEvent,
    mentorUnlocked,
    setPhase,
    setSection,
    setDualMode,
    completeProfile,
    completeGoal,
    nudgeWeakArea,
    acceptFrontier,
    createProject,
    joinProject,
    archiveProject,
    addBadge,
    awardCredits,
    clearMasteryEvent,
    clearEvolveEvent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function frontierFor(name: string): string | undefined {
  const map: Record<string, string> = {
    'System Design': 'Distributed Systems',
    'Distributed Systems': 'Scalability & Tradeoffs',
    'Deep Work & Focus Systems': 'Personal Operating System',
    'Technical Storytelling': 'Executive Communication',
  };
  return map[name];
}

function frontierActions(name: string): string[] {
  const map: Record<string, string[]> = {
    'System Design': [
      'Sketch the architecture of an app you use daily',
      'Read one design engineering article per week',
      'Run a load-thought experiment on your current project',
    ],
    'Distributed Systems': [
      'Implement a simple leader-election toy',
      'Compare CAP tradeoffs in 3 real systems',
      'Write a one-pager on eventual consistency',
    ],
    'Deep Work & Focus Systems': [
      'Design a weekly focus + recovery rhythm',
      'Audit one recurring meeting for removal',
      'Track deep-work hours for 2 weeks',
    ],
    'Technical Storytelling': [
      'Turn your last project into a 5-act narrative',
      'Pitch a non-technical audience in 3 minutes',
      'Write a public post on a hard topic you cracked',
    ],
  };
  return map[name] || ['Set a weekly rep', 'Find a feedback partner', 'Track one metric'];
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
