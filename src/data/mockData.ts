import type {
  Badge,
  Goal,
  Insight,
  MonthlyRecognition,
  PeerItem,
  Project,
  RiskSignal,
  UserProfile,
  WeakArea,
} from './types';

export const defaultProfile: UserProfile = {
  name: 'Aarav Mehta',
  levelOfStudy: '3rd Year, B.Tech Computer Science',
  academicGoals: ['Land a top-tier software internship', 'Build a portfolio of 5 ML projects'],
  skills: ['Python', 'React', 'TensorFlow', 'Data Analysis', 'Git'],
  improveAreas: ['DSA', 'Time Management', 'Communication'],
  learningPrefs: ['Hands-on projects', 'Visual explanations', 'Spaced repetition'],
  currentGoals: [
    'Solve 40 DSA problems this month',
    'Lead one team project end-to-end',
    'Give a 10-min technical talk',
  ],
  shadowId: 'SM-4821',
  institution: 'Northgate Institute of Technology',
};

export const initialWeakAreas: WeakArea[] = [
  {
    id: 'dsa',
    name: 'DSA',
    level: 68,
    progress: 12,
    improvementPct: 18,
    mastered: false,
    nextFrontier: 'System Design',
    recommendedActions: [
      'Solve 2 medium graph problems daily',
      'Review sliding-window patterns this week',
      'Pair with a mentor for tree traversal',
    ],
  },
  {
    id: 'time-mgmt',
    name: 'Time Management',
    level: 54,
    progress: 8,
    improvementPct: 11,
    mastered: false,
    nextFrontier: 'Deep Work & Focus Systems',
    recommendedActions: [
      'Adopt time-blocked calendar with 90-min focus sprints',
      'Set a hard 6pm cutoff for project work',
      'Review last 3 days of time logs every Sunday',
    ],
  },
  {
    id: 'comm',
    name: 'Communication',
    level: 47,
    progress: 6,
    improvementPct: 9,
    mastered: false,
    nextFrontier: 'Technical Storytelling',
    recommendedActions: [
      'Record a weekly 3-min technical explainer',
      'Present a project retro to your team',
      'Join the campus debate club for structured reps',
    ],
  },
];

export const initialGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Solve 40 DSA problems this month',
    category: 'DSA',
    progress: 64,
    done: false,
    dueIn: 12,
    credits: 120,
  },
  {
    id: 'g2',
    title: 'Lead one team project end-to-end',
    category: 'Shadow',
    progress: 40,
    done: false,
    dueIn: 21,
    credits: 200,
  },
  {
    id: 'g3',
    title: 'Give a 10-min technical talk',
    category: 'Communication',
    progress: 25,
    done: false,
    dueIn: 9,
    credits: 90,
  },
  {
    id: 'g4',
    title: 'Complete TensorFlow fundamentals track',
    category: 'Skill',
    progress: 100,
    done: true,
    dueIn: 0,
    credits: 80,
  },
];

export const initialBadges: Badge[] = [
  {
    id: 'b-growth',
    name: 'Growth Mindset',
    description: 'Engaged with 3 weak areas and committed to a plan.',
    earnedDate: '2026-07-02',
    verified: true,
    icon: 'Sprout',
    glow: true,
  },
  {
    id: 'b-consistency',
    name: 'Consistency',
    description: '14-day focused learning streak.',
    earnedDate: '2026-07-18',
    verified: true,
    icon: 'CalendarCheck',
  },
  {
    id: 'b-collab',
    name: 'Collaborator',
    description: 'Contributed meaningfully to a Shadow project.',
    earnedDate: '2026-07-29',
    verified: true,
    icon: 'Users',
  },
  {
    id: 'b-builder',
    name: 'Project Builder',
    description: 'Created and shipped a Shadow project.',
    earnedDate: null,
    verified: false,
    icon: 'Hammer',
  },
  {
    id: 'b-master',
    name: 'Skill Master',
    description: 'Turned a weakness into a strength.',
    earnedDate: null,
    verified: false,
    icon: 'Crown',
    glow: true,
  },
  {
    id: 'b-innovator',
    name: 'Innovator',
    description: 'Proposed a novel solution in a project.',
    earnedDate: null,
    verified: false,
    icon: 'Lightbulb',
  },
  {
    id: 'b-champion',
    name: 'ShadowMind Champion',
    description: 'Top monthly recognition across the institution.',
    earnedDate: null,
    verified: false,
    icon: 'Trophy',
    glow: true,
  },
  {
    id: 'b-rising',
    name: 'Rising Star',
    description: 'Fastest month-over-month improvement.',
    earnedDate: null,
    verified: false,
    icon: 'Star',
  },
  {
    id: 'b-team',
    name: 'Team Builder',
    description: 'Assembled and led a balanced project team.',
    earnedDate: null,
    verified: false,
    icon: 'Network',
  },
];

