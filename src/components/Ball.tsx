import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { Mesh, Euler, Vector3, Color } from 'three'

// rotation: Euler || [x, y, z]
// position: Vector3 || [x, y, z] || scalar
// color: Color || 'hotpink' || 0xffffff

export default function Ball(props: { position: number[] }) {
  // This reference will give us direct access to the mesh
  const position = useMemo(() => new Vector3( ...props.position ), [props.position]);

  const meshRef = useRef<Mesh>(null!);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const movement = (e: KeyboardEvent) => {
      switch (e.key) {
          case 'w':
          case 'ArrowUp':
            meshRef.current.position.y+=0.2;
              break;
          case 's':
          case 'ArrowDown':
            meshRef.current.position.y -= 0.2;
              break;
          case 'd':
          case 'ArrowRight':
            meshRef.current.position.x += 0.2;
              break;
          case 'a':
          case 'ArrowLeft':
            meshRef.current.position.x -= 0.2;
              break;
          default:
              break;
      };

    };
    window.addEventListener('keydown',movement);
      return () => {
        window.removeEventListener('keydown', movement);
      }
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={active ? 1 : 0.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[1, 32]} />
      <meshStandardMaterial color={hovered ? 'red' : 'skyblue'} />
    </mesh>
  )
}