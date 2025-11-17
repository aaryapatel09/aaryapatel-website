'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface EngineParams {
  rpm: number
  fuelMix: number
  drs: boolean
  boost: number
}

interface EngineModelProps {
  params: EngineParams
}

export default function EngineModel({ params }: EngineModelProps) {
  const engineRef = useRef<Mesh>(null)
  const turboRef = useRef<Mesh>(null)

  // Animate based on RPM
  useFrame((state, delta) => {
    if (engineRef.current) {
      engineRef.current.rotation.y += (params.rpm / 15000) * delta * 2
    }
    if (turboRef.current) {
      turboRef.current.rotation.z += (params.rpm / 15000) * delta * 10
    }
  })

  // Color based on fuel mix and boost
  const intensity = params.fuelMix / 100
  const boostColor = params.boost > 50 ? '#E10600' : '#00FF88'

  return (
    <group>
      {/* Main Engine Block */}
      <mesh ref={engineRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#38383F"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Turbo */}
      <mesh ref={turboRef} position={[1.5, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
        <meshStandardMaterial
          color={boostColor}
          metalness={0.9}
          roughness={0.1}
          emissive={boostColor}
          emissiveIntensity={params.boost / 100}
        />
      </mesh>

      {/* Pistons (simplified) */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-0.5, -0.3 + i * 0.3, 0]}
          rotation={[Math.sin(params.rpm / 1000 + i) * 0.3, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.3, 8]} />
          <meshStandardMaterial
            color="#F4F4F4"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Exhaust */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.8, 8]} />
        <meshStandardMaterial
          color="#00FF88"
          metalness={0.6}
          roughness={0.4}
          emissive="#00FF88"
          emissiveIntensity={intensity * 0.3}
        />
      </mesh>

      {/* Glow effect based on parameters */}
      <pointLight
        position={[0, 0, 0]}
        intensity={intensity * 2}
        color={boostColor}
        distance={5}
      />
    </group>
  )
}

