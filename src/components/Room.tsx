import Image from "next/image";

export type Variant = "living" | "bedroom" | "dining" | "office" | "nook";
export type Tone = "light" | "warm" | "deep";

const tones = {
  light: { wall: "#F6F0E6", floor: "#E3D5BC", base: "#D8C7AB", accent: "#CBB08A", soft: "#E8DCC8", trim: "#B89B74", sofa: "#D6C3A3", sofa2: "#C6AF88" },
  warm: { wall: "#EBE0CF", floor: "#CDB48F", base: "#B89B74", accent: "#B08D63", soft: "#DCCDB3", trim: "#9C7F5B", sofa: "#F6F0E6", sofa2: "#E3D5BC" },
  deep: { wall: "#DCCDB3", floor: "#BFA27B", base: "#A98B64", accent: "#8A6A4B", soft: "#CBB08A", trim: "#8A6A4B", sofa: "#F6F0E6", sofa2: "#E8DCC8" },
};
type T = (typeof tones)["light"];

const CREAM = "#FFFDF7";
const LINEN = "#F2ECDF";
const SAGE = "#8E9A7B";
const SAGE2 = "#A6B08F";

function ArchWindow({ x, y, w, h, t }: { x: number; y: number; w: number; h: number; t: T }) {
  const r = w / 2;
  return (
    <g>
      <polygon points={`${x + 8},${y + h} ${x + w - 8},${y + h} ${x + w + 170},470 ${x + 50},470`} fill="#fff" opacity="0.18" />
      <path d={`M${x} ${y + h} V${y + r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h} Z`} fill={CREAM} stroke={t.trim} strokeWidth="6" />
      <path d={`M${x + r} ${y} V${y + h} M${x} ${y + h * 0.55} H${x + w}`} stroke={t.trim} strokeWidth="3" fill="none" />
    </g>
  );
}

function Rug({ cx, cy, rx, t }: { cx: number; cy: number; rx: number; t: T }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={rx * 0.17} fill={t.soft} />
      <ellipse cx={cx} cy={cy} rx={rx - 14} ry={rx * 0.17 - 3} fill="none" stroke={CREAM} strokeWidth="2" opacity="0.7" />
    </g>
  );
}

function Art({ x, y, w, h, t }: { x: number; y: number; w: number; h: number; t: T }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CREAM} stroke={t.trim} strokeWidth="3" />
      <circle cx={x + w / 2} cy={y + h * 0.4} r={w * 0.2} fill={t.accent} />
      <path d={`M${x + 3} ${y + h - 1.5} Q${x + w / 2} ${y + h * 0.55} ${x + w - 3} ${y + h - 1.5} Z`} fill={t.soft} />
    </g>
  );
}

