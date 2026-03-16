'use client';

import { useState } from 'react';
import { SessionType } from '@/types';

interface Props {
  onStartBuild: (type: SessionType) => void;
  onViewSaved: () => void;
}

const sessionTypeOptions: {
  value: SessionType;
  label: string;
  sub: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'personal',
    label: 'For Me / My Group',
    sub: 'Build a session for yourself or a small group',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      </svg>
    ),
  },
  {
    value: 'trainer',
    label: 'Trainer Plan',
    sub: 'Plan a session for clients or a team',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 10h8M8 14h5" />
        <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.15" />
        <path d="M14.5 16l1 1 2-2" />
      </svg>
    ),
  },
];

export default function HomeScreen({ onStartBuild, onViewSaved }: Props) {
  const [selectedType, setSelectedType] = useState<SessionType>('personal');

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-0 w-56 h-56 bg-emerald-600/8 rounded-full blur-[60px]" />
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border border-white/[0.04]" />
        <div className="absolute top-[14%] left-6 right-6 h-px bg-white/[0.04]" />
        <div className="absolute top-[32%] left-6 right-6 h-px bg-white/[0.04]" />
      </div>

      {/* ── Hero ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-500 flex items-center justify-center shadow-glow">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M12 3L14 8H19L15 11L16.5 16L12 13L7.5 16L9 11L5 8H10Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">
                SessionPlanner
              </h1>
              <p className="text-[11px] text-slate-500 tracking-widest uppercase mt-0.5">
                Soccer Training
              </p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-slate-300 text-base leading-relaxed max-w-[280px] mb-10">
          Build smarter soccer training sessions for individuals and small groups.
        </p>

        {/* Session type selector */}
        <div className="w-full mb-5">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-3 text-center font-medium">
            Who is this session for?
          </p>
          <div className="flex flex-col gap-2.5">
            {sessionTypeOptions.map(({ value, label, sub, icon }) => {
              const active = selectedType === value;
              return (
                <button
                  key={value}
                  onClick={() => setSelectedType(value)}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border transition-all duration-150 text-left
                    ${
                      active
                        ? 'bg-blue-600/15 border-blue-500/50 shadow-glow-sm'
                        : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      active ? 'bg-blue-600 text-white' : 'bg-[#1a2340] text-slate-400'
                    }`}
                  >
                    {icon}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-300'}`}>
                      {label}
                    </p>
                    <p className={`text-[11px] mt-0.5 leading-snug ${active ? 'text-blue-300' : 'text-slate-600'}`}>
                      {sub}
                    </p>
                  </div>
                  {/* Radio indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      active ? 'border-blue-500 bg-blue-500' : 'border-slate-700'
                    }`}
                  >
                    {active && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => onStartBuild(selectedType)}
          className="
            w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700
            text-white font-semibold rounded-2xl text-base
            transition-all duration-150 active:scale-[0.98]
            shadow-lg shadow-blue-600/25 mb-3
          "
        >
          Build Session
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onViewSaved}
          className="w-full py-3 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors"
        >
          View Saved Sessions →
        </button>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative px-6 pb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Block Types', value: '14', accent: 'text-blue-400' },
            { label: 'Focus Areas', value: '10', accent: 'text-emerald-400' },
            { label: 'Age Groups', value: '5', accent: 'text-blue-400' },
          ].map(({ label, value, accent }) => (
            <div
              key={label}
              className="bg-[#0d1224] border border-[#1a2340] rounded-2xl p-4 text-center"
            >
              <p className={`text-xl font-bold ${accent}`}>{value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
