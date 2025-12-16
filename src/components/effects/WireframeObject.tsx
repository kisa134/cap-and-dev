import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <meshBasicMaterial
        color="#10b981"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export function WireframeObject() {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <RotatingWireframe />
      </Canvas>
    </div>
  );
}
