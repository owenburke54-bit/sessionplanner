'use client';

import { DiagramType } from '@/types';

interface Props {
  type: DiagramType;
  className?: string;
}

// ── Shared primitives ───────────────────────────────────────────────────────
const Player = ({
  x, y, color = '#3b82f6', label,
}: { x: number; y: number; color?: string; label?: string }) => (
  <g>
    <circle cx={x} cy={y} r={6} fill={color} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    {label && (
      <text x={x} y={y + 2.5} textAnchor="middle" fontSize="6" fontWeight="700" fill="white">
        {label}
      </text>
    )}
  </g>
);

const Cone = ({ x, y, color = '#f97316' }: { x: number; y: number; color?: string }) => (
  <g>
    <polygon
      points={`${x},${y - 5} ${x - 4},${y + 3} ${x + 4},${y + 3}`}
      fill={color}
      stroke={color === '#f97316' ? '#ea580c' : color}
      strokeWidth="0.5"
    />
    <ellipse cx={x} cy={y + 3} rx={4} ry={1.3} fill={color === '#f97316' ? '#ea580c' : color} />
  </g>
);

const Pole = ({ x, y }: { x: number; y: number }) => (
  <g>
    <rect x={x - 1.5} y={y - 10} width={3} height={10} rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
    <ellipse cx={x} cy={y} rx={3} ry={1} fill="#d97706" />
  </g>
);

const Goal = ({ x, y, w = 18, vertical = false }: { x: number; y: number; w?: number; vertical?: boolean }) => {
  if (vertical) {
    return (
      <rect
        x={x - 3} y={y - w / 2} width={6} height={w}
        rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2"
      />
    );
  }
  return (
    <rect
      x={x - w / 2} y={y - 3} width={w} height={6}
      rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2"
    />
  );
};

const Arrow = ({
  x1, y1, x2, y2, color = 'rgba(255,255,255,0.45)', dashed = true,
}: { x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  const ux = dx / len;
  const uy = dy / len;
  const endX = x2 - ux * 7;
  const endY = y2 - uy * 7;
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={endX} y2={endY}
        stroke={color} strokeWidth="1.5"
        strokeDasharray={dashed ? '3 2' : 'none'}
      />
      <polygon
        points={`${x2},${y2} ${x2 - ux * 7 + uy * 3.5},${y2 - uy * 7 - ux * 3.5} ${x2 - ux * 7 - uy * 3.5},${y2 - uy * 7 + ux * 3.5}`}
        fill={color}
      />
    </g>
  );
};

const RunLine = ({
  x1, y1, x2, y2, color = 'rgba(52,211,153,0.75)',
}: { x1: number; y1: number; x2: number; y2: number; color?: string }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  const ux = dx / len;
  const uy = dy / len;
  const endX = x2 - ux * 7;
  const endY = y2 - uy * 7;
  return (
    <g>
      <line x1={x1} y1={y1} x2={endX} y2={endY} stroke={color} strokeWidth="1.5" />
      <polygon
        points={`${x2},${y2} ${x2 - ux * 7 + uy * 3.5},${y2 - uy * 7 - ux * 3.5} ${x2 - ux * 7 - uy * 3.5},${y2 - uy * 7 + ux * 3.5}`}
        fill={color}
      />
    </g>
  );
};

