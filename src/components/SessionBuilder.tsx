'use client';

import { useState } from 'react';
import {
  AgeGroup,
  Equipment,
  FieldSize,
  SessionFormData,
  SessionLength,
  SessionType,
  SkillLevel,
  TrainingFocus,
} from '@/types';

interface Props {
  initialSessionType: SessionType;
  onGenerate: (data: SessionFormData) => void;
  isGenerating: boolean;
}

// ── Option data ─────────────────────────────────────────────────────────────
const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: 'u8-u10', label: 'U8–U10' },
  { value: 'u11-u13', label: 'U11–U13' },
  { value: 'u14-u16', label: 'U14–U16' },
  { value: 'u17-u19', label: 'U17–U19' },
  { value: 'college-adult', label: 'College / Adult' },
];

const SKILL_LEVELS: { value: SkillLevel; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'Learning the basics' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Solid fundamentals' },
  { value: 'advanced', label: 'Advanced', desc: 'High performance' },
];

const FIELD_SIZES: { value: FieldSize; label: string; sub: string }[] = [
  { value: 'small-box', label: 'Small Box', sub: '10×10 yd' },
  { value: 'small-half', label: 'Small Half', sub: '30×20 yd' },
  { value: 'full-half', label: 'Full Half', sub: '50×35 yd' },
  { value: 'full-field', label: 'Full Field', sub: '100×70 yd' },
];

const SESSION_LENGTHS: SessionLength[] = [30, 45, 60, 75, 90];

const FOCUS_OPTIONS: { value: TrainingFocus; label: string; icon: string; color: string }[] = [
  { value: 'possession', label: 'Possession', icon: '⚽', color: '#3b82f6' },
  { value: 'finishing', label: 'Finishing', icon: '🎯', color: '#ef4444' },
  { value: 'first-touch', label: 'First Touch', icon: '🦶', color: '#a855f7' },
  { value: 'close-control', label: 'Close Control', icon: '🔄', color: '#14b8a6' },
  { value: 'dribbling', label: 'Dribbling', icon: '⚡', color: '#f59e0b' },
  { value: 'long-passing', label: 'Long Passing', icon: '📡', color: '#22c55e' },
  { value: 'small-sided', label: 'Small Sided', icon: '🏃', color: '#ec4899' },
  { value: 'fitness', label: 'Fitness', icon: '💪', color: '#f97316' },
];

const EQUIPMENT_OPTIONS: { value: Equipment; label: string; icon: string }[] = [
  { value: 'balls', label: 'Balls', icon: '⚽' },
  { value: 'cones', label: 'Cones', icon: '🔶' },
  { value: 'pinnies', label: 'Pinnies', icon: '🦺' },
  { value: 'small-goals', label: 'Small Goals', icon: '🥅' },
  { value: 'full-goals', label: 'Full Goals', icon: '⬜' },
  { value: 'rebounder', label: 'Rebounder', icon: '🪃' },
  { value: 'mannequins', label: 'Mannequins', icon: '🗿' },
  { value: 'agility-ladder', label: 'Agility Ladder', icon: '🪜' },
];

// ── Sub-components ──────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2.5">
    {children}
  </p>
);

