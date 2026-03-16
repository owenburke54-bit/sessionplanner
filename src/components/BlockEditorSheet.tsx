'use client';

import { useState } from 'react';
import { SessionBlock } from '@/types';
import { BLOCK_META } from '@/lib/blockSessionGenerator';
import BlockVisual from './BlockVisual';

interface Props {
  block: SessionBlock;
  onSave: (updated: SessionBlock) => void;
  onClose: () => void;
}

export default function BlockEditorSheet({ block, onSave, onClose }: Props) {
  const [title, setTitle] = useState(block.title);
  const [duration, setDuration] = useState(block.duration);
  const [notes, setNotes] = useState(block.notes);
  const meta = BLOCK_META[block.blockType];

  const handleSave = () => {
    onSave({ ...block, title: title.trim() || meta.defaultTitle, duration, notes });
    onClose();
  };

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
        <div className="flex items-center gap-3 px-5 pt-4 pb-4 border-b border-[#1a2340]">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
          >
            <BlockVisual type={block.blockType} className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: meta.color }}
            >
              {meta.defaultTitle}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{meta.purpose}</p>
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

        <div className="px-5 py-5 space-y-5 overflow-y-auto max-h-[65vh]">
          {/* Title */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">
              Block Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={meta.defaultTitle}
              className="w-full bg-[#111827] border border-[#1a2340] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">
              Duration
            </label>
            <div className="flex items-center gap-4 bg-[#111827] border border-[#1a2340] rounded-xl p-3">
              <button
                onClick={() => setDuration(Math.max(5, duration - 5))}
                className="w-10 h-10 rounded-xl bg-[#1a2340] text-white text-xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-bold text-white tabular-nums">{duration}</span>
                <span className="text-slate-500 ml-1 text-sm">min</span>
              </div>
              <button
                onClick={() => setDuration(Math.min(60, duration + 5))}
                className="w-10 h-10 rounded-xl bg-[#1a2340] text-white text-xl font-bold flex items-center justify-center active:bg-[#252f48] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block mb-2">
              Notes / Drill Ideas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your own drills, coaching points, or reminders…"
              rows={4}
              className="w-full bg-[#111827] border border-[#1a2340] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-all active:scale-[0.98]"
          >
            Save Block
          </button>
        </div>
      </div>
    </div>
  );
}
