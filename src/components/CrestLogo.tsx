type CrestLogoProps = {
  className?: string;
  title?: string;
};

/**
 * Productive Security crest mark.
 * Prefer the PNG/SVG image assets for nav; this inline SVG is for larger placements
 * where CSS drop-shadow can add depth without fragile SVG filter IDs.
 */
export function CrestLogo({
  className = "h-10 w-auto drop-shadow-[0_10px_18px_rgba(5,8,20,0.45)]",
  title = "Productive Security Inc.",
}: CrestLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 470 540"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
    >
      {title ? <title>{title}</title> : null}

      {/* Open-top shield rim */}
      <path
        fill="none"
        stroke="#1c2348"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M88 58 C46 138 34 228 44 312 C56 408 132 482 235 528 C338 482 414 408 426 312 C436 228 424 138 382 58"
      />
      <path
        fill="none"
        stroke="#2f3668"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M88 58 C46 138 34 228 44 312 C56 408 132 482 235 528 C338 482 414 408 426 312 C436 228 424 138 382 58"
      />
      <path
        fill="none"
        stroke="#6a74a8"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
        d="M94 66 C56 150 46 240 54 316 C64 400 134 468 228 510"
      />

      {/* Maple leaf */}
      <g transform="translate(235 98)">
        <path
          fill="#d32025"
          d="M0-52 C4-40 10-34 14-28 C10-30 6-26 4-18 C14-28 26-34 36-30 C30-28 24-20 20-10 C32-18 46-18 54-10 C46-10 36-2 30 8 C44 2 56 8 62 18 C52 14 40 16 30 24 C42 28 48 40 48 52 C36 42 24 40 12 42 C14 54 10 64 0 78 C-10 64 -14 54 -12 42 C-24 40 -36 42 -48 52 C-48 40 -42 28 -30 24 C-40 16 -52 14 -62 18 C-56 8 -44 2 -30 8 C-36-2 -46-10 -54-10 C-46-18 -32-18 -20-10 C-24-20 -30-28 -36-30 C-26-34 -14-28 -4-18 C-6-26 -10-30 -14-28 C-10-34 -4-40 0-52 Z"
        />
      </g>

      <text
        x="235"
        y="210"
        textAnchor="middle"
        fill="#08080a"
        fontFamily="Impact, Haettenschweiler, 'Arial Narrow', 'Arial Black', Archivo, sans-serif"
        fontSize="46"
        fontWeight="700"
        letterSpacing="1.2"
      >
        PRODUCTIVE
      </text>

      {/* Chevron divider */}
      <g fill="#2a3162" transform="translate(235 252)">
        {([-120, -109, -98, -87, -76, -65, -54, -43, -32, -21, -10] as const).map((x) => (
          <rect key={`l1-${x}`} width="3" height="13" rx="0.5" transform={`translate(${x} -6.5) rotate(-33)`} />
        ))}
        {([7, 18, 29, 40, 51, 62, 73, 84, 95, 106, 117] as const).map((x) => (
          <rect key={`r1-${x}`} width="3" height="13" rx="0.5" transform={`translate(${x} -6.5) rotate(33)`} />
        ))}
        <g transform="translate(0 5.5)" opacity="0.9">
          {([-114, -103, -92, -81, -70, -59, -48, -37, -26, -15] as const).map((x) => (
            <rect key={`l2-${x}`} width="3" height="13" rx="0.5" transform={`translate(${x} -6.5) rotate(-33)`} />
          ))}
          {([12, 23, 34, 45, 56, 67, 78, 89, 100, 111] as const).map((x) => (
            <rect key={`r2-${x}`} width="3" height="13" rx="0.5" transform={`translate(${x} -6.5) rotate(33)`} />
          ))}
        </g>
      </g>

      <text
        x="235"
        y="302"
        textAnchor="middle"
        fill="#08080a"
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        fontSize="27"
        fontWeight="600"
        letterSpacing="5"
      >
        SECURITY
      </text>
      <text
        x="235"
        y="332"
        textAnchor="middle"
        fill="#08080a"
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="5.5"
      >
        INC.
      </text>

      {/* Stars */}
      <g fill="#d4a84a">
        <path
          transform="translate(188 428) scale(0.95)"
          d="M0-12 L2.75-3.7 L11.5-3.7 L4.4 1.45 L7.05 9.8 L0 4.5 L-7.05 9.8 L-4.4 1.45 L-11.5-3.7 L-2.75-3.7 Z"
        />
        <path
          transform="translate(235 440)"
          d="M0-12 L2.75-3.7 L11.5-3.7 L4.4 1.45 L7.05 9.8 L0 4.5 L-7.05 9.8 L-4.4 1.45 L-11.5-3.7 L-2.75-3.7 Z"
        />
        <path
          transform="translate(282 428) scale(0.95)"
          d="M0-12 L2.75-3.7 L11.5-3.7 L4.4 1.45 L7.05 9.8 L0 4.5 L-7.05 9.8 L-4.4 1.45 L-11.5-3.7 L-2.75-3.7 Z"
        />
      </g>
    </svg>
  );
}