// ── Main Component ──────────────────────────────────────────────────────────
export default function SessionBuilder({ initialSessionType, onGenerate, isGenerating }: Props) {
  const [sessionType, setSessionType] = useState<SessionType>(initialSessionType);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('college-adult');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('intermediate');
  const [playerCount, setPlayerCount] = useState(4);
  const [fieldSize, setFieldSize] = useState<FieldSize>('small-half');
  const [sessionLength, setSessionLength] = useState<SessionLength>(60);
  const [focus, setFocus] = useState<TrainingFocus>('possession');
  const [equipment, setEquipment] = useState<Equipment[]>(['balls', 'cones']);

  const toggleEquipment = (item: Equipment) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    onGenerate({
      sessionType,
      ageGroup,
      skillLevel,
      playerCount,
      fieldSize,
      sessionLength,
      focus,
      equipment,
    });
  };

  const sessionTypeOptions: { value: SessionType; label: string }[] = [
    { value: 'solo', label: 'Solo' },
    { value: 'small-group', label: 'Small Group' },
    { value: 'trainer', label: 'Trainer' },
  ];

  return (
    <div className="relative pb-4">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340] px-5 py-4">
        <h2 className="text-lg font-bold text-white">Build Session</h2>
        <p className="text-xs text-slate-500 mt-0.5">Customise your training session</p>
      </div>

      <div className="px-5 pt-5 space-y-7">
        {/* Session Type */}
        <div>
          <SectionLabel>Session type</SectionLabel>
          <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl p-1.5 flex gap-1.5">
            {sessionTypeOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSessionType(value)}
                className={`
                  flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150
                  ${
                    sessionType === value
                      ? 'bg-blue-600 text-white shadow-glow-sm'
                      : 'text-slate-400 active:bg-white/5'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Age Group */}
        <div>
          <SectionLabel>Age group</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setAgeGroup(value)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 border
                  ${
                    ageGroup === value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:border-slate-600'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div>
          <SectionLabel>Skill level</SectionLabel>
          <div className="grid grid-cols-3 gap-2.5">
            {SKILL_LEVELS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setSkillLevel(value)}
                className={`
                  flex flex-col items-center py-3.5 px-2 rounded-2xl border transition-all duration-150
                  ${
                    skillLevel === value
                      ? 'bg-blue-600/15 border-blue-500/60 text-white'
                      : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'
                  }
                `}
              >
                <span className="text-sm font-semibold">{label}</span>
                <span className={`text-[10px] mt-0.5 text-center leading-tight ${skillLevel === value ? 'text-blue-300' : 'text-slate-600'}`}>
                  {desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Number of Players */}
        <div>
          <SectionLabel>Number of players</SectionLabel>
          <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl p-4 flex items-center gap-4">
            <button
              onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
              className="w-11 h-11 rounded-xl bg-[#1a2340] text-white text-xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-bold text-white">{playerCount}</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {playerCount === 1 ? 'player' : 'players'}
              </p>
            </div>
            <button
              onClick={() => setPlayerCount(Math.min(20, playerCount + 1))}
              className="w-11 h-11 rounded-xl bg-[#1a2340] text-white text-xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Field Size */}
        <div>
          <SectionLabel>Field size</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5">
            {FIELD_SIZES.map(({ value, label, sub }) => (
              <button
                key={value}
                onClick={() => setFieldSize(value)}
                className={`
                  flex flex-col items-start p-4 rounded-2xl border transition-all duration-150
                  ${
                    fieldSize === value
                      ? 'bg-blue-600/15 border-blue-500/60'
                      : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'
                  }
                `}
              >
                <span className={`text-sm font-semibold ${fieldSize === value ? 'text-white' : 'text-slate-300'}`}>
                  {label}
                </span>
                <span className={`text-[11px] mt-0.5 ${fieldSize === value ? 'text-blue-300' : 'text-slate-500'}`}>
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Session Length */}
        <div>
          <SectionLabel>Session length</SectionLabel>
          <div className="flex gap-2">
            {SESSION_LENGTHS.map((len) => (
              <button
                key={len}
                onClick={() => setSessionLength(len)}
                className={`
                  flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-150
                  ${
                    sessionLength === len
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'
                  }
                `}
              >
                {len}m
              </button>
            ))}
          </div>
        </div>

        {/* Training Focus */}
        <div>
          <SectionLabel>Training focus</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5">
            {FOCUS_OPTIONS.map(({ value, label, icon, color }) => {
              const active = focus === value;
              return (
                <button
                  key={value}
                  onClick={() => setFocus(value)}
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-150
                    ${active ? 'border-opacity-60' : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'}
                  `}
                  style={
                    active
                      ? {
                          backgroundColor: `${color}1a`,
                          borderColor: `${color}66`,
                        }
                      : {}
                  }
                >
                  <span className="text-xl leading-none">{icon}</span>
                  <span
                    className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-400'}`}
                  >
                    {label}
                  </span>
                  {active && (
                    <span className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <SectionLabel>Equipment available</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT_OPTIONS.map(({ value, label, icon }) => {
              const active = equipment.includes(value);
              return (
                <button
                  key={value}
                  onClick={() => toggleEquipment(value)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-sm font-medium border transition-all duration-150
                    ${
                      active
                        ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'
                    }
                  `}
                >
                  <span className="text-base leading-none">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate button */}
        <div className="pt-2 pb-6">
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="
              w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200
              bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
              text-white shadow-lg shadow-blue-600/25 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-3
            "
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="2.5" />
                  <path
                    d="M12 2a10 10 0 019.5 6.8"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                Building your session…
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 5.5 2.4-7.2L2 9.2h7.6z"
                    fill="white"
                  />
                </svg>
                Generate Session
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
