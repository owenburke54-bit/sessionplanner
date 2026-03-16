'use client';

import { SessionBlock } from '@/types';
import { BLOCK_META } from '@/lib/blockSessionGenerator';
import BlockVisual from './BlockVisual';

interface Props {
  block: SessionBlock;
  index: number;
  total: number;
  onEdit: (block: SessionBlock) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  onRemove: (id: string) => void;
}

const PencilIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function SessionBlockCard({ block, index, total, onEdit, onMove, onRemove }: Props) {
  const meta = BLOCK_META[block.blockType];

  return (
    <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl overflow-hidden">
      <div className="flex">
        {/* Colored accent bar */}
        <div className="w-1 shrink-0" style={{ backgroundColor: meta.color }} />

        <div className="flex-1 min-w-0">
          {/* Header row: icon · title/purpose · duration+reorder */}
          <div className="flex items-start gap-3 px-4 pt-4 pb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
            >
              <BlockVisual type={block.blockType} className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-bold text-white leading-tight truncate">{block.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">{block.purpose}</p>
            </div>

            {/* Duration pill + reorder pair */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ color: meta.color, backgroundColor: `${meta.color}15` }}
              >
                {block.duration}m
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onMove(index, 'up')}
                  disabled={index === 0}
                  className="w-7 h-7 rounded-lg bg-[#111827] border border-[#1a2340] flex items-center justify-center text-slate-400 active:bg-[#1e2a42] transition-colors disabled:opacity-20"
                  aria-label="Move up"
                >
                  <ChevronUpIcon />
                </button>
                <button
                  onClick={() => onMove(index, 'down')}
                  disabled={index === total - 1}
                  className="w-7 h-7 rounded-lg bg-[#111827] border border-[#1a2340] flex items-center justify-center text-slate-400 active:bg-[#1e2a42] transition-colors disabled:opacity-20"
                  aria-label="Move down"
                >
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Notes preview */}
          {block.notes && (
            <div className="px-4 pb-3">
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 italic">
                &ldquo;{block.notes}&rdquo;
              </p>
            </div>
          )}

          {/* Action row: Edit CTA + Remove icon */}
          <div className="flex items-center gap-2 px-3 pb-3 pt-1">
            <button
              onClick={() => onEdit(block)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-semibold active:bg-blue-600/20 transition-colors"
            >
              <PencilIcon />
              Edit
            </button>
            <button
              onClick={() => onRemove(block.id)}
              className="w-10 h-10 rounded-xl bg-[#111827] border border-[#1a2340] flex items-center justify-center text-slate-600 active:bg-red-900/20 active:text-red-400 transition-colors"
              aria-label="Remove block"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