// ── Pitch field outline helpers ──────────────────────────────────────────────
const PitchOutline = ({ x = 8, y = 6, w = 144, h = 104 }: { x?: number; y?: number; w?: number; h?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx="2" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
);

// ── 24 Diagram variants ──────────────────────────────────────────────────────

// 1. rondo-4v2
const Rondo4v2 = () => (
  <>
    <rect x="42" y="26" width="76" height="64" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
    <Arrow x1={80} y1={32} x2={116} y2={58} />
    <Arrow x1={116} y1={58} x2={80} y2={84} />
    <Arrow x1={80} y1={84} x2={44} y2={58} />
    <Arrow x1={44} y1={58} x2={80} y2={32} />
    <Player x={80} y={29} color="#3b82f6" label="1" />
    <Player x={119} y={58} color="#3b82f6" label="2" />
    <Player x={80} y={87} color="#3b82f6" label="3" />
    <Player x={41} y={58} color="#3b82f6" label="4" />
    <Player x={68} y={50} color="#ef4444" label="D" />
    <Player x={90} y={66} color="#ef4444" label="D" />
  </>
);

// 2. rondo-5v2
const Rondo5v2 = () => (
  <>
    <circle cx="80" cy="58" r="44" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="4 3" fill="none" />
    <Player x={80} y={14} color="#3b82f6" label="1" />
    <Player x={122} y={36} color="#3b82f6" label="2" />
    <Player x={115} y={86} color="#3b82f6" label="3" />
    <Player x={45} y={86} color="#3b82f6" label="4" />
    <Player x={38} y={36} color="#3b82f6" label="5" />
    <Arrow x1={80} y1={20} x2={118} y2={38} />
    <Arrow x1={118} y1={40} x2={110} y2={80} />
    <Arrow x1={108} y1={84} x2={50} y2={84} />
    <Player x={68} y={52} color="#ef4444" label="D" />
    <Player x={92} y={64} color="#ef4444" label="D" />
  </>
);

// 3. possession-endzone
const PossessionEndzone = () => (
  <>
    <PitchOutline />
    <line x1="8" y1="30" x2="152" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="8" y1="86" x2="152" y2="86" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
    <rect x="8" y="6" width="144" height="24" fill="rgba(59,130,246,0.12)" />
    <rect x="8" y="86" width="144" height="24" fill="rgba(239,68,68,0.12)" />
    <text x="80" y="21" textAnchor="middle" fontSize="7" fill="rgba(59,130,246,0.7)">END ZONE</text>
    <text x="80" y="101" textAnchor="middle" fontSize="7" fill="rgba(239,68,68,0.7)">END ZONE</text>
    <line x1="8" y1="58" x2="152" y2="58" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
    <Player x={55} y={45} color="#3b82f6" label="1" />
    <Player x={80} y={38} color="#3b82f6" label="2" />
    <Player x={105} y={45} color="#3b82f6" label="3" />
    <Player x={60} y={68} color="#ef4444" label="A" />
    <Player x={80} y={75} color="#ef4444" label="B" />
    <Player x={100} y={68} color="#ef4444" label="C" />
    <Arrow x1={80} y1={44} x2={80} y2={32} color="rgba(59,130,246,0.8)" dashed={false} />
  </>
);

// 4. possession-zones
const PossessionZones = () => (
  <>
    <PitchOutline />
    <line x1="8" y1="41" x2="152" y2="41" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
    <line x1="8" y1="75" x2="152" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
    <text x="14" y="26" fontSize="7" fill="rgba(255,255,255,0.35)">ATK</text>
    <text x="14" y="61" fontSize="7" fill="rgba(255,255,255,0.35)">MID</text>
    <text x="14" y="93" fontSize="7" fill="rgba(255,255,255,0.35)">DEF</text>
    <Player x={55} y={24} color="#3b82f6" label="1" />
    <Player x={95} y={28} color="#3b82f6" label="2" />
    <Player x={55} y={58} color="#3b82f6" label="3" />
    <Player x={105} y={58} color="#3b82f6" label="4" />
    <Player x={80} y={90} color="#3b82f6" label="5" />
    <Player x={72} y={24} color="#ef4444" label="A" />
    <Player x={110} y={90} color="#ef4444" label="B" />
    <Arrow x1={55} y1={30} x2={72} y2={30} />
    <Arrow x1={80} y1={58} x2={80} y2={42} color="rgba(52,211,153,0.7)" />
  </>
);

// 5. passing-triangle
const PassingTriangle = () => (
  <>
    <Cone x={80} y={18} />
    <Cone x={44} y={82} />
    <Cone x={116} y={82} />
    <Arrow x1={86} y1={22} x2={110} y2={76} />
    <Arrow x1={110} y1={82} x2={50} y2={82} />
    <Arrow x1={44} y1={76} x2={74} y2={24} />
    <Player x={80} y={15} color="#3b82f6" label="1" />
    <Player x={116} y={85} color="#10b981" label="2" />
    <Player x={44} y={85} color="#3b82f6" label="3" />
    <text x="80" y="55" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">PASS &amp; FOLLOW</text>
  </>
);

// 6. passing-diagonal
const PassingDiagonal = () => (
  <>
    <Cone x={16} y={90} />
    <Cone x={80} y={58} />
    <Cone x={144} y={26} />
    <Arrow x1={22} y1={86} x2={74} y2={62} color="rgba(96,165,250,0.8)" />
    <Arrow x1={86} y1={54} x2={138} y2={30} color="rgba(96,165,250,0.8)" />
    <RunLine x1={22} y1={82} x2={80} y2={55} />
    <Player x={16} y={93} color="#3b82f6" label="A" />
    <Player x={80} y={55} color="#10b981" label="B" />
    <Player x={144} y={23} color="#3b82f6" label="C" />
    <text x="50" y="80" fontSize="7" fill="rgba(255,255,255,0.3)">35–40 yd</text>
  </>
);

// 7. passing-overlap
const PassingOverlap = () => (
  <>
    <Cone x={80} y={58} />
    <Arrow x1={30} y1={80} x2={74} y2={62} />
    <Arrow x1={84} y1={54} x2={130} y2={30} />
    <RunLine x1={30} y1={74} x2={90} y2={30} />
    <Player x={28} y={83} color="#3b82f6" label="1" />
    <Player x={80} y={55} color="#10b981" label="2" />
    <Player x={130} y={27} color="#3b82f6" label="3" />
    <text x="56" y="45" fontSize="7" fill="rgba(52,211,153,0.6)">OVERLAP</text>
  </>
);

// 8. finishing-central
const FinishingCentral = () => (
  <>
    <rect x="54" y="6" width="52" height="11" rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2" />
    <line x1="54" y1="6" x2="54" y2="20" stroke="white" strokeWidth="2" />
    <line x1="106" y1="6" x2="106" y2="20" stroke="white" strokeWidth="2" />
    <rect x="40" y="6" width="80" height="36" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <circle cx="80" cy="35" r="1.5" fill="rgba(255,255,255,0.4)" />
    <Cone x={80} y={72} />
    <Cone x={58} y={76} />
    <Cone x={102} y={76} />
    <Player x={80} y={96} color="#3b82f6" label="P" />
    <Arrow x1={80} y1={88} x2={80} y2={22} color="rgba(251,191,36,0.9)" />
    <Arrow x1={60} y1={72} x2={68} y2={32} color="rgba(96,165,250,0.5)" />
    <Arrow x1={100} y1={72} x2={92} y2={32} color="rgba(96,165,250,0.5)" />
  </>
);

// 9. finishing-cross
const FinishingCross = () => (
  <>
    <rect x="44" y="6" width="72" height="40" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <rect x="56" y="6" width="48" height="10" rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2" />
    <line x1="56" y1="6" x2="56" y2="18" stroke="white" strokeWidth="2" />
    <line x1="104" y1="6" x2="104" y2="18" stroke="white" strokeWidth="2" />
    <Player x={14} y={70} color="#10b981" label="S" />
    <RunLine x1={14} y1={64} x2={26} y2={36} />
    <Arrow x1={18} y1={66} x2={72} y2={24} color="rgba(96,165,250,0.8)" />
    <Player x={75} y={42} color="#3b82f6" label="1" />
    <Player x={92} y={24} color="#3b82f6" label="2" />
    <RunLine x1={75} y1={36} x2={80} y2={18} />
    <RunLine x1={90} y1={36} x2={96} y2={22} />
  </>
);

// 10. finishing-2v1
const Finishing2v1 = () => (
  <>
    <rect x="52" y="6" width="56" height="10" rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2" />
    <line x1="52" y1="6" x2="52" y2="18" stroke="white" strokeWidth="2" />
    <line x1="108" y1="6" x2="108" y2="18" stroke="white" strokeWidth="2" />
    <rect x="36" y="6" width="88" height="36" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <Player x={64} y={90} color="#3b82f6" label="1" />
    <Player x={96} y={90} color="#3b82f6" label="2" />
    <Player x={80} y={52} color="#ef4444" label="D" />
    <Arrow x1={64} y1={84} x2={80} y2={46} color="rgba(251,191,36,0.7)" />
    <Arrow x1={80} y1={46} x2={96} y2={32} color="rgba(251,191,36,0.9)" />
    <RunLine x1={96} y1={84} x2={96} y2={38} />
  </>
);

// 11. finishing-cutback
const FinishingCutback = () => (
  <>
    <rect x="50" y="6" width="60" height="10" rx="1" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="2" />
    <line x1="50" y1="6" x2="50" y2="18" stroke="white" strokeWidth="2" />
    <line x1="110" y1="6" x2="110" y2="18" stroke="white" strokeWidth="2" />
    <rect x="36" y="6" width="88" height="38" rx="1" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <Player x={140} y={80} color="#10b981" label="W" />
    <RunLine x1={136} y1={74} x2={110} y2={38} />
    <Arrow x1={110} y1={38} x2={80} y2={32} color="rgba(96,165,250,0.8)" />
    <Player x={80} y={75} color="#3b82f6" label="M" />
    <RunLine x1={80} y1={69} x2={80} y2={38} />
    <Cone x={110} y={42} />
  </>
);

// 12. first-touch-gates
const FirstTouchGates = () => (
  <>
    {/* 4 gates at compass points */}
    <Cone x={72} y={20} /><Cone x={88} y={20} />
    <Cone x={72} y={96} /><Cone x={88} y={96} />
    <Cone x={18} y={50} /><Cone x={18} y={66} />
    <Cone x={142} y={50} /><Cone x={142} y={66} />
    <text x="80" y="19" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">N</text>
    <text x="80" y="108" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">S</text>
    <text x="12" y="60" fontSize="7" fill="rgba(255,255,255,0.3)">W</text>
    <text x="147" y="60" fontSize="7" fill="rgba(255,255,255,0.3)">E</text>
    <Player x={80} y={58} color="#3b82f6" label="P" />
    <Player x={80} y={106} color="#10b981" label="S" />
    <Arrow x1={80} y1={52} x2={80} y2={28} color="rgba(251,191,36,0.7)" />
  </>
);

// 13. first-touch-rebounder
const FirstTouchRebounder = () => (
  <>
    <rect x="130" y="20" width="16" height="76" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    <text x="138" y="62" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.5)" transform="rotate(-90,138,62)">WALL</text>
    <Player x={70} y={58} color="#3b82f6" label="P" />
    <Arrow x1={76} y1={55} x2={126} y2={50} color="rgba(96,165,250,0.8)" />
    <Arrow x1={126} y1={66} x2={76} y2={62} color="rgba(52,211,153,0.8)" />
    <Cone x={70} y={80} />
    <Cone x={50} y={58} />
    <text x="90" y="80" fontSize="7" fill="rgba(255,255,255,0.3)">5–8 yds</text>
  </>
);

