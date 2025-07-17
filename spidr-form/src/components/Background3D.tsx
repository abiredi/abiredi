import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position?: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}

function AnimatedSphere({ position = [0, 0, 0], scale = 1, speed = 1, color = "#6c63ff" }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * speed * 0.2) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 20]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  );
}

function FloatingParticles({ count = 100 }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.1 + Math.random() * 0.02;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        const { time, factor, speed, x, y, z } = particle;
        const t = (state.clock.elapsedTime + time) * speed;
        const mesh = meshRef.current!;
        mesh.setMatrixAt(i, new THREE.Matrix4().setPosition(
          x + Math.cos(t) * factor,
          y + Math.sin(t) * factor,
          z + Math.sin(t) * factor
        ));
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[28, 28, 28]} />
      <meshBasicMaterial color="#4e54c8" transparent opacity={0.3} />
    </instancedMesh>
  );
}

function InteractiveGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      (gridRef.current.material as THREE.Material).opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <gridHelper ref={gridRef} args={[10, 50, 0x6c63ff]} position={[0, -10, 0]} />
  );
}

function MouseFollower() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  
  useFrame(() => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      meshRef.current.position.x = x;
      meshRef.current.position.y = y;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 5]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#6c63ff" transparent opacity={0.3} />
    </mesh>
  );
}

function AnimatedText() {
  const textRef = useRef<any>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={[0, 5, 0]}
        fontSize={0.5}
        color="#6c63ff"
        anchorX="center"
        anchorY="middle"
      >
        SPIDR
      </Text>
    </Float>
  );
}

function EnergyField() {
  const fieldRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      (fieldRef.current.material as THREE.Material).opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <mesh ref={fieldRef} position={[0, 0, -5]}>
      <ringGeometry args={[5, 15, 20]} />
      <meshBasicMaterial color="#6c63ff" transparent opacity={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'linear-gradient(135deg, #181240, #232830)'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6c63ff" />
        
        {/* Multiple animated spheres */}
        <AnimatedSphere position={[0, 0, 0]} scale={2.5} speed={1} color="#663ff" />
        <AnimatedSphere position={[4, 2, -3]} scale={1.5} speed={0.7} color="#454c8" />
        <AnimatedSphere position={[-3, -1, 0]} scale={1.8} speed={1.2} color="#663ff" />
        <AnimatedSphere position={[2, -3, -1]} scale={1.2} speed={0.9} color="#4e54c8" />
        
        {/* Enhanced particle system */}
        <FloatingParticles count={150} />
        
        {/* Interactive elements */}
        <MouseFollower />
        <AnimatedText />
        <EnergyField />
        <InteractiveGrid />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
} 