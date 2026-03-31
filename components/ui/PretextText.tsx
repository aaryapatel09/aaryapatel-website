'use client'

import type { CSSProperties, ElementType } from 'react'
import { usePretextLayout } from '@/hooks/usePretextLayout'
import type { PretextFitMode, PretextWhiteSpace } from '@/lib/pretext'

type PretextTextProps<T extends ElementType> = {
  as?: T
  text: string
  className?: string
  style?: CSSProperties
  lineClassName?: string
  font: string
  lineHeight: number
  fit?: PretextFitMode
  whiteSpace?: PretextWhiteSpace
  align?: CSSProperties['textAlign']
  maxWidth?: number
}

export default function PretextText<T extends ElementType = 'div'>({
  as,
  text,
  className = '',
  style,
  lineClassName = '',
  font,
  lineHeight,
  fit = 'container',
  whiteSpace = 'normal',
  align = 'left',
  maxWidth,
}: PretextTextProps<T>) {
  const Component = (as ?? 'div') as ElementType
  const { containerRef, isReady, lines, width } = usePretextLayout({
    text,
    font,
    lineHeight,
    fit,
    whiteSpace,
    maxWidth,
  })

  const measuredStyle: CSSProperties = {
    ...style,
    textAlign: align,
    lineHeight: `${lineHeight}px`,
    width: fit === 'balance' && isReady ? `${Math.ceil(width)}px` : '100%',
    maxWidth: '100%',
    marginLeft: align === 'center' ? 'auto' : style?.marginLeft,
    marginRight: align === 'center' ? 'auto' : style?.marginRight,
  }

  return (
    <div ref={containerRef} className="w-full">
      {isReady ? (
        <Component className={className} style={measuredStyle}>
          {lines.map((line, index) => (
            <span
              key={`${line.text}-${index}`}
              className={lineClassName}
              style={{
                display: 'block',
                whiteSpace: 'pre',
              }}
            >
              {line.text || '\u00A0'}
            </span>
          ))}
        </Component>
      ) : (
        <Component className={className} style={{ ...style, textAlign: align }}>
          {text}
        </Component>
      )}
    </div>
  )
}