// 14. first-touch-serve
const FirstTouchServe = () => (
  <>
    <Player x={22} y={85} color="#10b981" label="S" />
    <Player x={90} y={50} color="#3b82f6" label="P" />
    <Cone x={90} y={72} /><Cone x={80} y={72} /><Cone x={100} y={72} />
    <Arrow x1={28} y1={80} x2={84} y2={56} color="rgba(96,165,250,0.8)" />
    <Arrow x1={96} y1={47} x2={128} y2={40} color="rgba(52,211,153,0.7)" />
    <Arrow x1={96} y1={47} x2={80} y2={32} color="rgba(52,211,153,0.7)" />
    <text x="112" y="36" fontSize="7" fill="rgba(52,211,153,0.6)">→ zone</text>
    <text x="50" y="76" fontSize="7" fill="rgba(255,255,255,0.3)">30 yd</text>
  </>
);

// 15. close-control-box
const CloseControlBox = () => (
  <>
    <rect x="46" y="26" width="68" height="64" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
    <Cone x={46} y={26} /><Cone x={114} y={26} />
    <Cone x={46} y={90} /><Cone x={114} y={90} />
    <Player x={70} y={50} color="#3b82f6" label="P" />
    <path d="M 70 56 Q 90 58 80 72 Q 70 86 80 86" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="80" y="106" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">KEEP CLOSE</text>
  </>
);

