import { AppProvider, useApp } from '@/context/AppContext';
import { OpeningSequence } from '@/components/OpeningSequence';
import { AuthScreen } from '@/components/AuthScreen';
import { ProfileSetup } from '@/components/ProfileSetup';
import { AppShell } from '@/components/AppShell';
import { AICopilot } from '@/components/AICopilot';
import { MasteryOverlay } from '@/components/MasteryOverlay';
import { EvolveOverlay } from '@/components/EvolveOverlay';
import { HomePage } from '@/pages/HomePage';
import { SkillMindPage } from '@/pages/SkillMindPage';
import { ShadowPage } from '@/pages/ShadowPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { InstitutionPage } from '@/pages/InstitutionPage';

function Router() {
  const { phase, section } = useApp();

  if (phase === 'opening') return <OpeningSequence />;
  if (phase === 'auth') return <AuthScreen />;
  if (phase === 'profile-setup') return <ProfileSetup />;

  return (
    <AppShell>
      <div key={section} className="animate-slide-up">
        {section === 'home' && <HomePage />}
        {section === 'skillmind' && <SkillMindPage />}
        {section === 'shadow' && <ShadowPage />}
        {section === 'achievements' && <AchievementsPage />}
        {section === 'institution' && <InstitutionPage />}
        {section === 'profile' && <ProfilePage />}
      </div>
      <AICopilot />
      <MasteryOverlay />
      <EvolveOverlay />
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
