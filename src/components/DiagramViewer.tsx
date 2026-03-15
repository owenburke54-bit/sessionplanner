'use client';

import { useEffect } from 'react';
import { DiagramType } from '@/types';
import FieldDiagram from './FieldDiagram';

interface Props {
  type: DiagramType;
  title: string;
  onClose: () => void;
}

export default function DiagramViewer({ type, title, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[400px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-sm font-semibold text-white truncate pr-3">{title}</p>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 active:bg-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Diagram */}
        <FieldDiagram type={type} className="w-full rounded-2xl shadow-2xl" />

        <p className="text-center text-xs text-white/30 mt-3">Tap anywhere to close</p>
      </div>
    </div>
  );
}
