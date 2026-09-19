"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const NAVY = "#163b63";
const CRIMSON = "#a71935";
const SILVER = "#d3d7dd";

/** Neutral studio reflections for the metallic materials — generated locally, no HDR download. */
function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return <primitive object={env} attach="environment" />;
}

/** Small data nodes travelling on an orbit ring. */
function OrbitNodes({ radius, count, accentEvery = 4 }) {
  const ref = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const m = new THREE.Matrix4();
    let a = 0;
    let s = 0;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      m.makeTranslation(Math.cos(t) * radius, Math.sin(t) * radius, 0);
      if (i % accentEvery === 0) accentRef.current.setMatrixAt(a++, m);
      else ref.current.setMatrixAt(s++, m);
    }
    ref.current.count = s;
    accentRef.current.count = a;
    ref.current.instanceMatrix.needsUpdate = true;
    accentRef.current.instanceMatrix.needsUpdate = true;
  }, [radius, count, accentEvery]);

  return (
    <>
      <instancedMesh ref={ref} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.2} />
      </instancedMesh>
      <instancedMesh ref={accentRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#e0445f" emissive={CRIMSON} emissiveIntensity={0.9} roughness={0.3} />
      </instancedMesh>
    </>
  );
}

// Small seeded PRNG so the particle layout is deterministic (pure render).
function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Faint particle field around the engine. */
function DataParticles({ count = 220 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const rand = seeded(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + rand() * 2.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={SILVER} transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Growth bars at the core — the "analytics" heart of the engine. */
function GrowthBars() {
  const bars = useRef([]);
  const heights = [0.55, 0.8, 1.05, 1.35, 1.7];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    bars.current.forEach((bar, i) => {
      if (!bar) return;
      const s = 1 + Math.sin(t * 1.1 - i * 0.55) * 0.06;
      bar.scale.y = s;
      bar.position.y = -0.85 + (heights[i] * s) / 2;
    });
  });

  return (
    <group position={[0, 0, 0.05]}>
      {heights.map((h, i) => (
        <mesh key={i} ref={(el) => (bars.current[i] = el)} position={[-0.6 + i * 0.3, -0.85 + h / 2, 0]}>
          <boxGeometry args={[0.18, h, 0.18]} />
          {i === heights.length - 1 ? (
            <meshStandardMaterial color={CRIMSON} metalness={0.55} roughness={0.25} emissive={CRIMSON} emissiveIntensity={0.25} />
          ) : (
            <meshStandardMaterial color={SILVER} metalness={1} roughness={0.22 + i * 0.03} />
          )}
        </mesh>
      ))}
    </group>
  );
}

function Engine({ pointer }) {
  const root = useRef(null);
  const outer = useRef(null);
  const arc = useRef(null);
  const orbit = useRef(null);
  const inner = useRef(null);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    // Subtle mouse parallax, eased.
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.35 + pointer.current.x * 0.28, 2.5, dt);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.12 - pointer.current.y * 0.18, 2.5, dt);
    root.current.position.y = Math.sin(t * 0.6) * 0.08;

    outer.current.rotation.z += dt * 0.08;
    arc.current.rotation.z -= dt * 0.22;
    orbit.current.rotation.z += dt * 0.12;
    inner.current.rotation.z -= dt * 0.05;
  });

  return (
    <group ref={root} rotation={[0.12, -0.35, 0]}>
      {/* Silver outer rim — echoes the badge's metallic face */}
      <mesh ref={outer}>
        <torusGeometry args={[2.2, 0.15, 48, 180]} />
        <meshStandardMaterial color={SILVER} metalness={1} roughness={0.26} />
      </mesh>

      {/* Crimson rim segment */}
      <mesh ref={arc} position={[0, 0, 0.02]}>
        <torusGeometry args={[2.46, 0.07, 24, 160, Math.PI * 1.25]} />
        <meshStandardMaterial color={CRIMSON} metalness={0.6} roughness={0.28} emissive={CRIMSON} emissiveIntensity={0.15} />
      </mesh>

      {/* Navy inner ring */}
      <mesh ref={inner}>
        <torusGeometry args={[1.72, 0.09, 32, 140]} />
        <meshStandardMaterial color={NAVY} metalness={0.85} roughness={0.32} />
      </mesh>

      {/* Tilted orbit with data nodes */}
      <group rotation={[1.15, 0.2, 0]}>
        <group ref={orbit}>
          <mesh>
            <torusGeometry args={[3.05, 0.008, 8, 220]} />
            <meshBasicMaterial color={SILVER} transparent opacity={0.35} />
          </mesh>
          <OrbitNodes radius={3.05} count={16} />
        </group>
      </group>

      <GrowthBars />
    </group>
  );
}

export default function GrowthEngine({ active = true, onReady }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        requestAnimationFrame(() => onReady?.());
      }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <StudioEnvironment />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#e0445f" distance={12} />
      <pointLight position={[4, -3, -2]} intensity={14} color="#3b7bc4" distance={12} />
      <Engine pointer={pointer} />
      <DataParticles />
    </Canvas>
  );
}