export const initialRiskSignals: RiskSignal[] = [
  {
    id: 'r1',
    area: 'Focus depth',
    severity: 'medium',
    trend: 'down',
    message: 'Average focus session dropped 22% — fragmented context switching detected.',
    delta: -22,
  },
  {
    id: 'r2',
    area: 'DSA consistency',
    severity: 'low',
    trend: 'up',
    message: 'DSA problem cadence recovering after a 5-day gap.',
    delta: 8,
  },
  {
    id: 'r3',
    area: 'Project workload',
    severity: 'high',
    trend: 'down',
    message: 'Taking on 71% of one project — risk of imbalance and burnout.',
    delta: -15,
  },
];

export const initialInsights: Insight[] = [
  {
    id: 'i1',
    title: 'Your strongest pattern this month',
    body: 'You produce your best work in 90-minute morning focus blocks. Your DSA accuracy peaks before 11am.',
    kind: 'strength',
  },
  {
    id: 'i2',
    title: 'Early signal detected',
    body: 'Communication scores are flat while project contribution is rising — you may be under-indexing on sharing work.',
    kind: 'signal',
  },
  {
    id: 'i3',
    title: 'Recommended next move',
    body: 'Move the technical talk goal up by one week — your readiness is already at 72%.',
    kind: 'recommendation',
  },
  {
    id: 'i4',
    title: 'Milestone forming',
    body: 'You are 32 points from mastering Time Management. Two more focus sprints unlock the next avatar stage.',
    kind: 'milestone',
  },
];

