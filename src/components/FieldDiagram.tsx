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
    <circle cx={x} cy={y} r={6} fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    {label && (
      <text x={x} y={y + 2.5} textAnchor="middle" fontSize="6" fontWeight="700" fill="white">
        {label}
      </text>
    )}
  </g>
);

const Cone = ({ x, y }: { x: number; y: number }) => (
  <g>
    <polygon
      points={`${x},${y - 6} ${x - 4.5},${y + 3} ${x + 4.5},${y + 3}`}
      fill="#f97316"
      stroke="#ea580c"
      strokeWidth="0.5"
    />
    <ellipse cx={x} cy={y + 3} rx={4.5} ry={1.5} fill="#ea580c" />
  </g>
);

const Goal = ({ x, y, w = 18 }: { x: number; y: number; w?: number }) => (
  <rect
    x={x - w / 2} y={y - 3} width={w} height={6}
    rx="1"
    fill="none"
    stroke="white"
    strokeWidth="2"
  />
);

const Arrow = ({
  x1, y1, x2, y2, color = 'rgba(255,255,255,0.5)',
}: { x1: number; y1: number; x2: number; y2: number; color?: string }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return null;
  const ux = dx / len;
  const uy = dy / len;
  const endX = x2 - ux * 8;
  const endY = y2 - uy * 8;
  return (
    <g>
      <line x1={x1} y1={y1} x2={endX} y2={endY} stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon
        points={`${x2},${y2} ${x2 - ux * 8 + uy * 4},${y2 - uy * 8 - ux * 4} ${x2 - ux * 8 - uy * 4},${y2 - uy * 8 + ux * 4}`}
        fill={color}
      />
    </g>
  );
};

// ── Diagram variants ────────────────────────────────────────────────────────
const RondoDiagram = () => (
  <>
    {/* Grid boundary */}
    <circle cx="80" cy="58" r="42" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    {/* Passing lines */}
    <line x1="80" y1="16" x2="80" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    <line x1="38" y1="37" x2="122" y2="79" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    <line x1="122" y1="37" x2="38" y2="79" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    {/* Outer players (blue) */}
    <Player x={80} y={16} color="#3b82f6" label="1" />
    <Player x={122} y={37} color="#3b82f6" label="2" />
    <Player x={122} y={79} color="#3b82f6" label="3" />
    <Player x={80} y={100} color="#3b82f6" label="4" />
    <Player x={38} y={79} color="#3b82f6" label="5" />
    <Player x={38} y={37} color="#3b82f6" label="6" />
    {/* Inner defenders (red) */}
    <Player x={68} y={52} color="#ef4444" label="D" />
    <Player x={92} y={64} color="#ef4444" label="D" />
  </>
);

const PassingPatternDiagram = () => (
  <>
    <Arrow x1={22} y1={85} x2={78} y2={55} />
    <Arrow x1={80} y1={52} x2={138} y2={22} />
    <Arrow x1={80} y1={52} x2={80} y2={95} />
    <Cone x={80} y={55} />
    <Player x={22} y={88} color="#3b82f6" label="1" />
    <Player x={80} y={52} color="#10b981" label="2" />
    <Player x={138} y={20} color="#3b82f6" label="3" />
    <Player x={80} y={98} color="#3b82f6" label="4" />
    {/* Cones marking route */}
    <Cone x={50} y={70} />
    <Cone x={110} y={36} />
  </>
);

const SmallSidedDiagram = () => (
  <>
    {/* Field outline */}
    <rect x="10" y="8" width="140" height="100" rx="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    {/* Center line */}
    <line x1="10" y1="58" x2="150" y2="58" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3" />
    {/* Center circle */}
    <circle cx="80" cy="58" r="12" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Goals */}
    <Goal x={80} y={8} w={22} />
    <Goal x={80} y={108} w={22} />
    {/* Blue team */}
    <Player x={55} y={75} color="#3b82f6" label="1" />
    <Player x={80} y={85} color="#3b82f6" label="2" />
    <Player x={105} y={75} color="#3b82f6" label="3" />
    {/* Red team */}
    <Player x={55} y={40} color="#ef4444" label="A" />
    <Player x={80} y={30} color="#ef4444" label="B" />
    <Player x={105} y={40} color="#ef4444" label="C" />
  </>
);

