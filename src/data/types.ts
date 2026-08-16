export type Level = 'Explorer' | 'Learner' | 'Builder' | 'Achiever' | 'Innovator' | 'Mentor';

export type AvatarStage =
  | 'Starter'
  | 'Explorer'
  | 'Builder'
  | 'Achiever'
  | 'Innovator'
  | 'Legacy';

export interface UserProfile {
  name: string;
  levelOfStudy: string;
  academicGoals: string[];
  skills: string[];
  improveAreas: string[];
  learningPrefs: string[];
  currentGoals: string[];
  shadowId: string;
  institution: string;
}

export interface WeakArea {
  id: string;
  name: string;
  level: number; // 0-100 mastery
  progress: number; // delta this week
  recommendedActions: string[];
  improvementPct: number; // improvement percentage
  mastered: boolean;
  nextFrontier?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  progress: number;
  done: boolean;
  dueIn: number; // days
  credits: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedDate: string | null;
  verified: boolean;
  icon: string; // lucide name
  glow?: boolean;
}

export interface ProjectMember {
  id: string;
  name: string;
  shadowId: string;
  role: string;
  skills: string[];
  contribution: number; // 0-100
  avatarStage: AvatarStage;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'archived';
  dueIn: number;
  team: ProjectMember[];
  tasks: { id: string; title: string; assignee: string; status: 'done' | 'in-progress' | 'todo'; weight: number }[];
  milestones: { id: string; title: string; done: boolean; date: string }[];
  collaborationHealth: number;
  workloadBalance: number;
  aiInsight: string;
  category: string;
  creditsEarned: number;
}

export interface RiskSignal {
  id: string;
  area: string;
  severity: 'low' | 'medium' | 'high';
  trend: 'down' | 'up' | 'flat';
  message: string;
  delta: number;
}

export interface Insight {
  id: string;
  title: string;
  body: string;
  kind: 'strength' | 'signal' | 'recommendation' | 'milestone';
}

export interface PeerItem {
  id: string;
  name: string;
  shadowId: string;
  topic: string;
  need: string;
  offer: string;
  matchScore: number;
  avatarStage: AvatarStage;
}

export interface MonthlyRecognition {
  rank: number;
  title: string;
  name: string;
  shadowId: string;
  score: number;
  breakdown: { improvement: number; consistency: number; collaboration: number; project: number };
}
