export type AgeGroup = 'u8-u10' | 'u11-u13' | 'u14-u16' | 'u17-u19' | 'college-adult';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type FieldSize = 'small-box' | 'small-half' | 'full-half' | 'full-field';
export type SessionLength = 30 | 45 | 60 | 75 | 90;
export type TrainingFocus =
  | 'possession'
  | 'finishing'
  | 'first-touch'
  | 'close-control'
  | 'dribbling'
  | 'long-passing'
  | 'small-sided'
  | 'fitness';
export type Equipment =
  | 'balls'
  | 'cones'
  | 'poles'
  | 'small-goals'
  | 'full-goals'
  | 'rebounder'
  | 'mannequins'
  | 'agility-ladder';
// 'personal' = "For Me / My Group", 'trainer' = "Trainer Plan"
export type SessionType = 'personal' | 'trainer';

// ── Block-based session types ──────────────────────────────────────────────
export type BlockType =
  | 'activation'
  | 'warm-up'
  | 'fitness'
  | 'cooldown'
  | 'ball-mastery'
  | 'short-passing'
  | 'long-passing'
  | 'passing-patterns'
  | 'dribbling'
  | 'finishing'
  | 'goalkeeper'
  | 'possession'
  | 'small-sided'
  | 'juggling';

export type SessionFocus =
  | 'possession'
  | 'finishing'
  | 'first-touch'
  | 'close-control'
  | 'dribbling'
  | 'long-passing'
  | 'small-sided'
  | 'fitness'
  | 'juggling'
  | 'goalkeeper';

export interface SessionBlock {
  id: string;
  blockType: BlockType;
  title: string;
  duration: number;
  purpose: string;
  notes: string;
}

export interface PlannedSession {
  id: string;
  name: string;
  createdAt: string;
  ageGroup: AgeGroup;
  skillLevel: SkillLevel;
  playerCount: number;
  sessionLength: SessionLength;
  focuses: SessionFocus[];
  equipment: Equipment[];
  sessionType: SessionType;
  blocks: SessionBlock[];
  totalTime: number;
}

export interface SessionPlanFormData {
  ageGroup: AgeGroup;
  skillLevel: SkillLevel;
  playerCount: number;
  sessionLength: SessionLength;
  focuses: SessionFocus[];
  equipment: Equipment[];
  sessionType: SessionType;
}
export type DiagramType =
  | 'rondo-4v2'
  | 'rondo-5v2'
  | 'possession-endzone'
  | 'possession-zones'
  | 'passing-triangle'
  | 'passing-diagonal'
  | 'passing-overlap'
  | 'finishing-central'
  | 'finishing-cross'
  | 'finishing-2v1'
  | 'finishing-cutback'
  | 'first-touch-gates'
  | 'first-touch-rebounder'
  | 'first-touch-serve'
  | 'close-control-box'
  | 'dribbling-weave'
  | 'dribbling-1v1'
  | 'dribbling-poles'
  | 'long-pass-switch'
  | 'long-pass-diagonal'
  | 'small-sided-3v3'
  | 'small-sided-4v4'
  | 'fitness-shuttle'
  | 'fitness-agility';
export type SessionSection = 'warmup' | 'technical' | 'main' | 'game' | 'cooldown';

export interface Drill {
  id: string;
  title: string;
  category: TrainingFocus;
  duration: number; // suggested minutes (used in library display)
  description: string;
  setup: string;        // how to arrange the space and equipment
  sequence: string;     // numbered steps of the drill
  repScheme: string;    // reps × duration structure
  progression: string;  // how to make it harder
  playersMin: number;
  playersMax: number;
  setupSize: string;
  equipment: Equipment[];
  coachingTip: string;
  diagramType: DiagramType;
  skillLevels: SkillLevel[];
  ageGroups: AgeGroup[];
  complexity: 'low' | 'medium' | 'high';
  soloFriendly: boolean; // can be done with 1 player
  familyId?: string; // drills sharing a familyId are variants — avoid picking two in the same session
}

export interface SessionDrill {
  id: string;
  drill: Drill;
  duration: number; // actual allocated duration in the session
  section: SessionSection;
}

export interface Session {
  ageGroup: AgeGroup;
  skillLevel: SkillLevel;
  playerCount: number;
  fieldSize: FieldSize;
  sessionLength: SessionLength;
  focuses: TrainingFocus[]; // multi-select
  equipment: Equipment[];
  sessionType: SessionType;
  drills: SessionDrill[];
  totalTime: number;
}

export interface SessionFormData {
  ageGroup: AgeGroup;
  skillLevel: SkillLevel;
  playerCount: number;
  fieldSize: FieldSize;
  sessionLength: SessionLength;
  focuses: TrainingFocus[]; // multi-select
  equipment: Equipment[];
  sessionType: SessionType;
}
