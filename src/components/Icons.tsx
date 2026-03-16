'use client';

import { SessionFocus, Equipment } from '@/types';

type SVGProps = { className?: string };

// ── Training Focus Icons ─────────────────────────────────────────────────────

const PossessionIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 10a7 7 0 0 0 7 7 7 7 0 0 0 6.2-3.7" />
    <path d="M17 10a7 7 0 0 0-7-7 7 7 0 0 0-6.2 3.7" />
    <polyline points="1.5 8 3.5 10.5 6 8.5" />
    <polyline points="18.5 12 16.5 9.5 14 11.5" />
  </svg>
);

const FinishingIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <path d="M5 14 L5 6 L15 6 L15 14" />
    <line x1="3" y1="14" x2="17" y2="14" />
    <line x1="3" y1="6" x2="3" y2="3" />
    <line x1="17" y1="6" x2="17" y2="3" />
    <circle cx="10" cy="17.5" r="1.8" fill="currentColor" fillOpacity="0.35" />
    <line x1="10" y1="15.7" x2="10" y2="11" strokeDasharray="1.5 1.2" />
  </svg>
);

const FirstTouchIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 16 L3 8 Q3 5 6 5 L9.5 5 L14 9 L17 9 Q18.5 9 18.5 11 Q18.5 13.5 16 14 L3 16 Z" />
    <line x1="1" y1="18" x2="19" y2="18" />
  </svg>
);

const CloseControlIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
    <circle cx="10" cy="10" r="8" />
    <circle cx="10" cy="10" r="4.5" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
  </svg>
);

const DribblingIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 14 L5.5 6 L9 14 L12.5 6 L16 12" />
    <circle cx="16" cy="12" r="2" strokeWidth="1.5" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

const LongPassingIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 15 Q10 3 18 8" />
    <polyline points="13.5 5 18 8 15 11.5" />
    <circle cx="2.5" cy="15" r="1.5" fill="currentColor" fillOpacity="0.35" />
  </svg>
);

const SmallSidedIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <rect x="2" y="3" width="16" height="14" rx="1" />
    <line x1="10" y1="3" x2="10" y2="17" strokeDasharray="2 1.5" strokeOpacity="0.45" />
    <rect x="2" y="7.5" width="2.5" height="5" rx="0.5" />
    <rect x="15.5" y="7.5" width="2.5" height="5" rx="0.5" />
  </svg>
);

const FitnessIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 2 L5 11 L10 11 L9 18 L15 9 L10 9 Z" />
  </svg>
);

const JugglingIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="10" cy="4.5" r="2.5" />
    <path d="M10 7v3" strokeDasharray="1.5 1.5" />
    <path d="M4 18Q7 13 10 13Q13 13 16 18" />
    <path d="M7 18l-1 2.5M13 18l1 2.5" strokeWidth="1.5" />
  </svg>
);

const GoalkeeperIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="5" width="16" height="10" rx="1" />
    <circle cx="10" cy="10" r="2" />
    <path d="M6.5 10h1.5M12 10h1.5" />
  </svg>
);

export const FOCUS_ICONS: Record<SessionFocus, (props: SVGProps) => JSX.Element> = {
  possession: PossessionIcon,
  finishing: FinishingIcon,
  'first-touch': FirstTouchIcon,
  'close-control': CloseControlIcon,
  dribbling: DribblingIcon,
  'long-passing': LongPassingIcon,
  'small-sided': SmallSidedIcon,
  fitness: FitnessIcon,
  juggling: JugglingIcon,
  goalkeeper: GoalkeeperIcon,
};

// ── Equipment Icons ───────────────────────────────────────────────────────────

const BallsIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <circle cx="10" cy="10" r="8" />
    <circle cx="10" cy="10" r="3" />
    <line x1="10" y1="2" x2="10" y2="7" />
    <line x1="10" y1="13" x2="10" y2="18" />
    <line x1="2" y1="10" x2="7" y2="10" />
    <line x1="13" y1="10" x2="18" y2="10" />
  </svg>
);

const ConesIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="10 3 17 17 3 17" />
    <line x1="6.5" y1="12" x2="13.5" y2="12" strokeOpacity="0.5" />
  </svg>
);

const PolesIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <line x1="7" y1="3" x2="7" y2="16" />
    <line x1="13" y1="3" x2="13" y2="16" />
    <line x1="4.5" y1="16" x2="9.5" y2="16" />
    <line x1="10.5" y1="16" x2="15.5" y2="16" />
  </svg>
);

const SmallGoalsIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <path d="M5 15 L5 7 L15 7 L15 15" />
    <line x1="3" y1="15" x2="17" y2="15" />
    <line x1="3" y1="7" x2="3" y2="5" />
    <line x1="17" y1="7" x2="17" y2="5" />
  </svg>
);

const FullGoalsIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <path d="M3 17 L3 6 L17 6 L17 17" />
    <line x1="1" y1="17" x2="19" y2="17" />
    <line x1="1" y1="6" x2="1" y2="3" />
    <line x1="19" y1="6" x2="19" y2="3" />
    <line x1="3" y1="10" x2="17" y2="10" strokeOpacity="0.4" strokeWidth="1.2" />
    <line x1="3" y1="14" x2="17" y2="14" strokeOpacity="0.4" strokeWidth="1.2" />
    <line x1="7.5" y1="6" x2="7.5" y2="17" strokeOpacity="0.4" strokeWidth="1.2" />
    <line x1="12.5" y1="6" x2="12.5" y2="17" strokeOpacity="0.4" strokeWidth="1.2" />
  </svg>
);

const RebounderIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <rect x="2" y="3" width="16" height="8" rx="1" />
    <path d="M7 14 L10 11 L13 14" />
    <line x1="10" y1="11" x2="10" y2="18" />
  </svg>
);

const MannequinsIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <circle cx="10" cy="4" r="2.5" />
    <line x1="10" y1="6.5" x2="10" y2="13" />
    <line x1="5" y1="9" x2="15" y2="9" />
    <line x1="10" y1="13" x2="7" y2="18" />
    <line x1="10" y1="13" x2="13" y2="18" />
  </svg>
);

const AgilityLadderIcon = ({ className }: SVGProps) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
    <line x1="6" y1="2" x2="6" y2="18" />
    <line x1="14" y1="2" x2="14" y2="18" />
    <line x1="6" y1="5" x2="14" y2="5" />
    <line x1="6" y1="9" x2="14" y2="9" />
    <line x1="6" y1="13" x2="14" y2="13" />
    <line x1="6" y1="17" x2="14" y2="17" />
  </svg>
);

export const EQUIP_ICONS: Record<Equipment, (props: SVGProps) => JSX.Element> = {
  balls: BallsIcon,
  cones: ConesIcon,
  poles: PolesIcon,
  'small-goals': SmallGoalsIcon,
  'full-goals': FullGoalsIcon,
  rebounder: RebounderIcon,
  mannequins: MannequinsIcon,
  'agility-ladder': AgilityLadderIcon,
};
