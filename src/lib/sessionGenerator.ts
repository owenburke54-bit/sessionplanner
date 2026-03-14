import { drills as allDrills } from '@/data/drills';
import {
  Session,
  SessionDrill,
  SessionFormData,
  SessionSection,
  Drill,
  SkillLevel,
  AgeGroup,
  TrainingFocus,
} from '@/types';

// ── Time allocation ─────────────────────────────────────────────────────────
// These MUST sum exactly to the requested session length.
interface TimeMap {
  warmup: number;
  technical: number;
  main: number;
  game: number;
  cooldown: number;
}

function allocateTimes(sessionLength: number): TimeMap {
  switch (sessionLength) {
    case 30: return { warmup: 6,  technical: 10, main: 14, game: 0,  cooldown: 0 };
    case 45: return { warmup: 8,  technical: 12, main: 15, game: 10, cooldown: 0 };
    case 60: return { warmup: 10, technical: 12, main: 18, game: 15, cooldown: 5 };
    case 75: return { warmup: 12, technical: 15, main: 20, game: 20, cooldown: 8 };
    case 90: return { warmup: 15, technical: 18, main: 25, game: 22, cooldown: 10 };
    default:  return { warmup: 10, technical: 12, main: 18, game: 15, cooldown: 5 };
  }
}

// ── Eligibility ─────────────────────────────────────────────────────────────
function eligible(
  drill: Drill,
  playerCount: number,
  skillLevel: SkillLevel,
  ageGroup: AgeGroup,
): boolean {
  const playerOk = drill.playersMin <= playerCount;
  const skillOk = drill.skillLevels.includes(skillLevel);
  const ageOk = drill.ageGroups.includes(ageGroup);
  return playerOk && skillOk && ageOk;
}

function soloEligible(drill: Drill, skillLevel: SkillLevel, ageGroup: AgeGroup): boolean {
  return drill.soloFriendly && drill.skillLevels.includes(skillLevel) && drill.ageGroups.includes(ageGroup);
}

function pickOne(candidates: Drill[], used: Set<string>): Drill | null {
  const pool = candidates.filter((d) => !used.has(d.id));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Candidate selectors ─────────────────────────────────────────────────────
function warmupCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  const isSolo = playerCount === 1;

  return allDrills.filter((d) => {
    if (d.category !== 'fitness') return false;
    if (d.complexity !== 'low') return false;
    if (isSolo) return soloEligible(d, skillLevel, ageGroup);
    return eligible(d, playerCount, skillLevel, ageGroup);
  });
}

function technicalCandidates(form: SessionFormData, focus: TrainingFocus): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  const isSolo = playerCount === 1;

  return allDrills.filter((d) => {
    if (d.category !== focus) return false;
    // For solo sessions, prefer solo-friendly and low/medium complexity
    if (isSolo) {
      return soloEligible(d, skillLevel, ageGroup) && d.complexity !== 'high';
    }
    return eligible(d, playerCount, skillLevel, ageGroup) && d.complexity !== 'high';
  });
}

function mainCandidates(form: SessionFormData, focus: TrainingFocus): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  const isSolo = playerCount === 1;

  return allDrills.filter((d) => {
    if (d.category !== focus) return false;
    if (isSolo) {
      return soloEligible(d, skillLevel, ageGroup);
    }
    return eligible(d, playerCount, skillLevel, ageGroup);
  });
}

function gameCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup, sessionType } = form;
  const isSolo = playerCount === 1;

  // Solo players can't do small-sided games — use a drill from their focus instead
  if (isSolo) return [];

  return allDrills.filter((d) => {
    const validCategory = d.category === 'small-sided' || d.category === 'possession';
    if (!validCategory) return false;
    // Trainer plans prefer more structured group activities
    if (sessionType === 'trainer' && d.complexity === 'low') return false;
    return eligible(d, playerCount, skillLevel, ageGroup);
  });
}

function cooldownCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;

  return allDrills.filter((d) => {
    const validCategory =
      d.category === 'fitness' &&
      d.complexity === 'low' &&
      d.id !== 'fit-001' && // not warmup
      d.id !== 'fit-005';   // not circle warmup
    if (!validCategory) return false;
    if (playerCount === 1) return soloEligible(d, skillLevel, ageGroup);
    return eligible(d, playerCount, skillLevel, ageGroup);
  });
}

// ── Public API ─────────────────────────────────────────────────────────────
let _counter = 0;
const nextId = () => `sd-${Date.now()}-${++_counter}`;

export function generateSession(form: SessionFormData): Session {
  const used = new Set<string>();
  const times = allocateTimes(form.sessionLength);
  const focuses = form.focuses.slice(0, 3); // cap at 3
  const isSolo = form.playerCount === 1;

  const sessionDrills: SessionDrill[] = [];

  function addSection(
    candidates: Drill[],
    section: SessionSection,
    duration: number,
    fallbackFocus?: TrainingFocus,
  ) {
    if (duration === 0) return;

    let drill = pickOne(candidates, used);

    // Fallback: if no candidates match, try relaxing solo constraint
    if (!drill && fallbackFocus) {
      const relaxed = allDrills.filter(
        (d) =>
          d.category === fallbackFocus &&
          d.skillLevels.includes(form.skillLevel) &&
          !used.has(d.id),
      );
      drill = pickOne(relaxed, used);
    }

    // Final fallback: any drill from main focus
    if (!drill) {
      const lastResort = allDrills.filter(
        (d) => d.category === focuses[0] && !used.has(d.id),
      );
      drill = pickOne(lastResort, used);
    }

    if (drill) {
      used.add(drill.id);
      sessionDrills.push({ id: nextId(), drill, duration, section });
    }
  }

  // Warmup
  addSection(warmupCandidates(form), 'warmup', times.warmup, 'fitness');

  // Technical: from primary focus
  addSection(
    technicalCandidates(form, focuses[0]),
    'technical',
    times.technical,
    focuses[0],
  );

  // Main: from secondary focus if available, else primary focus (different drill)
  const mainFocus = focuses.length > 1 ? focuses[1] : focuses[0];
  addSection(mainCandidates(form, mainFocus), 'main', times.main, mainFocus);

  // Game / applied: if solo, use tertiary focus or first focus for extra drill; else small-sided/possession
  if (times.game > 0) {
    if (isSolo) {
      const soloGameFocus = focuses.length > 2 ? focuses[2] : focuses[0];
      addSection(
        mainCandidates(form, soloGameFocus),
        'game',
        times.game,
        soloGameFocus,
      );
    } else {
      addSection(gameCandidates(form), 'game', times.game, 'small-sided');
    }
  }

  // Cooldown
  if (times.cooldown > 0) {
    addSection(cooldownCandidates(form), 'cooldown', times.cooldown, 'fitness');
  }

  const totalTime = sessionDrills.reduce((s, d) => s + d.duration, 0);

  return {
    ageGroup: form.ageGroup,
    skillLevel: form.skillLevel,
    playerCount: form.playerCount,
    fieldSize: form.fieldSize,
    sessionLength: form.sessionLength,
    focuses: form.focuses,
    equipment: form.equipment,
    sessionType: form.sessionType,
    drills: sessionDrills,
    totalTime,
  };
}

// ── Swap alternatives ──────────────────────────────────────────────────────
// Returns alternative drills from the same category as the current drill.
export function alternativesFor(
  currentDrillId: string,
  playerCount: number,
  skillLevel: SkillLevel,
  ageGroup: AgeGroup,
): Drill[] {
  const current = allDrills.find((d) => d.id === currentDrillId);
  if (!current) return [];

  return allDrills
    .filter(
      (d) =>
        d.id !== currentDrillId &&
        d.category === current.category &&
        d.skillLevels.includes(skillLevel) &&
        d.ageGroups.includes(ageGroup) &&
        (playerCount === 1 ? d.soloFriendly : d.playersMin <= playerCount),
    )
    .slice(0, 8);
}