// 16. dribbling-weave
const DribblingWeave = () => (
  <>
    <Cone x={22} y={58} />
    <Cone x={46} y={36} />
    <Cone x={70} y={58} />
    <Cone x={94} y={36} />
    <Cone x={118} y={58} />
    <path
      d="M 22 78 Q 34 56 46 36 Q 58 16 70 36 Q 82 58 94 36 Q 106 16 118 36"
      fill="none" stroke="rgba(251,191,36,0.75)" strokeWidth="1.5" strokeDasharray="3 2"
    />
    <Player x={22} y={88} color="#3b82f6" label="P" />
    <Arrow x1={118} y1={34} x2={142} y2={20} color="rgba(251,191,36,0.7)" />
    <text x="22" y="103" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">START</text>
    <text x="143" y="16" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">END</text>
  </>
);

// 17. dribbling-1v1
const Dribbling1v1 = () => (
  <>
    <PitchOutline x={24} y={6} w={112} h={104} />
    <Goal x={80} y={6} w={22} />
    <Goal x={80} y={110} w={22} />
    <line x1="24" y1="58" x2="136" y2="58" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 2" />
    <Player x={80} y={82} color="#3b82f6" label="A" />
    <Player x={80} y={38} color="#ef4444" label="D" />
    <Arrow x1={80} y1={76} x2={80} y2={44} color="rgba(251,191,36,0.8)" dashed={false} />
  </>
);