export const initialProjects: Project[] = [
  {
    id: 'p1',
    name: 'NeuroTutor',
    description: 'An adaptive learning assistant that personalizes question difficulty using a small transformer.',
    progress: 62,
    status: 'active',
    dueIn: 14,
    category: 'AI / ML',
    creditsEarned: 180,
    collaborationHealth: 82,
    workloadBalance: 68,
    aiInsight:
      'ML and UI work is healthy, but documentation is a blind spot. Assign one owner to docs before the next milestone.',
    team: [
      {
        id: 'm1',
        name: 'Aarav Mehta',
        shadowId: 'SM-4821',
        role: 'ML Lead',
        skills: ['Python', 'TensorFlow', 'Data Analysis'],
        contribution: 38,
        avatarStage: 'Achiever',
      },
      {
        id: 'm2',
        name: 'Maya Rao',
        shadowId: 'SM-3190',
        role: 'UI Lead',
        skills: ['React', 'Figma', 'UX'],
        contribution: 31,
        avatarStage: 'Builder',
      },
      {
        id: 'm3',
        name: 'Dev Sahni',
        shadowId: 'SM-5577',
        role: 'Backend',
        skills: ['Node', 'Postgres', 'APIs'],
        contribution: 31,
        avatarStage: 'Builder',
      },
    ],
    tasks: [
      { id: 't1', title: 'Adaptive difficulty model', assignee: 'Aarav Mehta', status: 'in-progress', weight: 30 },
      { id: 't2', title: 'Question authoring UI', assignee: 'Maya Rao', status: 'done', weight: 20 },
      { id: 't3', title: 'Session API + auth', assignee: 'Dev Sahni', status: 'done', weight: 18 },
      { id: 't4', title: 'Progress analytics dashboard', assignee: 'Maya Rao', status: 'todo', weight: 16 },
      { id: 't5', title: 'Model eval harness', assignee: 'Aarav Mehta', status: 'todo', weight: 16 },
    ],
    milestones: [
      { id: 'ms1', title: 'Prototype demo', done: true, date: '2026-07-20' },
      { id: 'ms2', title: 'Alpha release', done: false, date: '2026-08-28' },
      { id: 'ms3', title: 'Institution showcase', done: false, date: '2026-09-15' },
    ],
  },
  {
    id: 'p2',
    name: 'Campus Pulse',
    description: 'Real-time engagement analytics for student communities with anomaly detection.',
    progress: 28,
    status: 'active',
    dueIn: 30,
    category: 'Data / Dashboard',
    creditsEarned: 60,
    collaborationHealth: 71,
    workloadBalance: 55,
    aiInsight:
      'Workload is tilting toward one member. Maya has capacity and complementary skills — recommend reassigning the visualization layer.',
    team: [
      {
        id: 'm4',
        name: 'Aarav Mehta',
        shadowId: 'SM-4821',
        role: 'Data',
        skills: ['Python', 'Data Analysis'],
        contribution: 52,
        avatarStage: 'Achiever',
      },
      {
        id: 'm5',
        name: 'Priya Nair',
        shadowId: 'SM-6042',
        role: 'Frontend',
        skills: ['React', 'D3'],
        contribution: 28,
        avatarStage: 'Explorer',
      },
      {
        id: 'm6',
        name: 'Kabir Joshi',
        shadowId: 'SM-7731',
        role: 'Infra',
        skills: ['Docker', 'AWS'],
        contribution: 20,
        avatarStage: 'Learner',
      },
    ],
    tasks: [
      { id: 't6', title: 'Event ingestion pipeline', assignee: 'Aarav Mehta', status: 'in-progress', weight: 28 },
      { id: 't7', title: 'Dashboard shell', assignee: 'Priya Nair', status: 'in-progress', weight: 24 },
      { id: 't8', title: 'Anomaly detection model', assignee: 'Aarav Mehta', status: 'todo', weight: 26 },
      { id: 't9', title: 'Deployment', assignee: 'Kabir Joshi', status: 'todo', weight: 22 },
    ],
    milestones: [
      { id: 'ms4', title: 'Data schema lock', done: true, date: '2026-07-30' },
      { id: 'ms5', title: 'Live dashboard', done: false, date: '2026-09-10' },
    ],
  },
];