const DribblingDiagram = () => (
  <>
    {/* Cones staggered */}
    <Cone x={22} y={58} />
    <Cone x={46} y={40} />
    <Cone x={70} y={58} />
    <Cone x={94} y={40} />
    <Cone x={118} y={58} />
    {/* Curved path arrows */}
    <path
      d="M 22 80 Q 34 58 46 40 Q 58 22 70 40 Q 82 58 94 40 Q 106 22 118 40"
      fill="none"
      stroke="rgba(251,191,36,0.7)"
      strokeWidth="1.5"
      strokeDasharray="3 2"
    />
    {/* Player start */}
    <Player x={22} y={90} color="#3b82f6" label="P" />
    {/* End arrow */}
    <Arrow x1={118} y1={38} x2={142} y2={22} color="rgba(251,191,36,0.7)" />
    {/* Start label */}
    <text x="22" y="106" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">START</text>
    <text x="143" y="18" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">END</text>
  </>
);

const FinishingDiagram = () => (
  <>
    {/* Goal at top */}
    <rect x="55" y="6" width="50" height="12" rx="1" fill="none" stroke="white" strokeWidth="2" />
    {/* Goal posts */}
    <line x1="55" y1="6" x2="55" y2="22" stroke="white" strokeWidth="2" />
    <line x1="105" y1="6" x2="105" y2="22" stroke="white" strokeWidth="2" />
    {/* 18-yard box */}
    <rect x="40" y="6" width="80" height="38" rx="1" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    {/* Penalty spot */}
    <circle cx="80" cy="36" r="1.5" fill="rgba(255,255,255,0.4)" />
    {/* Cones */}
    <Cone x={55} y={72} />
    <Cone x={80} y={78} />
    <Cone x={105} y={72} />
    {/* Player */}
    <Player x={80} y={96} color="#3b82f6" label="P" />
    {/* Shot arrow */}
    <Arrow x1={80} y1={88} x2={80} y2={20} color="rgba(251,191,36,0.85)" />
    {/* Wing arrows */}
    <Arrow x1={50} y1={70} x2={65} y2={28} color="rgba(96,165,250,0.5)" />
    <Arrow x1={110} y1={70} x2={95} y2={28} color="rgba(96,165,250,0.5)" />
  </>
);

const FitnessDiagram = () => (
  <>
    {/* Sprint lanes */}
    <Cone x={22} y={30} />
    <Cone x={138} y={30} />
    <Cone x={22} y={58} />
    <Cone x={138} y={58} />
    <Cone x={22} y={86} />
    <Cone x={138} y={86} />
    {/* Sprint arrows */}
    <Arrow x1={30} y1={30} x2={130} y2={30} color="rgba(96,165,250,0.7)" />
    <Arrow x1={130} y1={58} x2={30} y2={58} color="rgba(52,211,153,0.7)" />
    <Arrow x1={30} y1={86} x2={130} y2={86} color="rgba(96,165,250,0.7)" />
    {/* Player */}
    <Player x={22} y={18} color="#3b82f6" label="P" />
    {/* Labels */}
    <text x="80" y="22" textAnchor="middle" fontSize="7" fill="rgba(96,165,250,0.6)">SPRINT</text>
    <text x="80" y="50" textAnchor="middle" fontSize="7" fill="rgba(52,211,153,0.6)">JOG</text>
    <text x="80" y="78" textAnchor="middle" fontSize="7" fill="rgba(96,165,250,0.6)">SPRINT</text>
  </>
);

const TechnicalDiagram = () => (
  <>
    {/* Box of cones */}
    <Cone x={32} y={28} />
    <Cone x={128} y={28} />
    <Cone x={32} y={88} />
    <Cone x={128} y={88} />
    {/* Center cone */}
    <Cone x={80} y={58} />
    {/* Mid-edge cones */}
    <Cone x={80} y={28} />
    <Cone x={80} y={88} />
    <Cone x={32} y={58} />
    <Cone x={128} y={58} />
    {/* Player */}
    <Player x={55} y={58} color="#3b82f6" label="P" />
    {/* Touch arrows */}
    <Arrow x1={55} y1={55} x2={78} y2={32} color="rgba(52,211,153,0.7)" />
    <Arrow x1={82} y1={28} x2={105} y2={55} color="rgba(52,211,153,0.7)" />
  </>
);

// ── Main component ──────────────────────────────────────────────────────────
export default function FieldDiagram({ type, className = '' }: Props) {
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

        {/* Diagram content */}
        {type === 'rondo' && <RondoDiagram />}
        {type === 'passing-pattern' && <PassingPatternDiagram />}
        {type === 'small-sided' && <SmallSidedDiagram />}
        {type === 'dribbling' && <DribblingDiagram />}
        {type === 'finishing' && <FinishingDiagram />}
        {type === 'fitness' && <FitnessDiagram />}
        {type === 'technical' && <TechnicalDiagram />}
      </svg>
    </div>
  );
}
