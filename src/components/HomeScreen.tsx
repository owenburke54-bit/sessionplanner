'use client';

import { useState } from 'react';
import { SessionType } from '@/types';

interface Props {
  onStartBuild: (type: SessionType) => void;
  onBrowseDrills: () => void;
}

const sessionTypeOptions: { value: SessionType; label: string; sub: string }[] = [
  { value: 'solo', label: 'Solo', sub: 'Just you + a ball' },
  { value: 'small-group', label: 'Small Group', sub: '2–6 players' },
  { value: 'trainer', label: 'Trainer', sub: 'Running a session' },
];

export default function HomeScreen({ onStartBuild, onBrowseDrills }: Props) {
  const [selectedType, setSelectedType] = useState<SessionType>('small-group');

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large glow blobs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-0 w-56 h-56 bg-emerald-600/8 rounded-full blur-[60px]" />
        {/* Field circle */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border border-white/[0.04]" />
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-3 h-3 -translate-y-1/2 rounded-full bg-white/[0.06]" />
        {/* Pitch lines */}
        <div className="absolute top-[14%] left-6 right-6 h-px bg-white/[0.04]" />
        <div className="absolute top-[32%] left-6 right-6 h-px bg-white/[0.04]" />
      </div>

      {/* ── Hero ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-6">
        {/* Logo mark */}
        <div className="mb-8">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-emerald-500 flex items-center justify-center shadow-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path
                  d="M12 3 L14 8 L19 8 L15 11 L16.5 16 L12 13 L7.5 16 L9 11 L5 8 L10 8 Z"
                  fill="white"
                  fillOpacity="0.9"
                />
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
        <p className="text-center text-slate-300 text-base leading-relaxed max-w-[280px] mb-12">
          Build smarter soccer training sessions for individuals and small groups.
        </p>

        {/* Session type selector */}
        <div className="w-full mb-5">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-2.5 text-center font-medium">
            Session type
          </p>
          <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl p-1.5 flex gap-1.5">
            {sessionTypeOptions.map(({ value, label, sub }) => (
              <button
                key={value}
                onClick={() => setSelectedType(value)}
                className={`
                  flex-1 flex flex-col items-center py-3 px-1 rounded-xl transition-all duration-150
                  ${
                    selectedType === value
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-400 active:bg-white/5'
                  }
                `}
              >
                <span className="text-sm font-semibold">{label}</span>
                <span
                  className={`text-[10px] mt-0.5 ${
                    selectedType === value ? 'text-blue-200' : 'text-slate-600'
                  }`}
                >
                  {sub}
                </span>
              </button>
            ))}
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
          onClick={onBrowseDrills}
          className="w-full py-3 text-slate-400 hover:text-slate-200 font-medium text-sm transition-colors"
        >
          Browse Drill Library →
        </button>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative px-6 pb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Drills', value: '35+', accent: 'text-blue-400' },
            { label: 'Focus Areas', value: '8', accent: 'text-emerald-400' },
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
