'use client';

import { Tab } from '@/app/page';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  hasSession: boolean;
}

const HomeIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    {filled ? (
      <path
        d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
        fill="currentColor"
      />
    ) : (
      <>
        <path
          d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

const BuildIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
      fill={filled ? 'currentColor' : 'none'}
      fillOpacity={filled ? 0.15 : 0}
    />
    {filled ? (
      <>
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    )}
  </svg>
);

const SavedIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
      stroke="currentColor"
      strokeWidth={filled ? '2' : '1.6'}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
      fillOpacity={filled ? 0.15 : 0}
    />
  </svg>
);

const SessionIcon = ({ filled }: { filled: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="5"
      y="2"
      width="14"
      height="20"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
      fill={filled ? 'currentColor' : 'none'}
      fillOpacity={filled ? 0.12 : 0}
    />
    <path
      d="M9 7h6M9 11h6M9 15h4"
      stroke="currentColor"
      strokeWidth={filled ? '2' : '1.6'}
      strokeLinecap="round"
    />
  </svg>
);

const tabs: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'build', label: 'Build' },
  { id: 'saved', label: 'Saved' },
  { id: 'session', label: 'Session' },
];

function TabIcon({ id, filled }: { id: Tab; filled: boolean }) {
  if (id === 'home') return <HomeIcon filled={filled} />;
  if (id === 'build') return <BuildIcon filled={filled} />;
  if (id === 'saved') return <SavedIcon filled={filled} />;
  return <SessionIcon filled={filled} />;
}

export default function BottomNav({ active, onChange, hasSession }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto">
      <div className="border-t border-[#1a2340] bg-[#080c18]/95 backdrop-blur-xl safe-bottom">
        <div className="flex">
          {tabs.map(({ id, label }) => {
            const isActive = active === id;
            const disabled = id === 'session' && !hasSession;

            return (
              <button
                key={id}
                onClick={() => !disabled && onChange(id)}
                disabled={disabled}
                className={`
                  flex-1 flex flex-col items-center gap-1 py-3 px-1
                  transition-all duration-150
                  ${isActive ? 'text-blue-400' : disabled ? 'text-slate-700' : 'text-slate-500 active:text-slate-300'}
                `}
              >
                <TabIcon id={id} filled={isActive} />
                <span
                  className={`text-[10px] font-medium tracking-wide ${
                    isActive ? 'text-blue-400' : disabled ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-8 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