// 18. dribbling-poles
const DribblingPoles = () => (
  <>
    <Pole x={28} y={78} />
    <Pole x={52} y={52} />
    <Pole x={76} y={78} />
    <Pole x={100} y={52} />
    <Pole x={124} y={78} />
    <path
      d="M 16 90 Q 28 78 52 52 Q 64 38 76 52 Q 88 66 100 52 Q 112 38 124 52"
      fill="none" stroke="rgba(251,191,36,0.75)" strokeWidth="1.5" strokeDasharray="3 2"
    />
    <Player x={16} y={100} color="#3b82f6" label="P" />
    <Goal x={144} y={58} w={20} />
    <Arrow x1={130} y1={52} x2={138} y2={52} color="rgba(251,191,36,0.8)" />
    <text x="16" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">START</text>
  </>
);

// 19. long-pass-switch
const LongPassSwitch = () => (
  <>
    <PitchOutline />
    <Player x={16} y={58} color="#3b82f6" label="A" />
    <Player x={80} y={58} color="#10b981" label="B" />
    <Player x={144} y={58} color="#3b82f6" label="C" />
    <Arrow x1={22} y1={55} x2={74} y2={55} />
    <Arrow x1={86} y1={55} x2={138} y2={55} color="rgba(96,165,250,0.9)" />
    <text x="52" y="46" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">short</text>
    <text x="112" y="46" textAnchor="middle" fontSize="7" fill="rgba(96,165,250,0.7)">SWITCH</text>
    <path d="M 86 62 Q 112 80 138 62" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1" strokeDasharray="3 2" />
    <text x="112" y="82" textAnchor="middle" fontSize="7" fill="rgba(52,211,153,0.5)">follow</text>
  </>
);

// 20. long-pass-diagonal
const LongPassDiagonal = () => (
  <>
    <Cone x={16} y={100} />
    <Cone x={80} y={58} />
    <Cone x={144} y={18} />
    <Arrow x1={22} y1={96} x2={74} y2={62} color="rgba(96,165,250,0.8)" />
    <Arrow x1={86} y1={54} x2={138} y2={22} color="rgba(96,165,250,0.8)" />
    <RunLine x1={22} y1={90} x2={80} y2={55} />
    <Player x={16} y={103} color="#3b82f6" label="A" />
    <Player x={80} y={55} color="#10b981" label="B" />
    <Player x={144} y={15} color="#3b82f6" label="C" />
    <text x="45" y="88" fontSize="7" fill="rgba(255,255,255,0.3)">35 yd</text>
  </>
);

// 21. small-sided-3v3
const SmallSided3v3 = () => (
  <>
    <PitchOutline />
    <line x1="8" y1="58" x2="152" y2="58" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
    <circle cx="80" cy="58" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <Goal x={80} y={6} w={24} />
    <Goal x={80} y={110} w={24} />
    <Player x={50} y={76} color="#3b82f6" label="1" />
    <Player x={80} y={86} color="#3b82f6" label="2" />
    <Player x={110} y={76} color="#3b82f6" label="3" />
    <Player x={50} y={38} color="#ef4444" label="A" />
    <Player x={80} y={28} color="#ef4444" label="B" />
    <Player x={110} y={38} color="#ef4444" label="C" />
  </>
);

// 22. small-sided-4v4
const SmallSided4v4 = () => (
  <>
    <PitchOutline />
    <line x1="8" y1="58" x2="152" y2="58" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
    <circle cx="80" cy="58" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <Goal x={80} y={6} w={26} />
    <Goal x={80} y={110} w={26} />
    <Player x={40} y={78} color="#3b82f6" label="1" />
    <Player x={70} y={88} color="#3b82f6" label="2" />
    <Player x={90} y={88} color="#3b82f6" label="3" />
    <Player x={120} y={78} color="#3b82f6" label="4" />
    <Player x={40} y={36} color="#ef4444" label="A" />
    <Player x={70} y={26} color="#ef4444" label="B" />
    <Player x={90} y={26} color="#ef4444" label="C" />
    <Player x={120} y={36} color="#ef4444" label="D" />
  </>
);

