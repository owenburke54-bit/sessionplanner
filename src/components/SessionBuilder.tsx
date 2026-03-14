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
import { FOCUS_ICONS, EQUIP_ICONS } from './Icons';

interface Props {
  initialSessionType: SessionType;
  onGenerate: (data: SessionFormData) => void;
  isGenerating: boolean;
}

// ── Option data ─────────────────────────────────────────────────────────────
const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: 'u8-u10',        label: 'U8–U10' },
  { value: 'u11-u13',       label: 'U11–U13' },
  { value: 'u14-u16',       label: 'U14–U16' },
  { value: 'u17-u19',       label: 'U17–U19' },
  { value: 'college-adult', label: 'Adult' },
];

const SKILL_LEVELS: { value: SkillLevel; label: string; desc: string }[] = [
  { value: 'beginner',     label: 'Beginner',     desc: 'Learning the basics' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Solid fundamentals' },
  { value: 'advanced',     label: 'Advanced',     desc: 'High performance' },
];

const FIELD_SIZES: { value: FieldSize; label: string; sub: string }[] = [
  { value: 'small-box',  label: 'Small Box',   sub: '10×10 yd' },
  { value: 'small-half', label: 'Small Half',  sub: '30×20 yd' },
  { value: 'full-half',  label: 'Full Half',   sub: '50×35 yd' },
  { value: 'full-field', label: 'Full Field',  sub: '100×70 yd' },
];

const SESSION_LENGTHS: { value: SessionLength; label: string }[] = [
  { value: 30, label: '30m' },
  { value: 45, label: '45m' },
  { value: 60, label: '60m' },
  { value: 75, label: '75m' },
  { value: 90, label: '90m' },
];

const FOCUS_OPTIONS: { value: TrainingFocus; label: string; color: string }[] = [
  { value: 'possession',    label: 'Possession',    color: '#3b82f6' },
  { value: 'finishing',     label: 'Finishing',     color: '#ef4444' },
  { value: 'first-touch',   label: 'First Touch',   color: '#a855f7' },
  { value: 'close-control', label: 'Close Control', color: '#14b8a6' },
  { value: 'dribbling',     label: 'Dribbling',     color: '#f59e0b' },
  { value: 'long-passing',  label: 'Long Passing',  color: '#22c55e' },
  { value: 'small-sided',   label: 'Small Sided',   color: '#ec4899' },
  { value: 'fitness',       label: 'Fitness',       color: '#f97316' },
];

const EQUIPMENT_OPTIONS: { value: Equipment; label: string }[] = [
  { value: 'balls',           label: 'Balls' },
  { value: 'cones',           label: 'Cones' },
  { value: 'poles',           label: 'Poles' },
  { value: 'small-goals',     label: 'Small Goals' },
  { value: 'full-goals',      label: 'Full Goals' },
  { value: 'rebounder',       label: 'Rebounder' },
  { value: 'mannequins',      label: 'Mannequins' },
  { value: 'agility-ladder',  label: 'Agility Ladder' },
];

const SESSION_TYPE_OPTIONS: { value: SessionType; label: string; sub: string }[] = [
  { value: 'personal', label: 'For Me / My Group', sub: 'Solo or small group play' },
  { value: 'trainer',  label: 'Trainer Plan',       sub: 'Structured client session' },
];

// ── Sub-component ───────────────────────────────────────────────────────────
const SectionLabel = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
  <div className="flex items-baseline gap-2 mb-3">
    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">{children}</p>
    {hint && <p className="text-[10px] text-slate-700">{hint}</p>}
  </div>
);

