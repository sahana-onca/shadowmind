import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar, Button, Card, Pill, ProgressBar, SectionTitle } from '@/components/ui';
import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  Plus,
  Search,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import type { Project } from '@/data/types';
import { skillMatchExamples } from '@/data/mockData';
import { cn } from '@/lib/utils';

type View = 'active' | 'join' | 'archived';

export function ShadowPage() {
  const { projects, joinable, joinProject, archiveProject } = useApp();
  const [view, setView] = useState<View>('active');
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const active = projects.filter((p) => p.status === 'active');
  const archived = projects.filter((p) => p.status === 'archived');

  return (
    <div className="space-y-8">
      <div className="glass p-6 sm:p-8 relative overflow-hidden animate-slide-up">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-navy-500/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-navy-300/80 mb-2">Shadow</p>
        <h1 className="font-display text-3xl font-bold text-white">Project-based team intelligence.</h1>
        <p className="mt-2 text-navy-100/70 max-w-2xl">
          Create or join temporary projects. Ship together, earn Shadow Credits, and let AI match you with complementary teammates.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4 mr-1" /> Create Project</Button>
          <Button variant="ghost" onClick={() => setView('join')}><Search className="h-4 w-4 mr-1" /> Join Project</Button>
        </div>
      </div>

      {/* View switcher */}
      <div className="flex gap-2">
        {(['active', 'join', 'archived'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-medium capitalize transition-all border',
              view === v
                ? 'bg-navy-500/25 border-navy-400/40 text-white'
                : 'bg-navy-900/40 border-navy-400/15 text-navy-100/60 hover:text-white'
            )}
          >
            {v} {v === 'active' && `(${active.length})`}
            {v === 'join' && ` (${joinable.length})`}
            {v === 'archived' && ` (${archived.length})`}
          </button>
        ))}
      </div>

      {/* AI Skill Match banner */}
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-400/15 blur-3xl" />
        <div className="flex items-start gap-4">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-navy-500/40 to-navy-700/30 border border-navy-400/30 shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-white">AI Skill Match</p>
            <p className="text-xs text-navy-100/60 mt-0.5 mb-3">Complementary teammates for your gaps.</p>
            <div className="space-y-2">
              {skillMatchExamples.map((s, i) => (
                <div key={i} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-3 text-sm text-navy-100/85 flex items-start gap-2">
                  <Zap className="h-4 w-4 text-accent-400 mt-0.5 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Project grid */}
      {view === 'active' && (
        <div className="grid md:grid-cols-2 gap-5">
          {active.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} onArchive={() => archiveProject(p.id)} />
          ))}
          {active.length === 0 && <EmptyState text="No active projects. Create one to get started." />}
        </div>
      )}

      {view === 'join' && (
        <div className="grid md:grid-cols-2 gap-5">
          {joinable.map((p) => (
            <JoinableCard key={p.id} project={p} onJoin={() => joinProject(p.id)} onOpen={() => setSelected(p)} />
          ))}
          {joinable.length === 0 && <EmptyState text="No open projects right now. Check back soon." />}
        </div>
      )}

      {view === 'archived' && (
        <div className="grid md:grid-cols-2 gap-5">
          {archived.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} archived />
          ))}
          {archived.length === 0 && <EmptyState text="No archived projects yet." />}
        </div>
      )}

      {createOpen && <CreateProjectModal onClose={() => setCreateOpen(false)} />}
      {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(null)} onArchive={() => { archiveProject(selected.id); setSelected(null); }} />}
    </div>
  );
}

