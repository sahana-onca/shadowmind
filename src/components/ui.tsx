import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Compass,
  Hammer,
  Trophy,
  Lightbulb,
  Crown,
  type LucideIcon,
} from 'lucide-react';

export function Card({
  children,
  className,
  hover,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={cn('glass p-5', hover && 'glass-hover', className)}>{children}</div>;
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.25em] text-navy-300/80 mb-2">{eyebrow}</p>
        )}
        <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
        {desc && <p className="text-sm text-navy-100/70 mt-1 max-w-xl">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({
  value,
  className,
  glow,
}: {
  value: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn('h-2 rounded-full bg-navy-900/70 overflow-hidden', className)}>
      <div
        className={cn(
          'h-full rounded-full bg-gradient-to-r from-navy-400 to-accent-400 transition-all duration-700',
          glow && 'progress-bar'
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = 'navy',
  className,
}: {
  children: ReactNode;
  tone?: 'navy' | 'green' | 'amber' | 'red' | 'sky';
  className?: string;
}) {
  const tones: Record<string, string> = {
    navy: 'bg-navy-500/15 text-navy-200 border-navy-400/30',
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    red: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
    sky: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  sub,
  icon,
  tone = 'navy',
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: 'navy' | 'green' | 'amber' | 'red' | 'sky';
}) {
  const ring: Record<string, string> = {
    navy: 'from-navy-400/20 to-navy-600/10 text-navy-200',
    green: 'from-emerald-400/20 to-emerald-600/10 text-emerald-200',
    amber: 'from-amber-400/20 to-amber-600/10 text-amber-200',
    red: 'from-rose-400/20 to-rose-600/10 text-rose-200',
    sky: 'from-sky-400/20 to-sky-600/10 text-sky-200',
  };
  return (
    <div className="glass p-4 glass-hover">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-navy-100/60">{label}</span>
        {icon && (
          <span
            className={cn(
              'grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br',
              ring[tone]
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 font-display text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-navy-100/60 mt-1">{sub}</div>}
    </div>
  );
}

const STAGE_VISUALS: Record<string, { icon: LucideIcon; gradient: string; border: string; glow: string; ring: string }> = {
  Starter: { icon: Sparkles, gradient: 'from-navy-500/30 to-navy-800/50', border: 'border-navy-400/25', glow: '', ring: 'border-navy-400/20' },
  Explorer: { icon: Compass, gradient: 'from-navy-400/35 to-navy-700/55', border: 'border-navy-400/35', glow: 'shadow-[0_0_20px_-6px_rgba(85,121,255,0.5)]', ring: 'border-navy-400/30' },
  Learner: { icon: Compass, gradient: 'from-navy-400/35 to-navy-700/55', border: 'border-navy-400/35', glow: 'shadow-[0_0_20px_-6px_rgba(85,121,255,0.5)]', ring: 'border-navy-400/30' },
  Builder: { icon: Hammer, gradient: 'from-sky-500/35 to-navy-700/55', border: 'border-sky-400/35', glow: 'shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)]', ring: 'border-sky-400/30' },
  Achiever: { icon: Trophy, gradient: 'from-sky-400/40 to-navy-700/55', border: 'border-sky-400/40', glow: 'shadow-[0_0_28px_-4px_rgba(56,189,248,0.7)]', ring: 'border-sky-400/35' },
  Innovator: { icon: Lightbulb, gradient: 'from-amber-400/35 to-navy-700/50', border: 'border-amber-400/40', glow: 'shadow-[0_0_32px_-4px_rgba(251,191,36,0.7)]', ring: 'border-amber-400/35' },
  Legacy: { icon: Crown, gradient: 'from-amber-300/45 to-navy-700/50', border: 'border-amber-300/50', glow: 'shadow-[0_0_40px_-2px_rgba(251,191,36,0.85)]', ring: 'border-amber-300/40' },
  Mentor: { icon: Crown, gradient: 'from-amber-300/45 to-navy-700/50', border: 'border-amber-300/50', glow: 'shadow-[0_0_40px_-2px_rgba(251,191,36,0.85)]', ring: 'border-amber-300/40' },
};

export function Avatar({
  stage,
  size = 'md',
  className,
}: {
  stage: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const sizes: Record<string, string> = {
    sm: 'h-9 w-9',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32',
  };
  const iconSizes: Record<string, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-9 w-9',
    xl: 'h-14 w-14',
  };
  const v = STAGE_VISUALS[stage] || STAGE_VISUALS.Starter;
  const Icon = v.icon;
  return (
    <div
      className={cn(
        'relative grid place-items-center rounded-2xl bg-gradient-to-br border transition-all duration-500',
        v.gradient,
        v.border,
        v.glow,
        sizes[size],
        className
      )}
    >
      <div className={cn('absolute inset-0 rounded-2xl border-t-2 animate-spin-slow opacity-40', v.ring)} />
      <Icon className={cn('relative text-white', iconSizes[size])} />
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' ? 'btn-primary' : 'btn-ghost',
        className
      )}
    >
      {children}
    </button>
  );
}
