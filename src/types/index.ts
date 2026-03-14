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
export type DiagramType =
  | 'rondo'
  | 'passing-pattern'
  | 'small-sided'
  | 'dribbling'
  | 'finishing'
  | 'fitness'
  | 'technical';
export type SessionSection = 'warmup' | 'technical' | 'main' | 'game' | 'cooldown';

export interface Drill {
  id: string;
  title: string;
  category: TrainingFocus;
  duration: number; // suggested minutes (used in library display)
  description: string;
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