export const joinableProjects: Project[] = [
  {
    id: 'j1',
    name: 'EcoSense',
    description: 'IoT + ML air quality monitor for campus zones with a public dashboard.',
    progress: 15,
    status: 'active',
    dueIn: 40,
    category: 'IoT / ML',
    creditsEarned: 0,
    collaborationHealth: 60,
    workloadBalance: 70,
    aiInsight: 'Needs a data person. Your Python + Data Analysis match at 94%.',
    team: [
      {
        id: 'm7',
        name: 'Sara Khan',
        shadowId: 'SM-2098',
        role: 'Hardware',
        skills: ['Arduino', 'C++'],
        contribution: 60,
        avatarStage: 'Builder',
      },
      {
        id: 'm8',
        name: 'Leo Park',
        shadowId: 'SM-4412',
        role: 'Frontend',
        skills: ['React', 'Maps'],
        contribution: 40,
        avatarStage: 'Explorer',
      },
    ],
    tasks: [
      { id: 't10', title: 'Sensor calibration', assignee: 'Sara Khan', status: 'in-progress', weight: 30 },
      { id: 't11', title: 'Data pipeline', assignee: '—', status: 'todo', weight: 35 },
      { id: 't12', title: 'Public dashboard', assignee: 'Leo Park', status: 'todo', weight: 35 },
    ],
    milestones: [{ id: 'ms6', title: 'First readings', done: false, date: '2026-09-01' }],
  },
  {
    id: 'j2',
    name: 'MediMind',
    description: 'Symptom triage assistant for campus clinic — explainable, privacy-first.',
    progress: 8,
    status: 'active',
    dueIn: 50,
    category: 'AI / Health',
    creditsEarned: 0,
    collaborationHealth: 64,
    workloadBalance: 75,
    aiInsight: 'Needs ML + Communication. Your talk-prep goal aligns with their explainability need.',
    team: [
      {
        id: 'm9',
        name: 'Nia Verma',
        shadowId: 'SM-8855',
        role: 'PM',
        skills: ['UX', 'Research'],
        contribution: 55,
        avatarStage: 'Achiever',
      },
      {
        id: 'm10',
        name: 'Omar Shah',
        shadowId: 'SM-3320',
        role: 'Backend',
        skills: ['Node', 'Security'],
        contribution: 45,
        avatarStage: 'Builder',
      },
    ],
    tasks: [
      { id: 't13', title: 'Triage model', assignee: '—', status: 'todo', weight: 40 },
      { id: 't14', title: 'Explainability layer', assignee: '—', status: 'todo', weight: 30 },
      { id: 't15', title: 'Secure API', assignee: 'Omar Shah', status: 'in-progress', weight: 30 },
    ],
    milestones: [{ id: 'ms7', title: 'Clinical review', done: false, date: '2026-09-20' }],
  },
  {
    id: 'j3',
    name: 'ChronoPlan',
    description: 'AI study planner that adapts to your energy curve and exam calendar.',
    progress: 20,
    status: 'active',
    dueIn: 35,
    category: 'Productivity / AI',
    creditsEarned: 0,
    collaborationHealth: 80,
    workloadBalance: 65,
    aiInsight: 'Strong fit for your Time Management goal — building it could push mastery faster.',
    team: [
      {
        id: 'm11',
        name: 'Riya Das',
        shadowId: 'SM-6610',
        role: 'Designer',
        skills: ['Figma', 'Motion'],
        contribution: 50,
        avatarStage: 'Innovator',
      },
      {
        id: 'm12',
        name: 'Tom Lee',
        shadowId: 'SM-1207',
        role: 'ML',
        skills: ['Python', 'PyTorch'],
        contribution: 50,
        avatarStage: 'Builder',
      },
    ],
    tasks: [
      { id: 't16', title: 'Energy-curve model', assignee: 'Tom Lee', status: 'in-progress', weight: 35 },
      { id: 't17', title: 'Planner UI', assignee: 'Riya Das', status: 'in-progress', weight: 35 },
      { id: 't18', title: 'Calendar sync', assignee: '—', status: 'todo', weight: 30 },
    ],
    milestones: [{ id: 'ms8', title: 'Beta planner', done: false, date: '2026-09-05' }],
  },
];

export const peerFeed: PeerItem[] = [
  {
    id: 'pe1',
    name: 'Maya Rao',
    shadowId: 'SM-3190',
    topic: 'UI/UX',
    need: 'ML support',
    offer: 'Strong UI skills',
    matchScore: 92,
    avatarStage: 'Builder',
  },
  {
    id: 'pe2',
    name: 'Tom Lee',
    shadowId: 'SM-1207',
    topic: 'PyTorch',
    need: 'Data cleaning',
    offer: 'Deep learning mentoring',
    matchScore: 86,
    avatarStage: 'Builder',
  },
  {
    id: 'pe3',
    name: 'Riya Das',
    shadowId: 'SM-6610',
    topic: 'Product design',
    need: 'Frontend dev',
    offer: 'Motion + UX review',
    matchScore: 78,
    avatarStage: 'Innovator',
  },
  {
    id: 'pe4',
    name: 'Nia Verma',
    shadowId: 'SM-8855',
    topic: 'Communication',
    need: 'Engineering pair',
    offer: 'Public speaking coaching',
    matchScore: 81,
    avatarStage: 'Achiever',
  },
];

export const monthlyRecognition: MonthlyRecognition[] = [
  {
    rank: 1,
    title: 'ShadowMind Champion',
    name: 'Riya Das',
    shadowId: 'SM-6610',
    score: 874,
    breakdown: { improvement: 280, consistency: 224, collaboration: 212, project: 158 },
  },
  {
    rank: 2,
    title: 'Rising Star',
    name: 'Aarav Mehta',
    shadowId: 'SM-4821',
    score: 812,
    breakdown: { improvement: 292, consistency: 198, collaboration: 178, project: 144 },
  },
  {
    rank: 3,
    title: 'Team Builder',
    name: 'Nia Verma',
    shadowId: 'SM-8855',
    score: 769,
    breakdown: { improvement: 210, consistency: 196, collaboration: 230, project: 133 },
  },
];

