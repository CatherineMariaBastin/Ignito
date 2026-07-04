import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  // Pulls file directly from the public/ folder route at runtime
  const { scene } = useGLTF('/model.glb'); 
  
  return <primitive object={scene} {...props} />;
}

// Pre-load asset memory block to prevent rendering lag
useGLTF.preload('/model.glb');
