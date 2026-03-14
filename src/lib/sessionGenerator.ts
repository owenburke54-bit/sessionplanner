import { drills as allDrills } from '@/data/drills';
import {
  Session,
  SessionDrill,
  SessionFormData,
  SessionSection,
  Drill,
  SkillLevel,
  AgeGroup,
} from '@/types';

// ── Time allocation per session length ─────────────────────────────────────
interface TimeMap {
  warmup: number;
  technical: number;
  main: number;
  game: number;
  cooldown: number;
}

function allocateTimes(sessionLength: number): TimeMap {
  if (sessionLength <= 30)
    return { warmup: 5, technical: 8, main: 10, game: 7, cooldown: 0 };
  if (sessionLength <= 45)
    return { warmup: 8, technical: 10, main: 15, game: 12, cooldown: 0 };
  if (sessionLength <= 60)
    return { warmup: 10, technical: 12, main: 18, game: 15, cooldown: 5 };
  if (sessionLength <= 75)
    return { warmup: 12, technical: 15, main: 20, game: 20, cooldown: 8 };
  return { warmup: 15, technical: 18, main: 25, game: 22, cooldown: 10 };
}

// ── Eligibility helpers ────────────────────────────────────────────────────
function eligible(
  drill: Drill,
  playerCount: number,
  skillLevel: SkillLevel,
  ageGroup: AgeGroup
): boolean {
  return (
    drill.playersMin <= playerCount &&
    drill.skillLevels.includes(skillLevel) &&
    drill.ageGroups.includes(ageGroup)
  );
}

function pickOne(candidates: Drill[], used: Set<string>): Drill | null {
  const pool = candidates.filter((d) => !used.has(d.id));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Candidate selectors per section ───────────────────────────────────────
function warmupCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  return allDrills.filter(
    (d) =>
      (d.category === 'fitness' || d.category === 'first-touch') &&
      d.complexity === 'low' &&
      eligible(d, playerCount, skillLevel, ageGroup)
  );
}

function technicalCandidates(form: SessionFormData): Drill[] {
  const { focus, playerCount, skillLevel, ageGroup } = form;
  return allDrills.filter(
    (d) =>
      d.category === focus &&
      d.complexity !== 'high' &&
      eligible(d, playerCount, skillLevel, ageGroup)
  );
}

function mainCandidates(form: SessionFormData): Drill[] {
  const { focus, playerCount, skillLevel, ageGroup } = form;
  return allDrills.filter(
    (d) =>
      d.category === focus &&
      d.complexity !== 'low' &&
      eligible(d, playerCount, skillLevel, ageGroup)
  );
}

function gameCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  return allDrills.filter(
    (d) =>
      (d.category === 'small-sided' || d.category === 'possession') &&
      eligible(d, playerCount, skillLevel, ageGroup)
  );
}

function cooldownCandidates(form: SessionFormData): Drill[] {
  const { playerCount, skillLevel, ageGroup } = form;
  return allDrills.filter(
    (d) =>
      (d.category === 'fitness' || d.category === 'first-touch' || d.category === 'close-control') &&
      d.complexity === 'low' &&
      eligible(d, playerCount, skillLevel, ageGroup)
  );
}

// ── Public API ─────────────────────────────────────────────────────────────
let _idCounter = 0;
function nextId() {
  return `sd-${Date.now()}-${++_idCounter}`;
}

export function generateSession(form: SessionFormData): Session {
  const used = new Set<string>();
  const times = allocateTimes(form.sessionLength);
  const drillsList: SessionDrill[] = [];

  function addSection(
    candidates: Drill[],
    section: SessionSection,
    duration: number
  ) {
    if (duration === 0) return;
    const drill = pickOne(candidates, used);
    if (drill) {
      used.add(drill.id);
      drillsList.push({ id: nextId(), drill, duration, section });
    }
  }

  addSection(warmupCandidates(form), 'warmup', times.warmup);
  addSection(technicalCandidates(form), 'technical', times.technical);
  addSection(mainCandidates(form), 'main', times.main);
  addSection(gameCandidates(form), 'game', times.game);
  addSection(cooldownCandidates(form), 'cooldown', times.cooldown);

  const totalTime = drillsList.reduce((s, d) => s + d.duration, 0);

  return {
    ageGroup: form.ageGroup,
    skillLevel: form.skillLevel,
    playerCount: form.playerCount,
    fieldSize: form.fieldSize,
    sessionLength: form.sessionLength,
    focus: form.focus,
    equipment: form.equipment,
    sessionType: form.sessionType,
    drills: drillsList,
    totalTime,
  };
}

// ── Swap helper (used in SessionView) ─────────────────────────────────────
export function alternativesFor(
  currentDrillId: string,
  form: SessionFormData,
  section: SessionSection
): Drill[] {
  const currentDrill = allDrills.find((d) => d.id === currentDrillId);
  if (!currentDrill) return [];

  let candidates: Drill[];
  if (section === 'warmup') candidates = warmupCandidates(form);
  else if (section === 'technical') candidates = technicalCandidates(form);
  else if (section === 'main') candidates = mainCandidates(form);
  else if (section === 'game') candidates = gameCandidates(form);
  else candidates = cooldownCandidates(form);

  return candidates.filter((d) => d.id !== currentDrillId).slice(0, 8);
}