export const avatarStages: { stage: string; threshold: number; blurb: string }[] = [
  { stage: 'Starter', threshold: 0, blurb: 'Your journey begins. Signals are being gathered.' },
  { stage: 'Explorer', threshold: 150, blurb: 'You are mapping your territory and finding edges.' },
  { stage: 'Builder', threshold: 400, blurb: 'You ship. Projects and skills compound.' },
  { stage: 'Achiever', threshold: 800, blurb: 'Consistency and mastery define you.' },
  { stage: 'Innovator', threshold: 1400, blurb: 'You create where patterns did not exist.' },
  { stage: 'Legacy', threshold: 2200, blurb: 'You leave the trail others follow — Mentor Mode.' },
];

export const skillMatchExamples = [
  'You need UI support. Maya has strong UI skills and needs ML support — 92% complementary match.',
  'Your Time Management goal pairs with Riya, who wants an engineering pair for ChronoPlan.',
  'For DSA depth, Tom offers deep-learning mentoring and is looking for data-cleaning help.',
];

export const copilotSeedQuestions = [
  'Why is my progress dropping?',
  'How can I improve DSA?',
  'Who can help me with UI?',
  'How is my project doing?',
  'What should I focus on today?',
];

export function copilotAnswer(q: string, ctx: {
  name: string;
  weakAreas: WeakArea[];
  projects: Project[];
  credits: number;
}): string {
  const lower = q.toLowerCase();
  if (/progress.*drop|drop.*progress|declin|slowing/.test(lower)) {
    const r = ctx.weakAreas.find((w) => w.name === 'Communication')!;
    return `Your overall growth dipped 4% this week, Aarav. The main driver is ${r.name} (level ${r.level}) — it is flat while your project contribution rose. You are building, but under-sharing. Recommend booking one 15-min show-and-tell this week. Your focus depth also dropped 22% from context switching — protect one 90-min morning block.`;
  }
  if (/dsa|data structure|algorithm/.test(lower)) {
    const d = ctx.weakAreas.find((w) => w.id === 'dsa')!;
    return `DSA is at level ${d.level}, up ${d.improvementPct}% this month. To break through: solve 2 medium graph problems daily, review sliding-window patterns this week, and pair with a mentor for tree traversal. You are ${100 - d.level} points from mastery — reaching it unlocks the System Design frontier and evolves your avatar.`;
  }
  if (/ui|interface|design|frontend/.test(lower)) {
    return `For UI, Maya Rao (SM-3190) is a 92% complementary match — she has strong UI skills and is looking for ML support, which fits your TensorFlow background. You could swap reviews on the NeuroTutor dashboard. Want me to draft an intro?`;
  }
  if (/project|neurotutor|campus|doing/.test(lower)) {
    const p = ctx.projects.find((x) => x.status === 'active')!;
    return `NeuroTutor is ${p.progress}% complete with ${p.dueIn} days left. Collaboration health is ${p.collaborationHealth}/100, but workload balance is ${p.workloadBalance} — you are carrying 38% of the load. Documentation is the blind spot. Reassign the analytics dashboard to Maya before the alpha milestone.`;
  }
  if (/today|focus|should i|next/.test(lower)) {
    return `Today, Aarav: one 90-min DSA block before 11am (your accuracy peak), then ship the adaptive difficulty model on NeuroTutor, then a 15-min communication rep recording. That combo protects focus, advances your top goal, and lifts your lowest area. Shadow Credits: ${ctx.credits} SC.`;
  }
  if (/credit|level|shadow credit/.test(lower)) {
    return `You have ${ctx.credits} Shadow Credits (+180 this week). You are at the Achiever level — 300 credits from Innovator. Earning is driven by goals, consistency, project milestones, and collaboration. Completing your DSA goal adds 120 SC.`;
  }
  if (/avatar|evolve|stage/.test(lower)) {
    return `Your avatar is at the Achiever stage. Mastering one more weak area will evolve it to Innovator. Each mastery also unlocks a badge and a new Next Frontier.`;
  }
  return `Here is what I see, Aarav: your strongest pattern is morning DSA accuracy, your biggest risk is fragmented focus, and your highest-leverage move today is protecting a 90-min focus block. Ask me about progress, DSA, UI help, your project, or today's plan.`;
}
