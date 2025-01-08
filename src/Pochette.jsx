import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Pochette({ textureURL, ...props }) {
  const { nodes, materials } = useGLTF('/models/pochette.glb');

  // Crée une texture à partir du canvas
  let texture = null;
  if (textureURL) {
    texture = new THREE.CanvasTexture(textureURL);
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false; // Corrige l'orientation de la texture
    texture.minFilter = THREE.LinearFilter; // Améliore la qualité
    texture.magFilter = THREE.LinearFilter; // Améliore la qualité
    texture.needsUpdate = true;
  }

  // Vérifiez si la texture est valide
  useEffect(() => {
    if (textureURL) {
      console.log("Texture URL valide :", textureURL);
    } else {
      console.warn("Texture URL est invalide ou non chargée !");
    }
  }, [textureURL]);

  return (
    <group {...props} dispose={null}>
    <group position={[-0.563, 0, -0.358]} rotation={[-Math.PI / 2, 0, 0.594]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group position={[-0.103, 1.045, 0.58]}>
          <group position={[-0.001, 0, 1.105]} rotation={[0, -0.598, -Math.PI / 2]}>
            <mesh geometry={nodes.Object_10.geometry} material={materials['Translucent.001']} />
            <mesh geometry={nodes.Object_11.geometry} material={materials['Cover.001']} />
          </group>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Rough_Plastic.001']} />
          <mesh geometry={nodes.Object_5.geometry} material={materials['Translucent.001']} />
          <mesh geometry={nodes.Object_6.geometry} material={materials['White.001']} />
          <mesh geometry={nodes.Object_7.geometry} material={materials['Material.001']} />
          <mesh geometry={nodes.Object_8.geometry} material={materials['FileBase.001']} />
        </group>
      </group>
    </group>
    <mesh geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[0.355, 1.04, -0.041]} rotation={[1.572, -0.001, -1.561]}>
    <meshStandardMaterial attach="material" map={texture} side={THREE.DoubleSide}/>
    </mesh>
    </group>
  );
}

useGLTF.preload('/models/pochette.glb');

export default Pochette;
