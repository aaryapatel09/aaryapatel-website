'use client'

interface RacingLineSVGProps {
  className?: string
}

export default function RacingLineSVG({ className = '' }: RacingLineSVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 50 Q30 20, 50 30 T90 50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="racing-line"
      />
    </svg>
  )
}

