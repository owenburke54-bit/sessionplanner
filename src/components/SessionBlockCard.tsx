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

export default function SessionBlockCard({ block, index, total, onEdit, onMove, onRemove }: Props) {
  const meta = BLOCK_META[block.blockType];

  return (
    <div className="bg-[#0d1224] border border-[#1a2340] rounded-2xl overflow-hidden">
      <div className="flex">
        {/* Colored accent bar */}
        <div className="w-1 shrink-0" style={{ backgroundColor: meta.color }} />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
            >
              <BlockVisual type={block.blockType} className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white leading-tight truncate">{block.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">{block.purpose}</p>
            </div>

            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
              style={{ color: meta.color, backgroundColor: `${meta.color}15` }}
            >
              {block.duration}m
            </span>
          </div>

          {/* Notes preview */}
          {block.notes && (
            <div className="px-4 pb-3">
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 italic">
                &ldquo;{block.notes}&rdquo;
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex border-t border-[#1a2340]">
            <button
              onClick={() => onEdit(block)}
              className="flex-1 py-3 text-xs font-medium text-blue-400 active:bg-white/5 transition-colors"
            >
              Edit
            </button>
            <div className="w-px bg-[#1a2340]" />
            <button
              onClick={() => onMove(index, 'up')}
              disabled={index === 0}
              className="flex-1 py-3 text-xs font-medium text-slate-400 active:bg-white/5 transition-colors disabled:opacity-25"
            >
              ↑
            </button>
            <div className="w-px bg-[#1a2340]" />
            <button
              onClick={() => onMove(index, 'down')}
              disabled={index === total - 1}
              className="flex-1 py-3 text-xs font-medium text-slate-400 active:bg-white/5 transition-colors disabled:opacity-25"
            >
              ↓
            </button>
            <div className="w-px bg-[#1a2340]" />
            <button
              onClick={() => onRemove(block.id)}
              className="flex-1 py-3 text-xs font-medium text-red-400/70 active:bg-white/5 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
