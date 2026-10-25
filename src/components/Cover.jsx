export default function Cover() {
  return (
    <div className="cover" aria-hidden="true">
      <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice">
        <rect className="f-sky" width="1200" height="240" />
        <circle className="f-sun" cx="880" cy="96" r="48" />
        <path className="f-sea" d="M0 150 C 160 120, 320 128, 480 150 S 820 176, 1000 148 S 1140 132, 1200 140 V240 H0Z" />
        <path className="f-deep" d="M0 196 C 200 168, 400 178, 600 198 S 980 220, 1200 190 V240 H0Z" />
        <path className="f-sand" d="M0 232 C 300 218, 700 222, 1200 228 V240 H0Z" />
      </svg>
    </div>
  );
}
