'use client';

import { BlockType } from '@/types';
import { BLOCK_META } from '@/lib/blockSessionGenerator';
import BlockVisual from './BlockVisual';

const ALL_BLOCK_TYPES: BlockType[] = [
  'activation', 'warm-up', 'fitness', 'cooldown',
  'ball-mastery', 'short-passing', 'long-passing', 'passing-patterns',
  'dribbling', 'finishing', 'goalkeeper', 'possession',
  'small-sided', 'juggling',
];

interface Props {
  onAdd: (type: BlockType) => void;
  onClose: () => void;
}

export default function AddBlockSheet({ onAdd, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative w-full max-w-[430px] mx-auto bg-[#0d1224] border-t border-[#1a2340] rounded-t-3xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-0">
          <div className="w-10 h-1 bg-[#1a2340] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-[#1a2340]">
          <div>
            <h3 className="text-base font-bold text-white">Add Block</h3>
            <p className="text-xs text-slate-500 mt-0.5">Choose a phase type to add</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1a2340] flex items-center justify-center text-slate-400"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="px-5 py-4 pb-10 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-2.5">
            {ALL_BLOCK_TYPES.map((type) => {
              const meta = BLOCK_META[type];
              return (
                <button
                  key={type}
                  onClick={() => { onAdd(type); onClose(); }}
                  className="flex items-center gap-3 p-3.5 bg-[#111827] border border-[#1a2340] rounded-2xl active:scale-[0.97] transition-all text-left"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
                  >
                    <BlockVisual type={type} className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-sm font-semibold text-white leading-tight">{meta.defaultTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
