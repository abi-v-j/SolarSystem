import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import sunTexture from './assets/sun.jpg';
import mercuryTexture from './assets/mercury.jpg';
import venusTexture from './assets/venus.jpg';
import earthTexture from './assets/earth.jpg';
import marsTexture from './assets/mars.jpg';
import jupiterTexture from './assets/jupiter.jpg';
import saturnTexture from './assets/saturn.jpg';
import saturnRingTexture from './assets/saturn ring.png';
import uranusTexture from './assets/uranus.jpg';
import uranusRingTexture from './assets/uranus ring.png';
import neptuneTexture from './assets/neptune.jpg';
import plutoTexture from './assets/pluto.jpg';

function Planet({ size, texture, position, ring }) {
    const meshRef = useRef();
    const objRef = useRef();

    // Self-rotation
    useFrame(() => {
        if (meshRef.current) meshRef.current.rotation.y += 0.01;
        if (objRef.current) objRef.current.rotation.y += position.speed;
    });

    return (
        <group ref={objRef}>
            <mesh ref={meshRef} position-x={position.distance}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial map={new THREE.TextureLoader().load(texture)} />
            </mesh>
            {ring && (
                <mesh rotation-x={-Math.PI / 2} position-x={position.distance}>
                    <ringGeometry args={[ring.innerRadius, ring.outerRadius, 32]} />
                    <meshBasicMaterial
                        map={new THREE.TextureLoader().load(ring.texture)}
                        side={THREE.DoubleSide}
                        transparent
                    />
                </mesh>
            )}
        </group>
    );
}

function SolarSystem() {
    const sunRef = useRef();

    // Sun rotation
    useFrame(() => {
        if (sunRef.current) sunRef.current.rotation.y += 0.004;
    });

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} />
            <mesh ref={sunRef}>
                <sphereGeometry args={[16, 32, 32]} />
                <meshBasicMaterial map={new THREE.TextureLoader().load(sunTexture)} />
            </mesh>
            <Planet size={3.2} texture={mercuryTexture} position={{ distance: 28, speed: 0.04 }} />
            <Planet size={5.8} texture={venusTexture} position={{ distance: 44, speed: 0.015 }} />
            <Planet size={6} texture={earthTexture} position={{ distance: 62, speed: 0.01 }} />
            <Planet size={4} texture={marsTexture} position={{ distance: 78, speed: 0.008 }} />
            <Planet size={12} texture={jupiterTexture} position={{ distance: 100, speed: 0.002 }} />
            <Planet
                size={10}
                texture={saturnTexture}
                position={{ distance: 138, speed: 0.0009 }}
                ring={{
                    innerRadius: 10,
                    outerRadius: 20,
                    texture: saturnRingTexture,
                }}
            />
            <Planet
                size={7}
                texture={uranusTexture}
                position={{ distance: 176, speed: 0.0004 }}
                ring={{
                    innerRadius: 7,
                    outerRadius: 12,
                    texture: uranusRingTexture,
                }}
            />
            <Planet size={7} texture={neptuneTexture} position={{ distance: 200, speed: 0.0001 }} />
            <Planet size={2.8} texture={plutoTexture} position={{ distance: 216, speed: 0.00007 }} />
        </>
    );
}

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [-90, 140, 140], fov: 45 }}
                style={{ backgroundColor: 'black' }}
            >
                <OrbitControls />
                <Stars
                    radius={300} // Outer radius of the starfield sphere
                    depth={50} // Starfield depth
                    count={2000} // Number of stars
                    factor={7} // Star size factor
                    saturation={0} // Star color saturation
                    fade // Adds fade to the starfield
                />
                <SolarSystem />
            </Canvas>
        </div>
    );
}