function Mirror({ cx, cy, r, t }: { cx: number; cy: number; r: number; t: T }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={CREAM} stroke={t.trim} strokeWidth="5" />
      <path d={`M${cx - r * 0.5} ${cy + r * 0.3} L${cx + r * 0.1} ${cy - r * 0.55}`} stroke={t.soft} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Plant({ x, y, t }: { x: number; y: number; t: T }) {
  const leaves: [number, number, string][] = [[-38, 38, SAGE], [-14, 46, SAGE2], [10, 50, SAGE], [34, 40, SAGE2], [0, 34, SAGE2]];
  return (
    <g>
      {leaves.map(([a, ry, c], i) => (
        <ellipse key={i} cx={x} cy={y - 40 - ry} rx="11" ry={ry} fill={c} transform={`rotate(${a} ${x} ${y - 40})`} />
      ))}
      <path d={`M${x - 20} ${y - 42} h40 l-7 44 h-26 Z`} fill={t.trim} />
    </g>
  );
}

function FloorLamp({ x, t }: { x: number; t: T }) {
  return (
    <g>
      <ellipse cx={x} cy="382" rx="20" ry="5" fill={t.trim} />
      <path d={`M${x} 382 V232`} stroke={t.trim} strokeWidth="4" />
      <path d={`M${x - 30} 252 L${x - 19} 202 H${x + 19} L${x + 30} 252 Z`} fill={CREAM} stroke={t.trim} strokeWidth="3" />
    </g>
  );
}

function TableLamp({ x, y, t }: { x: number; y: number; t: T }) {
  return (
    <g>
      <rect x={x - 5} y={y - 26} width="10" height="26" fill={t.trim} />
      <path d={`M${x - 20} ${y - 24} L${x - 12} ${y - 56} H${x + 12} L${x + 20} ${y - 24} Z`} fill={CREAM} stroke={t.trim} strokeWidth="2.5" />
    </g>
  );
}

function Sofa({ x, y, w, t }: { x: number; y: number; w: number; t: T }) {
  return (
    <g>
      <rect x={x} y={y - 80} width={w} height="80" rx="24" fill={t.sofa2} />
      <rect x={x - 16} y={y - 42} width="36" height="74" rx="15" fill={t.sofa2} />
      <rect x={x + w - 20} y={y - 42} width="36" height="74" rx="15" fill={t.sofa2} />
      <rect x={x + 10} y={y - 26} width={w - 20} height="48" rx="15" fill={t.sofa} />
      <rect x={x + 16} y={y + 22} width="9" height="14" fill={t.trim} />
      <rect x={x + w - 25} y={y + 22} width="9" height="14" fill={t.trim} />
      <rect x={x + 26} y={y - 62} width="48" height="46" rx="13" fill={CREAM} transform={`rotate(-7 ${x + 50} ${y - 40})`} />
      <rect x={x + w - 76} y={y - 58} width="46" height="42" rx="13" fill={t.accent} transform={`rotate(8 ${x + w - 53} ${y - 37})`} />
    </g>
  );
}

function Living({ t }: { t: T }) {
  return (
    <g>
      <ArchWindow x={44} y={116} w={112} h={234} t={t} />
      <Rug cx={262} cy={444} rx={170} t={t} />
      <Art x={196} y={104} w={72} h={94} t={t} />
      <Mirror cx={322} cy={152} r={38} t={t} />
      <FloorLamp x={160} t={t} />
      <Plant x={30} y={398} t={t} />
      <Sofa x={192} y={352} w={184} t={t} />
    </g>
  );
}

function Bedroom({ t }: { t: T }) {
  const x = 70, y = 384, w = 220;
  return (
    <g>
      <ArchWindow x={296} y={120} w={84} h={230} t={t} />
      <Rug cx={190} cy={452} rx={190} t={t} />
      <Art x={104} y={104} w={62} h={84} t={t} />
      <Art x={188} y={104} w={62} h={84} t={t} />
      <rect x={x} y={y - 178} width={w} height="178" rx="20" fill={t.accent} />
      <rect x={x - 10} y={y - 88} width={w + 20} height="88" rx="14" fill={LINEN} />
      <rect x={x + 22} y={y - 128} width="86" height="48" rx="16" fill={CREAM} />
      <rect x={x + w - 108} y={y - 128} width="86" height="48" rx="16" fill={CREAM} />
      <rect x={x - 10} y={y - 52} width={w + 20} height="52" rx="12" fill={t.soft} />
      <rect x={x + 6} y={y} width="10" height="14" fill={t.trim} />
      <rect x={x + w - 16} y={y} width="10" height="14" fill={t.trim} />
      <rect x="8" y="328" width="44" height="58" rx="6" fill={t.soft} />
      <TableLamp x={30} y={328} t={t} />
      <Plant x={346} y={402} t={t} />
    </g>
  );
}

function Dining({ t }: { t: T }) {
  const chair = (x: number) => (
    <g key={x}>
      <rect x={x} y="232" width="48" height="68" rx="12" fill={t.accent} />
      <rect x={x - 4} y="296" width="56" height="14" rx="6" fill={t.trim} />
      <rect x={x + 2} y="310" width="6" height="72" fill={t.trim} />
      <rect x={x + 40} y="310" width="6" height="72" fill={t.trim} />
    </g>
  );
  return (
    <g>
      <ArchWindow x={36} y={106} w={120} h={244} t={t} />
      <Rug cx={268} cy={452} rx={190} t={t} />
      <Art x={296} y={118} w={70} h={96} t={t} />
      {[236, 306].map((cx) => (
        <g key={cx}>
          <path d={`M${cx} 0 V100`} stroke={t.trim} strokeWidth="2.5" />
          <path d={`M${cx - 28} 128 a28 28 0 0 1 56 0 Z`} fill={LINEN} stroke={t.trim} strokeWidth="3" />
        </g>
      ))}
      {chair(190)}
      {chair(312)}
      <rect x="164" y="290" width="214" height="12" rx="6" fill={t.accent} />
      <rect x="182" y="302" width="9" height="82" fill={t.trim} />
      <rect x="352" y="302" width="9" height="82" fill={t.trim} />
      <path d="M270 290 q-10 -34 2 -62 M270 290 q12 -26 22 -44" stroke={SAGE} strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="262" y="266" width="16" height="24" rx="7" fill={CREAM} stroke={t.trim} strokeWidth="2" />
      <Plant x={30} y={398} t={t} />
    </g>
  );
}

function Office({ t }: { t: T }) {
  const books: [number, number, string][] = [[56, 38, t.accent], [64, 30, t.soft], [72, 44, t.trim], [80, 34, CREAM]];
  return (
    <g>
      <ArchWindow x={274} y={106} w={100} h={244} t={t} />
      <Rug cx={150} cy={450} rx={150} t={t} />
      <rect x="48" y="150" width="160" height="6" fill={t.trim} />
      {books.map(([bx, h, c], i) => (
        <rect key={i} x={bx + i * 12 - 10} y={150 - h} width="10" height={h} fill={c} stroke={t.trim} strokeWidth="1.5" />
      ))}
      <circle cx="172" cy="132" r="14" fill={t.soft} stroke={t.trim} strokeWidth="2" />
      <rect x="48" y="214" width="160" height="6" fill={t.trim} />
      <rect x="76" y="186" width="44" height="28" fill={CREAM} stroke={t.trim} strokeWidth="2" />
      <rect x="150" y="196" width="22" height="18" rx="4" fill={t.accent} />
      <rect x="132" y="244" width="64" height="70" rx="16" fill={t.accent} />
      <rect x="40" y="290" width="216" height="12" rx="6" fill={t.accent} />
      <rect x="56" y="302" width="9" height="82" fill={t.trim} />
      <rect x="230" y="302" width="9" height="82" fill={t.trim} />
      <rect x="70" y="262" width="66" height="28" rx="4" fill={CREAM} stroke={t.trim} strokeWidth="2.5" />
      <TableLamp x={228} y={290} t={t} />
      <Plant x={338} y={402} t={t} />
    </g>
  );
}

function Nook({ t }: { t: T }) {
  const x = 138, y = 384, w = 128;
  return (
    <g>
      <path d="M104 350 V170 A96 96 0 0 1 296 170 V350 Z" fill={t.soft} />
      <path d="M124 350 V176 A76 76 0 0 1 276 176 V350 Z" fill={LINEN} opacity="0.8" />
      <polygon points="150,350 250,350 330,470 90,470" fill="#fff" opacity="0.16" />
      <Rug cx={200} cy={448} rx={150} t={t} />
      <circle cx="338" cy="150" r="34" fill={t.accent} />
      <FloorLamp x={64} t={t} />
      <rect x={x} y={y - 128} width={w} height="128" rx="52" fill={t.sofa2} />
      <rect x={x + 10} y={y - 52} width={w - 20} height="52" rx="16" fill={t.sofa} />
      <rect x={x - 18} y={y - 72} width="34" height="72" rx="16" fill={t.sofa2} />
      <rect x={x + w - 16} y={y - 72} width="34" height="72" rx="16" fill={t.sofa2} />
      <rect x={x + 34} y={y - 92} width="58" height="46" rx="14" fill={t.accent} transform={`rotate(-6 ${x + 63} ${y - 70})`} />
      <rect x={x + 14} y={y} width="9" height="14" fill={t.trim} />
      <rect x={x + w - 23} y={y} width="9" height="14" fill={t.trim} />
      <ellipse cx="330" cy="318" rx="38" ry="8" fill={t.accent} />
      <rect x="327" y="326" width="6" height="56" fill={t.trim} />
      <ellipse cx="330" cy="384" rx="22" ry="5" fill={t.trim} />
      <rect x="312" y="304" width="36" height="8" fill={CREAM} stroke={t.trim} strokeWidth="1.5" />
      <path d="M326 304 q-8 -26 4 -46 M326 304 q12 -18 18 -34" stroke={SAGE} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

export default function Room({ variant, tone = "light", label, photo }: { variant: Variant; tone?: Tone; label: string; photo?: string }) {
  if (photo) {
    return <Image src={photo} alt={label} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: "cover" }} />;
  }
  const t = tones[tone];
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="room-svg">
      <rect width="400" height="500" fill={t.wall} />
      <rect y="350" width="400" height="150" fill={t.floor} />
      <rect y="346" width="400" height="6" fill={t.base} />
      {variant === "living" && <Living t={t} />}
      {variant === "bedroom" && <Bedroom t={t} />}
      {variant === "dining" && <Dining t={t} />}
      {variant === "office" && <Office t={t} />}
      {variant === "nook" && <Nook t={t} />}
    </svg>
  );
}