// ── Main component ──────────────────────────────────────────────────────────
export default function SessionBuilder({ initialSessionType, onGenerate, isGenerating }: Props) {
  const [sessionType,  setSessionType]  = useState<SessionType>(initialSessionType);
  const [playerCount,  setPlayerCount]  = useState(4);
  const [ageGroup,     setAgeGroup]     = useState<AgeGroup>('college-adult');
  const [skillLevel,   setSkillLevel]   = useState<SkillLevel>('intermediate');
  const [sessionLength,setSessionLength]= useState<SessionLength>(60);
  const [fieldSize,    setFieldSize]    = useState<FieldSize>('small-half');
  const [focuses,      setFocuses]      = useState<TrainingFocus[]>(['possession']);
  const [equipment,    setEquipment]    = useState<Equipment[]>(['balls', 'cones']);

  const MAX_FOCUSES = 3;

  const toggleFocus = (value: TrainingFocus) => {
    setFocuses((prev) => {
      if (prev.includes(value)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((f) => f !== value);
      }
      if (prev.length >= MAX_FOCUSES) return prev; // cap at 3
      return [...prev, value];
    });
  };

  const toggleEquipment = (item: Equipment) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item],
    );
  };

  const handleSubmit = () => {
    onGenerate({
      sessionType,
      playerCount,
      ageGroup,
      skillLevel,
      sessionLength,
      fieldSize,
      focuses,
      equipment,
    });
  };

  return (
    <div className="relative pb-4">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340] px-5 py-4">
        <h2 className="text-lg font-bold text-white">Build Session</h2>
        <p className="text-xs text-slate-500 mt-0.5">Customise your training session</p>
      </div>

      <div className="px-5 pt-5 space-y-7">

        {/* 1. Session Type */}
        <div>
          <SectionLabel>Session type</SectionLabel>
          <div className="flex flex-col gap-2">
            {SESSION_TYPE_OPTIONS.map(({ value, label, sub }) => {
              const active = sessionType === value;
              return (
                <button
                  key={value}
                  onClick={() => setSessionType(value)}
                  className={`
                    flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-150 text-left
                    ${active
                      ? 'bg-blue-600/15 border-blue-500/50'
                      : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'}
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      active ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                    }`}
                  >
                    {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-300'}`}>
                      {label}
                    </p>
                    <p className={`text-[11px] ${active ? 'text-blue-300' : 'text-slate-600'}`}>{sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Number of Players */}
        <div>
          <SectionLabel>Number of players</SectionLabel>
          <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                className="w-12 h-12 rounded-xl bg-[#1a2340] text-white text-2xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-white tabular-nums">{playerCount}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {playerCount === 1 ? 'player (solo)' : 'players'}
                </p>
              </div>
              <button
                onClick={() => setPlayerCount(Math.min(20, playerCount + 1))}
                className="w-12 h-12 rounded-xl bg-[#1a2340] text-white text-2xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
              >
                +
              </button>
            </div>
            {/* Context hint */}
            <p className="text-[10px] text-slate-600 text-center mt-3">
              {playerCount === 1
                ? 'Solo mode — individual drills only'
                : playerCount <= 4
                ? 'Small group — partner and pair drills available'
                : 'Group — full range of activities available'}
            </p>
          </div>
        </div>

        {/* 3. Age Group */}
        <div>
          <SectionLabel>Age group</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setAgeGroup(value)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150
                  ${ageGroup === value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:border-slate-600'}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Skill Level */}
        <div>
          <SectionLabel>Skill level</SectionLabel>
          <div className="grid grid-cols-3 gap-2.5">
            {SKILL_LEVELS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setSkillLevel(value)}
                className={`
                  flex flex-col items-center py-3.5 px-2 rounded-2xl border transition-all duration-150
                  ${skillLevel === value
                    ? 'bg-blue-600/15 border-blue-500/60 text-white'
                    : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'}
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

        {/* 5. Session Length */}
        <div>
          <SectionLabel>Session length</SectionLabel>
          <div className="flex gap-2">
            {SESSION_LENGTHS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSessionLength(value)}
                className={`
                  flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-150
                  ${sessionLength === value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Field Size */}
        <div>
          <SectionLabel>Field size</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5">
            {FIELD_SIZES.map(({ value, label, sub }) => (
              <button
                key={value}
                onClick={() => setFieldSize(value)}
                className={`
                  flex flex-col items-start p-4 rounded-2xl border transition-all duration-150
                  ${fieldSize === value
                    ? 'bg-blue-600/15 border-blue-500/60'
                    : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'}
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

        {/* 7. Training Focus — multi-select */}
        <div>
          <SectionLabel hint={`${focuses.length}/${MAX_FOCUSES} selected`}>
            Training focus
          </SectionLabel>
          <p className="text-[11px] text-slate-600 -mt-2 mb-3">Select up to 3 areas</p>
          <div className="grid grid-cols-2 gap-2.5">
            {FOCUS_OPTIONS.map(({ value, label, color }) => {
              const active = focuses.includes(value);
              const isMaxed = focuses.length >= MAX_FOCUSES && !active;
              const FocusIcon = FOCUS_ICONS[value];
              const order = active ? focuses.indexOf(value) + 1 : null;

              return (
                <button
                  key={value}
                  onClick={() => toggleFocus(value)}
                  disabled={isMaxed}
                  className={`
                    relative flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-150
                    ${active ? '' : isMaxed ? 'opacity-35 cursor-not-allowed' : 'bg-[#0d1224] border-[#1a2340] active:bg-white/5'}
                  `}
                  style={
                    active
                      ? { backgroundColor: `${color}18`, borderColor: `${color}55` }
                      : {}
                  }
                >
                  {/* Icon */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={
                      active
                        ? { backgroundColor: `${color}25`, color: color }
                        : { backgroundColor: '#1a2340', color: '#475569' }
                    }
                  >
                    <FocusIcon className="w-[18px] h-[18px]" />
                  </div>
                  {/* Label */}
                  <span className={`text-sm font-semibold flex-1 text-left ${active ? 'text-white' : 'text-slate-400'}`}>
                    {label}
                  </span>
                  {/* Order badge */}
                  {active && order && (
                    <span
                      className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: color }}
                    >
                      {order}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. Equipment */}
        <div>
          <SectionLabel>Equipment available</SectionLabel>
          <div className="grid grid-cols-2 gap-2.5">
            {EQUIPMENT_OPTIONS.map(({ value, label }) => {
              const active = equipment.includes(value);
              const EquipIcon = EQUIP_ICONS[value];
              return (
                <button
                  key={value}
                  onClick={() => toggleEquipment(value)}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border transition-all duration-150
                    ${active
                      ? 'bg-emerald-600/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#0d1224] border-[#1a2340] text-slate-400 active:bg-white/5'}
                  `}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      active ? 'bg-emerald-700/30' : 'bg-[#1a2340]'
                    }`}
                  >
                    <EquipIcon className="w-[17px] h-[17px]" />
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                  {active && (
                    <svg className="ml-auto shrink-0 w-4 h-4 text-emerald-400" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="currentColor" fillOpacity="0.2" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
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
                  <path d="M12 2a10 10 0 019.5 6.8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Building your session…
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 5.5 2.4-7.2L2 9.2h7.6z" fill="white" />
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