// 23. fitness-shuttle
const FitnessShuttle = () => (
  <>
    <Cone x={16} y={30} /><Cone x={16} y={58} /><Cone x={16} y={86} />
    <Cone x={144} y={30} /><Cone x={144} y={58} /><Cone x={144} y={86} />
    <Arrow x1={24} y1={30} x2={136} y2={30} color="rgba(96,165,250,0.75)" />
    <Arrow x1={136} y1={58} x2={24} y2={58} color="rgba(52,211,153,0.75)" />
    <Arrow x1={24} y1={86} x2={136} y2={86} color="rgba(96,165,250,0.75)" />
    <Player x={16} y={18} color="#3b82f6" label="P" />
    <text x="80" y="22" textAnchor="middle" fontSize="7" fill="rgba(96,165,250,0.7)">SPRINT</text>
    <text x="80" y="50" textAnchor="middle" fontSize="7" fill="rgba(52,211,153,0.7)">RECOVER</text>
    <text x="80" y="78" textAnchor="middle" fontSize="7" fill="rgba(96,165,250,0.7)">SPRINT</text>
  </>
);

// 24. fitness-agility
const FitnessAgility = () => (
  <>
    <rect x="52" y="6" width="56" height="12" rx="2" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
    <text x="80" y="15" textAnchor="middle" fontSize="6.5" fill="rgba(251,191,36,0.8)">AGILITY LADDER</text>
    <Cone x={34} y={52} />
    <Cone x={80} y={22} />
    <Cone x={126} y={52} />
    <Cone x={80} y={86} />
    <path d="M 34 52 L 80 22 L 126 52 L 80 86 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 2" />
    <Arrow x1={34} y1={46} x2={74} y2={26} color="rgba(96,165,250,0.7)" />
    <Arrow x1={80} y1={26} x2={120} y2={46} color="rgba(96,165,250,0.7)" />
    <Arrow x1={126} y1={58} x2={86} y2={82} color="rgba(52,211,153,0.7)" />
    <Arrow x1={80} y1={86} x2={40} y2={58} color="rgba(52,211,153,0.7)" />
    <Player x={34} y={55} color="#3b82f6" label="P" />
    <text x="80" y="104" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">DIAMOND RUN</text>
  </>
);

// ── Diagram map ──────────────────────────────────────────────────────────────
const DIAGRAM_MAP: Record<DiagramType, () => JSX.Element> = {
  'rondo-4v2':          () => <Rondo4v2 />,
  'rondo-5v2':          () => <Rondo5v2 />,
  'possession-endzone': () => <PossessionEndzone />,
  'possession-zones':   () => <PossessionZones />,
  'passing-triangle':   () => <PassingTriangle />,
  'passing-diagonal':   () => <PassingDiagonal />,
  'passing-overlap':    () => <PassingOverlap />,
  'finishing-central':  () => <FinishingCentral />,
  'finishing-cross':    () => <FinishingCross />,
  'finishing-2v1':      () => <Finishing2v1 />,
  'finishing-cutback':  () => <FinishingCutback />,
  'first-touch-gates':  () => <FirstTouchGates />,
  'first-touch-rebounder': () => <FirstTouchRebounder />,
  'first-touch-serve':  () => <FirstTouchServe />,
  'close-control-box':  () => <CloseControlBox />,
  'dribbling-weave':    () => <DribblingWeave />,
  'dribbling-1v1':      () => <Dribbling1v1 />,
  'dribbling-poles':    () => <DribblingPoles />,
  'long-pass-switch':   () => <LongPassSwitch />,
  'long-pass-diagonal': () => <LongPassDiagonal />,
  'small-sided-3v3':    () => <SmallSided3v3 />,
  'small-sided-4v4':    () => <SmallSided4v4 />,
  'fitness-shuttle':    () => <FitnessShuttle />,
  'fitness-agility':    () => <FitnessAgility />,
};

// ── Main component ──────────────────────────────────────────────────────────
export default function FieldDiagram({ type, className = '' }: Props) {
  const DiagramContent = DIAGRAM_MAP[type] ?? DIAGRAM_MAP['rondo-4v2'];
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 160 116"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Pitch background */}
        <rect width="160" height="116" fill="#14532d" />
        {/* Subtle pitch stripe texture */}
        <rect x="0" y="0" width="160" height="29" fill="rgba(255,255,255,0.025)" />
        <rect x="0" y="58" width="160" height="29" fill="rgba(255,255,255,0.025)" />
        <DiagramContent />
      </svg>
    </div>
  );
}
