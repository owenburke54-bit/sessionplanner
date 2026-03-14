'use client';

import { useEffect } from 'react';
import { Drill, SessionDrill } from '@/types';
import FieldDiagram from './FieldDiagram';

interface Props {
  current: SessionDrill;
  alternatives: Drill[];
  onSwap: (drill: Drill) => void;
  onClose: () => void;
}

export default function SwapDrillSheet({ current, alternatives, onSwap, onClose }: Props) {
  // Prevent body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-[430px] mx-auto bg-[#0d1224] border-t border-[#1a2340] rounded-t-3xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-[#1a2340] rounded-full" />
        </div>

        {/* Title */}
        <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-[#1a2340]">
          <div>
            <h3 className="text-base font-bold text-white">Swap Drill</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Currently: <span className="text-slate-400">{current.drill.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a2340] flex items-center justify-center text-slate-400 active:bg-[#252f48]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Options */}
        <div className="overflow-y-auto max-h-[65vh] px-5 py-4 space-y-3 pb-8">
          {alternatives.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-400 text-sm">No alternatives available for this section.</p>
              <p className="text-slate-600 text-xs mt-1">Try adjusting your player count or skill level.</p>
            </div>
          ) : (
            alternatives.map((drill) => (
              <button
                key={drill.id}
                onClick={() => onSwap(drill)}
                className="
                  w-full flex gap-3 p-3 rounded-2xl border border-[#1a2340]
                  bg-[#111827] active:bg-[#1a2340] transition-colors text-left
                "
              >
                {/* Mini diagram */}
                <FieldDiagram
                  type={drill.diagramType}
                  className="w-20 h-14 shrink-0 rounded-xl"
                />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">{drill.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {drill.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
                      {drill.duration} min
                    </span>
                    <span className="text-[10px] text-slate-500 bg-[#1a2340] px-2 py-0.5 rounded-full">
                      {drill.playersMin}–{drill.playersMax}p
                    </span>
                  </div>
                </div>
                {/* Arrow */}
                <div className="shrink-0 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
