import type { LayoutLine, PreparedTextWithSegments } from '@chenglou/pretext'
import { layoutWithLines, prepareWithSegments, walkLineRanges } from '@chenglou/pretext'

export type PretextFitMode = 'container' | 'balance'
export type PretextWhiteSpace = 'normal' | 'pre-wrap'

export type PretextLayoutConfig = {
  text: string
  font: string
  lineHeight: number
  maxWidth: number
  whiteSpace?: PretextWhiteSpace
  fit?: PretextFitMode
}

export type PretextLayoutResult = {
  width: number
  lines: LayoutLine[]
  lineCount: number
  height: number
}

const MIN_WIDTH = 1
const BALANCE_SEARCH_STEPS = 10

export function preparePretext(text: string, font: string, whiteSpace: PretextWhiteSpace = 'normal') {
  return prepareWithSegments(text, font, { whiteSpace })
}

export function getWidestLineWidth(prepared: PreparedTextWithSegments, maxWidth: number) {
  let widest = MIN_WIDTH

  walkLineRanges(prepared, maxWidth, (line) => {
    widest = Math.max(widest, line.width)
  })

  return Math.ceil(widest)
}

export function findBalancedWidth(
  prepared: PreparedTextWithSegments,
  maxWidth: number,
  lineHeight: number,
) {
  const safeMaxWidth = Math.max(MIN_WIDTH, maxWidth)
  const baseLayout = layoutWithLines(prepared, safeMaxWidth, lineHeight)

  if (baseLayout.lineCount <= 1) {
    return Math.min(safeMaxWidth, getWidestLineWidth(prepared, safeMaxWidth))
  }

  const widestLine = getWidestLineWidth(prepared, safeMaxWidth)
  let low = Math.min(widestLine, safeMaxWidth)
  let high = safeMaxWidth
  let best = safeMaxWidth

  for (let step = 0; step < BALANCE_SEARCH_STEPS; step += 1) {
    const mid = (low + high) / 2
    const candidate = layoutWithLines(prepared, mid, lineHeight)

    if (candidate.lineCount > baseLayout.lineCount) {
      low = mid
    } else {
      best = mid
      high = mid
    }
  }

  return Math.min(safeMaxWidth, Math.max(widestLine, Math.ceil(best)))
}

export function computePretextLayout({
  text,
  font,
  lineHeight,
  maxWidth,
  whiteSpace = 'normal',
  fit = 'container',
}: PretextLayoutConfig): PretextLayoutResult {
  const prepared = preparePretext(text, font, whiteSpace)
  const safeMaxWidth = Math.max(MIN_WIDTH, maxWidth)
  const width = fit === 'balance' ? findBalancedWidth(prepared, safeMaxWidth, lineHeight) : safeMaxWidth
  const layout = layoutWithLines(prepared, width, lineHeight)

  return {
    width,
    lines: layout.lines,
    lineCount: layout.lineCount,
    height: layout.height,
  }
}

export function measureCharacters(text: string, font: string) {
  if (typeof document === 'undefined') {
    return Array.from(text).map(() => 0)
  }

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return Array.from(text).map(() => 0)
  }

  context.font = font

  return Array.from(text).map((character) => context.measureText(character).width)
}
