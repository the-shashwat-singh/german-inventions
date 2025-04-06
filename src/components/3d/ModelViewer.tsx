'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  PresentationControls, 
  ContactShadows,
  Html,
  Float
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Add error boundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-indigo-100 rounded-xl p-8">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2 text-indigo-800">3D Model Error</h3>
          <p className="text-indigo-700">Unable to load the 3D model</p>
        </div>
      </div>
    );
  }
  
  return children;
};

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

const Model = ({ modelPath, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelProps) => {
  const modelRef = useRef<THREE.Group>(null);
  const [modelError, setModelError] = useState(false);
  
  let gltf;
  try {
    gltf = useGLTF(modelPath);
  } catch (error) {
    console.error("Error loading model:", error);
    setModelError(true);
  }
  
  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  const [hovered, setHovered] = useState(false);
  
  if (modelError) {
    // Render a fallback box if the model fails to load
    return (
      <mesh
        position={position as any}
        rotation={rotation as any}
        scale={scale}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
        <Html position={[0, 1.5, 0]} center>
          <div style={{ 
            background: 'rgba(0,0,0,0.8)', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '5px', 
            width: '200px', 
            textAlign: 'center' 
          }}>
            Model Not Available
          </div>
        </Html>
      </mesh>
    );
  }
  
  return (
    <group
      ref={modelRef}
      position={position as any}
      rotation={rotation as any}
      scale={hovered ? [scale * 1.1, scale * 1.1, scale * 1.1] : [scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {gltf && <primitive object={gltf.scene} dispose={null} />}
    </group>
  );
};

interface FactCardProps {
  fact: string;
  index: number;
}

const FactCard = ({ fact, index }: FactCardProps) => {
  const { camera } = useThree();
  
  return (
    <Float 
      speed={1.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={[
        Math.sin(index * (Math.PI * 0.5)) * 2, 
        0.5 + index * 0.2, 
        Math.cos(index * (Math.PI * 0.5)) * 2
      ]}
    >
      <Html
        transform
        occlude
        distanceFactor={5}
        rotation={[0, -index * (Math.PI * 0.5), 0]}
        position={[0, 0, 0]}
        style={{
          width: '150px',
          height: 'auto',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.8rem',
          pointerEvents: 'none'
        }}
      >
        {fact}
      </Html>
    </Float>
  );
};

interface ModelViewerProps {
  modelPath: string;
  facts?: string[];
  className?: string;
}

const ModelViewer = ({ modelPath, facts = [], className = '' }: ModelViewerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  // Fallback component for error state
  if (loadError) {
    return (
      <div className={`w-full h-[500px] rounded-xl overflow-hidden bg-indigo-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2 text-indigo-800">Loading Error</h3>
          <p className="text-indigo-700">Unable to load the 3D model</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`w-full h-[500px] rounded-xl overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <ErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          onError={() => setLoadError(true)}
        >
          <color attach="background" args={['#f1f5f9']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={
            <Html center>
              <div style={{ color: '#4338ca', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem' }}>⏳</div>
                Loading model...
              </div>
            </Html>
          }>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              speed={1.5}
              zoom={1.5}
            >
              <Model modelPath={modelPath} scale={1.5} />

              {facts.map((fact, index) => (
                <FactCard key={index} fact={fact} index={index} />
              ))}
            </PresentationControls>
          </Suspense>
          
          <ContactShadows
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={1.5}
          />
          
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </ErrorBoundary>
    </motion.div>
  );
};

export default ModelViewer; 