function ProjectCard({ project, onOpen, onArchive, archived }: { project: Project; onOpen: () => void; onArchive: () => void; archived?: boolean }) {
  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2"><Layers className="h-4 w-4 text-navy-300" /> {project.name}</h3>
          <p className="text-xs text-navy-100/60 mt-1">{project.category}</p>
        </div>
        <Pill tone={archived ? 'navy' : 'green'}>{archived ? 'Archived' : 'Active'}</Pill>
      </div>
      <p className="text-sm text-navy-100/70 mb-4 line-clamp-2">{project.description}</p>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-navy-100/60 mb-1">
          <span>Progress</span>
          <span>{project.progress}% · {project.dueIn}d left</span>
        </div>
        <ProgressBar value={project.progress} glow={project.progress >= 80} />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((m) => (
            <Avatar key={m.id} stage={m.avatarStage} size="sm" className="border-2 border-navy-900" />
          ))}
        </div>
        <span className="text-xs text-navy-100/60 flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {project.team.length}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {[...new Set(project.team.flatMap((m) => m.skills))].slice(0, 6).map((s) => (
          <span key={s} className="inline-flex items-center gap-1 rounded-md bg-navy-500/12 border border-navy-400/15 px-2 py-0.5 text-[10px] font-medium text-navy-100/80">
            <Zap className="h-2.5 w-2.5 text-accent-400/70" /> {s}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
        <div className="rounded-lg bg-navy-900/40 p-2.5">
          <p className="text-navy-100/50">Collab health</p>
          <p className="text-white font-semibold">{project.collaborationHealth}/100</p>
        </div>
        <div className="rounded-lg bg-navy-900/40 p-2.5">
          <p className="text-navy-100/50">Workload balance</p>
          <p className="text-white font-semibold">{project.workloadBalance}/100</p>
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button variant="ghost" className="flex-1" onClick={onOpen}>Open dashboard</Button>
        {!archived && (
          <Button variant="ghost" className="!px-3" onClick={onArchive} aria-label="Archive">
            <Archive className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

function JoinableCard({ project, onJoin, onOpen }: { project: Project; onJoin: () => void; onOpen: () => void }) {
  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2"><Layers className="h-4 w-4 text-accent-400" /> {project.name}</h3>
          <p className="text-xs text-navy-100/60 mt-1">{project.category}</p>
        </div>
        <Pill tone="sky">Open</Pill>
      </div>
      <p className="text-sm text-navy-100/70 mb-3">{project.description}</p>

      <div className="rounded-xl bg-accent-400/10 border border-accent-400/25 p-3 mb-3">
        <p className="text-xs text-accent-400 font-semibold flex items-center gap-1.5 mb-1"><Sparkles className="h-3.5 w-3.5" /> AI insight</p>
        <p className="text-xs text-navy-100/80">{project.aiInsight}</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex -space-x-2">
          {project.team.map((m) => (
            <Avatar key={m.id} stage={m.avatarStage} size="sm" className="border-2 border-navy-900" />
          ))}
        </div>
        <span className="text-xs text-navy-100/60">{project.dueIn}d left</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <Button className="flex-1" onClick={onJoin}><Plus className="h-4 w-4 mr-1" /> Join</Button>
        <Button variant="ghost" className="!px-3" onClick={onOpen}>Preview</Button>
      </div>
    </Card>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="col-span-full glass p-10 text-center">
      <Layers className="h-10 w-10 text-navy-400/40 mx-auto mb-3" />
      <p className="text-navy-100/60 text-sm">{text}</p>
    </div>
  );
}

function CreateProjectModal({ onClose }: { onClose: () => void }) {
  const { createProject } = useApp();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('AI / ML');
  const [dueIn, setDueIn] = useState(21);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Project = {
      id: 'p-' + Date.now(),
      name: name.trim() || 'Untitled Project',
      description: description.trim() || 'A new Shadow project.',
      progress: 0,
      status: 'active',
      dueIn,
      category,
      creditsEarned: 0,
      collaborationHealth: 70,
      workloadBalance: 80,
      aiInsight: 'Project created. Add teammates and milestones to let AI assess collaboration health.',
      team: [
        { id: 'me', name: 'Aarav Mehta', shadowId: 'SM-4821', role: 'Lead', skills: ['Python', 'React', 'TensorFlow'], contribution: 40, avatarStage: 'Achiever' },
      ],
      tasks: [{ id: 't-init', title: 'Define scope', assignee: 'Aarav Mehta', status: 'todo', weight: 100 }],
      milestones: [{ id: 'ms-init', title: 'Kickoff', done: false, date: new Date().toISOString().slice(0, 10) }],
    };
    createProject(p);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="glass p-6 max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-white">Create Project</h2>
          <button onClick={onClose} className="text-navy-100/50 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">Project name</label>
            <input className="field" placeholder="e.g. NeuroTutor" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">Description</label>
            <textarea className="field min-h-[80px]" placeholder="What are you building?" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">Category</label>
              <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
                {['AI / ML', 'Data / Dashboard', 'IoT / ML', 'AI / Health', 'Productivity / AI', 'Web App'].map((c) => (
                  <option key={c} value={c} className="bg-navy-900">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-navy-100/60 mb-2">Due in (days)</label>
              <input type="number" className="field" value={dueIn} onChange={(e) => setDueIn(Number(e.target.value))} min={1} />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">Create <ArrowRight className="h-4 w-4 ml-1" /></Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose, onArchive }: { project: Project; onClose: () => void; onArchive: () => void }) {
  const done = project.tasks.filter((t) => t.status === 'done').length;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 py-8 bg-navy-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="glass p-6 max-w-3xl w-full animate-scale-in my-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2"><Layers className="h-5 w-5 text-navy-300" /> {project.name}</h2>
            <p className="text-sm text-navy-100/60 mt-1">{project.description}</p>
          </div>
          <button onClick={onClose} className="text-navy-100/50 hover:text-white shrink-0"><X className="h-5 w-5" /></button>
        </div>

        {/* progress + health */}
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60 mb-1">Progress</p>
            <p className="font-display text-xl font-bold text-white">{project.progress}%</p>
            <ProgressBar value={project.progress} className="mt-2" glow={project.progress >= 80} />
          </div>
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60 mb-1">Collaboration health</p>
            <p className="font-display text-xl font-bold text-white">{project.collaborationHealth}<span className="text-sm text-navy-100/50">/100</span></p>
            <ProgressBar value={project.collaborationHealth} className="mt-2" />
          </div>
          <div className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-4">
            <p className="text-xs text-navy-100/60 mb-1">Workload balance</p>
            <p className="font-display text-xl font-bold text-white">{project.workloadBalance}<span className="text-sm text-navy-100/50">/100</span></p>
            <ProgressBar value={project.workloadBalance} className="mt-2" />
          </div>
        </div>

        {/* AI insight */}
        <div className="rounded-xl bg-accent-400/10 border border-accent-400/25 p-4 mb-5">
          <p className="text-xs text-accent-400 font-semibold flex items-center gap-1.5 mb-1"><Sparkles className="h-3.5 w-3.5" /> AI Project Insight</p>
          <p className="text-sm text-navy-100/85">{project.aiInsight}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Team */}
          <div>
            <h3 className="font-display font-bold text-white mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-navy-300" /> Team & Capabilities</h3>
            <div className="rounded-xl bg-navy-500/10 border border-navy-400/20 p-3 mb-2.5">
              <p className="text-[10px] uppercase tracking-wider text-navy-300/70 mb-2">Combined team capabilities</p>
              <div className="flex flex-wrap gap-1.5">
                {[...new Set(project.team.flatMap((m) => m.skills))].map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 rounded-md bg-navy-500/20 border border-navy-400/25 px-2 py-0.5 text-[10px] font-medium text-navy-100">
                    <Zap className="h-2.5 w-2.5 text-accent-400" /> {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {project.team.map((m) => (
                <div key={m.id} className="rounded-xl bg-navy-900/40 border border-navy-400/15 p-3.5">
                  <div className="flex items-center gap-3 mb-2.5">
                    <Avatar stage={m.avatarStage} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{m.name}</p>
                      <p className="text-xs text-navy-100/60">{m.role} · {m.shadowId}</p>
                    </div>
                    <div className="w-20 shrink-0">
                      <ProgressBar value={m.contribution} />
                      <p className="text-[10px] text-navy-100/50 mt-1 text-right">{m.contribution}%</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-12">
                    {m.skills.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 rounded-md bg-navy-500/15 border border-navy-400/20 px-2 py-0.5 text-[10px] font-medium text-navy-100">
                        <Zap className="h-2.5 w-2.5 text-accent-400" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="font-display font-bold text-white mb-3 flex items-center gap-2"><Target className="h-4 w-4 text-navy-300" /> Task Distribution</h3>
            <div className="space-y-2">
              {project.tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-xl bg-navy-900/40 border border-navy-400/15 p-3">
                  {t.status === 'done' ? <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> : t.status === 'in-progress' ? <Clock className="h-4 w-4 text-amber-300 shrink-0" /> : <Circle className="h-4 w-4 text-navy-100/40 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${t.status === 'done' ? 'text-navy-100/50 line-through' : 'text-white'}`}>{t.title}</p>
                    <p className="text-xs text-navy-100/60">{t.assignee}</p>
                  </div>
                  <Pill tone={t.status === 'done' ? 'green' : t.status === 'in-progress' ? 'amber' : 'navy'}>{t.status}</Pill>
                </div>
              ))}
              <p className="text-xs text-navy-100/50 pt-1">{done}/{project.tasks.length} tasks complete</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-5">
          <h3 className="font-display font-bold text-white mb-3">Milestones</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {project.milestones.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2 shrink-0">
                <div className={`rounded-xl border px-4 py-2.5 ${m.done ? 'bg-emerald-500/10 border-emerald-400/30' : 'bg-navy-900/40 border-navy-400/15'}`}>
                  <p className={`text-sm font-medium ${m.done ? 'text-emerald-300' : 'text-white'}`}>{m.title}</p>
                  <p className="text-xs text-navy-100/50">{m.date}</p>
                </div>
                {i < project.milestones.length - 1 && <ArrowRight className="h-4 w-4 text-navy-400/40 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          {project.status === 'active' && (
            <Button variant="ghost" onClick={onArchive}><Archive className="h-4 w-4 mr-1" /> Archive project</Button>
          )}
          <div className="flex-1" />
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
