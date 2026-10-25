/** Abstract thumbnail for a project card, drawn from the cover and tag tokens. */
export default function ProjectArt({ kind }) {
  return (
    <svg className="card-cover" viewBox="0 0 340 148" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {ART[kind] ?? ART.grid}
    </svg>
  );
}

const ART = {
  grid: (
    <>
      <rect className="f-blue" width="340" height="148" />
      <rect className="f-sky" x="70" y="24" width="200" height="104" rx="4" />
      <rect className="f-deep" x="70" y="24" width="200" height="20" rx="4" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          className={i % 4 === 0 ? "f-sea" : i === 6 ? "f-yellow" : "f-blue"}
          x={82 + (i % 4) * 46}
          y={54 + Math.floor(i / 4) * 24}
          width={i % 4 === 0 ? 40 : 38}
          height="14"
          rx="3"
        />
      ))}
    </>
  ),
  chart: (
    <>
      <rect className="f-sky" width="340" height="148" />
      <rect className="f-sea" x="88" y="84" width="28" height="40" rx="3" />
      <rect className="f-deep" x="126" y="60" width="28" height="64" rx="3" />
      <rect className="f-sea" x="164" y="72" width="28" height="52" rx="3" />
      <rect className="f-deep" x="202" y="40" width="28" height="84" rx="3" />
      <path className="s-blue" d="M84 92 C 130 70, 170 80, 240 34" />
      <circle className="f-ink-blue" cx="240" cy="34" r="4" />
    </>
  ),
  wave: (
    <>
      <rect className="f-sea" width="340" height="148" />
      {[10, 22, 40, 64, 34, 80, 52, 28, 70, 44, 20, 58, 36, 16, 8].map((h, i) => (
        <rect
          key={i}
          className={i === 5 || i === 8 ? "f-ink-blue" : "f-sky"}
          x={92 + i * 11}
          y={74 - h / 2}
          width="6"
          height={h}
          rx="3"
        />
      ))}
    </>
  ),
  solar: (
    <>
      <rect className="f-sky" width="340" height="148" />
      <circle className="f-sun" cx="250" cy="44" r="22" />
      <g transform="translate(70 70) skewX(-18)">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} className="f-deep" x={(i % 4) * 40} y={Math.floor(i / 4) * 30} width="36" height="26" rx="3" />
        ))}
      </g>
      <rect className="f-sand" y="134" width="340" height="14" />
    </>
  ),
};
