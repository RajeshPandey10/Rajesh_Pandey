import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Animated particles component
const AnimatedParticles = () => {
  const mesh = useRef();
  const light = useRef();

  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 500; i++) {
      const t = Math.random() * 2 * Math.PI;
      const u = Math.random() * 2 - 1;
      const c = Math.sqrt(1 - u * u);
      temp.push(
        c * Math.cos(t) * (Math.random() * 10 + 5),
        u * (Math.random() * 10 + 5),
        c * Math.sin(t) * (Math.random() * 10 + 5)
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (mesh.current) {
      mesh.current.rotation.x = time * 0.03;
      mesh.current.rotation.y = time * 0.05;
    }

    if (light.current) {
      light.current.position.x = Math.sin(time * 0.2) * 5;
      light.current.position.z = Math.cos(time * 0.2) * 5;
    }
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#64ffda"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      <pointLight ref={light} color="#64ffda" intensity={0.2} distance={12} />
    </>
  );
};

// Simple floating geometry
const FloatingGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time * 0.4) * 0.3;
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, 0, -4]}>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#667eea"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

// Fallback component for Suspense
const Fallback = () => null;

// Main Three.js background component
const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{
            background: "transparent",
            opacity: 0.4,
          }}
          gl={{ alpha: true, antialias: false }}
          onCreated={({ gl }) => {
            gl.setClearColor("#000000", 0);
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[3, 3, 3]} intensity={0.3} />

          {/* Animated components */}
          <AnimatedParticles />
          <FloatingGeometry />
          <Stars
            radius={25}
            depth={25}
            count={300}
            factor={2}
            saturation={0.5}
            fade
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ThreeBackground;
