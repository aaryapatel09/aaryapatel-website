'use client'

interface TrackMapSVGProps {
  className?: string
}

export default function TrackMapSVG({ className = '' }: TrackMapSVGProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified F1 track outline */}
      <path
        d="M50 100 Q100 50, 150 60 T250 70 Q300 80, 350 100 T350 150 Q300 140, 250 130 T150 140 Q100 150, 50 100 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="racing-line"
        opacity="0.3"
      />
      {/* Track center line */}
      <path
        d="M50 100 Q100 50, 150 60 T250 70 Q300 80, 350 100"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="5,5"
        fill="none"
        opacity="0.2"
      />
    </svg>
  )
}

