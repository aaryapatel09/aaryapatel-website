'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { computePretextLayout, type PretextFitMode, type PretextWhiteSpace } from '@/lib/pretext'

type UsePretextLayoutOptions = {
  text: string
  font: string
  lineHeight: number
  whiteSpace?: PretextWhiteSpace
  fit?: PretextFitMode
  maxWidth?: number
  disabled?: boolean
}

export function usePretextLayout({
  text,
  font,
  lineHeight,
  whiteSpace = 'normal',
  fit = 'container',
  maxWidth,
  disabled = false,
}: UsePretextLayoutOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const element = containerRef.current

    if (!element || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setContainerWidth(entry.contentRect.width)
    })

    observer.observe(element)
    setContainerWidth(element.getBoundingClientRect().width)

    return () => observer.disconnect()
  }, [])

  const layout = useMemo(() => {
    if (disabled || containerWidth <= 0) {
      return null
    }

    return computePretextLayout({
      text,
      font,
      lineHeight,
      whiteSpace,
      fit,
      maxWidth: maxWidth ? Math.min(containerWidth, maxWidth) : containerWidth,
    })
  }, [containerWidth, disabled, fit, font, lineHeight, maxWidth, text, whiteSpace])

  return {
    containerRef,
    containerWidth,
    lines: layout?.lines ?? [],
    width: layout?.width ?? containerWidth,
    lineCount: layout?.lineCount ?? 0,
    height: layout?.height ?? 0,
    isReady: layout !== null,
  }
}
