'use client'

import { useEffect, useRef } from 'react'

const CODE_SNIPPETS = [
  'const predict = await model.run(data)',
  'import tensorflow as tf',
  'def train(epochs=100):',
  'accuracy = 0.95',
  'loss.backward()',
  'optimizer.step()',
  'np.array(features)',
  'model.fit(X_train, y_train)',
  'return predictions',
  'class NeuralNet(nn.Module):',
  'self.conv1 = nn.Conv2d(3, 64)',
  'torch.cuda.is_available()',
  'pipeline.transform(data)',
  'df.groupby("driver").mean()',
  'response = requests.get(url)',
  'async def fetch_data():',
  'SELECT * FROM races WHERE',
  'git commit -m "deploy v2"',
  'docker build -t app .',
  'kubectl apply -f deploy.yaml',
  'export default function App()',
  'const [state, setState] = useState',
  'useEffect(() => {}, [])',
  'npm run build && npm start',
  'from sklearn import svm',
  'cv2.imread("frame.jpg")',
  'weights = torch.load("model.pt")',
  'app.listen(3000)',
  'res.json({ status: "ok" })',
  'CREATE TABLE predictions (',
]

interface Line {
  text: string
  x: number
  y: number
  speed: number
  opacity: number
}

export default function CodeRain({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const linesRef = useRef<Line[]>([])
  const rafRef = useRef(0)

  useEffect(() => {
    if (width === 0 || height === 0) return

    const lineCount = Math.floor(height / 16) + 10
    const lines: Line[] = []
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        x: 8 + Math.random() * 4,
        y: Math.random() * (height + 40) - 20,
        speed: 8 + Math.random() * 14,
        opacity: 0.06 + Math.random() * 0.1,
      })
    }
    linesRef.current = lines

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastTime = performance.now()

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      ctx.clearRect(0, 0, width, height)
      ctx.font = '11px "Courier New", monospace'

      for (const line of linesRef.current) {
        line.y -= line.speed * dt
        if (line.y < -20) {
          line.y = height + 10
          line.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]
        }
        ctx.globalAlpha = line.opacity
        ctx.fillStyle = '#ffffff'
        ctx.fillText(line.text, line.x, line.y)
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
