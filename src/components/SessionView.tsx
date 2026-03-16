'use client';

import { useState } from 'react';
import { PlannedSession, SessionBlock, BlockType } from '@/types';
import { BLOCK_META } from '@/lib/blockSessionGenerator';
import SessionBlockCard from './SessionBlockCard';
import BlockEditorSheet from './BlockEditorSheet';
import AddBlockSheet from './AddBlockSheet';

interface Props {
  session: PlannedSession | null;
  onUpdate: (session: PlannedSession) => void;
  onBuildNew: () => void;
  onSave: (session: PlannedSession) => void;
}

const FOCUS_LABELS: Record<string, string> = {
  'possession':    'Possession',
  'finishing':     'Finishing',
  'first-touch':   'First Touch',
  'close-control': 'Close Control',
  'dribbling':     'Dribbling',
  'long-passing':  'Long Passing',
  'small-sided':   'Small Sided',
  'fitness':       'Fitness',
  'juggling':      'Juggling',
  'goalkeeper':    'Goalkeeper',
};

const AGE_LABELS: Record<string, string> = {
  'u8-u10':        'U8–U10',
  'u11-u13':       'U11–U13',
  'u14-u16':       'U14–U16',
  'u17-u19':       'U17–U19',
  'college-adult': 'Adult',
};

function EmptySession({ onBuildNew }: { onBuildNew: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#0d1224] border border-[#1a2340] flex items-center justify-center mb-5 text-3xl">
        📋
      </div>
      <h3 className="text-lg font-bold text-white mb-2">No session yet</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-[240px]">
        Build your first training session to see it here.
      </p>
      <button
        onClick={onBuildNew}
        className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-all active:scale-95"
      >
        Build Session
      </button>
    </div>
  );
}

let _blockCounter = 0;
function nextBlockId(): string {
  return `sb-${Date.now()}-${++_blockCounter}`;
}

export default function SessionView({ session, onUpdate, onBuildNew, onSave }: Props) {
  const [editing, setEditing] = useState<SessionBlock | null>(null);
  const [addingBlock, setAddingBlock] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!session) return <EmptySession onBuildNew={onBuildNew} />;

  const totalTime = session.blocks.reduce((s, b) => s + b.duration, 0);
  const focusLabel = session.focuses.map((f) => FOCUS_LABELS[f] ?? f).join(' · ');

  const updateBlocks = (blocks: SessionBlock[]) => {
    onUpdate({ ...session, blocks, totalTime: blocks.reduce((s, b) => s + b.duration, 0) });
    setSaved(false);
  };

  const handleEdit = (updated: SessionBlock) => {
    updateBlocks(session.blocks.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const blocks = [...session.blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [blocks[index], blocks[swapIndex]] = [blocks[swapIndex], blocks[index]];
    updateBlocks(blocks);
  };

  const handleRemove = (id: string) => {
    updateBlocks(session.blocks.filter((b) => b.id !== id));
  };

  const handleAddBlock = (type: BlockType) => {
    const meta = BLOCK_META[type];
    const newBlock: SessionBlock = {
      id: nextBlockId(),
      blockType: type,
      title: meta.defaultTitle,
      duration: 10,
      purpose: meta.purpose,
      notes: '',
    };
    updateBlocks([...session.blocks, newBlock]);
  };

  const handleSave = () => {
    onSave({ ...session, totalTime });
    setSaved(true);
  };

  return (
    <>
      <div className="pb-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#080c18]/95 backdrop-blur-xl border-b border-[#1a2340]">
          <div className="px-5 pt-5 pb-4 flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1.5">
                Your Session
              </p>
              <h2 className="text-xl font-bold text-white leading-tight truncate">{session.name}</h2>
              <p className="text-xs text-slate-500 mt-1.5 truncate">
                {focusLabel} · {AGE_LABELS[session.ageGroup]}
              </p>
            </div>
            <button
              onClick={onBuildNew}
              className="mt-1 px-3.5 py-2 text-xs font-semibold text-blue-400 bg-blue-600/10 border border-blue-600/20 rounded-xl active:bg-blue-600/20 transition-colors shrink-0"
            >
              New
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex border-t border-[#1a2340]">
            {[
              { label: 'Duration', value: `${totalTime} min` },
              { label: 'Players',  value: String(session.playerCount) },
              { label: 'Blocks',   value: String(session.blocks.length) },
              { label: 'Level',    value: session.skillLevel.charAt(0).toUpperCase() + session.skillLevel.slice(1) },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 text-center py-3 border-r border-[#1a2340] last:border-r-0">
                <p className="text-sm font-semibold text-white">{value}</p>
                <p className="text-[10px] text-slate-600 mt-0.5 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Block cards */}
        <div className="px-5 pt-5 space-y-3">
          {session.blocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">No blocks yet. Add some below.</p>
            </div>
          ) : (
            session.blocks.map((block, i) => (
              <SessionBlockCard
                key={block.id}
                block={block}
                index={i}
                total={session.blocks.length}
                onEdit={setEditing}
                onMove={handleMove}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {/* Add block */}
        <div className="px-5 mt-3">
          <button
            onClick={() => setAddingBlock(true)}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl border-2 border-dashed border-[#1e2a45] text-slate-500 hover:border-blue-500/40 hover:text-blue-400 active:bg-white/[0.03] transition-all"
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="5" y1="1" x2="5" y2="9" />
                <line x1="1" y1="5" x2="9" y2="5" />
              </svg>
            </span>
            <span className="text-sm font-medium">Add Block</span>
          </button>
        </div>

        {/* Timeline summary */}
        {session.blocks.length > 0 && (
          <div className="mx-5 mt-4 p-4 bg-[#0d1224] border border-[#1a2340] rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">Total session time</span>
              <span className="text-base font-bold text-white">{totalTime} min</span>
            </div>
            {/* Timeline bar */}
            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
              {session.blocks.map((b) => (
                <div
                  key={b.id}
                  style={{
                    flex: b.duration,
                    backgroundColor: BLOCK_META[b.blockType]?.color ?? '#3b82f6',
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
              {session.blocks.map((b) => (
                <div key={b.id} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BLOCK_META[b.blockType]?.color ?? '#3b82f6' }}
                  />
                  <span className="text-[10px] text-slate-500">
                    {b.title} ({b.duration}m)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="px-5 mt-6 pb-2">
          <div className="h-px bg-[#1a2340] mb-6" />
          <button
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] ${
              saved
                ? 'bg-emerald-600/20 border border-emerald-600/30 text-emerald-400'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            {saved ? '✓ Session Saved' : 'Save Session'}
          </button>
        </div>
      </div>

      {editing && (
        <BlockEditorSheet
          block={editing}
          onSave={handleEdit}
          onClose={() => setEditing(null)}
        />
      )}

      {addingBlock && (
        <AddBlockSheet
          onAdd={handleAddBlock}
          onClose={() => setAddingBlock(false)}
        />
      )}
    </>
  );
}
