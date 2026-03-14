'use client';

import { useState, useCallback } from 'react';
import HomeScreen from '@/components/HomeScreen';
import SessionBuilder from '@/components/SessionBuilder';
import SessionView from '@/components/SessionView';
import DrillLibrary from '@/components/DrillLibrary';
import BottomNav from '@/components/BottomNav';
import { Session, SessionFormData, SessionType } from '@/types';
import { generateSession } from '@/lib/sessionGenerator';

export type Tab = 'home' | 'build' | 'drills' | 'session';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [session, setSession] = useState<Session | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [initialSessionType, setInitialSessionType] = useState<SessionType>('personal');

  const handleStartBuild = useCallback((type: SessionType) => {
    setInitialSessionType(type);
    setActiveTab('build');
  }, []);

  const handleGenerate = useCallback(async (formData: SessionFormData) => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));
    const generated = generateSession(formData);
    setSession(generated);
    setIsGenerating(false);
    setActiveTab('session');
  }, []);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">
      <div className="relative max-w-[430px] mx-auto min-h-screen flex flex-col">
        <main className="flex-1 pb-[80px]">
          {activeTab === 'home' && (
            <HomeScreen
              onStartBuild={handleStartBuild}
              onBrowseDrills={() => setActiveTab('drills')}
            />
          )}
          {activeTab === 'build' && (
            <SessionBuilder
              initialSessionType={initialSessionType}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {activeTab === 'drills' && <DrillLibrary />}
          {activeTab === 'session' && (
            <SessionView
              session={session}
              onUpdate={setSession}
              onBuildNew={() => setActiveTab('build')}
            />
          )}
        </main>
        <BottomNav active={activeTab} onChange={setActiveTab} hasSession={!!session} />
      </div>
    </div>
  );
}
