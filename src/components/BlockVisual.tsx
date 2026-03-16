'use client';

import { BlockType } from '@/types';

interface Props {
  type: BlockType;
  className?: string;
}

export default function BlockVisual({ type, className = 'w-10 h-10' }: Props) {
  const base = {
    viewBox: '0 0 24 24' as const,
    fill: 'none' as const,
    stroke: 'currentColor' as const,
    strokeWidth: '1.8' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (type) {
    case 'activation':
      return (
        <svg {...base}>
          <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" />
        </svg>
      );
    case 'warm-up':
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M5 15l4-5 3 2 2-4" />
          <path d="M8 20l2-4 5-1" />
        </svg>
      );
    case 'fitness':
      return (
        <svg {...base}>
          <path d="M6.5 12h2M15.5 12h2M3 12h2M19 12h2" />
          <path d="M5 9v6M8.5 10v4M15.5 10v4M19 9v6" />
        </svg>
      );
    case 'cooldown':
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v5" />
          <path d="M8 19l4-7 4 7" />
          <path d="M7 14l5 2 5-2" />
        </svg>
      );
    case 'ball-mastery':
      return (
        <svg {...base}>
          <circle cx="12" cy="11" r="5" />
          <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M9 6.5l-2-2M15 6.5l2-2M7 11H4M20 11h-3" />
        </svg>
      );
    case 'short-passing':
      return (
        <svg {...base}>
          <circle cx="4.5" cy="12" r="2" />
          <circle cx="19.5" cy="12" r="2" />
          <path d="M7 12h7" />
          <polyline points="11 9 14 12 11 15" />
        </svg>
      );
    case 'long-passing':
      return (
        <svg {...base}>
          <path d="M3 17Q12 3 21 8" />
          <polyline points="16 5 21 8 18 13" />
          <circle cx="3" cy="17" r="1.5" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );
    case 'passing-patterns':
      return (
        <svg {...base}>
          <path d="M12 4l8 14H4L12 4Z" />
          <polyline points="9 13 12 4 15 13" />
        </svg>
      );
    case 'dribbling':
      return (
        <svg {...base}>
          <path d="M3 17L7 7l4 10 4-10 4 5" />
          <circle cx="19" cy="12" r="2" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );
    case 'finishing':
      return (
        <svg {...base}>
          <path d="M5 15V7h14v8" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <circle cx="12" cy="19" r="2" fill="currentColor" fillOpacity="0.3" />
          <line x1="12" y1="17" x2="12" y2="13" strokeDasharray="1.5 1.2" />
        </svg>
      );
    case 'goalkeeper':
      return (
        <svg {...base}>
          <rect x="2" y="6" width="20" height="12" rx="1" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M8 12h1.5M14.5 12H16" />
        </svg>
      );
    case 'possession':
      return (
        <svg {...base}>
          <path d="M3 12a9 9 0 1 0 9-9" />
          <polyline points="2 8 3 12 7 11" />
          <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );
    case 'small-sided':
      return (
        <svg {...base}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="2 1.5" strokeOpacity="0.5" />
          <rect x="3" y="9" width="3" height="6" rx="0.5" />
          <rect x="18" y="9" width="3" height="6" rx="0.5" />
        </svg>
      );
    case 'juggling':
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 7.5v3.5" strokeDasharray="1.5 1.5" />
          <path d="M6 19Q9 14 12 14Q15 14 18 19" />
          <path d="M9 19l-1.5 3M15 19l1.5 3" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg {...base}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}
