'use client';

import { useState, useCallback } from 'react';
import HomeScreen from '@/components/HomeScreen';
import SessionBuilder from '@/components/SessionBuilder';
import SessionView from '@/components/SessionView';
import SavedSessions from '@/components/SavedSessions';
import BottomNav from '@/components/BottomNav';
import { PlannedSession, SessionPlanFormData, SessionType } from '@/types';
import { generatePlannedSession } from '@/lib/blockSessionGenerator';
import { useSavedSessions } from '@/hooks/useSavedSessions';

export type Tab = 'home' | 'build' | 'saved' | 'session';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [session, setSession] = useState<PlannedSession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [initialSessionType, setInitialSessionType] = useState<SessionType>('personal');
  const { save } = useSavedSessions();

  const handleStartBuild = useCallback((type: SessionType) => {
    setInitialSessionType(type);
    setActiveTab('build');
  }, []);

  const handleGenerate = useCallback(async (formData: SessionPlanFormData) => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1000));
    const generated = generatePlannedSession(formData);
    setSession(generated);
    setIsGenerating(false);
    setActiveTab('session');
  }, []);

  const handleLoadSaved = useCallback((loaded: PlannedSession) => {
    setSession(loaded);
    setActiveTab('session');
  }, []);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">
      <div className="relative max-w-[430px] mx-auto min-h-screen flex flex-col">
        <main className="flex-1 pb-[80px]">
          {activeTab === 'home' && (
            <HomeScreen
              onStartBuild={handleStartBuild}
              onViewSaved={() => setActiveTab('saved')}
            />
          )}
          {activeTab === 'build' && (
            <SessionBuilder
              initialSessionType={initialSessionType}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {activeTab === 'saved' && (
            <SavedSessions onLoad={handleLoadSaved} />
          )}
          {activeTab === 'session' && (
            <SessionView
              session={session}
              onUpdate={setSession}
              onBuildNew={() => setActiveTab('build')}
              onSave={save}
            />
          )}
        </main>
        <BottomNav active={activeTab} onChange={setActiveTab} hasSession={!!session} />
      </div>
    </div>
  );
}
