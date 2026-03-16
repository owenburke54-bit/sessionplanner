import {
  PlannedSession,
  SessionBlock,
  SessionPlanFormData,
  BlockType,
  SessionFocus,
  SessionLength,
} from '@/types';

// ── Block metadata ────────────────────────────────────────────────────────────
export const BLOCK_META: Record<BlockType, { defaultTitle: string; purpose: string; color: string }> = {
  'activation':       { defaultTitle: 'Activation',       purpose: 'Prime the body and mind for training',           color: '#f59e0b' },
  'warm-up':          { defaultTitle: 'Warm-Up',           purpose: 'Raise body temperature and prepare muscles',     color: '#f59e0b' },
  'fitness':          { defaultTitle: 'Fitness',           purpose: 'Build stamina, agility, and physical capacity',  color: '#f97316' },
  'cooldown':         { defaultTitle: 'Cool-Down',         purpose: 'Lower heart rate and stretch tired muscles',     color: '#a855f7' },
  'ball-mastery':     { defaultTitle: 'Ball Mastery',      purpose: 'Build comfort on the ball with close touches',   color: '#14b8a6' },
  'short-passing':    { defaultTitle: 'Short Passing',     purpose: 'Accuracy and weight of pass over short range',   color: '#3b82f6' },
  'long-passing':     { defaultTitle: 'Long Passing',      purpose: 'Technique and accuracy for longer distribution', color: '#22c55e' },
  'passing-patterns': { defaultTitle: 'Passing Patterns',  purpose: 'Choreographed combination play and movement',    color: '#6366f1' },
  'dribbling':        { defaultTitle: 'Dribbling',         purpose: 'Ball manipulation, change of direction, 1v1',    color: '#f59e0b' },
  'finishing':        { defaultTitle: 'Finishing',         purpose: 'Shot technique, placement, and goal awareness',  color: '#ef4444' },
  'goalkeeper':       { defaultTitle: 'Goalkeeper Work',   purpose: 'Positioning, shot-stopping, and distribution',   color: '#8b5cf6' },
  'possession':       { defaultTitle: 'Possession',        purpose: 'Retain the ball under pressure as a group',     color: '#3b82f6' },
  'small-sided':      { defaultTitle: 'Small-Sided Game',  purpose: 'Apply skills in a competitive game format',      color: '#10b981' },
  'juggling':         { defaultTitle: 'Juggling',          purpose: 'First touch, aerial control, and ball feel',     color: '#ec4899' },
};

// ── Focus → preferred block types ─────────────────────────────────────────────
const FOCUS_BLOCK_MAP: Record<SessionFocus, BlockType[]> = {
  'possession':    ['possession', 'short-passing', 'passing-patterns'],
  'finishing':     ['finishing', 'ball-mastery'],
  'first-touch':   ['ball-mastery', 'short-passing'],
  'close-control': ['ball-mastery', 'dribbling'],
  'dribbling':     ['dribbling', 'ball-mastery'],
  'long-passing':  ['long-passing', 'passing-patterns'],
  'small-sided':   ['small-sided', 'possession'],
  'fitness':       ['fitness', 'activation'],
  'juggling':      ['juggling', 'ball-mastery'],
  'goalkeeper':    ['goalkeeper', 'finishing'],
};

// ── Availability by player count ──────────────────────────────────────────────
function availableBlockTypes(playerCount: number): Set<BlockType> {
  const all: BlockType[] = [
    'activation', 'warm-up', 'fitness', 'cooldown', 'ball-mastery',
    'dribbling', 'finishing', 'goalkeeper', 'juggling',
    'short-passing', 'long-passing', 'passing-patterns', 'possession', 'small-sided',
  ];

  if (playerCount === 1) {
    return new Set<BlockType>([
      'activation', 'warm-up', 'fitness', 'cooldown',
      'ball-mastery', 'dribbling', 'finishing', 'goalkeeper', 'juggling',
    ]);
  }
  if (playerCount <= 3) {
    return new Set<BlockType>(all.filter((b) => b !== 'possession' && b !== 'small-sided'));
  }
  return new Set<BlockType>(all);
}

// ── Time allocation ───────────────────────────────────────────────────────────
interface TimeMap {
  warmup: number;
  tech: number;
  fitness: number;
  cooldown: number;
}

function allocateTimes(sessionLength: SessionLength): TimeMap {
  switch (sessionLength) {
    case 30: return { warmup: 5,  tech: 25, fitness: 0,  cooldown: 0  };
    case 45: return { warmup: 8,  tech: 32, fitness: 5,  cooldown: 0  };
    case 60: return { warmup: 10, tech: 38, fitness: 7,  cooldown: 5  };
    case 75: return { warmup: 12, tech: 45, fitness: 10, cooldown: 8  };
    case 90: return { warmup: 15, tech: 52, fitness: 13, cooldown: 10 };
    default:  return { warmup: 10, tech: 38, fitness: 7,  cooldown: 5  };
  }
}

