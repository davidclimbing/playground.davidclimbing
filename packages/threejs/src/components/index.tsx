'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Box
      ref={meshRef}
      position={[0, 0, 0]}
      scale={clicked ? 1.5 : 1}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color={hovered ? 'hotpink' : clicked ? 'orange' : 'royalblue'} />
    </Box>
  );
}

export default function Content() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingCube />
        <OrbitControls enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}
