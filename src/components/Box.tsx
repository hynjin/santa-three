import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { Mesh, Euler, Vector3, Color } from 'three'

// rotation: Euler || [x, y, z]
// position: Vector3 || [x, y, z] || scalar
// color: Color || 'hotpink' || 0xffffff

export default function Box(props: { position: number[] }) {
  // This reference will give us direct access to the mesh
  const boxPosition = new Vector3( ...props.position );

  const meshRef = useRef<Mesh>(null!);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
  })
  // Return view, these are regular three.js elements expressed in JSX

  return (
    <mesh
      ref={meshRef}
      position={boxPosition}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}