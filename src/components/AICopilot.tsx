import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { copilotSeedQuestions, copilotAnswer } from '@/data/mockData';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Bot, Send, Sparkles, X } from 'lucide-react';

interface Msg {
  role: 'user' | 'ai';
  text: string;
}

export function AICopilot() {
  const { profile, weakAreas, projects, credits } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'ai',
      text:
        'Hi, I am your ShadowMind Copilot. I can read your signals and tell you what to do next. Ask me anything.',
    },
  ]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      const ans = copilotAnswer(q, {
        name: profile?.name || 'Aarav',
        weakAreas,
        projects,
        credits,
      });
      setMsgs((m) => [...m, { role: 'ai', text: ans }]);
    }, 450);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'fixed bottom-5 right-5 z-40 grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-700 border border-navy-400/40 shadow-glow text-white transition-all hover:scale-105',
          open && 'rotate-90'
        )}
        aria-label="AI Copilot"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-navy-900 animate-glow-pulse" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[min(380px,calc(100vw-2.5rem))] glass p-0 overflow-hidden animate-slide-up flex flex-col max-h-[70vh]">
          <div className="flex items-center gap-3 p-4 border-b border-navy-400/15 bg-navy-900/40">
            <div className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-navy-500 to-navy-700 border border-navy-400/30">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm">AI Copilot</p>
              <p className="text-[11px] text-emerald-300/80 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Reading your signals
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'bg-navy-500/30 border border-navy-400/30 text-white rounded-br-md'
                      : 'bg-navy-900/50 border border-navy-400/15 text-navy-100 rounded-bl-md'
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {copilotSeedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="text-[11px] rounded-full border border-navy-400/20 bg-navy-900/40 px-2.5 py-1 text-navy-100/70 hover:border-navy-400/40 hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-navy-400/15 flex items-center gap-2">
            <input
              className="field !py-2 text-sm"
              placeholder="Ask your copilot…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask(input)}
            />
            <Button onClick={() => ask(input)} className="!px-3 !py-2.5" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