function getTechBlockCount(sessionLength: SessionLength, focusCount: number): number {
  switch (sessionLength) {
    case 30: return 2;
    case 45: return 2;
    case 60: return 3;
    case 75: return focusCount >= 3 ? 4 : 3;
    case 90: return 4;
    default:  return 3;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
let _counter = 0;
function nextId(): string {
  return `sb-${Date.now()}-${++_counter}`;
}

function splitEvenly(total: number, count: number): number[] {
  const base = Math.floor(total / count);
  const remainder = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

function generateSessionName(focuses: SessionFocus[]): string {
  const FOCUS_LABELS: Record<SessionFocus, string> = {
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
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'short' });
  const day = now.getDate();
  const focusStr = focuses.slice(0, 2).map((f) => FOCUS_LABELS[f]).join(' + ');
  return `${focusStr} — ${month} ${day}`;
}

function generateId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}

// ── Block type selection ──────────────────────────────────────────────────────
function pickTechBlockTypes(
  focuses: SessionFocus[],
  playerCount: number,
  count: number,
): BlockType[] {
  const available = availableBlockTypes(playerCount);
  const result: BlockType[] = [];
  const used = new Set<BlockType>();

  // First pass: primary preference per focus
  for (const focus of focuses) {
    if (result.length >= count) break;
    const prefs = FOCUS_BLOCK_MAP[focus].filter((b) => available.has(b) && !used.has(b));
    if (prefs.length > 0) {
      result.push(prefs[0]);
      used.add(prefs[0]);
    }
  }

  // Second pass: secondary preferences
  if (result.length < count) {
    for (const focus of focuses) {
      if (result.length >= count) break;
      const prefs = FOCUS_BLOCK_MAP[focus].filter((b) => available.has(b) && !used.has(b));
      if (prefs.length > 1) {
        result.push(prefs[1]);
        used.add(prefs[1]);
      }
    }
  }

  // Third pass: remaining preferences
  if (result.length < count) {
    for (const focus of focuses) {
      if (result.length >= count) break;
      for (const b of FOCUS_BLOCK_MAP[focus]) {
        if (result.length >= count) break;
        if (available.has(b) && !used.has(b)) {
          result.push(b);
          used.add(b);
        }
      }
    }
  }

  // Fallback: fill remaining slots
  const fallbacks: BlockType[] = ['ball-mastery', 'dribbling', 'short-passing', 'finishing'];
  for (const fb of fallbacks) {
    if (result.length >= count) break;
    if (available.has(fb) && !used.has(fb)) {
      result.push(fb);
      used.add(fb);
    }
  }

  return result.slice(0, count);
}

// ── Main export ───────────────────────────────────────────────────────────────
export function generatePlannedSession(form: SessionPlanFormData): PlannedSession {
  const { playerCount, sessionLength, focuses, ageGroup, skillLevel, equipment, sessionType } = form;

  const times = allocateTimes(sessionLength);
  const techCount = getTechBlockCount(sessionLength, focuses.length);
  const blocks: SessionBlock[] = [];

  // 1. Warmup / Activation
  const warmupMeta = BLOCK_META['activation'];
  blocks.push({
    id: nextId(),
    blockType: 'activation',
    title: warmupMeta.defaultTitle,
    duration: times.warmup,
    purpose: warmupMeta.purpose,
    notes: '',
  });

  // 2. Technical blocks from focuses
  const techTypes = pickTechBlockTypes(focuses, playerCount, techCount);
  const techDurations = splitEvenly(times.tech, techCount);
  for (let i = 0; i < techTypes.length; i++) {
    const meta = BLOCK_META[techTypes[i]];
    blocks.push({
      id: nextId(),
      blockType: techTypes[i],
      title: meta.defaultTitle,
      duration: techDurations[i],
      purpose: meta.purpose,
      notes: '',
    });
  }

  // 3. Fitness block (if allocated and not already present)
  if (times.fitness > 0) {
    const alreadyHasFitness = blocks.some((b) => b.blockType === 'fitness');
    if (!alreadyHasFitness) {
      const meta = BLOCK_META['fitness'];
      blocks.push({
        id: nextId(),
        blockType: 'fitness',
        title: meta.defaultTitle,
        duration: times.fitness,
        purpose: meta.purpose,
        notes: '',
      });
    }
  }

  // 4. Cooldown
  if (times.cooldown > 0) {
    const meta = BLOCK_META['cooldown'];
    blocks.push({
      id: nextId(),
      blockType: 'cooldown',
      title: meta.defaultTitle,
      duration: times.cooldown,
      purpose: meta.purpose,
      notes: '',
    });
  }

  const totalTime = blocks.reduce((s, b) => s + b.duration, 0);

  return {
    id: generateId(),
    name: generateSessionName(focuses),
    createdAt: new Date().toISOString(),
    ageGroup,
    skillLevel,
    playerCount,
    sessionLength,
    focuses,
    equipment,
    sessionType,
    blocks,
    totalTime,
  };
}
